// These are interfaces that will be used to accomodate the response from the /teams/orderedPercentile request

/**
 * MatchupData is an interface that contains the comparison between a two opposing stats
 * for two teams.
 */
export interface MatchupData {
    field1: string, // statistic field for first team
    field2: string, // statistic field for second team (opposite field of field1)
    percentile_difference: number, // Percentile Difference
    abs_percentile_difference: number, // Absolute Percentile Difference
    team1_percentile: number, // percentile of the first team's first stat in comparison to the rest of the leagues values
    team2_op_percentile: number, // percentile of the second team's second stat in comparison to the rest of the leagues values
    trad_difference: number, // Difference between actual values
    team1_trad: number, // value of the first team's first stat
    team2_op_trad: number, // value of the second team's second stat
    mean1: number, // average of the first stat
    mean2: number // average of the second stat
}

/**
 * OrderedPercentile packages the teamnames with the list of MatchupData comparisons.
 */
export interface OrderedPercentile {
    team1: string, // First team name
    team2: string, // Second team name
    statistics: MatchupData[]
}