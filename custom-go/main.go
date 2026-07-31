package main

import (
	"log"
	"net"
	"net/http"
	"net/http/httputil"
	"net/url"
	"time"
)

func main() {
	transport := &http.Transport{
		ResponseHeaderTimeout: 5 * time.Second,
		DialContext: (&net.Dialer{
			Timeout: 2 * time.Second,
		}).DialContext,
	}

	rr := &RoundRobin{
		backends: []*backend{
			{url: "http://localhost:8081"},
			{url: "http://localhost:8082"},
		},
	}

	for _, b := range rr.backends {
		b.healthy.Store(true)
	}
	rr.StartHealthChecks(5 * time.Second)

	proxies := make(map[string]*httputil.ReverseProxy, len(rr.backends))
	for _, b := range rr.backends {
		u, _ := url.Parse(b.url)
		p := httputil.NewSingleHostReverseProxy(u)
		p.Transport = transport
		proxies[b.url] = p
	}

	core := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		for attempt := 0; attempt < 2; attempt++ {
			backend := rr.Next()
			if backend == "" {
				http.Error(w, "no healthy backends", http.StatusServiceUnavailable)
				return
			}
			rec := &responseRecorder{ResponseWriter: w, code: 0}
			proxies[backend].ServeHTTP(rec, r)
			if rec.code < 500 {
				rec.flush(w)
				return
			}
		}
		http.Error(w, "all retries failed", http.StatusBadGateway)
	})

	// middleware chain: rate limit → auth → headers → proxy
	handler := rateLimitMiddleware(authMiddleware("admin", "secret", headersMiddleware(core)))

	cert := "../traefik/certs/local.crt"
	key := "../traefik/certs/local.key"

	log.Println("proxy listening on :9000 (TLS)")
	log.Fatal(http.ListenAndServeTLS(":9000", cert, key, handler))
}
