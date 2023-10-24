import express from "express";
import { findTwoTeams, findTwoTeamsCached } from "../controllers/teamController.mjs";
import { findTwoTeamsOrdered, findTwoTeamsOrderedCached } from "../controllers/orderedController.mjs";
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

/**
 * /teams:
 *  post:
 *      summary: Retrieve data from two teams given from collection of year given ordered
 *          difference in Zscores
 *      request body: team1: string, team2: string, year: string
 *      returns: Gives array of data, with each element representing field, containing
 *          - traditional data
 *          - Zscore data
 *          - difference in traditional data
 *          - difference in Zscore data
 *          - mean data
 *          - std data
 *          Orders data by difference in Zscore
 */
router.post(
    "/orderedStats",
    checkSchema(teamDataValidateSchemaBased),
    findTwoTeamsOrdered
)

/**
 * /teams:
 *  post:
 *      summary: Retrieve data from two teams given from collection of year given.
 *          Uses redis caching to improve performance.
 *      request body: team1: string, team2: string, year: string
 *      returns: Gives both team raw data, both team z-score data, average and std data for the league
 */
router.post(
    "/cached",
    checkSchema(teamDataValidateSchemaBased),
    findTwoTeamsCached
)

/**
 * /teams:
 *  post:
 *      summary: Retrieve data from two teams given from collection of year given ordered
 *          difference in Zscores.
 *          Uses redis caching to improve performance.
 *      request body: team1: string, team2: string, year: string
 *      returns: Gives array of data, with each element representing field, containing
 *          - traditional data
 *          - Zscore data
 *          - difference in traditional data
 *          - difference in Zscore data
 *          - mean data
 *          - std data
 *          Orders data by difference in Zscore
 */
router.post(
    "/cachedOrdered",
    checkSchema(teamDataValidateSchemaBased),
    findTwoTeamsOrderedCached
)

export default router;