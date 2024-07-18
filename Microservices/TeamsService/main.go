package main

import (
	"context"
	"log"
	"net"
	"teams-service/database"
	teamspb "teams-service/proto"
	"teams-service/util"
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
	year := req.GetYear()

	var firstTeam database.TeamData
	var secondTeam database.TeamData

	err := collection.FindOne(c, bson.M{"Name": firstTeamReq, "year": year}).Decode(&firstTeam)
	if err != nil {
		return nil, err
	}

	err = collection.FindOne(c, bson.M{"Name": secondTeamReq, "year": year}).Decode(&secondTeam)
	if err != nil {
		return nil, err
	}

	firstTeamProto, err := util.TeamMapping(firstTeam)
	if err != nil {
		return nil, err
	}

	secondTeamProto, err := util.TeamMapping(secondTeam)
	if err != nil {
		return nil, err
	}

	return &teamspb.TwoTeamsResponse{Team1: firstTeamProto, Team2: secondTeamProto}, nil
}

func main() {
	log.Println("Teams Service")

	lis, err := net.Listen("tcp", ":50051")
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