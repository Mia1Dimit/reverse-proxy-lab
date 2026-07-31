# reverse-proxy-lab

Three reverse proxy approaches live side-by-side in this repo:

- `traefik/`: Docker-based reverse proxy stack (good candidate to deploy on EC2)
- `aws/`: AWS-native reverse proxy solution (ALB/ACM/Route53 and related infra)
- `custom-go/`: Simple reverse proxy written in Go

## Traefik design (phase 1: proxy only)

Current Traefik routing strategy is path-based (single domain, multiple sections):

- `/` -> landing service
- `/about-me` -> about-me service
- `/certifications` -> certifications service
- `/portfolio` and `/portfolio/<slug>` -> portfolio-detail service (handled in-app)

Notes:

- HTTP is redirected to HTTPS.
- Security headers and rate limiting are applied on secure routers.
- Traefik dashboard is exposed only on HTTPS and protected via `traefik/secrets/dashboard_users`.
- Before running `docker compose up` in `traefik/`, copy `traefik/secrets/dashboard_users.example` to `traefik/secrets/dashboard_users` and set a real htpasswd hash.
- `/healthz` is wired to Traefik internal ping for probe/uptime checks.
- Unknown paths are routed to a fallback service that returns HTTP 404.
- Access logs are emitted as JSON to `traefik/logs/access.log`.
- The implementation currently uses placeholder containers (`traefik/whoami`) so you can validate routing before building frontend services.
- Later, each placeholder can be replaced with real containers without changing the public URL structure.