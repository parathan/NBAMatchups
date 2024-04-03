import { ExpressValidator } from "express-validator";
import { tradDb, meanDb, stdDb, zscoreDb } from "../db/connection.mjs";
import { orderedTeams } from "../util/util.mjs";
import { redisClient } from "../cache/cache.mjs";
import "express-validator"
import { teamsNames } from "../constants/teamNames.mjs";

const { validationResult } = new ExpressValidator

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
        let data = [];
        
        for (let team of teamsNames) {
            let object = {
                teamName: team,
                stats: []
            }
            data.push(object)
        }

        let meanObject = {
            teamName: "MEAN",
            stats: []
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
                    delete teamStats.Name //Removes name from individual year as it is redundant
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

export const findAllTeamsCached = async (req, res, next) => {

}