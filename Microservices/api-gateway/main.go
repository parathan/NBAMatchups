package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	teamspb "teams-service/proto"

	"google.golang.org/grpc"
)

func createGrpcClient(address string) (teamspb.TeamsServiceClient, error) {
	conn, err := grpc.Dial(address, grpc.WithInsecure())
	if err != nil {
		return nil, err
	}
	return teamspb.NewTeamsServiceClient(conn), nil
}

func twoteamshandler(w http.ResponseWriter, r *http.Request) {
	teamsClient, err := createGrpcClient("localhost:50051")
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

func main() {
	http.HandleFunc("/api/v1/teams/twoteams", twoteamshandler)
	log.Fatal(http.ListenAndServe(":8080", nil))
}