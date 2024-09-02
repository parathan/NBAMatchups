package server

import (
	"context"
	"log"
	"sync"
	"time"

	"teams-service/controller"
	"teams-service/database"
	teamspb "teams-service/proto"
	validations "teams-service/validation"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

var (
	timeout = time.Second
)
type Server struct {
	teamspb.UnimplementedTeamsServiceServer
}

// GetTwoTeams retrieves two teams from the database based on the team names and year.
//
// Parameters:
// - ctx: the context.Context object for the function.
// - req: the *teamspb.TwoTeamsRequest object containing the team names and year.
//
// Returns:
// - *teamspb.TwoTeamsResponse: the response containing the two teams in protobuf format.
// - error: an error if the operation fails.
func (*Server) GetTwoTeams(ctx context.Context, req *teamspb.TwoTeamsRequest) (*teamspb.TwoTeamsResponse, error) {
	log.Println("Called GetTwoTeams")

	if err := validations.ValidateTwoTeamsRequest(req); err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}

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

// GetAllTeams retrieves all teams from the database based on the given years.
//
// Parameters:
// - ctx: the context.Context object for the function.
// - req: the *teamspb.AllTeamsRequest object containing the start and end years.
//
// Returns:
// - *teamspb.AllTeamsResponse: the response containing all teams in protobuf format.
// - error: an error if the operation fails.
func (*Server) GetAllTeams(ctx context.Context, req *teamspb.AllTeamsRequest) (*teamspb.AllTeamsResponse, error) {
	log.Println("Called GetAllTeams")

	if err := validations.ValidateAllTeamsRequest(req); err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}

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

// GetTwoTeamsOrdered retrieves two teams from the database based on the team names and year,
// and orders them based on their percentile differences for opposing statistics.
//
// Parameters:
// - ctx: the context.Context object for the function.
// - req: the *teamspb.TwoTeamsRequest object containing the team names and year.
//
// Returns:
// - *teamspb.TwoTeamsOrderedResponse: the response containing the two teams in protobuf format,
//   ordered based on their percentile differences for opposing statistics.
// - error: an error if the operation fails.
func (*Server) GetTwoTeamsOrdered(ctx context.Context, req *teamspb.TwoTeamsRequest) (*teamspb.TwoTeamsOrderedResponse, error) {
	log.Println("Called GetTwoTeamsOrdered")

	if err := validations.ValidateTwoTeamsRequest(req); err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}

	c, cancel := context.WithTimeout(ctx, timeout)
	defer cancel()

	databaseName := "NBAMatchups_Team"

	teamCollectionName := "NBAMatchups_Team_Traditional"
	teamCollection := database.Mongo_Client.Database(databaseName).Collection(teamCollectionName)

	meanCollectionName := "NBAMatchups_Team_Mean"
	meanCollection := database.Mongo_Client.Database(databaseName).Collection(meanCollectionName)

	percentileCollectionName := "NBAMatchups_Team_Percentile"
	percentileCollection := database.Mongo_Client.Database(databaseName).Collection(percentileCollectionName)

	firstTeamReq := req.GetTeam1()
	secondTeamReq := req.GetTeam2()
	year := req.GetYear()

	var wg sync.WaitGroup
	wg.Add(5)

	var firstPercentileProto *teamspb.Team
	var secondPercentileProto *teamspb.Team
	var firstTeamProto *teamspb.Team
	var secondTeamProto *teamspb.Team
	var meanProto *teamspb.Team

	var firstPercentileError error
	var secondPercentileError error
	var firstError error
	var secondError error
	var meanError error

	go func() {
		defer wg.Done()
		firstPercentileProto, firstPercentileError = controller.FindTeam(c, percentileCollection, firstTeamReq, year)
	}()

	go func() {
		defer wg.Done()
		secondPercentileProto, secondPercentileError = controller.FindTeam(c, percentileCollection, secondTeamReq, year)
	}()

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
		meanProto, meanError = controller.FindTeam(c, meanCollection, "MEAN", year)
	}()

	wg.Wait()

	if firstPercentileError != nil {
		return nil, firstPercentileError
	}

	if secondPercentileError != nil {
		return nil, secondPercentileError
	}

	if firstError != nil {
		return nil, firstError
	}

	if secondError != nil {
		return nil, secondError
	}

	if meanError != nil {
		return nil, meanError
	}

	return controller.OrderTeams(c, firstPercentileProto, secondPercentileProto, firstTeamProto, secondTeamProto, meanProto)
}