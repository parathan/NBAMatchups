import { opposingStats } from "../constants/opposingStats.mjs"
/**
 * 
 * @param {Object} trad1 
 * @param {Object} trad2 
 * @param {Object} mean 
 * @param {Object} std 
 * @param {Object} Zscore1 
 * @param {Object} Zscore2 
 * @returns object containing fields team1 name, team2 name, and an array where each element contains:
 *  - field name
 *  - z score difference
 *  - z score for team 1
 *  - z score for team 2
 *  - traditional data difference
 *  - traditional data for team 1
 *  - traditional data for team 2
 *  - mean for the field
 *  - std for the field
 */
export function orderedTeams(trad1, trad2, mean, std, Zscore1, Zscore2) {
    let list = []
    for (const field in Zscore1) {
        if (field != "Name" && field != '_id' && field != 'g') {
            let difference = trad1[field] - trad2[field]
            let zdifference = Zscore1[field] - Zscore2[field]
            list.push({
                fieldName: field,
                ZscoreDifference: zdifference,
                team1Zscore: Zscore1[field],
                team2Zscpre: Zscore2[field],
                TraditionalDifference: difference,
                team1Trad: trad1[field],
                team2Trad: trad2[field],
                mean: mean[field],
                std: std[field]
            })
        }
    }

    list.sort(function(a, b) {
        return a.ZscoreDifference - b.ZscoreDifference
    })
    let returnValue = {
        team1: trad1['Name'],
        team2: trad2['Name'],
        statistics: list
    }

    return returnValue

}

/**
 * 
 * @param {Object} trad1 
 * @param {Object} trad2 
 * @param {Object} Percentile1 
 * @param {Object} Percentile2
 * @returns object containing fields team1 name, team2 name, and an array where each element contains:
 *  - field1 name
 *  - field2 name
 *  - Percentile difference
 *  - Percentile for field1 for team 1
 *  - Percentile for field2 for team 2
 *  - traditional data difference
 *  - traditional data for field1 for team 1
 *  - traditional data for field2 for team 2
 */
export function orderedPercentileTeams(trad1, trad2, Percentile1, Percentile2, mean) {
    let list = []
    let opposingFields = opposingStats()

    for (const field of opposingFields) {
        let difference = trad1[field[0]] - trad2[field[1]]
        let percentilediff = Percentile1[field[0]] - Percentile2[field[1]]
        list.push({
            field1: field[0],
            field2: field[1],
            PercentileDifference: percentilediff.toFixed(2),
            absPercentileDifference: Math.abs(percentilediff.toFixed(2)),
            team1Percentile1: Percentile1[field[0]],
            team2Percentile_Op: Percentile2[field[1]],
            TraditionalDifference: difference.toFixed(2),
            team1Trad: trad1[field[0]],
            team2Trad_Op: trad2[field[1]],
            mean1: mean[field[0]],
            mean2: mean[field[1]]
        }) 
    }

    list.sort(function(a, b) {
        return b.absPercentileDifference - a.absPercentileDifference
    })
    let returnValue = {
        team1: trad1['Name'],
        team2: trad2['Name'],
        statistics: list
    }

    return returnValue
}
