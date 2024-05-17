import requests
import csv
import constants
import pandas as pd

# Take data from the api route getallteams and place in the csv file
# Api needs to be running
def getAllTeamData(year: int):
    """The function takes all the team average data from the Express API and places it in a csv file

    Args:
        year (int): The year of the data we will be taking
    """
    
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
        dictAdder['teamName'] = constants.TEAM_ABR_MAPPING[team['teamName']] # team['teamName']
        
        stats = team['stats'][0]['yearStats']
        for key, value in stats.items():
            if key == '_id':
                continue
            dictAdder[key] = value

        dataDict.append(dictAdder)

    keys = dataDict[0].keys()

    # Write dictionary to csv file
    file = 'Data\\' + str(year) + '\\TeamAverage_' + str(year) + '.csv'
    with open(file, 'w', newline='') as output_file:
        dict_writer = csv.DictWriter(output_file, keys)
        dict_writer.writeheader()
        dict_writer.writerows(dataDict)

# def seperateBoxScoreData():
#     """Alters box score data by seperating matchup data into two teams and only include teams,
#     who wins and the dates
#     """
    
#     file = 'boxscores2023.csv'
#     newFile = 'newBoxScores2023.csv'

#     dataDict = []

#     with open(file) as file_obj:
#         reader_obj = csv.DictReader(file_obj)
#         for row in reader_obj:
#             dictAdder = {}
#             dictAdder['FirstTeam'] = row['TEAM']
#             dictAdder['SecondTeam'] = row['MATCH UP'].replace(" vs. ", " ").replace(" @ "," ").split()[1]
#             dictAdder['Date'] = row['GAME DATE']
#             dictAdder['W/L'] = row['W/L']
#             dataDict.append(dictAdder)
    
#     keys = dataDict[0].keys()

#     with open(newFile, 'w', newline='') as output_file:
#         dict_writer = csv.DictWriter(output_file, keys)
#         dict_writer.writeheader()
#         dict_writer.writerows(dataDict)

def seperateBoxScoreDataNoDups(year: int):
    """Alters box score data by seperating matchup data into two teams and only include teams,
    who wins and the dates. Ensures that no duplicate games are included

    Args:
        year (int): year used for file naming conventions
    """
    strYear = str(year)
    file = 'Data\\' + strYear + '\\boxscores' + strYear + '.csv'
    newFile = 'Data\\' + strYear + '\\newboxscores' + strYear + '_nodups.csv'

    dataDict = []
    repeats = set()

    with open(file) as file_obj:
        reader_obj = csv.DictReader(file_obj)
        for row in reader_obj:
            # Create dictionary element
            dictAdder = {}
            dictAdder['FirstTeam'] = row['TEAM']
            dictAdder['SecondTeam'] = row['MATCH UP'].replace(" vs. ", " ").replace(" @ "," ").split()[1]
            dictAdder['Date'] = row['GAME DATE']
            dictAdder['W/L'] = row['W/L']

            # set value for checking duplicates
            first = dictAdder['FirstTeam']
            second  = dictAdder['SecondTeam']
            teamsCombined = first + second if first < second else second + first
            teamsCombined += dictAdder['Date']

            if teamsCombined in repeats:
                continue
            else:
                repeats.add(teamsCombined)
                dataDict.append(dictAdder)
    
    keys = dataDict[0].keys()

    with open(newFile, 'w', newline='') as output_file:
        dict_writer = csv.DictWriter(output_file, keys)
        dict_writer.writeheader()
        dict_writer.writerows(dataDict)

def joinCsvFiles(year: int):
    """Left joins the averages for both teams into the boxscore csv and outputs a new csv with the joined data

    Args:
        year (int): year used for file naming conventions
    """
    strYear = str(year)
    nbaTeamAverages = 'Data\\' + str(year) + '\\TeamAverage_' + str(year) + '.csv'
    nbaBoxScores = 'Data\\' + strYear + '\\newboxscores' + strYear + '_nodups.csv'

    boxscores = pd.read_csv(nbaBoxScores)
    averages = pd.read_csv(nbaTeamAverages)

    output = pd.merge(boxscores, averages, how='left', left_on='FirstTeam', right_on='teamName')
    output2 = pd.merge(output, averages, how='left', left_on='SecondTeam', right_on='teamName')

    outputFile = 'Data\\' + str(year) + '\\FinalData_' + str(year) + '.csv'
    output2.to_csv(outputFile, sep=',')
    

def main():
    year = 2023
    getAllTeamData(2023)
    seperateBoxScoreDataNoDups(year)
    joinCsvFiles(year)

main()