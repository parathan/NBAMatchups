package controller

import (
	"api-gateway/config"
	"api-gateway/requests"
	"context"
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	teamspb "teams-service/proto"

	"github.com/go-redis/redis/v8"
)

// TwoteamsCachedController handles HTTP requests for getting TwoTeams data.
//
// It takes an http.ResponseWriter and an http.Request as parameters.
// It returns no values, but writes the response to the http.ResponseWriter.
func TwoteamsCachedController(w http.ResponseWriter, r *http.Request) {
	log.Print("twoteamsController cached called")

	var reqBody requests.TwoTeamsRequest
	if err := json.NewDecoder(r.Body).Decode(&reqBody); err != nil {
		http.Error(w, "Invalid JSON body", http.StatusBadRequest)
		return
	}

	cacheKey := "API_GATEWAY_TWOTEAMS_" + reqBody.Team1 + "_" + reqBody.Team2 + "_" + strconv.Itoa(int(reqBody.Year))

	redisClient := config.GetRedis()
	res, err := redisClient.Get(context.Background(), cacheKey).Result()
	if err == redis.Nil {
		teamsClient, err := config.CreateTeamsGrpcClient("localhost:50051")
		if err != nil {
			http.Error(w, "failed to connect to grpc service", http.StatusInternalServerError)
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

		resJson, _ := json.Marshal(res)

		redisClient.Set(context.Background(), cacheKey, resJson, 0).Err() 

		w.Header().Set("Content-Type", "application/json")
		w.Write(resJson)
	} else if err != nil {
		// Redis error
		teamsClient, err := config.CreateTeamsGrpcClient("localhost:50051")
		if err != nil {
			http.Error(w, "failed to connect to grpc service", http.StatusInternalServerError)
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

		resJson, _ := json.Marshal(res)

		w.Header().Set("Content-Type", "application/json")
		w.Write(resJson)
	} else {
		// Cache hit, return cached data
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(res))
	}
}

// TwoTeamsOrderedCachedController handles HTTP requests for getting TwoTeamsOrdered data.
//
// It takes an http.ResponseWriter and an http.Request as parameters.
// It returns no values, but writes the response to the http.ResponseWriter.
func TwoTeamsOrderedCachedController(w http.ResponseWriter, r *http.Request) {
	log.Print("TwoTeamsOrderedController cached called")

	var reqBody requests.TwoTeamsRequest
	if err := json.NewDecoder(r.Body).Decode(&reqBody); err != nil {
		http.Error(w, "Invalid JSON body", http.StatusBadRequest)
		return
	}

	cacheKey := "API_GATEWAY_TWOTEAMSORDERED_" + reqBody.Team1 + "_" + reqBody.Team2 + "_" + strconv.Itoa(int(reqBody.Year))

	redisClient := config.GetRedis()
	res, err := redisClient.Get(context.Background(), cacheKey).Result()
	if err == redis.Nil {
		teamsClient, err := config.CreateTeamsGrpcClient("localhost:50051")
		if err != nil {
			http.Error(w, "failed to connect to grpc service", http.StatusInternalServerError)
			return
		}

		req := &teamspb.TwoTeamsRequest{
			Team1: reqBody.Team1,
			Team2: reqBody.Team2,
			Year:  reqBody.Year,
		}
	
		res, err := teamsClient.GetTwoTeamsOrdered(context.Background(), req)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		resJson, _ := json.Marshal(res)

		redisClient.Set(context.Background(), cacheKey, resJson, 0).Err() 

		w.Header().Set("Content-Type", "application/json")
		w.Write(resJson)
	} else if err != nil {
		// redis error
		teamsClient, err := config.CreateTeamsGrpcClient("localhost:50051")
		if err != nil {
			http.Error(w, "failed to connect to grpc service", http.StatusInternalServerError)
			return
		}

		req := &teamspb.TwoTeamsRequest{
			Team1: reqBody.Team1,
			Team2: reqBody.Team2,
			Year:  reqBody.Year,
		}
	
		res, err := teamsClient.GetTwoTeamsOrdered(context.Background(), req)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		resJson, _ := json.Marshal(res)

		w.Header().Set("Content-Type", "application/json")
		w.Write(resJson)
	} else {
		// Cache hit, return cached data
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(res))
	}
}

// AllTeamsCachedController handles HTTP requests for getting allTeams data.
//
// It takes an http.ResponseWriter and an http.Request as parameters.
// It returns no values, but writes the response to the http.ResponseWriter.
func AllTeamsCachedController(w http.ResponseWriter, r *http.Request) {
	log.Print("AllTeamsController cached called")

	var reqBody requests.AllTeamsRequest
	if err := json.NewDecoder(r.Body).Decode(&reqBody); err != nil {
		http.Error(w, "Invalid JSON body", http.StatusBadRequest)
		return
	}

	cacheKey := "API_GATEWAY_ALLTEAMS_" + strconv.Itoa(int(reqBody.StartYear)) + "_" + strconv.Itoa(int(reqBody.EndYear))

	redisClient := config.GetRedis()
	res, err := redisClient.Get(context.Background(), cacheKey).Result()
	if err == redis.Nil {
		teamsClient, err := config.CreateTeamsGrpcClient("localhost:50051")
		if err != nil {
			http.Error(w, "failed to connect to grpc service", http.StatusInternalServerError)
			return
		}

		req := &teamspb.AllTeamsRequest{
			StartYear: reqBody.StartYear,
			EndYear:   reqBody.EndYear,
		}
	
		res, err := teamsClient.GetAllTeams(context.Background(), req)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		resJson, _ := json.Marshal(res)

		redisClient.Set(context.Background(), cacheKey, resJson, 0).Err() 

		w.Header().Set("Content-Type", "application/json")
		w.Write(resJson)
	} else if err != nil {
		// Redis error
		teamsClient, err := config.CreateTeamsGrpcClient("localhost:50051")
		if err != nil {
			http.Error(w, "failed to connect to grpc service", http.StatusInternalServerError)
			return
		}

		req := &teamspb.AllTeamsRequest{
			StartYear: reqBody.StartYear,
			EndYear:   reqBody.EndYear,
		}
	
		res, err := teamsClient.GetAllTeams(context.Background(), req)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		resJson, _ := json.Marshal(res)

		w.Header().Set("Content-Type", "application/json")
		w.Write(resJson)
	} else {
		// Cache hit, return cached data
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(res))
	}
}