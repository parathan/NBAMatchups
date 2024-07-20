package controller

import (
	"context"

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