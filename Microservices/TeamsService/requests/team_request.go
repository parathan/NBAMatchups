package requests

type TwoTeamRequest struct {
	FirstTeam  string `json:"team1"`
	SecondTeam string `json:"team2"`
	Year       string `json:"year"`
}

type AllTeamRequest struct {
	StartYear string `json:"startYear"`
	EndYear   string `json:"endYear"`
}