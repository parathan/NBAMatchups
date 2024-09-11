package requests

type PredictRequest struct {
	Team1 string `json:"team1"`
	Team2 string `json:"team2"`
	Year  int32  `json:"year"`
}
