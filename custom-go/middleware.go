package main

import (
	"bytes"
	"crypto/subtle"
	"net/http"
	"strings"
	"sync"
	"time"
)

// responseRecorder buffers a response so the handler can retry on 5xx.
type responseRecorder struct {
	http.ResponseWriter
	code int
	buf  bytes.Buffer
}

func (r *responseRecorder) WriteHeader(code int) { r.code = code }
func (r *responseRecorder) Write(b []byte) (int, error) { return r.buf.Write(b) }
func (r *responseRecorder) flush(w http.ResponseWriter) {
	if r.code != 0 {
		w.WriteHeader(r.code)
	}
	r.buf.WriteTo(w)
}

// authMiddleware enforces HTTP Basic Auth.
func authMiddleware(user, pass string, next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		u, p, ok := r.BasicAuth()
		if !ok ||
			subtle.ConstantTimeCompare([]byte(u), []byte(user)) != 1 ||
			subtle.ConstantTimeCompare([]byte(p), []byte(pass)) != 1 {
			w.Header().Set("WWW-Authenticate", `Basic realm="proxy"`)
			http.Error(w, "unauthorized", http.StatusUnauthorized)
			return
		}
		next.ServeHTTP(w, r)
	})
}

// headersMiddleware adds security headers to every response.
func headersMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("X-Frame-Options", "DENY")
		w.Header().Set("X-Content-Type-Options", "nosniff")
		w.Header().Set("Referrer-Policy", "no-referrer")
		next.ServeHTTP(w, r)
	})
}

// rateLimitMiddleware limits each IP to 5 requests/sec with a burst of 10.
func rateLimitMiddleware(next http.Handler) http.Handler {
	rl := &rateLimiter{clients: make(map[string]*tokenBucket)}
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ip := strings.Split(r.RemoteAddr, ":")[0]
		if !rl.allow(ip) {
			http.Error(w, "too many requests", http.StatusTooManyRequests)
			return
		}
		next.ServeHTTP(w, r)
	})
}

type rateLimiter struct {
	mu      sync.Mutex
	clients map[string]*tokenBucket
}

type tokenBucket struct {
	tokens   float64
	lastFill time.Time
}

func (rl *rateLimiter) allow(ip string) bool {
	const rate = 5.0
	const burst = 10.0

	rl.mu.Lock()
	defer rl.mu.Unlock()

	b, ok := rl.clients[ip]
	if !ok {
		rl.clients[ip] = &tokenBucket{tokens: burst - 1, lastFill: time.Now()}
		return true
	}

	now := time.Now()
	b.tokens = min(burst, b.tokens+now.Sub(b.lastFill).Seconds()*rate)
	b.lastFill = now

	if b.tokens < 1 {
		return false
	}
	b.tokens--
	return true
}

