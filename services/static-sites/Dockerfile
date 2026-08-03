# ── Landing ────────────────────────────────────────────────────────────────────
FROM node:24-alpine AS landing-builder
WORKDIR /app
COPY services/shared/ /shared/
COPY services/landing/package*.json ./
RUN npm ci
COPY services/landing/ .
RUN npm run build

# ── About Me ───────────────────────────────────────────────────────────────────
FROM node:24-alpine AS about-me-builder
WORKDIR /app
COPY services/shared/ /shared/
COPY services/about-me/package*.json ./
RUN npm ci
COPY services/about-me/ .
RUN npm run build

# ── Certifications ─────────────────────────────────────────────────────────────
FROM node:24-alpine AS certs-builder
WORKDIR /app
COPY services/shared/ /shared/
COPY services/certifications/package*.json ./
RUN npm ci
COPY services/certifications/ .
RUN npm run build

# ── Serve all three from one nginx ─────────────────────────────────────────────
FROM nginx:alpine
COPY --from=landing-builder  /app/dist/ /srv/landing/dist/
COPY --from=about-me-builder /app/dist/ /srv/about-me/dist/
COPY --from=certs-builder    /app/dist/ /srv/certifications/dist/
COPY services/static-sites/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
