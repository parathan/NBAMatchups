import { ExpressValidator } from "express-validator";
import { tradDb, meanDb, stdDb, zscoreDb } from "../db/connection.mjs";
import orderedTeams from "../util/util.mjs";
import "express-validator"
import { redisClient } from "../cache/cache.mjs";

const { validationResult } = new ExpressValidator

export const findTwoTeamsOrdered = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            })
        }

        let team1name = req.body.team1;
        let team2name = req.body.team2;
        let year = req.body.year;

        let tradCollection = tradDb.collection("NbaTeamStats_" + year)
        let meanCollection = meanDb.collection("NbaTeamStatsMean_" + year)
        let stdCollection = stdDb.collection("NbaTeamStatsStd_" + year)
        let zscoreCollection = zscoreDb.collection("NbaTeamStatsZscore_" + year)

        // Promise.all runs all promises concurrently.
        let data = await Promise.all(
            [
                tradCollection.find({Name: team1name}).toArray(),
                tradCollection.find({Name: team2name}).toArray(),
                meanCollection.find({}).toArray(),
                stdCollection.find({}).toArray(),
                zscoreCollection.find({Name: team1name}).toArray(),
                zscoreCollection.find({Name: team2name}).toArray()
            ]
        )

        let orderedTeam = orderedTeams(
            data[0][0],
            data[1][0],
            data[2][0],
            data[3][0],
            data[4][0], 
            data[5][0]
        )

        return res.status(200).json(orderedTeam)
    } catch (err) {
        console.log(err)
        next(err);
    }
}

// Doesn't improve performance, is here for reference.
// Need to run redis-server from redis folder.
export const findTwoTeamsOrderedCached = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            })
        }

        let team1name = req.body.team1;
        let team2name = req.body.team2;
        let year = req.body.year;

        let tradCollection = tradDb.collection("NbaTeamStats_" + year)
        let meanCollection = meanDb.collection("NbaTeamStatsMean_" + year)
        let stdCollection = stdDb.collection("NbaTeamStatsStd_" + year)
        let zscoreCollection = zscoreDb.collection("NbaTeamStatsZscore_" + year)


        const redisKey = `AllCollections-${year}`;
        let data;
        let isCached = false;
        const cachedResult = await redisClient.get(redisKey)

        if (cachedResult) {
            isCached = true;
            data = JSON.parse(cachedResult)
        } else {

        // Promise.all runs all promises concurrently.
            data = await Promise.all(
                [
                    tradCollection.find({}).toArray(),
                    meanCollection.find({}).toArray(),
                    stdCollection.find({}).toArray(),
                    zscoreCollection.find({}).toArray(),
                ]
            )
            await redisClient.set(redisKey, JSON.stringify(data))
        }
        
        let trad1Team = data[0].find(team => {
            return team.Name === team1name
        })
        let trad2Team = data[0].find(team => {
            return team.Name === team2name
        })
        let Zscore1Team = data[3].find(team => {
            return team.Name === team1name
        })
        let Zscore2Team = data[3].find(team => {
            return team.Name === team2name
        })

        let orderedTeam = orderedTeams(
            trad1Team,
            trad2Team,
            data[1][0],
            data[2][0],
            Zscore1Team, 
            Zscore2Team
        )

        return res.status(200).json(orderedTeam)
    } catch (err) {
        console.log(err)
        next(err);
    }
};