import express from "express";
import { tradDb, meanDb, stdDb, zscoreDb } from "../db/connection.mjs"
import { ObjectId } from "mongodb";

const router = express.Router()

router.post("/", async (req, res) => {
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
    // res.send(results).status(200)
});

export default router;