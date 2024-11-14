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


// EnvTeamsService loads the environment variable for the Teams Service from the .env file.
// If the environment variable is not set, it returns the default value of "localhost:50051".
// Returns the value of the environment variable as a string.
func EnvTeamsService() string {
    return loadEnvVariable("TEAMS_SERVICE", "localhost:50051")
}

// EnvPredictionsService loads the environment variable for the Prediction Service from the .env file.
// If the environment variable is not set, it returns the default value of "localhost:50052".
// Returns the value of the environment variable as a string.
func EnvPredictionsService() string {
    return loadEnvVariable("PREDICTION_SERVICE", "localhost:50052")
}

// EnvGatewayPort loads the environment variable for the API Gateway port from the .env file.
// If the environment variable is not set, it returns the default value of ":8080".
// Returns the value of the environment variable as a string.
func EnvGatewayPort() string {
    return ":" + loadEnvVariable("API_GATEWAY_PORT", "8080")
}

// loadEnvVariable loads the environment variable for the given key from the .env file.
// If the key does not exist in the .env file, it returns the defaultValue.
// If there is an error loading the .env file, it logs an error and terminates the program.
//
// Parameters:
// - key string: The key to load the environment variable from.
// - defaultValue string: The default value to return if the key does not exist in the .env file.
//
// Returns:
// - string: The value of the environment variable for the given key, or the defaultValue if the key does not exist.
func loadEnvVariable(key string, defaultValue string) string {
    // Load the environment variables from the .env file.
    err := godotenv.Load()
    if err != nil {
        // Docker error is coming here
        log.Fatal("Error loading .env file")
    }

    // Return the value of the key environment variable.
    value := os.Getenv(key)
    if value == "" {
        return defaultValue
    }
    return value
}