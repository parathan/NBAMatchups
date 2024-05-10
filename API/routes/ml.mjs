import express from "express";
import { findLRPred } from "../controllers/DjangoMlController.mjs";

import { checkSchema } from "express-validator";
import PredDataValidateSchemaBased from "../validations/predValidations.mjs";

const router = express.Router()

router.post(
    "/LR_pred",
    checkSchema(PredDataValidateSchemaBased),
    findLRPred
)

export default router;