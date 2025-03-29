package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	teamspb "github.com/parathan/NBAMatchups/Microservices/TeamsService/proto"

	predictions "github.com/parathan/NBAMatchups/Microservices/predictions/prediction-service"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
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

// CreateSecureTeamsGrpcClient creates a new secure gRPC client connection to the Teams Service.
//
// The address parameter specifies the address of the Teams Service.
// Returns a TeamsServiceClient instance and an error if the connection fails.
// The connection is secured using TLS with the default TLS credentials.
func CreateSecureTeamsGrpcClient(address string) (teamspb.TeamsServiceClient, error) {
    creds := credentials.NewTLS(nil)

    conn, err := grpc.Dial(address, grpc.WithTransportCredentials(creds))
    if err != nil {
        return nil, err
    }
    return teamspb.NewTeamsServiceClient(conn), nil
}

// CreateSecurePredictionsGrpcClient creates a new secure gRPC client connection to the Prediction Service.
//
// The address parameter specifies the address of the Prediction Service.
// Returns a PredictionServiceClient instance and an error if the connection fails.
// The connection is secured using TLS with the default TLS credentials.
func CreateSecurePredictionsGrpcClient(address string) (predictions.PredictionServiceClient, error) {
    creds := credentials.NewTLS(nil)

    conn, err := grpc.Dial(address, grpc.WithTransportCredentials(creds))
    if err != nil {
        return nil, err
    }
    return predictions.NewPredictionServiceClient(conn), nil
}


// EnvTeamsService loads the environment variable for the Teams Service from the .env file.
// If the environment variable is not set, it returns the default value of "localhost:50051".
// Returns the value of the environment variable as a string.
func EnvLocalTeamsService() string {
    return loadEnvVariable("LOCAL_TEAMS_SERVICE", "localhost:50051")
}

// EnvPredictionsService loads the environment variable for the Prediction Service from the .env file.
// If the environment variable is not set, it returns the default value of "localhost:50052".
// Returns the value of the environment variable as a string.
func EnvLocalPredictionsService() string {
    return loadEnvVariable("LOCAL_PREDICTION_SERVICE", "localhost:50052")
}

// EnvRemoteTeamsService loads the environment variable for the remote Teams Service from the .env file.
// If the environment variable is not set, it returns the default value of "localhost:50051".
// Returns the value of the environment variable as a string.
func EnvRemoteTeamsService() string {
    return loadEnvVariable("REMOTE_TEAMS_SERVICE", "localhost:50051")
}

// EnvRemotePredictionsService loads the environment variable for the remote Prediction Service from the .env file.
// If the environment variable is not set, it returns the default value of "localhost:50052".
// Returns the value of the environment variable as a string.
func EnvRemotePredictionsService() string {
    return loadEnvVariable("REMOTE_PREDICTION_SERVICE", "localhost:50052")
}

// EnvProd returns true if the environment variable PROD is set to "true".
// Otherwise, it returns false.
// The PROD environment variable is used to determine whether the API Gateway is running in production or development mode.
func EnvProd() bool {
    return loadEnvVariable("PROD", "false") == "true"
}

// EnvGatewayPort loads the environment variable for the API Gateway port from the .env file.
// If the environment variable is not set, it returns the default value of ":8080".
// Returns the value of the environment variable as a string.
func EnvGatewayPort() string {
    return ":" + loadEnvVariable("API_GATEWAY_PORT", "8080")
}

// EnvRedis loads the environment variable for the Redis server from the .env file.
// If the environment variable is not set, it returns the default value of "localhost:6379".
// Returns the value of the environment variable as a string.
func EnvRedis() string {
    return loadEnvVariable("REDIS_ADDR", "localhost:6379")
}

func EnvRedisPassword() string {
    return loadEnvVariable("REDIS_PASSWORD", "")
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
        log.Fatal("Error loading .env file")
    }

    // Return the value of the key environment variable.
    value := os.Getenv(key)
    if value == "" {
        return defaultValue
    }
    return value
}