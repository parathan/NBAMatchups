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
            FGM: req.body.FGM,
            FGpercent: req.body.FGpercent,
            threeMade: req.body.threeMade,
            FTM: req.body.FTM,
            ftpercent: req.body.ftpercent,
            DREB: req.body.DREB,
            OREB: req.body.OREB,
            AST: req.body.AST,
            STL: req.body.STL,
            BLK: req.body.BLK,
            TOV: req.body.TOV,
            PF: req.body.PF
        }

        const response = await axios.get('http://127.0.0.1:8000/LR_pred/', {params});
    
        // Process the response data
        console.log('Response data:', response.data);
        return res.status(200).json(concurResults)
      } 
    catch (error) {
        // Handle errors
        console.error('Error fetching data:', error);
        next(error)
        return res.status(400).json({success: false, errors: "BAD DJANGO REQUEST FROM DJANGOMLCONTROLLER",})
      }
}