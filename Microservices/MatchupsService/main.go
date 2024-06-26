package main

import (
	"matchups-service/routes"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()

	routes.MatchupsRoute(app)

	app.Listen(":6001")
}