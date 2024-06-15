package controllers

import (
	"context"
	"log"
	"net/http"
	"teams-service/configs"
	"teams-service/models"
	"teams-service/responses"
	"time"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func GetAllTeams(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	// startYear := c.Params("startYear")
	// endYear := c.Params("endYear")
	defer cancel()

	client, err := mongo.Connect(ctx, options.Client().ApplyURI("mongodb+srv://testUser:cRgLeYtTEnBMXMZr@nbamatchups.ygk98ot.mongodb.net/?retryWrites=true&w=majority"))
	if err != nil {
		return err
	}
	var teamCollection *mongo.Collection = configs.GetCollection(client, "NBAMatchups", "NbaTeamStats_2022")
	var teams []models.TeamData
	cur, err := teamCollection.Find(ctx, bson.M{})
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
	}
	if err = cur.All(context.Background(), &teams); err != nil {
		log.Fatal(err)
	}
	return c.Status(http.StatusOK).JSON(responses.TeamResponse{
		Status:  http.StatusOK,
		Message: "Success",
		Data:    &fiber.Map{"data": teams},
	})
}
