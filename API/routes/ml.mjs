import express from "express";
import { checkSchema } from "express-validator";
import { findLRPred } from "../controllers/DjangoMlController.mjs";
import PredDataValidateSchemaBased from "../validations/predValidations.mjs";

const router = express.Router()

router.get(
    "/LR_pred",
    checkSchema(PredDataValidateSchemaBased),
    findLRPred
)

export default router;