package controller

import (
	"api-gateway/config"
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

	req := &teamspb.TwoTeamsRequest{
		Team1: "Toronto Raptors",
		Team2: "Sacramento Kings",
		Year:  2022,
	}

	res, err := teamsClient.GetTwoTeams(context.Background(), req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(res)
}