package main

import (
	"context"
	"log"
	"net"

	"github.com/parathan/NBAMatchups/Microservices/TeamsService/database"
	teamspb "github.com/parathan/NBAMatchups/Microservices/TeamsService/proto"
	"github.com/parathan/NBAMatchups/Microservices/TeamsService/server"

	"google.golang.org/grpc"
)

func main() {
	log.Println("Teams Service")

	lis, err := net.Listen("tcp", database.EnvServicePort())
	if err != nil {
		log.Println("ERROR:", err.Error())
	}

	database.Mongo_Client = database.ConnectDB()

	defer database.Mongo_Client.Disconnect(context.Background())

	s := grpc.NewServer()
	teamspb.RegisterTeamsServiceServer(s, &server.Server{})

	log.Printf("Server started at %v", lis.Addr().String())

	err = s.Serve(lis)
	if err != nil {
		log.Println("ERROR:", err.Error())
	}
}