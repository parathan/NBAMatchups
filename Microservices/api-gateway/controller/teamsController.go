package controller

import (
	"api-gateway/config"
	"api-gateway/constants"
	"api-gateway/requests"
	"context"
	"encoding/json"
	"log"
	"net/http"
	teamspb "teams-service/proto"
)

// TwoteamsController handles HTTP requests for getting TwoTeams data.
//
// It takes an http.ResponseWriter and an http.Request as parameters.
// It returns no values, but writes the response to the http.ResponseWriter.
func TwoteamsController(w http.ResponseWriter, r *http.Request) {
	log.Print("twoteamsController called")
	teamsClient, err := config.CreateTeamsGrpcClient("localhost:50051")
	if err != nil {
		http.Error(w, constants.FAILED_TO_CONNECT_TO_GRPC, http.StatusInternalServerError)
		return
	}

	var reqBody requests.TwoTeamsRequest
	if err := json.NewDecoder(r.Body).Decode(&reqBody); err != nil {
		http.Error(w, constants.INVALID_JSON_BODY, http.StatusBadRequest)
		return
	}

	req := &teamspb.TwoTeamsRequest{
		Team1: reqBody.Team1,
		Team2: reqBody.Team2,
		Year:  reqBody.Year,
	}

	res, err := teamsClient.GetTwoTeams(context.Background(), req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(res)
}

// TwoTeamsOrderedController handles HTTP requests for getting TwoTeamsOrdered data.
//
// It takes an http.ResponseWriter and an http.Request as parameters.
// It returns no values, but writes the response to the http.ResponseWriter.
func TwoTeamsOrderedController(w http.ResponseWriter, r *http.Request) {
	log.Print("TwoTeamsOrderedController called")
	teamsClient, err := config.CreateTeamsGrpcClient("localhost:50051")
	if err != nil {
		http.Error(w, constants.FAILED_TO_CONNECT_TO_GRPC, http.StatusInternalServerError)
		return
	}

	var reqBody requests.TwoTeamsRequest
	if err := json.NewDecoder(r.Body).Decode(&reqBody); err != nil {
		http.Error(w, constants.INVALID_JSON_BODY, http.StatusBadRequest)
		return
	}

	req := &teamspb.TwoTeamsRequest{
		Team1: reqBody.Team1,
		Team2: reqBody.Team2,
		Year:  reqBody.Year,
	}

	res, err := teamsClient.GetTwoTeamsOrdered(context.Background(), req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(res)
}

// AllTeamsController handles HTTP requests for getting allTeams data.
//
// It takes an http.ResponseWriter and an http.Request as parameters.
// It returns no values, but writes the response to the http.ResponseWriter.
func AllTeamsController(w http.ResponseWriter, r *http.Request) {
	log.Print("AllTeamsController called")
	teamsClient, err := config.CreateTeamsGrpcClient("localhost:50051")
	if err != nil {
		http.Error(w, constants.FAILED_TO_CONNECT_TO_GRPC, http.StatusInternalServerError)
		return
	}

	var reqBody requests.AllTeamsRequest
	if err := json.NewDecoder(r.Body).Decode(&reqBody); err != nil {
		http.Error(w, constants.INVALID_JSON_BODY, http.StatusBadRequest)
		return
	}

	req := &teamspb.AllTeamsRequest{
		StartYear: reqBody.StartYear,
		EndYear:   reqBody.EndYear,
	}

	res, err := teamsClient.GetAllTeams(context.Background(), req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(res)
}