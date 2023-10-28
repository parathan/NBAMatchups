import { createClient } from "redis";


export var redisClient;

try {
    redisClient = await createClient()
        // .on('error', err => console.log('Redis Client', err))
        .connect();
} catch (err) {
    console.log(err)
}

// Creates Redis connection.
// Need to be running redis-server.
// export const redisClient = await createClient()
//     .on('error', err => console.log('Redis Client', err))
//     .connect();
// redisClient.on('error', err => console.log('Redis Client', err));
// await redisClient.connect();
