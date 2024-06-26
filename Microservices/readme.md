## Microservices

# Setup

Add go.work file with following content:  
`
go 1.22.4

use (
	./MatchupsService
	./TeamsService
)
`