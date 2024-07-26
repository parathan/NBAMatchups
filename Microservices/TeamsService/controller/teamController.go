package controller

import (
	"context"
	"log"

	"teams-service/database"
	teamspb "teams-service/proto"
	"teams-service/util"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func FindTeam(c context.Context, collection *mongo.Collection, teamName string, year int32) (*teamspb.Team, error) {

	var team database.TeamData
	err := collection.FindOne(c, bson.M{"Name": teamName, "year": year}).Decode(&team)
	if err != nil {
		return nil, err
	}
	teamProto, err := util.TeamMapping(team)
	if err != nil {
		return nil, err
	}

	return teamProto, nil

}

func FindAllTeams(c context.Context, collection *mongo.Collection, startYear float64, endYear float64) ([]*teamspb.TotalTeamData, error) {
	filter := bson.M{
		"year": bson.M{
			"$gte": startYear,
			"$lte": endYear,
		},
	}

	cursor, err := collection.Find(c, filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(c)

	var allTeamData []database.TeamData
	for cursor.Next(context.Background()) {
		var teamData database.TeamData
		if err := cursor.Decode(&teamData); err != nil {
			return nil, err
		}
		allTeamData = append(allTeamData, teamData)
	}

	/*
	The idea here is to create a map to track which position the team is in the allteamsdata array
	to have constant lookup times when adding the next value into the appropriate index.
	If the key exists, then it appends it to the appropriate index (the value of the key)
	else it creates the key, as well as the element in the array with the teamname and empty array
	for the stats
	*/
	var allTeamDataProto []*teamspb.TotalTeamData
	teamsMap := make(map[string]int)
	count := 0

	for _, teamStat := range allTeamData {
		teamProto, err := util.TeamMapping(teamStat)
		if err != nil {
			return nil, err
		}

		if index, ok := teamsMap[teamStat.NAME]; ok {
			allTeamDataProto[index].Stats = append(allTeamDataProto[index].Stats, teamProto)
		} else {
			teamsMap[teamStat.NAME] = count
			count++
			newTeamData := &teamspb.TotalTeamData{
				Teamname: teamStat.NAME,
				Stats: []*teamspb.Team{teamProto},
			}
			allTeamDataProto = append(allTeamDataProto, newTeamData)
		}
	}

	log.Printf("Processing team: %v", allTeamDataProto)

	return allTeamDataProto, nil
}