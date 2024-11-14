package controller

import (
	"api-gateway/config"
	"api-gateway/constants"
	"api-gateway/requests"
	"context"
	"encoding/json"
	"log"
	"net/http"

	teamspb "github.com/parathan/NBAMatchups/Microservices/TeamsService/proto"
)

// TwoteamsController handles HTTP requests for getting TwoTeams data.
//
// It takes an http.ResponseWriter and an http.Request as parameters.
// It returns no values, but writes the response to the http.ResponseWriter.
func TwoteamsController(w http.ResponseWriter, r *http.Request) {
	log.Print("twoteamsController called")

	// Create a gRPC client for the teams service
	teamsClient, err := config.CreateTeamsGrpcClient(config.EnvTeamsService())
	if err != nil {
		http.Error(w, constants.FAILED_TO_CONNECT_TO_GRPC, http.StatusInternalServerError)
		return
	}

	// Decode the request body into a TwoTeamsRequest
	var reqBody requests.TwoTeamsRequest
	if err := json.NewDecoder(r.Body).Decode(&reqBody); err != nil {
		http.Error(w, constants.INVALID_JSON_BODY, http.StatusBadRequest)
		return
	}

	// Create a request for the teams service
	req := &teamspb.TwoTeamsRequest{
		Team1: reqBody.Team1,
		Team2: reqBody.Team2,
		Year:  reqBody.Year,
	}

	// Get the response from the teams service
	res, err := teamsClient.GetTwoTeams(context.Background(), req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Set the Content-Type header to JSON and encode response to JSON and write it to http.ResponseWriter
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(res)
}

// TwoTeamsOrderedController handles HTTP requests for getting TwoTeamsOrdered data.
//
// It takes an http.ResponseWriter and an http.Request as parameters.
// It returns no values, but writes the response to the http.ResponseWriter.
func TwoTeamsOrderedController(w http.ResponseWriter, r *http.Request) {
	log.Print("TwoTeamsOrderedController called")

	// Create a gRPC client for the teams service
	teamsClient, err := config.CreateTeamsGrpcClient(config.EnvTeamsService())
	if err != nil {
		http.Error(w, constants.FAILED_TO_CONNECT_TO_GRPC, http.StatusInternalServerError)
		return
	}

	// Decode the request body into a TwoTeamsRequest
	var reqBody requests.TwoTeamsRequest
	if err := json.NewDecoder(r.Body).Decode(&reqBody); err != nil {
		http.Error(w, constants.INVALID_JSON_BODY, http.StatusBadRequest)
		return
	}

	// Create a request for the teams service
	req := &teamspb.TwoTeamsRequest{
		Team1: reqBody.Team1,
		Team2: reqBody.Team2,
		Year:  reqBody.Year,
	}

	// Get the response from the teams service
	res, err := teamsClient.GetTwoTeamsOrdered(context.Background(), req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Set the Content-Type header to JSON and encode response to JSON and write it to http.ResponseWriter
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(res)
}

// AllTeamsController handles HTTP requests for getting allTeams data.
//
// It takes an http.ResponseWriter and an http.Request as parameters.
// It returns no values, but writes the response to the http.ResponseWriter.
func AllTeamsController(w http.ResponseWriter, r *http.Request) {
	log.Print("AllTeamsController called")

	// Create a gRPC client for the teams service
	teamsClient, err := config.CreateTeamsGrpcClient(config.EnvTeamsService())
	if err != nil {
		http.Error(w, constants.FAILED_TO_CONNECT_TO_GRPC, http.StatusInternalServerError)
		return
	}

	// Decode the request body into a AllTeamsRequest
	var reqBody requests.AllTeamsRequest
	if err := json.NewDecoder(r.Body).Decode(&reqBody); err != nil {
		http.Error(w, constants.INVALID_JSON_BODY, http.StatusBadRequest)
		return
	}

	// Create a request for the teams service
	req := &teamspb.AllTeamsRequest{
		StartYear: reqBody.StartYear,
		EndYear:   reqBody.EndYear,
	}

	// Get the response from the teams service
	res, err := teamsClient.GetAllTeams(context.Background(), req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	
	// Set the Content-Type header to JSON and encode response to JSON and write it to http.ResponseWriter
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(res)
}