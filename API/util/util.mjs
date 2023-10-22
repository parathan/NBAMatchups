function orderedTeams(Zscore1, Zscore2) {
    let list = []
    for (const field in Zscore1) {
        if (field != "Name" && field != '_id' && field != 'g') {
            let difference = Zscore1[field] - Zscore2[field]
            list.push({
                fieldName: field,
                fielddif: difference,
                team1: Zscore1[field],
                team2: Zscore2[field]
            })
        }
    }

    list.sort(function(a, b) {
        return a.fielddif - b.fielddif
    })
    console.log(list)

    return list

}

export default orderedTeams