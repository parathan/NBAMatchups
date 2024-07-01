package controllers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"matchups-service/models"
	"matchups-service/responses"
	"net/http"

	"github.com/gofiber/fiber/v2"
)

func GetTwoTeamsOrdered(c *fiber.Ctx) error {

	posturl := "http://localhost:6000/teams/two"

	body := []byte(`{
		"team1": "Sacramento Kings",
		"team2": "Miami Heat",
		"year": 2022
	}`)

	req, err := http.NewRequest("POST", posturl, bytes.NewBuffer(body))
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
	}

	req.Header.Add("Content-Type", "application/json")

	client := &http.Client{}
	res, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	
	fmt.Print(res.Body)

	defer res.Body.Close()

	twoTeamData := &models.TwoTeamData{}
	derr := json.NewDecoder(res.Body).Decode(twoTeamData)
	if derr != nil {
		panic(derr)
	}

	if res.StatusCode != http.StatusOK {
		panic(res.Status)
	}

	return c.Status(http.StatusOK).JSON(responses.TeamResponse{
		Status:  http.StatusOK,
		Message: "Success",
		Data:    &fiber.Map{"data": twoTeamData},
	})
}
