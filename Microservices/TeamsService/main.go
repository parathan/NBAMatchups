package main

import (
	"context"
	"log"
	"net"
	"teams-service/database"
	teamspb "teams-service/proto"

	"google.golang.org/grpc"
)

type server struct {
	teamspb.UnimplementedTeamsServiceServer
}

func (*server) GetTwoTeams(ctx context.Context, req *teamspb.TwoTeamsRequest) (*teamspb.TwoTeamsResponse, error) {
	return &teamspb.TwoTeamsResponse{}, nil
}

func main() {
	log.Println("Teams Service")

	lis, err := net.Listen("tcp", "0.0.0.0:50051")
	if err != nil {
		log.Println("ERROR:", err.Error())
	}

	database.Mongo_Client = database.ConnectDB()

	defer database.Mongo_Client.Disconnect(context.Background())

	s := grpc.NewServer()
	teamspb.RegisterTeamsServiceServer(s, &server{})

	log.Printf("Server started at %v", lis.Addr().String())

	err = s.Serve(lis)
	if err != nil {
		log.Println("ERROR:", err.Error())
	}
}