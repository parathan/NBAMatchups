package config

import (
	teamspb "github.com/parathan/NBAMatchups/Microservices/TeamsService/proto"

	predictions "prediction-service/prediction-service"

	"google.golang.org/grpc"
)

// CreateTeamsGrpcClient creates a new gRPC client connection to the Teams Service.
//
// The address parameter specifies the address of the Teams Service.
// Returns a TeamsServiceClient instance and an error if the connection fails.
func CreateTeamsGrpcClient(address string) (teamspb.TeamsServiceClient, error) {
	conn, err := grpc.Dial(address, grpc.WithInsecure())
	if err != nil {
		return nil, err
	}
	return teamspb.NewTeamsServiceClient(conn), nil
}

func CreatePredictionsGrpcClient(address string) (predictions.PredictionServiceClient, error) {
	conn, err := grpc.Dial(address, grpc.WithInsecure())
	if err != nil {
		return nil, err
	}
	return predictions.NewPredictionServiceClient(conn), nil
}