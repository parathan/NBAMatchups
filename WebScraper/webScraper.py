import pandas as pd
import requests
from bs4 import BeautifulSoup
import re
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from urllib.parse import quote_plus

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

    soup_teamStatsOpp = soup.find(name='table', attrs = {'id': 'per_game-opponent'})
    for row in soup_teamStatsOpp.find_all('tr')[1:31]:
        # Finds team object from table based on name found in the advanced table
        # to add data to the right row
        name = row.find('a').text
        index = -1
        for idx, team in enumerate(teamStats):
            if team["Name"] == name:
                index = idx
                break
        # Add Opponent Traditional Stats
        team['Opponent Field Goals'] = row.find('td', {'data-stat' :  'opp_fg'}).text
        team['Opponent Field Goals Attempted'] = row.find('td', {'data-stat' : 'opp_fga'}).text
        team['Opponent Field Goal Percentage'] = row.find('td', {'data-stat' : 'opp_fg_pct'}).text
        team['Opponent 3-point Field Goals'] = row.find('td', {'data-stat' : 'opp_fg3'}).text
        team['Opponent 3-point Field Goals Attempted'] = row.find('td', {'data-stat' : 'opp_fg3a'}).text
        team['Opponent 3-point Field Goal Percentage'] = row.find('td', {'data-stat' : 'opp_fg3_pct'}).text
        team['Opponent 2-point Field Goals'] = row.find('td', {'data-stat' : 'opp_fg2'}).text
        team['Opponent 2-point Field Goals Attempted'] = row.find('td', {'data-stat' : 'opp_fg2a'}).text
        team['Opponent 2-point Field Goal Percentage'] = row.find('td', {'data-stat' : 'opp_fg2_pct'}).text
        team['Opponent Free Throws'] = row.find('td', {'data-stat' : 'opp_ft'}).text
        team['Opponent Free Throws Attempted'] = row.find('td', {'data-stat' : 'opp_fta'}).text
        team['Opponent Free Throw Percentage'] = row.find('td', {'data-stat' : 'opp_ft_pct'}).text
        team['Opponent Offensive Rebounds'] = row.find('td', {'data-stat' : 'opp_orb'}).text
        team['Opponent Defensive Rebounds'] = row.find('td', {'data-stat' : 'opp_drb'}).text
        team['Opponent Total Rebounds'] = row.find('td', {'data-stat' : 'opp_trb'}).text
        team['Opponent Assists'] = row.find('td', {'data-stat' : 'opp_ast'}).text
        team['Opponent Steals'] = row.find('td', {'data-stat' : 'opp_stl'}).text
        team['Opponent Blocks'] = row.find('td', {'data-stat' : 'opp_blk'}).text
        team['Opponent Turnovers'] = row.find('td', {'data-stat' : 'opp_tov'}).text
        team['Opponent Personal Fouls'] = row.find('td', {'data-stat' : 'opp_pf'}).text
        team['Opponent Points'] = row.find('td', {'data-stat' : 'opp_pts'}).text

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

    soup_shootingStats = soup.find(name='table', attrs={'id' : 'shooting-team'})
    for row in soup_shootingStats.find_all('tr')[2:32]:
        name = row.find('a').text
        index = -1
        for idx, team in enumerate(teamStats):
            if team["Name"] == name:
                index = idx
                break
        
        # Add Team Shooting Stats
        teamStats[index]['Average Distance of FGA'] = row.find('td', {'data-stat' : 'avg_dist'}).text
        teamStats[index]['Percentage of FGA that are 2-Pt FGAs'] = row.find('td', {'data-stat' : 'pct_fga_fg2a'}).text
        teamStats[index]['Percentage of FGA that are 0-3 feet from basket'] = row.find('td', {'data-stat' : 'pct_fga_00_03'}).text
        teamStats[index]['Percentage of FGA that are 3-10 feet from basket'] = row.find('td', {'data-stat' : 'pct_fga_03_10'}).text
        teamStats[index]['Percentage of FGA that are 10-16 feet from basket'] = row.find('td', {'data-stat' : 'pct_fga_10_16'}).text
        teamStats[index]['Percentage of 2-Pt FGA that are 16+ feet from basket'] = row.find('td', {'data-stat' : 'pct_fga_16_xx'}).text
        teamStats[index]['Percentage of FGA that are 2-Pt FGAs'] = row.find('td', {'data-stat' : 'pct_fga_fg3a'}).text
        teamStats[index]['FG Percentage of FGA that are 0-3 feet from basket'] = row.find('td', {'data-stat' : 'fg_pct_00_03'}).text
        teamStats[index]['FG Percentage of FGA that are 3-10 feet from basket'] = row.find('td', {'data-stat' : 'fg_pct_03_10'}).text
        teamStats[index]['FG Percentage of FGA that are 10-16 feet from basket'] = row.find('td', {'data-stat' : 'fg_pct_10_16'}).text
        teamStats[index]['FG Percentage of 2-Pt FGA that are 16+ feet from basket'] = row.find('td', {'data-stat' : 'fg_pct_16_xx'}).text
        teamStats[index]['Percentage of 2-Pt FG Assisted on'] = row.find('td', {'data-stat' : 'pct_ast_fg2'}).text
        teamStats[index]['Percentage of 3-Pt FG Assisted on'] = row.find('td', {'data-stat' : 'pct_ast_fg3'}).text
        teamStats[index]['Percentage of FGA that are dunks'] = row.find('td', {'data-stat' : 'pct_fga_dunk'}).text
        teamStats[index]['Number of made dunks'] = row.find('td', {'data-stat' : 'fg_dunk'}).text
        teamStats[index]['Percentage of FGA that are layups'] = row.find('td', {'data-stat' : 'pct_fga_layup'}).text
        teamStats[index]['Number of made layups'] = row.find('td', {'data-stat' : 'fg_layup'}).text
        teamStats[index]['Percentage of 3-Pt Attempts from the corner'] = row.find('td', {'data-stat' : 'pct_fg3a_corner'}).text
        teamStats[index]['Corner 3-Pt percentage'] = row.find('td', {'data-stat' : 'fg3_pct_corner'}).text

    soup_opponentShootingStats = soup.find(name='table', attrs={'id' : 'shooting-opponent'})
    for row in soup_opponentShootingStats.find_all('tr')[2:32]:
        name = row.find('a').text
        index = -1
        for idx, team in enumerate(teamStats):
            if team["Name"] == name:
                index = idx
                break

        teamStats[index]['Opponent Average Distance of FGA'] = row.find('td', {'data-stat' : 'opp_avg_dist'}).text
        teamStats[index]['Opponent Percentage of FGA that are 2-Pt FGAs'] = row.find('td', {'data-stat' : 'opp_pct_fga_fg2a'}).text
        teamStats[index]['Opponent Percentage of FGA that are 0-3 feet from basket'] = row.find('td', {'data-stat' : 'opp_pct_fga_00_03'}).text
        teamStats[index]['Opponent Percentage of FGA that are 3-10 feet from basket'] = row.find('td', {'data-stat' : 'opp_pct_fga_03_10'}).text
        teamStats[index]['Opponent Percentage of FGA that are 10-16 feet from basket'] = row.find('td', {'data-stat' : 'opp_pct_fga_10_16'}).text
        teamStats[index]['Opponent Percentage of 2-Pt FGA that are 16+ feet from basket'] = row.find('td', {'data-stat' : 'opp_pct_fga_16_xx'}).text
        teamStats[index]['Opponent Percentage of FGA that are 2-Pt FGAs'] = row.find('td', {'data-stat' : 'opp_pct_fga_fg3a'}).text
        teamStats[index]['Opponent FG Percentage of FGA that are 0-3 feet from basket'] = row.find('td', {'data-stat' : 'opp_fg_pct_00_03'}).text
        teamStats[index]['Opponent FG Percentage of FGA that are 3-10 feet from basket'] = row.find('td', {'data-stat' : 'opp_fg_pct_03_10'}).text
        teamStats[index]['Opponent FG Percentage of FGA that are 10-16 feet from basket'] = row.find('td', {'data-stat' : 'opp_fg_pct_10_16'}).text
        teamStats[index]['Opponent FG Percentage of 2-Pt FGA that are 16+ feet from basket'] = row.find('td', {'data-stat' : 'opp_fg_pct_16_xx'}).text
        teamStats[index]['Opponent Percentage of 2-Pt FG Assisted on'] = row.find('td', {'data-stat' : 'opp_pct_ast_fg2'}).text
        teamStats[index]['Opponent Percentage of 3-Pt FG Assisted on'] = row.find('td', {'data-stat' : 'opp_pct_ast_fg3'}).text
        teamStats[index]['Opponent Percentage of FGA that are dunks'] = row.find('td', {'data-stat' : 'opp_pct_fga_dunk'}).text
        teamStats[index]['Opponent Number of made dunks'] = row.find('td', {'data-stat' : 'opp_fg_dunk'}).text
        teamStats[index]['Opponent Percentage of FGA that are layups'] = row.find('td', {'data-stat' : 'opp_pct_fga_layup'}).text
        teamStats[index]['Opponent Number of made layups'] = row.find('td', {'data-stat' : 'opp_fg_layup'}).text
        teamStats[index]['Opponent Percentage of 3-Pt Attempts from the corner'] = row.find('td', {'data-stat' : 'opp_pct_fg3a_corner'}).text
        teamStats[index]['Opponent Corner 3-Pt percentage'] = row.find('td', {'data-stat' : 'opp_fg3_pct_corner'}).text

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

    try:
        db = client['NBAMatchups']
        collection = db['NbaTeamStats_' + year]
        collection.drop()
        collection.insert_many(documents)
        print("Successfully updated NBA Team Stat Data for " + year)
    except Exception as e:
        print(e)
    # df.to_csv('teamStats.xlsx', index=False)


