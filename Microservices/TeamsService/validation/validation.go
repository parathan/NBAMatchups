package validations

import (
	"errors"

	"github.com/parathan/NBAMatchups/Microservicesteams-service/constants"
	teamspb "github.com/parathan/NBAMatchups/Microservicesteams-service/proto"
)

func ValidateTwoTeamsRequest(req *teamspb.TwoTeamsRequest) error {
	if req.Team1 == "" {
		return errors.New("Missing Team1")
	}

	if req.Team2 == "" {
		return errors.New("Missing Team2")
	}

	if req.Year == 0 {
		return errors.New("Missing Year")
	}

	_, exists := constants.TEAM_NAMES[req.Team1]; if !exists {
		return errors.New("Team1 is not a valid team name")
	}

	_, exists = constants.TEAM_NAMES[req.Team2]; if !exists {
		return errors.New("Team2 is not a valid team name")
	}

	if req.Year < constants.MIN_YEAR || req.Year > constants.MAX_YEAR {
		return errors.New("Year is not a valid year")
	}

	return nil
}

func ValidateAllTeamsRequest(req *teamspb.AllTeamsRequest) error {

	if req.StartYear == 0 {
		return errors.New("Missing StartYear")
	}

	if req.EndYear == 0 {
		return errors.New("Missing EndYear")
	}
	
	if req.StartYear < constants.MIN_YEAR || req.StartYear > constants.MAX_YEAR {
		return errors.New("StartYear is not a valid year")
	}

	if req.EndYear < constants.MIN_YEAR || req.EndYear > constants.MAX_YEAR {
		return errors.New("EndYear is not a valid year")
	}

	return nil
}