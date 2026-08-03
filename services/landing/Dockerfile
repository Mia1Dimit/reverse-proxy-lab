FROM node:24-alpine AS builder
WORKDIR /app

# mirror the local layout so file:../shared resolves correctly inside the image
COPY services/shared/ /shared/
COPY services/landing/package*.json ./
RUN npm ci
COPY services/landing/ .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist/ /usr/share/nginx/html/
COPY services/landing/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80