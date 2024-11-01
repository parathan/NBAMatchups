package controller

import (
	"api-gateway/config"
	"api-gateway/constants"
	"api-gateway/requests"
	"context"
	"encoding/json"
	"log"
	"net/http"

	predictions "github.com/parathan/NBAMatchups/Microservices/predictions/prediction-service"
)

// TwoteamsController handles HTTP requests for getting TwoTeams data.
//
// It takes an http.ResponseWriter and an http.Request as parameters.
// It returns no values, but writes the response to the http.ResponseWriter.
func PredictController(w http.ResponseWriter, r *http.Request) {
	log.Print("predictController called")

	// Create a gRPC client for the predictions service
	predictionsClient, err := config.CreatePredictionsGrpcClient(config.EnvPredictionsService())
	if err != nil {
		http.Error(w, constants.FAILED_TO_CONNECT_TO_GRPC, http.StatusInternalServerError)
		return
	}

	// Decode the request body into a TwoTeamsRequest
	var reqBody requests.PredictRequest
	if err := json.NewDecoder(r.Body).Decode(&reqBody); err != nil {
		http.Error(w, constants.INVALID_JSON_BODY, http.StatusBadRequest)
		return
	}

	// Create a request for the teams service
	req := &predictions.PredictionRequest{
		Team1: reqBody.Team1,
		Team2: reqBody.Team2,
		Year:  reqBody.Year,
	}

	// Get the response from the teams service
	res, err := predictionsClient.Predict(context.Background(), req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Set the Content-Type header to JSON and encode response to JSON and write it to http.ResponseWriter
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(res)

}
