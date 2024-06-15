package main

import (
	"teams-service/configs"
	"teams-service/routes"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()

	configs.ConnectDB()

	routes.TeamRoute(app)

	app.Listen(":6000")
}
