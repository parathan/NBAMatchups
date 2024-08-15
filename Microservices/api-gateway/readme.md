# API Gateway  

To run the api gateway, enter `go run main.go` in the terminal.  
Ensure that the redis server is running prior to running the api gateway, ensuring routes utilizing the cache work as expected.  

## Routes

**GetTwoTeams**:  
http://localhost:8080/api/v1/teams/twoteams  
Example JSON body input:  
{
  "team1": "Toronto Raptors",
  "team2": "Sacramento Kings",
  "year": 2020
}  

**GetTwoTeamsOrdered**:  
http://localhost:8080/api/v1/teams/twoteamsordered  
Example JSON body input:  
{
  "team1": "Toronto Raptors",
  "team2": "Sacramento Kings",
  "year": 2020
}  

**GetAllTeams**:  
http://localhost:8080/api/v1/teams/allteams  
Example JSON body input:  
{
    "startYear": 2019,
    "endYear": 2023
}  

**GetTwoTeamsCached**:  
http://localhost:8080/api/v1/teams/twoteamscached  
Example JSON body input:  
{
  "team1": "Toronto Raptors",
  "team2": "Sacramento Kings",
  "year": 2020
}  

**GetTwoTeamsOrderedCached**:  
http://localhost:8080/api/v1/teams/twoteamsorderedcached  
Example JSON body input:  
{
  "team1": "Toronto Raptors",
  "team2": "Sacramento Kings",
  "year": 2020
}  

**GetAllTeamsCached**:  
http://localhost:8080/api/v1/teams/allteamscached  
Example JSON body input:  
{
    "startYear": 2019,
    "endYear": 2023
}  