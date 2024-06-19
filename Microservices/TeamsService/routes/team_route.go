package routes

import (
	"teams-service/controllers"

	"github.com/gofiber/fiber/v2"
)

func TeamRoute(app *fiber.App) {
	app.Post("/teams/all", controllers.GetAllTeams)
	app.Post("/teams/two/ml", controllers.GetTwoTeams)
}
