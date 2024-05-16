import { ExpressValidator } from "express-validator";
import "express-validator"
import axios from "axios";

const { validationResult } = new ExpressValidator

/*
    returns different traditional and zscore data for both teams given
    and mean and std for league in general.
*/
export const findLRPred = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            })
        }

        const params = {
            FGM: req.query.FGM,
            FGpercent: req.query.FGpercent,
            threeMade: req.query.threeMade,
            FTM: req.query.FTM,
            ftpercent: req.query.ftpercent,
            DREB: req.query.DREB,
            OREB: req.query.OREB,
            AST: req.query.AST,
            STL: req.query.STL,
            BLK: req.query.BLK,
            TOV: req.query.TOV,
            PF: req.query.PF
        }

        try {
            const response = await axios.get('http://127.0.0.1:8000/LR_pred/', { params });
            return res.status(200).json(response.data)
          } catch (error) {
            if (error.response) {
              // The server responded with a status code outside the range of 2xx
              console.error('Error response:', error.response.data);
              console.error('Error status:', error.response.status);
              console.error('Error headers:', error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              console.error('No response received:', error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.error('Error setting up request:', error.message);
            }
            if (error.code === 'ECONNABORTED' || error.message.includes('Network Error')) {
              return {
                status: 503,
                message: 'Service Unavailable. Please try again later.'
              };
            }
            // Handle other types of errors accordingly
            return {
              status: error.response ? error.response.status : 500,
              message: error.message
            };
          }
      } 
    catch (error) {
        // Handle errors
        console.error('Error fetching data:', error);
        return res.status(400).json({success: false, errors: "BAD DJANGO REQUEST FROM DJANGOMLCONTROLLER",})
      }
}