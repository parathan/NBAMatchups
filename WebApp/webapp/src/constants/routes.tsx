// These constants are for the API routes that are used within the webapp
export const allTeams = '/teams/allTeams';
export const orderedPerentile = '/teams/OrderedPercentile';
export const avgData = '/teams';
export const allTeamsCached = '/teams/allTeamsCached';
export const orderedPerentileCached = '/teams/cachedOrderedPercentile';
export const pred_LR = '/ml/LR_pred/teams';

// These constants are for the API routes that are used within the webapp by the microservices
export const allTeamsMicroservice = '/api/v1/teams/allteamscached';
export const orderedPerentileMicroservice = '/api/v1/teams/twoteamsorderedcached';
export const predictionMicroservice = '/api/v1/prediction/cached';