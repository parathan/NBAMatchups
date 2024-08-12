package main

import (
	"api-gateway/controller"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/api/v1/teams/twoteams", controller.TwoteamsController)
	http.HandleFunc("/api/v1/teams/twoteamsordered", controller.TwoTeamsOrderedController)
	http.HandleFunc("/api/v1/teams/allteams", controller.AllTeamsController)
	log.Fatal(http.ListenAndServe(":8080", nil))
}