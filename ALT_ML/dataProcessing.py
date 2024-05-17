import requests


# Take data from the api route getallteams and place in the csv file
# Api needs to be running
def getAllTeamData(year: int):
    
    apiEndpoint = 'http://localhost:5050/teams/allTeams'
    data = { 
        'startYear': year,
        'endYear': year
    }

    response = requests.post(url= apiEndpoint, json=data)
    print(response.text)



getAllTeamData(2022)