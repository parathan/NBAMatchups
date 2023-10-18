import "express-validator"
import { teamsNames } from "../strings/teamNames.mjs";

const isYear = (year) => {
    let newYear = Number(year);
    if (newYear >= 2019 && newYear <= 2023) {
        return true;
    } else {
        return false;
    }
}

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