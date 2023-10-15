package configs

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// ConnectDB : This is helper function to connect mongoDB
func ConnectDB() *mongo.Client {

	// Set client options
	clientOptions := options.Client().ApplyURI(EnvMongoURI())

	// Connect to MongoDB
	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB")

	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Pinged MongoDB")

	return client

	// // client, err := mongo.NewClient(options.Client().ApplyURI(EnvMongoURI()))
	// // Use the SetServerAPIOptions() method to set the Stable API version to 1
	// serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	// opts := options.Client().ApplyURI(EnvMongoURI()).SetServerAPIOptions(serverAPI)

	// // Create a new client and connect to the server
	// client, err := mongo.Connect(context.TODO(), opts)
	// if err != nil {
	// 	panic(err)
	// }
	// defer func() {
	// 	if err = client.Disconnect(context.TODO()); err != nil {
	// 		panic(err)
	// 	}
	// }()

	// // Send a ping to confirm a successful connection
	// err = client.Ping(context.TODO(), nil)
	// if err != nil {
	// 	panic(err)
	// }

	// fmt.Println("Connected to MongoDB")
	// return client
}

var DB *mongo.Client = ConnectDB()

func GetCollection(client *mongo.Client, databaseName string, collectionName string) *mongo.Collection {
	collection := client.Database(databaseName).Collection(collectionName)
	return collection
}
