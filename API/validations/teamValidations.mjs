import "express-validator"
import { teamsNames } from "../constants/teamNames.mjs";

/**
 * Checks if year is within given range.
 * @param {string} year : year to be checked if in range.
 * @returns True if year within range, false otherwise.
 */
const isYear = (year) => {
    let newYear = Number(year);
    if (newYear >= 2019 && newYear <= 2023) {
        return true;
    } else {
        return false;
    }
}

/**
 * Schema to validate post body request
 * Checks that teams are non-empty and strings, and are valid team names.
 * Checks that year is non-empty and a string, and within required range.
 */
const teamDataValidateSchemaBased = {
    team1: {
        exists: { errorMessage: "team1 required" },
        isIn:{
            options: [teamsNames],
            errorMessage: "Team1 name is not valid"
        },
        isString: { errorMessage: "team1 must be a string" }
    },
    team2: {
        exists: { errorMessage: "team2 required" },
        isIn:{
            options: [teamsNames],
            errorMessage: "Team2 name is not valid"
        },
        isString: { errorMessage: "team2 must be a string" }
    },
    year: {
        exists: { errorMessage: "year required" },
        isString: { errorMessage: "year must be a string" },
        isYear: { 
            custom: isYear,
            errorMessage: "year is not within range" 
        }
    }
};



export default teamDataValidateSchemaBased;