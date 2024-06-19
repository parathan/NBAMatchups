package requests

type TwoTeamRequest struct {
	FirstTeam  string `json:"team1"`
	SecondTeam string `json:"team2"`
	Year       int    `json:"year"`
}

type AllTeamRequest struct {
	StartYear int `json:"startYear"`
	EndYear   int `json:"endYear"`
}