import { ExpressValidator } from "express-validator";
import { tradDb, meanDb, stdDb, zscoreDb } from "../db/connection.mjs";
import "express-validator"

const { validationResult } = new ExpressValidator

const findTwoTeams = async (req, res, next) => {
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

        let meanResults = await meanCollection.find({}).toArray();
        let stdResults = await stdCollection.find({}).toArray();
        

        let team1 = await tradCollection.find({Name: team1name}).toArray();
        let team2 = await tradCollection.find({Name: team2name}).toArray();
        let team1Zscore = await zscoreCollection.find({Name: team1name}).toArray();
        let team2Zscore = await zscoreCollection.find({Name: team2name}).toArray();

        let results = {
            team1Traditional: team1,
            team2Traditional: team2,
            mean: meanResults,
            std: stdResults,
            team1Zscore: team1Zscore,
            team2Zscore: team2Zscore
        }
        return res.status(200).json(results)
    } catch (err) {
        next(err);
    }
};

export default findTwoTeams;