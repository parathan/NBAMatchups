import { createClient } from "redis";


// Creates Redis connection.
// Need to be running redis-server.
export const redisClient = createClient();
redisClient.on('error', err => console.log('Redis Client', err));
await redisClient.connect();
