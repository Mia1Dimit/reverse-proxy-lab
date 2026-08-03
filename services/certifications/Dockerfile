FROM node:24-alpine AS builder
WORKDIR /app
COPY services/shared/ /shared/
COPY services/certifications/package*.json ./
RUN npm ci
COPY services/certifications/ .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist/ /usr/share/nginx/html/
COPY services/certifications/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
