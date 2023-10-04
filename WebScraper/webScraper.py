import pandas as pd
import requests
from bs4 import BeautifulSoup
import re
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from urllib.parse import quote_plus
from util import *

def webScraper(year: str):

    url = (f'https://www.basketball-reference.com/leagues/NBA_' + year + '.html')

    res = requests.get(url)

    # Getting html document using beautiful soup
    soup = BeautifulSoup(res.content, 'lxml')

    teamStats = []

    soup_teamStats = soup.find(name='table', attrs = {'id': 'per_game-team'})
    for row in soup_teamStats.find_all('tr')[1:31]:

        # Add Traditional Stats
        team = {}
        team['Name'] = row.find('a').text
        fields = ['g', 'mp', 'fg', 'fga', 'fg_pct', 'fg3', 'fg3a', 'fg3_pct',
                  'fg2', 'fg2a', 'fg2_pct', 'ft', 'fta', 'ft_pct', 'orb', 'drb',
                  'trb', 'ast', 'stl', 'blk', 'tov', 'pf', 'pts']
        for field in fields:
            team[field] = row.find('td', {'data-stat' : field}).text
        teamStats.append(team)
    
    soup_teamStatsOpp = soup.find(name='table', attrs = {'id': 'per_game-opponent'})
    for row in soup_teamStatsOpp.find_all('tr')[1:31]:
        # Finds team object from table based on name found in the advanced table
        # to add data to the right row
        name = row.find('a').text
        index = findIndex(teamStats, name)
        # Add Opponent Traditional Stats
        fields = ['opp_fg', 'opp_fga', 'opp_fg_pct', 'opp_fg3', 'opp_fg3a', 'opp_fg3_pct',
                  'opp_fg2', 'opp_fg2a', 'opp_fg2_pct', 'opp_ft', 'opp_fta', 'opp_ft_pct',
                  'opp_orb', 'opp_drb', 'opp_trb', 'opp_ast', 'opp_stl', 'opp_blk',
                  'opp_tov', 'opp_pf', 'opp_pts']
        for field in fields:
            teamStats[index][field] = row.find('td', {'data-stat' : field}).text
        


    soup_advancedStats = soup.find(name='table', attrs={'id': 'advanced-team'})
    for row in soup_advancedStats.find_all('tr')[2:32]:
        # Finds team object from table based on name found in the advanced table
        # to add data to the right row
        name = row.find('a').text
        index = findIndex(teamStats, name)
        
        # Add Advanced Stats
        fields = ['age', 'wins', 'losses', 'wins_pyth', 'losses_pyth', 'mov', 'sos',
                  'srs', 'off_rtg', 'def_rtg', 'net_rtg', 'pace', 'fta_per_fga_pct',
                  'fg3a_per_fga_pct', 'ts_pct', 'efg_pct', 'tov_pct', 'orb_pct',
                  'ft_rate', 'opp_efg_pct', 'opp_tov_pct', 'drb_pct', 'opp_ft_rate']
        for field in fields:
            teamStats[index][field] = row.find('td', {'data-stat' : field}).text

    soup_shootingStats = soup.find(name='table', attrs={'id' : 'shooting-team'})
    for row in soup_shootingStats.find_all('tr')[2:32]:
        name = row.find('a').text
        index = findIndex(teamStats, name)
        
        # Add Team Shooting Stats
        fields = ['avg_dist', 'pct_fga_fg2a', 'pct_fga_00_03', 'pct_fga_03_10', 'pct_fga_10_16',
                  'pct_fga_16_xx', 'pct_fga_fg3a', 'fg_pct_00_03', 'fg_pct_03_10', 'fg_pct_10_16', 
                  'fg_pct_16_xx', 'pct_ast_fg2', 'pct_ast_fg3', 'pct_fga_dunk', 'fg_dunk',
                  'pct_fga_layup', 'fg_layup', 'pct_fg3a_corner', 'fg3_pct_corner']
        for field in fields:
            teamStats[index][field] = row.find('td', {'data-stat' : field}).text

    soup_opponentShootingStats = soup.find(name='table', attrs={'id' : 'shooting-opponent'})
    for row in soup_opponentShootingStats.find_all('tr')[2:32]:
        name = row.find('a').text
        index = findIndex(teamStats, name)

        fields = ['opp_avg_dist', 'opp_pct_fga_fg2a', 'opp_pct_fga_00_03', 'opp_pct_fga_03_10', 'opp_pct_fga_10_16',
                  'opp_pct_fga_16_xx', 'opp_pct_fga_fg3a', 'opp_fg_pct_00_03', 'opp_fg_pct_03_10', 'opp_fg_pct_10_16', 
                  'opp_fg_pct_16_xx', 'opp_pct_ast_fg2', 'opp_pct_ast_fg3', 'opp_pct_fga_dunk', 'opp_fg_dunk',
                  'opp_pct_fga_layup', 'opp_fg_layup', 'opp_pct_fg3a_corner', 'opp_fg3_pct_corner']
        for field in fields:
            teamStats[index][field] = row.find('td', {'data-stat' : field}).text

    # converts list to dataframe            
    df = pd.DataFrame(teamStats)
    documents = df.to_dict('records')

    # Connection to MongoDB
    user = "testUser"
    password = "cRgLeYtTEnBMXMZr"
    mongoUri = "mongodb+srv://" + user + ":" + password + "@nbamatchups.ygk98ot.mongodb.net/?retryWrites=true&w=majority"
    client = MongoClient(mongoUri, server_api=ServerApi('1'))


    # Clear Collection and Add new data for mongoDB data.
    try:
        db = client['NBAMatchups']
        collection = db['NbaTeamStats_' + year]
        collection.drop()
        collection.insert_many(documents)
        print("Successfully updated NBA Team Stat Data for " + year)
    except Exception as e:
        print(e)
    

