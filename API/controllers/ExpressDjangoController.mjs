import axios from 'axios';
import { validationResult } from 'express-validator';
import { ExpressValidator } from "express-validator";
import { tradDb} from "../db/connection.mjs";
import "express-validator"

function pick(obj, keys) {
    return keys.reduce((acc, key) => {
        if (obj && obj.hasOwnProperty(key)) {
            acc[key] = obj[key];
        }
        return acc;
    }, {});
}

export const twoTeamFeatures = async (team1name, year) => {
    try {
        let tradCollection = tradDb.collection("NbaTeamStats_" + year)

        // Promise.all runs all promises concurrently.
        let data = await Promise.all([tradCollection.find({Name: team1name}).toArray()])
        const keysToKeep = ['fg', 'fg_pct', 'fg3', 'ft', 'ft_pct', 'drb', 'orb', 'ast', 'stl', 'blk', 'tov', 'pf'];
        const filteredData = pick(data[0][0], keysToKeep);
        return filteredData
    } catch (err) {
        return [0, err]
    }
};

export const LRTwoTeams =
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, errors: errors.array() });
            }

            let team1name = req.body.team1;
            let year = req.body.year;
            let featureData = await twoTeamFeatures(team1name, year)
            if (featureData[0] === 0){
                return res.status(400).json("Unable to Access MongoDB");;
            }
            try {
                const response = await axios.post('http://127.0.0.1:8000/LR_pred/', featureData);
                return res.status(200).json(response.data);
            } catch (error) {
                if (error.response) {
                    console.error('Error response:', error.response.data);
                    console.error('Error status:', error.response.status);
                    console.error('Error headers:', error.response.headers);
                } else if (error.request) {
                    console.error('No response received:', error.request);
                } else {
                    console.error('Error setting up request:', error.message);
                }
                if (error.code === 'ECONNABORTED' || error.message.includes('Network Error')) {
                    return res.status(503).json({ message: 'Service Unavailable. Please try again later.' });
                }
                return res.status(error.response ? error.response.status : 500).json({ message: error.message });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            return res.status(400).json({ success: false, errors: "BAD DJANGO REQUEST FROM DJANGOMLCONTROLLER" });
        }
    };