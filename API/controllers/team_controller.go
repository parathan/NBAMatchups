package controllers

import (
	"rest-api/configs"

	"github.com/go-playground/validator/v10"
	"go.mongodb.org/mongo-driver/mongo"
)

var teamCollection *mongo.Collection = configs.GetCollection(configs.DB, "NBAMatchups", "NbaTeamStats_2023")
var meanCollection *mongo.Collection = configs.GetCollection(configs.DB, "NBAMatchupsMean", "NbaTeamStatsMean_2023")
var stdCollection *mongo.Collection = configs.GetCollection(configs.DB, "NBAMatchupsStd", "NbaTeamStatsStd_2023")
var zscoreCollection *mongo.Collection = configs.GetCollection(configs.DB, "NBAMatchupsZscore", "NbaTeamStatsZscore_2023")
var validate = validator.New()
