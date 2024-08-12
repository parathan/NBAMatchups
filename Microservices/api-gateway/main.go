package main

import (
	"api-gateway/controller"
	"log"
	"net/http"
)

// main is the entry point of the Go program.
//
// It sets up the API endpoints for the teams service and starts the server.
// No parameters.
// No return values.
func main() {
	http.HandleFunc("/api/v1/teams/twoteams", controller.TwoteamsController)
	http.HandleFunc("/api/v1/teams/twoteamsordered", controller.TwoTeamsOrderedController)
	http.HandleFunc("/api/v1/teams/allteams", controller.AllTeamsController)
	log.Println("Server starting on port 8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}