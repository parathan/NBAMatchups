package controller

import (
	"api-gateway/config"
	"api-gateway/requests"
	"context"
	"encoding/json"
	"net/http"
	teamspb "teams-service/proto"
)

func TwoteamsController(w http.ResponseWriter, r *http.Request) {
	teamsClient, err := config.CreateGrpcClient("localhost:50051")
	if err != nil {
		http.Error(w, "failed to connect to grpc service", http.StatusInternalServerError)
		return
	}

	var reqBody requests.TwoTeamsRequest
	if err := json.NewDecoder(r.Body).Decode(&reqBody); err != nil {
		http.Error(w, "Invalid JSON body", http.StatusBadRequest)
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

func TwoTeamsOrderedController(w http.ResponseWriter, r *http.Request) {
	teamsClient, err := config.CreateGrpcClient("localhost:50051")
	if err != nil {
		http.Error(w, "failed to connect to grpc service", http.StatusInternalServerError)
		return
	}

	var reqBody requests.TwoTeamsRequest
	if err := json.NewDecoder(r.Body).Decode(&reqBody); err != nil {
		http.Error(w, "Invalid JSON body", http.StatusBadRequest)
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

func AllTeamsController(w http.ResponseWriter, r *http.Request) {
	teamsClient, err := config.CreateGrpcClient("localhost:50051")
	if err != nil {
		http.Error(w, "failed to connect to grpc service", http.StatusInternalServerError)
		return
	}

	var reqBody requests.AllTeamsRequest
	if err := json.NewDecoder(r.Body).Decode(&reqBody); err != nil {
		http.Error(w, "Invalid JSON body", http.StatusBadRequest)
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