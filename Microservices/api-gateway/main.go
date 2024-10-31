package main

import (
	"api-gateway/config"
	"api-gateway/controller"
	"log"
	"net/http"
)

// CORS middleware to add headers for cross-origin requests.
func corsMiddleware(next http.Handler) http.Handler {
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

// main is the entry point of the Go program.
//
// It sets up the API endpoints for the teams service and starts the server.
// No parameters.
// No return values.
func main() {

    config.InitRedis()

    // Create a new ServeMux
    mux := http.NewServeMux()

    // Register routes
    mux.HandleFunc("/api/v1/teams/twoteams", controller.TwoteamsController)
    mux.HandleFunc("/api/v1/teams/twoteamsordered", controller.TwoTeamsOrderedController)
    mux.HandleFunc("/api/v1/teams/allteams", controller.AllTeamsController)

    mux.HandleFunc("/api/v1/teams/twoteamscached", controller.TwoteamsCachedController)
    mux.HandleFunc("/api/v1/teams/twoteamsorderedcached", controller.TwoTeamsOrderedCachedController)
    mux.HandleFunc("/api/v1/teams/allteamscached", controller.AllTeamsCachedController)

    mux.HandleFunc("/api/v1/prediction", controller.PredictController)
    mux.HandleFunc("/api/v1/prediction/cached", controller.PredictCachedController)

    // Wrap the router with the CORS middleware
    corsHandler := corsMiddleware(mux)

    port := config.EnvGatewayPort()

    log.Println("Server starting on port ", port)
    log.Fatal(http.ListenAndServe(port, corsHandler))
}
