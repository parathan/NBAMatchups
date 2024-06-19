package requests

import "teams-service/constants"

func AllTeamsValidate(body AllTeamRequest) []string {
	var validateError []string
	if !yearInRange(body.StartYear) {
		validateError = append(validateError, "startYear not within range")
	}
	if !yearInRange(body.EndYear) {
		validateError = append(validateError, "endYear not within range")
	}
	return validateError
}

func TwoTeamsValidate(body TwoTeamRequest) []string {
	var validateError []string
	if !teamExists(body.FirstTeam) {
		validateError = append(validateError, "team1 is not a valid team")
	}
	if !teamExists(body.SecondTeam) {
		validateError = append(validateError, "team2 is not a valid team")
	}
	if !yearInRange(body.Year) {
		validateError = append(validateError, "Year not within range")
	}
	return validateError
}

func getMinYear() int {
	return 2019
}

func getMaxYear() int {
	return 2023
}

func teamExists(inputTeam string) bool {
	teams := constants.GetTeamNames()
	for _, team := range teams {
		if inputTeam == team {
			return true
		}
	}
	return false
}

func yearInRange(year int) bool {
	if year >= getMinYear() && year <= getMaxYear() {
		return true
	}
	return false
}