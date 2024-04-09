import { TotalTeamData } from "../interfaces/TotalTeamData"
import { OrderedPercentile } from "../interfaces/MatchupData"
import _mockDataJson from './mockDataJson.json'
import _orderedPercentileData from './orderedPercentileData.json'

export const allTeamsMockData: TotalTeamData[] = _mockDataJson as TotalTeamData[];
export const orderedPercentileMockData: OrderedPercentile = _orderedPercentileData as OrderedPercentile;
