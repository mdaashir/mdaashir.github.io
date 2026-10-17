/**
 * Checks the site across every Polypane pane, talking to Polypane over its CDP port.
 *
 * For each pane it reports the viewport, which device mode the CSS selected, horizontal overflow,
 * the root font-size, and whether any window sits under the dock (windows are opened first in
 * desktop panes). It then runs an axe-core pass in a phone pane and a desktop pane.
 *
 * Usage:
 *   1. Start Polypane with remote debugging and your page open:
 *        "C:\Program Files\Polypane\Polypane.exe" --remote-debugging-port=5858 https://mdaashir.github.io/
 *   2. node tools/polypane-check.mjs
 *
 * Panes are read from `window.__polypane.title`. Do not reload panes from here — that tears down
 * Polypane's webview — so opening windows is written to be idempotent instead.
 */
const CDP = 'http://127.0.0.1:5858';

/** Opens a few windows so the dock-clearance check has something to measure. Idempotent: the dock
 *  toggles, and reloading a pane tears down Polypane's webview, so only closed windows are opened. */
const OPEN_WINDOWS = `(() => {
	if (getComputedStyle(document.querySelector('.desktop-shell')).display === 'none') return 'phone';
	const openCount = () =>
		[...document.querySelectorAll('.window')].filter((w) => getComputedStyle(w).display !== 'none')
			.length;
	if (openCount() === 0) {
		const icons = [...document.querySelectorAll('#dock .dock-icon')];
		for (const index of [0, 1, 4]) icons[index]?.click();
	}
	return String(openCount());
})()`;

const METRICS = `(() => {
	const display = (sel) => {
		const el = document.querySelector(sel);
		return el ? getComputedStyle(el).display : 'absent';
	};
	const doc = document.documentElement;
	const dock = document.getElementById('dock')?.getBoundingClientRect();
	const dockTop = dock ? Math.round(dock.top) : null;

	const windows = [...document.querySelectorAll('.window')].filter(
		(w) => getComputedStyle(w).display !== 'none'
	);

	const bar = document.querySelector('.phone__bar')?.getBoundingClientRect();
	const home = document.querySelector('.phone__home');

	return JSON.stringify({
		pane: window.__polypane?.title ?? null,
		viewport: [window.innerWidth, window.innerHeight],
		root: getComputedStyle(doc).fontSize,
		overflowX: doc.scrollWidth > window.innerWidth,
		desktop: display('.desktop-shell'),
		phone: display('.phone-shell'),
		tiles: document.querySelectorAll('.phone__app').length,
		openWindows: windows.length,
		pastDock: windows.map((w) =>
			Math.round(w.getBoundingClientRect().bottom - (dockTop ?? window.innerHeight))
		),
		// Does the phone chrome fit without clipping at this height?
		barBottom: bar ? Math.round(bar.bottom - window.innerHeight) : null,
		home: home ? [home.clientHeight, home.scrollHeight] : null,
	});
})()`;

const AXE = `(async () => {
	if (!window.axe) {
		await new Promise((resolve, reject) => {
			const script = document.createElement('script');
			script.src = 'https://cdn.jsdelivr.net/npm/axe-core@4/axe.min.js';
			script.onload = resolve;
			script.onerror = () => reject(new Error('axe failed to load'));
			document.head.appendChild(script);
		});
	}
	const result = await window.axe.run(document, {
		resultTypes: ['violations', 'incomplete'],
		runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'] },
	});
	return JSON.stringify({
		violations: result.violations.map((v) => ({
			id: v.id,
			impact: v.impact,
			help: v.help,
			nodes: v.nodes.length,
			details: v.nodes.map((node) => {
				const check = node.any[0]?.data ?? {};
				return {
					target: Array.isArray(node.target) ? node.target.join(' ') : String(node.target),
					ratio: check.contrastRatio,
					expected: check.expectedContrastRatio,
					fg: check.fgColor,
					bg: check.bgColor,
					html: node.html.slice(0, 70),
				};
			}),
		})),
		needsReview: result.incomplete.map((v) => v.id + ' (' + v.nodes.length + ')'),
		passes: result.passes.length,
	});
})()`;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function panes() {
	const response = await fetch(`${CDP}/json/list`);
	const targets = await response.json();
	return targets.filter(
		(target) => target.type === 'webview' && /^https?:/.test(target.url)
	);
}

function send(wsUrl, method, params) {
	return new Promise((resolve, reject) => {
		const socket = new WebSocket(wsUrl);
		const timer = setTimeout(() => {
			socket.close();
			reject(new Error('timed out'));
		}, 60000);

		socket.onopen = () => socket.send(JSON.stringify({ id: 1, method, params }));
		socket.onerror = () => {
			clearTimeout(timer);
			reject(new Error('websocket error'));
		};
		socket.onmessage = (event) => {
			const message = JSON.parse(event.data);
			if (message.id !== 1) return;
			clearTimeout(timer);
			socket.close();
			if (message.error) reject(new Error(JSON.stringify(message.error)));
			else if (message.result?.exceptionDetails) {
				reject(new Error(message.result.exceptionDetails.text));
			} else resolve(message.result);
		};
	});
}

const evaluate = (wsUrl, expression) =>
	send(wsUrl, 'Runtime.evaluate', {
		expression,
		returnByValue: true,
		awaitPromise: true,
	}).then((result) => result?.result?.value);

const found = await panes();
console.log(`Polypane panes showing the site: ${found.length}\n`);

const rows = [];
for (const target of found) {
	try {
		await evaluate(target.webSocketDebuggerUrl, OPEN_WINDOWS);
	} catch {
		/* phone panes return early, which is fine */
	}
}

await sleep(1500);

for (const target of found) {
	try {
		rows.push({ target, data: JSON.parse(await evaluate(target.webSocketDebuggerUrl, METRICS)) });
	} catch (error) {
		rows.push({ target, error: String(error.message) });
	}
}

rows.sort((a, b) => (a.data?.viewport?.[0] ?? 0) - (b.data?.viewport?.[0] ?? 0));

console.log('PANE                     VIEWPORT     MODE     ROOT    OVERFLOW-X  WINDOWS  PAST DOCK  PHONE CHROME');
for (const row of rows) {
	if (row.error) {
		console.log(`${String(row.target.title).padEnd(24)} ERROR: ${row.error}`);
		continue;
	}
	const d = row.data;
	const chrome =
		d.phone === 'flex'
			? `bar ${d.barBottom === 0 ? 'flush' : `${d.barBottom}px`}; home ${d.home?.[0]}/${d.home?.[1]}`
			: '';
	console.log(
		[
			String(d.pane ?? '?').padEnd(24),
			`${d.viewport[0]}x${d.viewport[1]}`.padEnd(12),
			(d.phone === 'flex' ? 'phone' : 'desktop').padEnd(8),
			d.root.padEnd(7),
			String(d.overflowX).padEnd(11),
			String(d.openWindows).padEnd(8),
			(d.pastDock.length ? d.pastDock.join(', ') : 'n/a').padEnd(10),
			chrome,
		].join(' ')
	);
}

console.log('\n--- axe-core accessibility audit ---');
const phonePane = rows.find((row) => !row.error && row.data.phone === 'flex');
const desktopPane = rows.find((row) => !row.error && row.data.desktop !== 'none');

for (const [label, row] of [
	['phone (320x567)', phonePane],
	['desktop (1280x800)', desktopPane],
]) {
	if (!row) continue;
	console.log(`\n${label}`);
	let report;
	try {
		report = JSON.parse(await evaluate(row.target.webSocketDebuggerUrl, AXE));
	} catch (error) {
		console.log(`  audit failed: ${error.message}`);
		continue;
	}
	console.log(`  ${report.passes} checks passed`);

	if (report.violations.length === 0) {
		console.log('  violations: none');
	} else {
		for (const violation of report.violations) {
			console.log(
				`  [${violation.impact}] ${violation.id} — ${violation.help} (${violation.nodes} node(s))`
			);
			for (const node of violation.details) {
				console.log(
					`      ${node.ratio} (needs ${node.expected})  ${node.fg} on ${node.bg}\n        ${node.target}\n        ${node.html}`
				);
			}
		}
	}
	console.log(
		report.needsReview.length
			? `  needs manual review: ${report.needsReview.join(', ')}`
			: '  needs manual review: none'
	);
}
