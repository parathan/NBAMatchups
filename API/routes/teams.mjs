import express from "express";
import { findTwoTeams, findTwoTeamsOrdered } from "../controllers/teamController.mjs";
import { check, checkSchema } from "express-validator";
import teamDataValidateSchemaBased from "../validations/teamValidations.mjs";

const router = express.Router()

/**
 * /teams:
 *  post:
 *      summary: Retrieve data from two teams given from collection of year given
 *      request body: team1: string, team2: string, year: string
 *      returns: Gives both team raw data, both team z-score data, average and std data for the league
 */
router.post(
    "/",
    checkSchema(teamDataValidateSchemaBased),
    findTwoTeams
);

router.post(
    "/orderedStats",
    checkSchema(teamDataValidateSchemaBased),
    findTwoTeamsOrdered
)

router.post(
    "/cached",
    checkSchema(teamDataValidateSchemaBased),
    findTwoTeams
)

export default router;