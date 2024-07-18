package main

import (
	"context"
	"log"
	"net"
	"teams-service/database"
	teamspb "teams-service/proto"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"google.golang.org/grpc"
)

var (
	timeout = time.Second
)
type server struct {
	teamspb.UnimplementedTeamsServiceServer
}

func (*server) GetTwoTeams(ctx context.Context, req *teamspb.TwoTeamsRequest) (*teamspb.TwoTeamsResponse, error) {
	log.Println("Called GetTwoTeams")

	c, cancel := context.WithTimeout(ctx, timeout)
	defer cancel()

	databaseName := "NBAMatchups_Team"
	collectionName := "NBAMatchups_Team_Traditional"
	collection := database.Mongo_Client.Database(databaseName).Collection(collectionName)

	firstTeamReq := req.GetTeam1()
	secondTeamReq := req.GetTeam2()

	var firstTeam database.TeamData
	var secondTeam database.TeamData

	err := collection.FindOne(c, bson.M{"Name": firstTeamReq}).Decode(&firstTeam)
	if err != nil {
		return nil, err
	}

	err = collection.FindOne(c, bson.M{"Name": secondTeamReq}).Decode(&secondTeam)
	if err != nil {
		return nil, err
	}

	return &teamspb.TwoTeamsResponse{Team1: nil, Team2: nil}, nil
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