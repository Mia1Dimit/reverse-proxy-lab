# Local Certificate Setup with mkcert

## Overview
This project uses **mkcert** to create trusted local certificates for HTTPS development. This eliminates browser warnings about self-signed certificates and provides a seamless development experience.

## What is mkcert?

**mkcert** is a tool that creates valid TLS certificates for localhost and internal domains without browser warnings. It works by:

1. **Creating a local Certificate Authority (CA)** on your machine
2. **Installing the CA** into your system's trust store (so browsers recognize it)
3. **Generating certificates** signed by that CA for any domains you specify

### Why mkcert instead of self-signed certs?

| Aspect | Self-Signed | mkcert |
|--------|-------------|--------|
| Browser warnings | ❌ Yes (every time) | ✅ No |
| Trust store | ❌ Manual bypass needed | ✅ System-wide trust |
| Multi-domain | ⚠️ Complex SANs | ✅ Simple & flexible |
| Expiration | ❌ Manual renewal needed | ✅ ~2 years validity |

## Setup Instructions

### 1. Install mkcert

**Windows (via WSL):**
```bash
sudo apt-get update
sudo apt-get install -y mkcert libnss3-tools
```

**macOS:**
```bash
brew install mkcert nss
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install mkcert libnss3-tools
```

### 2. Initialize the Local CA

```bash
mkcert -install
```

**What this does:**
- Creates a local Certificate Authority in `~/.local/share/mkcert/`
- Installs the CA root certificate into your system's trust store
- All certificates signed by this CA will be trusted by your browser

**Output:**
```
Created a new local CA 💥
The local CA is now installed in the system trust store! ⚡️
```

### 3. Generate Certificates for Your Project

```bash
cd traefik/certs

# Remove old certificates
rm -f local.crt local.key

# Generate certificates for localhost, analytics.localhost, and dashboard.localhost
mkcert -cert-file=local.crt -key-file=local.key localhost 127.0.0.1 ::1 analytics.localhost dashboard.localhost
```

**Explanation:**
- `localhost` — Main domain for frontend routes
- `127.0.0.1` — IPv4 loopback address
- `::1` — IPv6 loopback address
- `analytics.localhost` — Umami analytics subdomain (hostname-based routing)
- `dashboard.localhost` — Traefik dashboard subdomain (hostname-based routing)
- `-cert-file=local.crt` — Output certificate file
- `-key-file=local.key` — Output private key file

**Output:**
```
Created a new certificate valid for the following names 📜
 - "localhost"
 - "127.0.0.1"
 - "::1"
 - "analytics.localhost"
 - "dashboard.localhost"

The certificate is at "local.crt" and the key at "local.key" ✅
It will expire on 14 December 2028 🗓
```

### 4. Update Traefik Configuration

The certificates are used in Traefik via `traefik/config/dynamic/tls.yml`:

```yaml
tls:
  certificates:
    - certFile: /certs/local.crt
      keyFile: /certs/local.key
```

This is already configured in this project. Just ensure the paths match your certificate location.

### 5. Restart Services

```bash
docker compose down
docker compose up
```

## Accessing Your Services

After setup, you can access services without browser warnings:

- **Analytics**: `https://analytics.localhost/` ✅ No warning (hostname-based)
- **Dashboard**: `https://dashboard.localhost/` ✅ No warning (hostname-based, auth required)
- **Frontend**: `https://localhost/` ✅ No warning (path-based)

### Hostname-Based Routing

Both Umami analytics and Traefik dashboard use **hostname-based routing** for clean URLs:

| Service | Method | URL |
|---------|--------|-----|
| Analytics | Hostname | `https://analytics.localhost/` |
| Dashboard | Hostname | `https://dashboard.localhost/` |
| Frontend | Path-based | `https://localhost/` |
| Portfolio | Path-based | `https://localhost/portfolio` |
| About | Path-based | `https://localhost/about-me` |
| Certifications | Path-based | `https://localhost/certifications` |

**Why hostname-based for analytics & dashboard?**
- Cleaner, more intuitive URLs
- No path-stripping middleware needed
- Path prefixes reserved for app routes only
- Mirrors production DNS structure

## Certificate Details

View certificate information:

```bash
# Check certificate details
openssl x509 -in traefik/certs/local.crt -text -noout

# Check expiration date
openssl x509 -in traefik/certs/local.crt -noout -dates

# Verify certificate matches key
openssl x509 -in traefik/certs/local.crt -noout -modulus | openssl md5
openssl rsa -in traefik/certs/local.key -noout -modulus | openssl md5
```

## Maintenance

### Certificate Renewal

mkcert certificates are valid for ~2 years. When they expire, simply regenerate:

```bash
cd traefik/certs
rm -f local.crt local.key
mkcert -cert-file=local.crt -key-file=local.key localhost 127.0.0.1 ::1
docker compose restart traefik
```

### Adding New Domains

If you add new domains (e.g., `*.local.dev`), regenerate:

```bash
mkcert -cert-file=local.crt -key-file=local.key localhost 127.0.0.1 ::1 "*.local.dev"
```

### Remove Local CA

To remove the local CA from your system:

```bash
mkcert -uninstall
```

This removes trust from your system but doesn't delete the CA files.

## Troubleshooting

### Certificate not trusted in browser

**Solution:** Restart the browser or clear HTTPS/SSL cache:
- **Chrome/Edge**: Settings → Privacy → Clear browsing data → Cookies and cached images
- **Firefox**: about:preferences → Privacy & Security → Clear Data

### Traefik not loading certificates

**Solution:** Restart Traefik:
```bash
docker compose restart traefik
```

### New domains don't work

**Solution:** Regenerate certificates with all domains:
```bash
cd traefik/certs
mkcert -cert-file=local.crt -key-file=local.key localhost 127.0.0.1 ::1 your-new-domain.local
docker compose restart traefik
```

## Best Practices

1. ✅ **Use mkcert for local development** — Eliminates SSL warnings
2. ✅ **Version control `.gitignore`** the CA files — Add `~/.local/share/mkcert/` to `.gitignore`
3. ✅ **Keep certificates in `traefik/certs/`** — Organized and accessible to Docker
4. ✅ **Regenerate certs when adding domains** — mkcert needs to know all domains upfront
5. ✅ **Use consistent naming** — `local.crt` and `local.key` are standard
6. ❌ **Don't ship mkcert certs in production** — Use Let's Encrypt or a CA
7. ❌ **Don't commit CA files to version control** — They're machine-specific

## References

- **mkcert GitHub**: https://github.com/FiloSottile/mkcert
- **Let's Encrypt** (for production): https://letsencrypt.org/
- **Traefik TLS docs**: https://doc.traefik.io/traefik/https/tls/

## Summary

You now have:
- ✅ Trusted local certificates for `localhost` and `127.0.0.1`
- ✅ System-wide trust (no browser warnings)
- ✅ Automatic certificate renewal handling
- ✅ Best-practice local HTTPS development setup
