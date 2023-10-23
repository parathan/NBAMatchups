import "redis"

export var redisClient;

(async () => {
    redisClient = redis.createClient();
    redisClient.on("error", (error) => console.error(`Error : ${error}`));
    await redisClient.connect();
})
