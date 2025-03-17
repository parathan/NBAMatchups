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

	redisURL := "rediss://default:" + EnvRedisPassword()+ "@" + EnvRedis()
	opt, _ := redis.ParseURL(redisURL)
  	RedisClient = redis.NewClient(opt)

}

func GetRedis() *redis.Client {
	return RedisClient
}