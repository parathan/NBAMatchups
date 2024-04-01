import { ExpressValidator } from "express-validator";
import { tradDb, meanDb, stdDb, zscoreDb } from "../db/connection.mjs";
import { orderedTeams } from "../util/util.mjs";
import { redisClient } from "../cache/cache.mjs";
import "express-validator"
import { teamsNames } from "../constants/teamNames.mjs";

const { validationResult } = new ExpressValidator

/*
    returns different traditional and zscore data for both teams given
    and mean and std for league in general.
*/
export const findTwoTeams = async (req, res, next) => {
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

        let concurResults = {
            team1Traditional: data[0][0],
            team2Traditional: data[1][0],
            mean: data[2][0],
            std: data[3][0],
            team1Zscore: data[4][0],
            team2Zscore: data[5][0]
        }

        return res.status(200).json(concurResults)
    } catch (err) {
        next(err);
    }
};

/*
    returns different traditional and zscore data for both teams given
    and mean and std for league in general.
    Use Redis caching to improve performance.
    Need to run redis-server from redis folder.
*/
export const findTwoTeamsCached = async (req, res, next) => {
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


        // TODO: #2 
        const redisKey = `AllCollections-${year}`;
        let data;
        let isCached = false;
        var cachedResult;
        try {
            cachedResult = await redisClient.get(redisKey)
        } catch (err) {
            return res.status(500).json({error : "Redis server is not running"})
        }
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

        let concurResults = {
            team1Traditional: trad1Team,
            team2Traditional: trad2Team,
            mean: data[1][0],
            std: data[2][0],
            team1Zscore: Zscore1Team,
            team2Zscore: Zscore2Team
        }

        return res.status(200).json(concurResults)
    } catch (err) {
        console.log(err)
        next(err);
    }
};

/**
 * 
 * Returns data for all teams within the given years, as well
 * as the mean for the statistics in those years as well
 */
export const findAllTeams = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            })
        }

        let startYear = req.body.startYear; // Has to be number, not string
        let endYear = req.body.endYear; // Has to be number, not string

        // Set up response array with teamnames and mean as elements
        var data = [];
        
        for (let team of teamsNames) {
            let object = {
                teamName: team,
                stats: []
            }
            data.push(object)
        }

        let meanObject = {
            teamName: "MEAN",
            teamStats: []
        }
        data.push(meanObject)

        // Go through each year, make mongo request to database for data for that year for all teams.
        // Process returning result to append the correct teams stats from mongo response to the data
        // array set up above as well as the mean data.
        for (let i = startYear; i <= endYear; i++) {
            let year = i.toString()
            let tradCollection = tradDb.collection("NbaTeamStats_" + year)
            let meanCollection = meanDb.collection("NbaTeamStatsMean_" + year)

            //TODO #4
            let mongoData = await Promise.all(
                [
                    tradCollection.find({}).toArray(),
                    meanCollection.find({}).toArray()
                ]
            )

            for (let team of data) {
                if (team.teamName !== "MEAN") {
                    let teamStats = mongoData[0].find(givenTeam => {
                        return givenTeam.Name === team.teamName
                    })
                    let yearlyStats = {
                        year: year,
                        yearStats: teamStats
                    }
                    team.stats.push(yearlyStats)
                } else {
                    let mean = mongoData[1][0];
                    let meanStats = {
                        year: year,
                        yearStats: mean
                    }
                    team.stats.push(meanStats)
                }
            }
        }

        return res.status(200).json(data)

    } catch (err) {
        console.log(err)
        next(err);
    }
}

// export default findTwoTeams;