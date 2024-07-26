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

	meanCollectionName := "NBAMatchups_Team_Mean"
	meanCollection := database.Mongo_Client.Database(databaseName).Collection(meanCollectionName)

	startYearReq := float64(req.GetStartYear())
	endYearReq := float64(req.GetEndYear())

	allTeamData, err := controller.FindAllTeams(c, collection, meanCollection, startYearReq, endYearReq)
	if err != nil {
		return nil, err
	}

	return &teamspb.AllTeamsResponse{Data: allTeamData}, nil
}

func (*server) GetTwoTeamsOrdered(ctx context.Context, req *teamspb.TwoTeamsRequest) (*teamspb.TwoTeamsOrderedResponse, error) {
	log.Println("Called GetTwoTeamsOrdered")

	c, cancel := context.WithTimeout(ctx, timeout)
	defer cancel()

	databaseName := "NBAMatchups_Team"

	teamCollectionName := "NBAMatchups_Team_Traditional"
	teamCollection := database.Mongo_Client.Database(databaseName).Collection(teamCollectionName)

	meanCollectionName := "NBAMatchups_Team_Mean"
	meanCollection := database.Mongo_Client.Database(databaseName).Collection(meanCollectionName)

	firstTeamReq := req.GetTeam1()
	secondTeamReq := req.GetTeam2()
	year := req.GetYear()

	var wg sync.WaitGroup
	wg.Add(3)

	var firstTeamProto *teamspb.Team
	var secondTeamProto *teamspb.Team
	var meanProto *teamspb.Team

	var firstError error
	var secondError error
	var meanError error

	go func() {
		defer wg.Done()
		firstTeamProto, firstError = controller.FindTeam(c, teamCollection, firstTeamReq, year)
	}()

	go func () {
		defer wg.Done()
		secondTeamProto, secondError = controller.FindTeam(c, teamCollection, secondTeamReq, year)
	}()

	go func () {
		defer wg.Done()
		meanProto, secondError = controller.FindTeam(c, meanCollection, "MEAN", year)
	}()

	wg.Wait()

	if firstError != nil {
		return nil, firstError
	}

	if secondError != nil {
		return nil, secondError
	}

	if meanError != nil {
		return nil, meanError
	}

	return controller.OrderTeams(c, firstTeamProto, secondTeamProto, meanProto)
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