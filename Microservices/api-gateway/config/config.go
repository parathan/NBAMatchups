package config

import (
	teamspb "teams-service/proto"

	"google.golang.org/grpc"
)

func CreateGrpcClient(address string) (teamspb.TeamsServiceClient, error) {
	conn, err := grpc.Dial(address, grpc.WithInsecure())
	if err != nil {
		return nil, err
	}
	return teamspb.NewTeamsServiceClient(conn), nil
}