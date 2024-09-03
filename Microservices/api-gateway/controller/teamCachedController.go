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

	teamspb "github.com/parathan/NBAMatchups/Microservices/TeamsService/proto"
)

// TwoteamsCachedController handles HTTP requests for getting TwoTeams data that also uses
// a redis cache.
//
// It takes an http.ResponseWriter and an http.Request as parameters.
// It returns no values, but writes the response to the http.ResponseWriter.
func TwoteamsCachedController(w http.ResponseWriter, r *http.Request) {
	log.Print("twoteamsController cached called")

	// Decode the request body into a TwoTeamsRequest
	var reqBody requests.TwoTeamsRequest
	if err := json.NewDecoder(r.Body).Decode(&reqBody); err != nil {
		http.Error(w, constants.INVALID_JSON_BODY, http.StatusBadRequest)
		return
	}

	// Generate the cache key based on the request
	cacheKey := "API_GATEWAY_TWOTEAMS_" + reqBody.Team1 + "_" + reqBody.Team2 + "_" + strconv.Itoa(int(reqBody.Year))

	// Get the redis client
	redisClient := config.GetRedis()

	// Attempt to get the cached response from redis
	res, err := redisClient.Get(context.Background(), cacheKey).Result()
	if err == redis.Nil {
		// If the response is not cached, get the response from the teams service
		teamsClient, err := config.CreateTeamsGrpcClient("localhost:50051")
		if err != nil {
			http.Error(w, constants.FAILED_TO_CONNECT_TO_GRPC, http.StatusInternalServerError)
			return
		}

		req := &teamspb.TwoTeamsRequest{
			Team1: reqBody.Team1,
			Team2: reqBody.Team2,
			Year:  reqBody.Year,
		}
	
		res, err := teamsClient.GetTwoTeams(context.Background(), req)
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
		// Redis error, get the response from the teams service
		teamsClient, err := config.CreateTeamsGrpcClient("localhost:50051")
		if err != nil {
			http.Error(w, constants.FAILED_TO_CONNECT_TO_GRPC, http.StatusInternalServerError)
			return
		}

		req := &teamspb.TwoTeamsRequest{
			Team1: reqBody.Team1,
			Team2: reqBody.Team2,
			Year:  reqBody.Year,
		}
	
		res, err := teamsClient.GetTwoTeams(context.Background(), req)
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
		// Cache hit, return cached data
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(res))
	}
}

// TwoTeamsOrderedCachedController handles HTTP requests for getting TwoTeamsOrdered data
// that also uses a redis cache.
//
// It takes an http.ResponseWriter and an http.Request as parameters.
// It returns no values, but writes the response to the http.ResponseWriter.
func TwoTeamsOrderedCachedController(w http.ResponseWriter, r *http.Request) {
	log.Print("TwoTeamsOrderedController cached called")

	// Decode the request body into a TwoTeamsRequest
	var reqBody requests.TwoTeamsRequest
	if err := json.NewDecoder(r.Body).Decode(&reqBody); err != nil {
		// If the request body is invalid, return a bad request error
		http.Error(w, constants.INVALID_JSON_BODY, http.StatusBadRequest)
		return
	}

	// Generate the cache key based on the request
	cacheKey := "API_GATEWAY_TWOTEAMSORDERED_" + reqBody.Team1 + "_" + reqBody.Team2 + "_" + strconv.Itoa(int(reqBody.Year))

	// Get the redis client
	redisClient := config.GetRedis()

	// Attempt to get the cached response from redis
	res, err := redisClient.Get(context.Background(), cacheKey).Result()
	if err == redis.Nil {
		// If the response is not cached, get the response from the teams service
		teamsClient, err := config.CreateTeamsGrpcClient("localhost:50051")
		if err != nil {
			// If there is an error connecting to the teams service, return an internal server error
			http.Error(w, constants.FAILED_TO_CONNECT_TO_GRPC, http.StatusInternalServerError)
			return
		}

		// Create the request for the teams service
		req := &teamspb.TwoTeamsRequest{
			Team1: reqBody.Team1,
			Team2: reqBody.Team2,
			Year:  reqBody.Year,
		}

		// Get the response from the teams service
		res, err := teamsClient.GetTwoTeamsOrdered(context.Background(), req)
		if err != nil {
			// If there is an error from the teams service, return an internal server error
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
		// Redis error, get the response from the teams service
		teamsClient, err := config.CreateTeamsGrpcClient("localhost:50051")
		if err != nil {
			// If there is an error connecting to the teams service, return an internal server error
			http.Error(w, constants.FAILED_TO_CONNECT_TO_GRPC, http.StatusInternalServerError)
			return
		}

		// Create the request for the teams service
		req := &teamspb.TwoTeamsRequest{
			Team1: reqBody.Team1,
			Team2: reqBody.Team2,
			Year:  reqBody.Year,
		}

		// Get the response from the teams service
		res, err := teamsClient.GetTwoTeamsOrdered(context.Background(), req)
		if err != nil {
			// If there is an error from the teams service, return an internal server error
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		
		// Marshal the response to JSON
		resJson, _ := json.Marshal(res)

		// Write the response to the http.ResponseWriter
		w.Header().Set("Content-Type", "application/json")
		w.Write(resJson)
	} else {
		// Cache hit, return cached data
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(res))
	}
}

// AllTeamsCachedController handles HTTP requests for getting allTeams data
// that also uses a redis cache.
//
// It takes an http.ResponseWriter and an http.Request as parameters.
// It returns no values, but writes the response to the http.ResponseWriter.
func AllTeamsCachedController(w http.ResponseWriter, r *http.Request) {
	log.Print("AllTeamsController cached called")

	// Decode the request body into a AllTeamsRequest
	var reqBody requests.AllTeamsRequest
	if err := json.NewDecoder(r.Body).Decode(&reqBody); err != nil {
		// If the request body is invalid, return a bad request error
		http.Error(w, constants.INVALID_JSON_BODY, http.StatusBadRequest)
		return
	}

	// Generate the cache key based on the request
	cacheKey := "API_GATEWAY_ALLTEAMS_" + strconv.Itoa(int(reqBody.StartYear)) + "_" + strconv.Itoa(int(reqBody.EndYear))

	// Get the redis client
	redisClient := config.GetRedis()

	// Attempt to get the cached response from redis
	res, err := redisClient.Get(context.Background(), cacheKey).Result()
	if err == redis.Nil {
		// If the response is not cached, get the response from the teams service
		teamsClient, err := config.CreateTeamsGrpcClient("localhost:50051")
		if err != nil {
			// If there is an error connecting to the teams service, return an internal server error
			http.Error(w, constants.FAILED_TO_CONNECT_TO_GRPC, http.StatusInternalServerError)
			return
		}

		// Create the request for the teams service
		req := &teamspb.AllTeamsRequest{
			StartYear: reqBody.StartYear,
			EndYear:   reqBody.EndYear,
		}

		// Get the response from the teams service
		res, err := teamsClient.GetAllTeams(context.Background(), req)
		if err != nil {
			// If there is an error from the teams service, return an internal server error
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
		// Redis error, get the response from the teams service
		teamsClient, err := config.CreateTeamsGrpcClient("localhost:50051")
		if err != nil {
			// If there is an error connecting to the teams service, return an internal server error
			http.Error(w, constants.FAILED_TO_CONNECT_TO_GRPC, http.StatusInternalServerError)
			return
		}

		// Create the request for the teams service
		req := &teamspb.AllTeamsRequest{
			StartYear: reqBody.StartYear,
			EndYear:   reqBody.EndYear,
		}

		// Get the response from the teams service
		res, err := teamsClient.GetAllTeams(context.Background(), req)
		if err != nil {
			// If there is an error from the teams service, return an internal server error
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// Marshal the response to JSON
		resJson, _ := json.Marshal(res)

		// Write the response to the http.ResponseWriter
		w.Header().Set("Content-Type", "application/json")
		w.Write(resJson)
	} else {
		// Cache hit, return cached data
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(res))
	}
}
