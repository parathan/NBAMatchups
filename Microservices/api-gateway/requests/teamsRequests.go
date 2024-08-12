package requests

type TwoTeamsRequest struct {
	Team1 string `json:"team1"`
	Team2 string `json:"team2"`
	Year  int32  `json:"year"`
}

type AllTeamsRequest struct {
	StartYear int32 `json:"startYear"`
	EndYear   int32 `json:"endYear"`
}