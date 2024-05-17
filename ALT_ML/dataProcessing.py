import requests
import csv


# Take data from the api route getallteams and place in the csv file
# Api needs to be running
def getAllTeamData(year: int):
    
    # Get Data from endpoint
    apiEndpoint = 'http://localhost:5050/teams/allTeams'
    data = { 
        'startYear': year,
        'endYear': year
    }

    response = requests.post(url= apiEndpoint, json=data)

    # Put Data in list of dictionaries
    dataDict = []
    for team in response.json():
        if team['teamName'] == 'MEAN':
            continue
        
        dictAdder = {}
        dictAdder['teamName'] = team['teamName']
        
        stats = team['stats'][0]['yearStats']
        for key, value in stats.items():
            if key == '_id':
                continue
            dictAdder[key] = value

        dataDict.append(dictAdder)

    keys = dataDict[0].keys()

    # Write dictionary to csv file
    with open('2022-23_TeamAverage.csv', 'w', newline='') as output_file:
        dict_writer = csv.DictWriter(output_file, keys)
        dict_writer.writeheader()
        dict_writer.writerows(dataDict)




getAllTeamData(2022)