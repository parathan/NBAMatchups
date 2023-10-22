function orderedTeams(trad1, trad2, mean, std, Zscore1, Zscore2) {
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

export default orderedTeams