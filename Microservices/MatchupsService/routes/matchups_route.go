package routes

import (
	"matchups-service/controllers"

	"github.com/gofiber/fiber/v2"
)

func MatchupsRoute(app *fiber.App) {
	app.Post("/matchups/ordered", controllers.GetTwoTeamsOrdered)
}
