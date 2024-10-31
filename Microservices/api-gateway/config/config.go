package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	teamspb "github.com/parathan/NBAMatchups/Microservices/TeamsService/proto"

	predictions "github.com/parathan/NBAMatchups/Microservices/predictions/prediction-service"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

// CreateTeamsGrpcClient creates a new gRPC client connection to the Teams Service.
//
// The address parameter specifies the address of the Teams Service.
// Returns a TeamsServiceClient instance and an error if the connection fails.
func CreateTeamsGrpcClient(address string) (teamspb.TeamsServiceClient, error) {
    conn, err := grpc.Dial(address, grpc.WithTransportCredentials(insecure.NewCredentials()))
    if err != nil {
        return nil, err
    }
    return teamspb.NewTeamsServiceClient(conn), nil
}

// CreatePredictionsGrpcClient creates a new gRPC client connection to the Prediction Service.
//
// The address parameter specifies the address of the Prediction Service.
// Returns a PredictionServiceClient instance and an error if the connection fails.
func CreatePredictionsGrpcClient(address string) (predictions.PredictionServiceClient, error) {
    conn, err := grpc.Dial(address, grpc.WithTransportCredentials(insecure.NewCredentials()))
    if err != nil {
        return nil, err
    }
    return predictions.NewPredictionServiceClient(conn), nil
}

// EnvTeamsService returns the value of the TEAMS_SERVICE environment variable.
//
// It loads the environment variables from the .env file and returns the value of the
// TEAMS_SERVICE environment variable.
//
// If there is an error loading the .env file, it logs a fatal error and terminates
// the program.
//
// Returns:
// - string: The value of the TEAMS_SERVICE environment variable.

func EnvTeamsService() string {
	// Load the environment variables from the .env file.
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// Return the value of the TEAMS_SERVICE environment variable.
	return os.Getenv("TEAMS_SERVICE")
}

// EnvPredictionsService returns the value of the PREDICTIONS_SERVICE environment variable.
//
// It loads the environment variables from the .env file and returns the value of the
// PREDICTIONS_SERVICE environment variable.
//
// If there is an error loading the .env file, it logs a fatal error and terminates
// the program.
//
// Returns:
// - string: The value of the PREDICTIONS_SERVICE environment variable.
func EnvPredictionsService() string {
    // Load the environment variables from the .env file.
    err := godotenv.Load()
    if err != nil {
        log.Fatal("Error loading .env file")
    }

    // Return the value of the PREDICTION_SERVICE environment variable.
    return os.Getenv("PREDICTION_SERVICE")
}

func EnvGatewayPort() string {
    // Load the environment variables from the .env file.
    err := godotenv.Load()
    if err != nil {
        log.Fatal("Error loading .env file")
    }

    // Return the value of the GATEWAY_PORT environment variable.
    return os.Getenv("API_GATEWAY_PORT")
}