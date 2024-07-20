package main

import (
	"context"
	"log"
	"net"
	"sync"
	"teams-service/controller"
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
	year := req.GetYear()

	var wg sync.WaitGroup
	wg.Add(2)

	var firstTeamProto *teamspb.Team
	var secondTeamProto *teamspb.Team

	var firstError error
	var secondError error

	go func() {
		defer wg.Done()
		firstTeamProto, firstError = controller.FindTeam(c, collection, firstTeamReq, year)
	}()

	go func () {
		defer wg.Done()
		secondTeamProto, secondError = controller.FindTeam(c, collection, secondTeamReq, year)
	}()

	wg.Wait()

	if firstError != nil {
		return nil, firstError
	}

	if secondError != nil {
		return nil, secondError
	}

	return &teamspb.TwoTeamsResponse{Team1: firstTeamProto, Team2: secondTeamProto}, nil
}

func (*server) GetAllTeams(ctx context.Context, req *teamspb.AllTeamsRequest) (*teamspb.AllTeamsResponse, error) {
	log.Println("Called GetAllTeams")

	c, cancel := context.WithTimeout(ctx, timeout)
	defer cancel()

	databaseName := "NBAMatchups_Team"
	collectionName := "NBAMatchups_Team_Traditional"
	collection := database.Mongo_Client.Database(databaseName).Collection(collectionName)

	var allTeamData []database.TeamData

	cursor, err := collection.Find(c, bson.M{})
	if err != nil {
		return nil, err
	}

	defer cursor.Close(c)

	for cursor.Next(context.Background()) {
		var teamData database.TeamData
		cursor.Decode(&teamData)
		allTeamData = append(allTeamData, teamData)
	}

	// Need to parse through data and place them in the appropriate team, year format
	// for all teams response object.

	return &teamspb.AllTeamsResponse{}, nil
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