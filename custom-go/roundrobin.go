package main

import (
	"net/http"
	"sync/atomic"
	"time"
)

type backend struct {
	url     string
	healthy atomic.Bool
}


type RoundRobin struct {
    backends []*backend
    counter  atomic.Uint64
}

func (rr *RoundRobin) Next() string {
    // iterate from counter until a healthy backend is found
    n := len(rr.backends)
    for i := 0; i < n; i++ {
        idx := rr.counter.Add(1) % uint64(n)
        if rr.backends[idx].healthy.Load() {
            return rr.backends[idx].url
        }
    }
    return "" // all backends down
}

func (rr *RoundRobin) StartHealthChecks(interval time.Duration) {
    for _, b := range rr.backends {
        go func(b *backend) {
            for {
                resp, err := http.Get(b.url + "/health")
                b.healthy.Store(err == nil && resp.StatusCode == 200)
                if resp != nil {
                    resp.Body.Close()
                }
                time.Sleep(interval)
            }
        }(b)
    }
}