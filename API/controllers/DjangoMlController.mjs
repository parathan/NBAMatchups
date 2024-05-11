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

        const response = await axios.get('http://127.0.0.1:8000/LR_pred/', {params});
    
        // Process the response data
        console.log('Response data:', response.data);
        return res.status(200).json(response.data)
      } 
    catch (error) {
        // Handle errors
        console.error('Error fetching data:', error);
        return res.status(400).json({success: false, errors: "BAD DJANGO REQUEST FROM DJANGOMLCONTROLLER",})
      }
}