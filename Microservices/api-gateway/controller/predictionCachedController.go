package controller

import (
	"api-gateway/config"
	"api-gateway/constants"
	"api-gateway/requests"
	"context"
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/go-redis/redis/v8"

	predictions "github.com/parathan/NBAMatchups/Microservices/predictions/prediction-service"
)

// PredictCachedController handles HTTP requests for getting prediction data that also uses a redis cache.
//
// It takes an http.ResponseWriter and an http.Request as parameters.
// It returns no values, but writes the response to the http.ResponseWriter.
//
// The cache key is generated from the request body and the response is cached for 0 seconds.
// If the response is not cached, it gets the response from the predictions service and caches it.
// If there is an error from the predictions service, it returns an internal server error.
// If there is an error from the redis client, it gets the response from the predictions service and returns it.
// If there is an error from the json marshal function, it returns a bad request error.
func PredictCachedController(w http.ResponseWriter, r *http.Request) {
	log.Print("predictController cached called")

	// Decode the request body into a TwoTeamsRequest
	var reqBody requests.PredictRequest
	if err := json.NewDecoder(r.Body).Decode(&reqBody); err != nil {
		http.Error(w, constants.INVALID_JSON_BODY, http.StatusBadRequest)
		return
	}

	// Generate the cache key based on the request
	cacheKey := "API_GATEWAY_PREDICTION_" + reqBody.Team1 + "_" + reqBody.Team2 + "_" + strconv.Itoa(int(reqBody.Year))

	// Get the redis client
	redisClient := config.GetRedis()

	// Attempt to get the cached response from redis
	res, err := redisClient.Get(context.Background(), cacheKey).Result()
	if err == redis.Nil {
		// If the response is not cached, get the response from the teams service
		predictionsClient, err := config.CreatePredictionsGrpcClient("localhost:50052")
		if err != nil {
			http.Error(w, constants.FAILED_TO_CONNECT_TO_GRPC, http.StatusInternalServerError)
			return
		}

		req := &predictions.PredictionRequest{
			Team1: reqBody.Team1,
			Team2: reqBody.Team2,
			Year:  reqBody.Year,
		}

		res, err := predictionsClient.Predict(context.Background(), req)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// Marshal the response to JSON
		resJson, _ := json.Marshal(res)

		// Set the response in redis
		redisClient.Set(context.Background(), cacheKey, resJson, 0).Err()

		// Write the response to the http.ResponseWriter
		w.Header().Set("Content-Type", "application/json")
		w.Write(resJson)
	} else if err != nil {
		// Redis error, get response from the predictions service
		predictionsClient, err := config.CreatePredictionsGrpcClient("localhost:50052")
		if err != nil {
			http.Error(w, constants.FAILED_TO_CONNECT_TO_GRPC, http.StatusInternalServerError)
			return
		}

		req := &predictions.PredictionRequest{
			Team1: reqBody.Team1,
			Team2: reqBody.Team2,
			Year:  reqBody.Year,
		}

		res, err := predictionsClient.Predict(context.Background(), req)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// Marshal the response to JSON
		resJson, _ := json.Marshal(res)

		// Write the response to the http.ResponseWriter
		w.Header().Set("Content-Type", "application/json")
		w.Write(resJson)
	} else {
		// Write the cached response to the http.ResponseWriter
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(res))
	}

}
