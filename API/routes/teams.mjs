import express from "express";
import findTwoTeams from "../controllers/teamController.mjs";
import teamDataValidateChainMethod from "../validations/teamValidations.mjs";
import { checkSchema } from "express-validator";
import teamDataValidateSchemaBased from "../validations/teamValidations.mjs";

const router = express.Router()

router.post(
    "/",
    checkSchema(teamDataValidateSchemaBased),
    findTwoTeams
);

export default router;