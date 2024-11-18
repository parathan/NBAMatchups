# Microservices

## Run Microservices  
Option 1 (Recommended):  
1. Open Docker  
2. in cmd run `docker-compose build` and `docker-compose up`  

Option 2:
1. Run run.bat  

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

# Teams Service 

## Requirements  

Need to install protobuf:  

https://github.com/protocolbuffers/protobuf/releases

add to environment path

download needed go-protoc modules:  
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest

## Run proto files using this command:  

Run the generate.bat script located in the proto directory.  

(Below is individual commands)
go code: `protoc --go_out=. --go_opt=paths=source_relative --go-grpc_out=. --go-grpc_opt=paths=source_relative teams.proto`  
python code: `python -m grpc_tools.protoc -I. --python_out=. --grpc_python_out=. teams.proto`  


## Run service  
To run service enter `go run main.go` in terminal.  

## Testing  
Currently using Kreya to test the grpc calls.  

## Development
When working on the microservices, only open the miroservices folder itself and not the whole nbamatchups folder to ensure the go.work file located in the microservice works.  

When development is done and microservices is ready to be pushed to prod, can replace modules with github names instead and remove the need for a go.work file.  
