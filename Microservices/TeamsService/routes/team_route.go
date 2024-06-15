package routes

import (
	"teams-service/controllers"

	"github.com/gofiber/fiber/v2"
)

func TeamRoute(app *fiber.App) {
	app.Get("/teams/all", controllers.GetAllTeams)
}
