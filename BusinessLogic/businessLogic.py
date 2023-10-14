from decouple import config
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import numpy as np
import pandas as pd
from webScraper import *
from dbtransactions import *
from scipy.stats import zscore

# TODO: Can utilize multiprocessing to run calculations in parallel

def rawData(year: str):
    '''
    Scrape data and writes it to database

    Args:
        year (str): year to scrape data from and write data to

    Returns:
        Nothing
    '''
    database = 'NBAMatchups'
    collection = 'NbaTeamStats_'
    df = webScraper(year)
    writeData(df, year, database, collection)

def calcData(year):
    df = webScraper(year)
    writeStatsToDb('Zscore', calcZscore(df), year)
    writeStatsToDb('Mean', calcMean(df), year)
    writeStatsToDb('Std', calcStd(df), year)

def calcZscore(df: pd.DataFrame):
    col = df.pop('Name')
    df2 = df.apply(zscore).round(3)
    df2.insert(0, col.name, col)
    return df2

def calcMean(df: pd.DataFrame):
    df2 = df.mean(numeric_only=True).to_frame().transpose().round(3)
    return df2

def calcStd(df: pd.DataFrame):
    df2 = df.std(numeric_only=True).to_frame().transpose().round(3)
    return df2

def writeStatsToDb(stat: str, df: pd.DataFrame, year: str):
    database = 'NBAMatchups' + stat
    collection = 'NbaTeamStats' + stat + "_"
    writeData(df, year, database, collection)
    
    
    
           
    