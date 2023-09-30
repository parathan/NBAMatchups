import pandas as pd
import requests
from bs4 import BeautifulSoup
import re

url = (f'https://www.basketball-reference.com/leagues/NBA_2023.html')

res = requests.get(url)

soup = BeautifulSoup(res.content, 'lxml')
soup_teamStats = soup.find(name='table', attrs = {'id': 'per_game-team'})
teamStats = []

for row in soup_teamStats.find_all('tr')[1:31]:

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

# soup_advancedStats = soup.find(name='table', attrs={'id': 'advanced-team'})
# for row in soup_advancedStats.find_all('tr')[2:32]:
#     name = row.find('a').text
#     index = -1
#     for idx, team in enumerate(teamStats):
#         if team["Name"] == name:
#             index = idx
#             break
#     teamStats[index]['Age'] = row.find('td', {'data-stat' : 'age'}).text
#     teamStats[index]['Wins'] = row.find('td', {'data-stat' : 'wins'}).text
#     teamStats[index]['Losses'] = row.find('td', {'data-stat' : 'losses'}).text
#     teamStats[index]['Pythagorean Wins'] = row.find('td', {'data-stat' : 'wins_pyth'}).text
#     teamStats[index]['Pythagorean Losses'] = row.find('td', {'data-stat' : 'losses_pyth'}).text
#     teamStats[index]['Margin of Victory'] = row.find('td', {'data-stat' : 'mov'}).text
            
df = pd.DataFrame(teamStats)
df.to_csv('teamStats.xlsx', index=False)


