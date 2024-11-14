package config

import (
	"github.com/go-redis/redis/v8"
)

var RedisClient *redis.Client

// InitRedis initializes a Redis client with the provided options.
//
// No parameters.
// No return values.
func InitRedis() {
	RedisClient = redis.NewClient(&redis.Options{
		Addr:     EnvRedis(),
		Password: "", // no password set
		DB:       0,  // use default DB
	})
}

func GetRedis() *redis.Client {
	return RedisClient
}