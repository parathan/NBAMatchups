package main

import teamspb "teams-service/proto"

type server struct {
	teamspb.UnimplementedTeamsServiceServer
}