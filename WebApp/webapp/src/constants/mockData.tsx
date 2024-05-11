// This mockdata is used to mock the responses for the API calls that are used within the webapp
import { TotalTeamData } from "../interfaces/TotalTeamData"
import { OrderedPercentile } from "../interfaces/MatchupData"
import _mockDataJson from './mockDataJson.json'
import _orderedPercentileData from './orderedPercentileData.json'

// allTeamsMockData is mock data for the /teams/allTeams route
export const allTeamsMockData: TotalTeamData[] = _mockDataJson as TotalTeamData[];

// orderedPercentileMockData is mock data for the /teams/OrderedPercentile route
export const orderedPercentileMockData: OrderedPercentile = _orderedPercentileData as OrderedPercentile;
