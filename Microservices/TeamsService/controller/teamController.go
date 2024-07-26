package controller

import (
	"context"

	"teams-service/database"
	teamspb "teams-service/proto"
	"teams-service/util"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

// FindTeam retrieves a team from the database based on the team name and year
// and returns the team in protobuf format.
//
// Parameters:
// - c: the context.Context object for the function.
// - collection: the mongo.Collection object for the database.
// - teamName: the name of the team to retrieve.
// - year: the year of the team to retrieve.
//
// Returns:
// - *teamspb.Team: the team in protobuf format.
// - error: an error if the operation fails.
func FindTeam(c context.Context, collection *mongo.Collection, teamName string, year int32) (*teamspb.Team, error) {
	// Define the filter to retrieve the team from the database.
	filter := bson.M{
		"Name": teamName,
		"year": year,
	}

	// Declare a variable to store the retrieved team data.
	var team database.TeamData

	// Execute the database query to retrieve the team and decode the result into the team variable.
	err := collection.FindOne(c, filter).Decode(&team)
	if err != nil {
		return nil, err
	}

	// Map the retrieved team data to protobuf format and return it.
	teamProto, err := util.TeamMapping(team)
	if err != nil {
		return nil, err
	}

	return teamProto, nil

}

// FindAllTeams retrieves all teams from the database based on the given years
// and returns the teams in protobuf format.
//
// Parameters:
// - c: the context.Context object for the function.
// - collection: the mongo.Collection object for the database.
// - startYear: the starting year to retrieve teams from.
// - endYear: the ending year to retrieve teams from.
//
// Returns:
// - []*teamspb.TotalTeamData: the teams in protobuf format.
// - error: an error if the operation fails.
func FindAllTeams(c context.Context, collection *mongo.Collection, startYear float64, endYear float64) ([]*teamspb.TotalTeamData, error) {
	// Create a filter to retrieve the teams from the database.
	filter := bson.M{
		"year": bson.M{
			"$gte": startYear,
			"$lte": endYear,
		},
	}

	// Execute the database query to retrieve the teams.
	cursor, err := collection.Find(c, filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(c)

	// Decode each team from the cursor and store it in the allTeamData slice.
	var allTeamData []database.TeamData
	for cursor.Next(context.Background()) {
		var teamData database.TeamData
		if err := cursor.Decode(&teamData); err != nil {
			return nil, err
		}
		allTeamData = append(allTeamData, teamData)
	}

	// Create a map to store which position the team is in the allteamsdata slice
	// to have constant lookup times when adding the next value into the appropriate index.
	// If the key exists, then it appends it to the appropriate index (the value of the key)
	// else it creates the key, as well as the element in the array with the teamname and empty array
	// for the stats
	// Note: This grabs all the data at once, rather than individually using goroutines
	// Uinsg goroutines may be faster, as it would be able to get the data filetered automatically,
	// but would use many more resources (30 db calls rather than 1)
	var allTeamDataProto []*teamspb.TotalTeamData
	teamsMap := make(map[string]int)
	count := 0

	// Iterate through each team in the allTeamData slice and map it to the
	// appropriate index in the allTeamDataProto slice.
	for _, teamStat := range allTeamData {
		teamProto, err := util.TeamMapping(teamStat)
		if err != nil {
			return nil, err
		}

		if index, ok := teamsMap[teamStat.NAME]; ok {
			// If the team exists, append the next stat to the appropriate index.
			allTeamDataProto[index].Stats = append(allTeamDataProto[index].Stats, teamProto)
		} else {
			// If the team does not exist, create the key and a new element in the slice with
			// the teamname and empty array for the stats.
			teamsMap[teamStat.NAME] = count
			count++
			newTeamData := &teamspb.TotalTeamData{
				Teamname: teamStat.NAME,
				Stats:    []*teamspb.Team{teamProto},
			}
			allTeamDataProto = append(allTeamDataProto, newTeamData)
		}
	}

	return allTeamDataProto, nil 
}