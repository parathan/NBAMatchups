package controllers

import (
	"context"
	"log"
	"net/http"
	"strconv"
	"teams-service/configs"
	"teams-service/constants"
	"teams-service/models"
	"teams-service/responses"
	"time"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func GetAllTeams(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	startYear := c.Query("startYear")
	endYear := c.Query("endYear")

	defer cancel()

	var totalTeams []models.TotalTeamData

	// Initialize totalteams with teamnames
	teamNames := constants.GetTeamNames()
	for _, value := range teamNames {
		var totalTeam models.TotalTeamData
		totalTeam.TeamName = value
		totalTeams = append(totalTeams, totalTeam)
	}

	// convert years to ints for loop
	intStartYear, _ := strconv.Atoi(startYear)
	intEndYear, _ := strconv.Atoi(endYear)

	for i := intStartYear; i <= intEndYear; i++ {

		strYear := strconv.Itoa(i)

		// Get all team data for the year
		var teamCollection *mongo.Collection = configs.GetCollection(configs.DB, "NBAMatchups", "NbaTeamStats_"+strYear)
		var teamsData []models.TeamData

		teamCur, err := teamCollection.Find(ctx, bson.M{})
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
		}

		if err = teamCur.All(context.Background(), &teamsData); err != nil {
			log.Fatal(err)
		}

		// Get mean data for the year
		var meanCollection *mongo.Collection = configs.GetCollection(configs.DB, "NBAMatchupsMean", "NbaTeamStatsMean_"+strYear)
		var meanData []models.TeamData

		meanCur, err := meanCollection.Find(ctx, bson.M{})
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
		}
		if err = meanCur.All(context.Background(), &meanData); err != nil {
			log.Fatal(err)
		}

		// Map of teamsdata so when looking it up in the below for loop, it is constant lookup time rather than O(n)
		teamsDataMap := make(map[string]int)
		for index, element := range teamsData {
			teamsDataMap[element.NAME] = index
		}

		// Loop through the teams and add the team data to the appropriate slot
		for index, value := range totalTeams {
			var yearlyStats models.YearlyTeamData
			yearlyStats.Year = strYear

			if value.TeamName != "MEAN" {
				yearlyStats.YearStats = teamsData[teamsDataMap[value.TeamName]]
			} else {
				yearlyStats.YearStats = meanData[0]
			}
			totalTeams[index].Stats = append(totalTeams[index].Stats, yearlyStats)
		}
	}

	return c.Status(http.StatusOK).JSON(responses.TeamResponse{
		Status:  http.StatusOK,
		Message: "Success",
		Data:    &fiber.Map{"data": totalTeams},
	})
}
