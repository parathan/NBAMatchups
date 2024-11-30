package main

import (
	"api-gateway/config"
	"api-gateway/controller"
	"api-gateway/middleware"
	"log"
	"net/http"
)

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
    mux.HandleFunc("/api/v1/teams/twoteamscached", controller.TwoteamsCachedController)
    mux.HandleFunc("/api/v1/teams/twoteamsorderedcached", controller.TwoTeamsOrderedCachedController)
    mux.HandleFunc("/api/v1/teams/allteamscached", controller.AllTeamsCachedController)

    mux.HandleFunc("/api/v1/prediction/cached", controller.PredictCachedController)

    // Wrap the router with the CORS middleware
    corsHandler := middleware.CorsMiddleware(mux)

    port := config.EnvGatewayPort()

    log.Println("Server starting on port ", port)
    log.Fatal(http.ListenAndServe(port, corsHandler))
}
