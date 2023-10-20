import pandas as pd
import requests
from bs4 import BeautifulSoup
import re
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from urllib.parse import quote_plus
from util import *
from decouple import config
import sys

def webScraper(year: str) -> pd.DataFrame:
    '''
    Scrapes data from basketball reference from the given year.
    Saves Data to MongoDB

    Args:
        year (str): the year that the data will be taken from
    
    Returns:
        panda dataframe
    '''

    url = bbrefUrl(year)

    try:
        res = requests.get(url)
    except:
        raise Exception(f"Error connecting to url:{url}")

    # Getting html document using beautiful soup
    soup = BeautifulSoup(res.content, 'lxml')

    teamStats = []

    traditionalFields = ['g', 'mp', 'fg', 'fga', 'fg_pct', 'fg3', 'fg3a', 'fg3_pct',
                         'fg2', 'fg2a', 'fg2_pct', 'ft', 'fta', 'ft_pct', 'orb', 'drb',
                         'trb', 'ast', 'stl', 'blk', 'tov', 'pf', 'pts']
    oppTraditionalFields = ['opp_fg', 'opp_fga', 'opp_fg_pct', 'opp_fg3', 'opp_fg3a', 'opp_fg3_pct',
                            'opp_fg2', 'opp_fg2a', 'opp_fg2_pct', 'opp_ft', 'opp_fta', 'opp_ft_pct',
                            'opp_orb', 'opp_drb', 'opp_trb', 'opp_ast', 'opp_stl', 'opp_blk',
                            'opp_tov', 'opp_pf', 'opp_pts']
    advancedFields = ['age', 'wins', 'losses', 'wins_pyth', 'losses_pyth', 'mov', 'sos',
                      'srs', 'off_rtg', 'def_rtg', 'net_rtg', 'pace', 'fta_per_fga_pct',
                      'fg3a_per_fga_pct', 'ts_pct', 'efg_pct', 'tov_pct', 'orb_pct',
                      'ft_rate', 'opp_efg_pct', 'opp_tov_pct', 'drb_pct', 'opp_ft_rate']
    shootingFields = ['avg_dist', 'pct_fga_fg2a', 'pct_fga_00_03', 'pct_fga_03_10', 'pct_fga_10_16',
                      'pct_fga_16_xx', 'pct_fga_fg3a', 'fg_pct_00_03', 'fg_pct_03_10', 'fg_pct_10_16', 
                      'fg_pct_16_xx', 'pct_ast_fg2', 'pct_ast_fg3', 'pct_fga_dunk', 'fg_dunk',
                      'pct_fga_layup', 'fg_layup', 'pct_fg3a_corner', 'fg3_pct_corner']
    oppShootingFields = ['opp_avg_dist', 'opp_pct_fga_fg2a', 'opp_pct_fga_00_03', 'opp_pct_fga_03_10', 'opp_pct_fga_10_16',
                         'opp_pct_fga_16_xx', 'opp_pct_fga_fg3a', 'opp_fg_pct_00_03', 'opp_fg_pct_03_10', 'opp_fg_pct_10_16', 
                         'opp_fg_pct_16_xx', 'opp_pct_ast_fg2', 'opp_pct_ast_fg3', 'opp_pct_fga_dunk', 'opp_fg_dunk',
                         'opp_pct_fga_layup', 'opp_fg_layup', 'opp_pct_fg3a_corner', 'opp_fg3_pct_corner']
    
    try:
        fieldAdder(soup, 'per_game-team', 1, 31, traditionalFields, False, teamStats)
        fieldAdder(soup, 'per_game-opponent', 1, 31, oppTraditionalFields, True, teamStats)
        fieldAdder(soup, 'advanced-team', 2, 32, advancedFields, True, teamStats)
        fieldAdder(soup, 'shooting-team', 2, 32, shootingFields, True, teamStats)
        fieldAdder(soup, 'shooting-opponent', 2, 32, oppShootingFields, True, teamStats)
    except:
        raise Exception("Error with web scraper")

    # converts list to dataframe            
    df = pd.DataFrame(teamStats)
    return df

def fieldAdder(soup: BeautifulSoup, tableName: str, start: int, end: int, fields, teamExists: bool, teamStats: list):
    '''
    Data is scraped from the given tables and added/updated to the teamStats list

    Args:
        soup (BeautifulSoup): BeautifulSoup object that contains page html data
        tableName (str): Name of the table id that needs to be extracted from the soup
        start (int): Starting row of the table where the data begins
        end (int): Ending row of the table where the data ends
        teamExists (bool): whether teamExists within teamStats list
        teamStats (list): List of team objects where data is updated to
    
    Returns:
        Nothing
    '''
    soup_stats = soup.find(name='table', attrs = {'id': tableName})
    for row in soup_stats.find_all('tr')[start:end]:
        team = {}
        name = row.find('a').text
        if not teamExists:
            team["Name"] = name
            for field in fields:
                team[field] = float(row.find('td', {'data-stat' : field}).text)
            teamStats.append(team)
        else:
            index = findIndex(teamStats, name)
            if index != -1:
                for field in fields:
                    teamStats[index][field] = float(row.find('td', {'data-stat' : field}).text)
            else:
                raise Exception("Could not find team")

    

