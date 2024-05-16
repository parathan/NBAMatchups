import "express-validator"

/**
 * Schema to validate post body request
 * Checks that variables are non-empty and numeric.
 */
const PredDataValidateSchemaBased = {
    FGM : {
        exists: { errorMessage: "FGM required" },
        isNumeric: { errorMessage: "FGM must be a numeric value" }
    },
    FGpercent : {
        exists: { errorMessage: "FGpercent required" },
        isNumeric: { errorMessage: "FGpercent must be a numeric value" }
    },
    threeMade : {
        exists: { errorMessage: "threeMade required" },
        isNumeric: { errorMessage: "threeMade must be a numeric value" }
    },
    FTM : {
        exists: { errorMessage: "FTM required" },
        isNumeric: { errorMessage: "FTM must be a numeric value" }
    },
    ftpercent : {
        exists: { errorMessage: "ftpercent required" },
        isNumeric: { errorMessage: "ftpercent must be a numeric value" }
    },
    DREB : {
        exists: { errorMessage: "DREB required" },
        isNumeric: { errorMessage: "DREB must be a numeric value" }
    },
    OREB : {
        exists: { errorMessage: "OREB required" },
        isNumeric: { errorMessage: "OREB must be a numeric value" }
    },
    AST : {
        exists: { errorMessage: "AST required" },
        isNumeric: { errorMessage: "AST must be a numeric value" }
    },
    STL : {
        exists: { errorMessage: "STL required" },
        isNumeric: { errorMessage: "STL must be a numeric value" }
    },
    BLK : {
        exists: { errorMessage: "BLK required" },
        isNumeric: { errorMessage: "BLK must be a numeric value" }
    },
    TOV : {
        exists: { errorMessage: "TOV required" },
        isNumeric: { errorMessage: "TOV must be a numeric value" }
    },
    PF : {
        exists: { errorMessage: "PF required" },
        isNumeric: { errorMessage: "PF must be a numeric value" }
    }
};

export default PredDataValidateSchemaBased;