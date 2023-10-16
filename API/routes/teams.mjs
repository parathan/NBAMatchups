import express from "express";
import { tradDb, meanDb, stdDb, zscoreDb } from "../db/connection.mjs"
import { ObjectId } from "mongodb";

const router = express.Router()

router.post("/", async (req, res) => {
    let tradCollection = tradDb.collection("NbaTeamStats_2023")
    let meanCollection = meanDb.collection("NbaTeamStatsMean_2023")
    let stdCollection = stdDb.collection("NbaTeamStatsStd_2023")
    let zscoreCollection = zscoreDb.collection("NbaTeamStatsZscore_2023")

    let meanResults = await meanCollection.find({}).toArray();
    let stdResults = await stdCollection.find({}).toArray();
    
    let team1name = req.body.team1;
    let team2name = req.body.team2;
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