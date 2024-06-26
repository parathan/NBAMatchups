package controllers

import (
	"matchups-service/responses"
	"net/http"

	"github.com/gofiber/fiber/v2"
)

func GetTwoTeamsOrdered(c *fiber.Ctx) error {
	return c.Status(http.StatusOK).JSON(responses.TeamResponse{
		Status:  http.StatusOK,
		Message: "Success",
		Data:    &fiber.Map{"data": "testData"},
	})
}
