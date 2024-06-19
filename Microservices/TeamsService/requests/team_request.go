package requests

type TwoTeamRequest struct {
	FirstTeam  string `json:"team1"`
	SecondTeam string `json:"team2"`
	Year       string `json:"year"`
}