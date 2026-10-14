interface ImportMetaEnv {
	readonly VITE_CONTACT_ENDPOINT?: string;
	readonly VITE_CONTACT_ACCESS_KEY?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
