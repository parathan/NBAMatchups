package requests

type TwoTeamRequest struct {
	FirstTeam  string `json:"team1" validate:"required"`
	SecondTeam string `json:"team2" validate:"required"`
	Year       int    `json:"year" validate:"required,gte=2019,lte=2023"`
}

type AllTeamRequest struct {
	StartYear int `json:"startYear" validate:"required,gte=2019,lte=2023"`
	EndYear   int `json:"endYear" validate:"required,gte=2019,lte=2023"`
}