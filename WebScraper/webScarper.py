import pandas as pd
import requests
from bs4 import BeautifulSoup
import re
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from urllib.parse import quote_plus

url = (f'https://www.basketball-reference.com/leagues/NBA_2023.html')

res = requests.get(url)

# Getting html document using beautiful soup
soup = BeautifulSoup(res.content, 'lxml')
soup_teamStats = soup.find(name='table', attrs = {'id': 'per_game-team'})
teamStats = []

for row in soup_teamStats.find_all('tr')[1:31]:

    # Add Traditional Stats
    team = {}
    team['Name'] = row.find('a').text
    team['Games Played'] = row.find('td', {'data-stat' : 'g'}).text
    team['Minutes Played'] = row.find('td', {'data-stat' : 'mp'}).text
    team['Field Goals'] = row.find('td', {'data-stat' :  'fg'}).text
    team['Field Goals Attempted'] = row.find('td', {'data-stat' : 'fga'}).text
    team['Field Goal Percentage'] = row.find('td', {'data-stat' : 'fg_pct'}).text
    team['3-point Field Goals'] = row.find('td', {'data-stat' : 'fg3'}).text
    team['3-point Field Goals Attempted'] = row.find('td', {'data-stat' : 'fg3a'}).text
    team['3-point Field Goal Percentage'] = row.find('td', {'data-stat' : 'fg3_pct'}).text
    team['2-point Field Goals'] = row.find('td', {'data-stat' : 'fg2'}).text
    team['2-point Field Goals Attempted'] = row.find('td', {'data-stat' : 'fg2a'}).text
    team['2-point Field Goal Percentage'] = row.find('td', {'data-stat' : 'fg2_pct'}).text
    team['Free Throws'] = row.find('td', {'data-stat' : 'ft'}).text
    team['Free Throws Attempted'] = row.find('td', {'data-stat' : 'fta'}).text
    team['Free Throw Percentage'] = row.find('td', {'data-stat' : 'ft_pct'}).text
    team['Offensive Rebounds'] = row.find('td', {'data-stat' : 'orb'}).text
    team['Defensive Rebounds'] = row.find('td', {'data-stat' : 'drb'}).text
    team['Total Rebounds'] = row.find('td', {'data-stat' : 'trb'}).text
    team['Assists'] = row.find('td', {'data-stat' : 'ast'}).text
    team['Steals'] = row.find('td', {'data-stat' : 'stl'}).text
    team['Blocks'] = row.find('td', {'data-stat' : 'blk'}).text
    team['Turnovers'] = row.find('td', {'data-stat' : 'tov'}).text
    team['Personal Fouls'] = row.find('td', {'data-stat' : 'pf'}).text
    team['Points'] = row.find('td', {'data-stat' : 'pts'}).text
    teamStats.append(team)

soup_advancedStats = soup.find(name='table', attrs={'id': 'advanced-team'})
for row in soup_advancedStats.find_all('tr')[2:32]:
    # Finds team object from table based on name found in the advanced table
    # to add data to the right row
    name = row.find('a').text
    index = -1
    for idx, team in enumerate(teamStats):
        if team["Name"] == name:
            index = idx
            break
    
    # Add Advanced Stats
    teamStats[index]['Age'] = row.find('td', {'data-stat' : 'age'}).text
    teamStats[index]['Wins'] = row.find('td', {'data-stat' : 'wins'}).text
    teamStats[index]['Losses'] = row.find('td', {'data-stat' : 'losses'}).text
    teamStats[index]['Pythagorean Wins'] = row.find('td', {'data-stat' : 'wins_pyth'}).text
    teamStats[index]['Pythagorean Losses'] = row.find('td', {'data-stat' : 'losses_pyth'}).text
    teamStats[index]['Margin of Victory'] = row.find('td', {'data-stat' : 'mov'}).text
    teamStats[index]['Strength of Schedule'] = row.find('td', {'data-stat' : 'sos'}).text
    teamStats[index]['Simple Rating System'] = row.find('td', {'data-stat' : 'srs'}).text
    teamStats[index]['Offensive Rating'] = row.find('td', {'data-stat' : 'off_rtg'}).text
    teamStats[index]['Defensive Rating'] = row.find('td', {'data-stat' : 'def_rtg'}).text
    teamStats[index]['Net Rating'] = row.find('td', {'data-stat' : 'net_rtg'}).text
    teamStats[index]['Pace'] = row.find('td', {'data-stat' : 'pace'}).text
    teamStats[index]['Free Throw Attempt Rate'] = row.find('td', {'data-stat' : 'fta_per_fga_pct'}).text
    teamStats[index]['3-Point Attempt Rate'] = row.find('td', {'data-stat' : 'fg3a_per_fga_pct'}).text
    teamStats[index]['True Shooting Percentage'] = row.find('td', {'data-stat' : 'ts_pct'}).text
    teamStats[index]['Effective Field Goal Percentage'] = row.find('td', {'data-stat' : 'efg_pct'}).text
    teamStats[index]['Turnover Percentage'] = row.find('td', {'data-stat' : 'tov_pct'}).text
    teamStats[index]['Offensive Rebound Percentage'] = row.find('td', {'data-stat' : 'orb_pct'}).text
    teamStats[index]['Free Throws Per Field Goal Attempt'] = row.find('td', {'data-stat' : 'ft_rate'}).text
    teamStats[index]['OPponent effective Field Goal Percentage'] = row.find('td', {'data-stat' : 'opp_efg_pct'}).text
    teamStats[index]['Opponent Turnover Percentage'] = row.find('td', {'data-stat' : 'opp_tov_pct'}).text
    teamStats[index]['Defensive Rebound Percentage'] = row.find('td', {'data-stat' : 'drb_pct'}).text
    teamStats[index]['Opponent Free Throws Per Field Goal Attempt'] = row.find('td', {'data-stat' : 'opp_ft_rate'}).text
    
# converts list to dataframe            
df = pd.DataFrame(teamStats)
documents = df.to_dict('records')

# Connection to MongoDB
user = "testUser"
password = "cRgLeYtTEnBMXMZr"
mongoUri = "mongodb+srv://" + user + ":" + password + "@nbamatchups.ygk98ot.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(mongoUri, server_api=ServerApi('1'))

# try:
#     client.admin.command('ping')
#     print("Pinged your deployment. You successfully connected to MongoDB!")
# except Exception as e:
#     print(e)

# Clear Collection and Add new data for mongoDB data.
db = client['NBAMatchups']
collection = db['NbaTeamStats']
collection.drop()
collection.insert_many(documents)

# df.to_csv('teamStats.xlsx', index=False)


