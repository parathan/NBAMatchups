package controllers

import (
	"context"
	"net/http"
	"strconv"
	"teams-service/configs"
	"teams-service/constants"
	"teams-service/models"
	"teams-service/requests"
	"teams-service/responses"
	"teams-service/util"
	"time"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func GetAllTeams(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	// Get body parameters
	var body requests.AllTeamRequest
	if err := c.BodyParser(&body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "cannot parse JSON",
		})
	}

	if validationErr := requests.AllTeamsValidate(body); validationErr != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": validationErr})
	}

	// if validationErr := validate.Struct(&body); validationErr != nil {
	// 	return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": validationErr.Error()})
	// }

	startYear := strconv.Itoa(body.StartYear) 
	endYear := strconv.Itoa(body.EndYear)

	defer cancel()

	var totalTeams []models.TotalTeamData

	// Initialize totalteams with teamnames
	teamNames := constants.GetTeamNames()
	for _, value := range teamNames {
		var totalTeam models.TotalTeamData
		totalTeam.TeamName = value
		totalTeams = append(totalTeams, totalTeam)
	}

	// add mean as one of the teams
	var meanTeam models.TotalTeamData
	meanTeam.TeamName = "MEAN"
	totalTeams = append(totalTeams, meanTeam)

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
			return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
		}

		// Get mean data for the year
		var meanCollection *mongo.Collection = configs.GetCollection(configs.DB, "NBAMatchupsMean", "NbaTeamStatsMean_"+strYear)
		var meanData []models.TeamData

		meanCur, err := meanCollection.Find(ctx, bson.M{})
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
		}
		if err = meanCur.All(context.Background(), &meanData); err != nil {
			return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
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

func GetTwoTeams(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10 * time.Second)

	// Get body parameters
	var body requests.TwoTeamRequest
	if err := c.BodyParser(&body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "cannot parse JSON",
		})
	}

	if validationErr := requests.TwoTeamsValidate(body); validationErr != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": validationErr})
	}

	firstTeam := body.FirstTeam
	secondTeam := body.SecondTeam
	year := strconv.Itoa(body.Year)

	defer cancel()

	var teamsCollection *mongo.Collection = configs.GetCollection(configs.DB, "NBAMatchups", "NbaTeamStats_" + year)
	
	var twoTeamData models.TwoTeamData

	err := teamsCollection.FindOne(ctx, bson.M{"Name": firstTeam}).Decode(&twoTeamData.FirstTeam)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
	}

	err = teamsCollection.FindOne(ctx, bson.M{"Name": secondTeam}).Decode(&twoTeamData.SecondTeam)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
	}

	return c.Status(http.StatusOK).JSON(responses.TeamResponse{
		Status:  http.StatusOK,
		Message: "Success",
		Data:    &fiber.Map{"data": twoTeamData},
	})
}

func GetTwoTeamsML(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	// Get body parameters
	var body requests.TwoTeamRequest
	if err := c.BodyParser(&body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "cannot parse JSON",
		})
	}

	if validationErr := requests.TwoTeamsValidate(body); validationErr != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": validationErr})
	}

	firstTeam := body.FirstTeam
	secondTeam := body.SecondTeam
	year := strconv.Itoa(body.Year)

	defer cancel()

	var teamsCollection *mongo.Collection = configs.GetCollection(configs.DB, "NBAMatchups", "NbaTeamStats_" + year)
	
	// Get first team data, put it in json object and add _x suffix to fields
	team1Data := teamsCollection.FindOne(ctx, bson.M{"Name": firstTeam})
	if team1Data.Err() != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(team1Data.Err().Error())
	}
	team1Bson, err := team1Data.Raw()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
	}
	var team1Json map[string]interface{}
	if err := bson.Unmarshal(team1Bson, &team1Json); err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
	}

	delete(team1Json, "Name")
	delete(team1Json, "_id")

	xTeam := util.RenameKeysWithSuffix(team1Json, "_x")

	// Get second team data, put it in json object and add _y suffix to fields
	team2Data := teamsCollection.FindOne(ctx, bson.M{"Name": secondTeam})
	if team1Data.Err() != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(team1Data.Err().Error())
	}
	team2Bson, err := team2Data.Raw()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
	}
	var team2Json map[string]interface{}
	if err := bson.Unmarshal(team2Bson, &team2Json); err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
	}

	delete(team2Json, "Name")
	delete(team2Json, "_id")

	yTeam := util.RenameKeysWithSuffix(team2Json, "_y")

	// Combine the two json objects
	combined := make(map[string]interface{})
	for key, value := range xTeam {
		combined[key] = value
	}
	for key, value := range yTeam {
		combined[key] = value
	}

	return c.Status(http.StatusOK).JSON(responses.TeamResponse{
		Status:  http.StatusOK,
		Message: "Success",
		Data:    &fiber.Map{"data": combined},
	})


}
