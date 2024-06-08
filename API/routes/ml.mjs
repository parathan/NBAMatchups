import express from "express";
import { checkSchema } from "express-validator";
import { findLRPred } from "../controllers/DjangoMlController.mjs";
import { LRTwoTeams } from "../controllers/ExpressDjangoController.mjs";
import PredDataValidateSchemaBased from "../validations/predValidations.mjs";
import {teamDataValidateSchemaBased} from "../validations/teamValidations.mjs";

const router = express.Router()

router.post(
    "/LR_pred",
    checkSchema(PredDataValidateSchemaBased),
    findLRPred
)

router.post(
    "/LR_pred/teams",
    checkSchema(teamDataValidateSchemaBased),
    LRTwoTeams
)

export default router;