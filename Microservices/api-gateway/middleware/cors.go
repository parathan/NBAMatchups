package middleware

import "net/http"

// CorsMiddleware is a middleware function that adds CORS headers to HTTP responses.
// It allows requests from "http://localhost:3000" and supports the methods GET, POST, PUT, DELETE, and OPTIONS.
// The middleware handles preflight OPTIONS requests by immediately responding with an OK status.
// It then calls the next handler in the chain for all other requests.
func CorsMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        // Add CORS headers
        w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
        w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

        // If it's a preflight request, return OK status immediately
        if r.Method == http.MethodOptions {
            w.WriteHeader(http.StatusOK)
            return
        }

        // Call the next handler in the chain
        next.ServeHTTP(w, r)
    })
}