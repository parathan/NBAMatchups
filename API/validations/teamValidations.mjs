import "express-validator"
import { ExpressValidator } from "express-validator";

const { body } = new ExpressValidator()

const teamDataValidateChainMethod = [
    body("team1")
    .exists({ checkFalsy: true })
    .withMessage("team1 is required"),
    body("team2")
    .exists({ checkFalsy: true })
    .withMessage("team2 is required"),
    body("year")
    .exists({ checkFalsy: true })
    .withMessage("year is required"),
]

const teamDataValidateSchemaBased = {
    team1: {
        exists: { errorMessage: "team1 required" },
        isString: { errorMessage: "team1 must be a string"}
    },
    team2: {
        exists: { errorMessage: "team2 required" }
    },
    year: {
        exists: { errorMessage: "year required" }
    }
};

export default teamDataValidateSchemaBased;