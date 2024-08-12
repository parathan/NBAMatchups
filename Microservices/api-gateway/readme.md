## API Gateway  

To run the api gateway, enter `go run main.go` in the terminal.  

# Routes

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