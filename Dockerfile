# Multi-stage build for the Vite + Preact app
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

# Install all dependencies — the build needs Vite, Tailwind and TypeScript
RUN npm ci --include=dev

COPY . .

RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
