package routes

import (
	"teams-service/controllers"

	"github.com/gofiber/fiber/v2"
)

func TeamRoute(app *fiber.App) {
	app.Post("/teams/all", controllers.GetAllTeams) // for dashboard feature
	app.Post("/teams/two", controllers.GetTwoTeams) // for use in matchups feature or prediction feature, simply returns two teams data
	app.Post("/teams/two/ml", controllers.GetTwoTeamsML) // for use in prediction feature with data already processed
}
