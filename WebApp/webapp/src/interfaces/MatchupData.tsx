export interface MatchupData {
    field1: string,
    field2: string,
    PercentileDifference: string,
    absPercentileDifference: number,
    team1Percentile1: number,
    team2Percentile_Op: number,
    TraditionalDifference: string,
    team1Trad: number,
    team2Trad_Op: number,
    mean1: number,
    mean2: number
}

export interface OrderedPercentile {
    team1: string,
    team2: string,
    statistics: MatchupData[]
}