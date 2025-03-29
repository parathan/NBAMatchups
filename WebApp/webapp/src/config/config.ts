export function getAPIURL() {
    let prodFlag = process.env.REACT_APP_PROD === "true";
    if (prodFlag) {
        return process.env.REACT_APP_API_URL_MICRO_REMOTE;
    } else {
        return process.env.REACT_APP_API_URL_MICRO_LOCAL;
    }
}