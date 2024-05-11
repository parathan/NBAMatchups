run npm install to install dependencies

npm run dev to run in dev mode

need to run redis-server from redis folder downloaded to ensure caching runs.
Redis needs to be running before you run server.
If error involved with saving to redis cache, you must clear the redis cache for the key to ensure that future use doesn't use the old cached values that is not correct.

