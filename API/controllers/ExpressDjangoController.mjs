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

/**
 * This function takes an object, removes the id and name fields, and adds suffix
 * to the end of all the other fields
 * @param {object} obj - The object that needs to be modified
 * @param {string} suffix - The string added to the end of all the fields
 * @returns new object with changed suffix
 */
function renameKeysWithSuffix(obj, suffix) {
    delete obj['_id']
    delete obj['Name']
    return Object.keys(obj).reduce((acc, key) => {
        acc[`${key}${suffix}`] = obj[key];
        return acc;
    }, {});
}

/**
 * This function takes the average team data for both teams amd returns them as a single
 * object.
 * @param {string} team1name - The first team
 * @param {string} team2name - The second team
 * @param {string} year - The year in which the data on the teams was taken from
 * @returns object with both teams data
 */
export const twoTeamFeatures = async (team1name, team2name, year) => {
    try {
        let tradCollection = tradDb.collection("NbaTeamStats_" + year)
        // Promise.all runs all promises concurrently.
        let data = await Promise.all(
            [
                tradCollection.find({Name: team1name}).toArray(),
                tradCollection.find({Name: team2name}).toArray()
            ]
        )
        const team1Data = renameKeysWithSuffix(data[0][0], "_x")
        const team2Data = renameKeysWithSuffix(data[0][0], "_y")
        const combinedData = {
            ...team1Data,
            ...team2Data
        }
        return combinedData
    } catch (err) {
        return [0, err]
    }
};

/**
 * This method gets both teams average data, and passes it to the python api for processing
 * through the machine learning model, and returns the result of that prediction.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export const LRTwoTeams =
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, errors: errors.array() });
            }

            let team1name = req.body.team1;
            let team2name = req.body.team2;
            let year = req.body.year;
            let featureData = await twoTeamFeatures(team1name, team2name, year)
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