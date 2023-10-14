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
    """Scrape data and writes it to database

    Args:
        year (str): year to scrape data from and write data to
    """
    database = 'NBAMatchups'
    collection = 'NbaTeamStats_'
    df = webScraper(year)
    writeData(df, year, database, collection)

def calcData(year: str):
    """Scrape data and calculate statistics for it and write it to database

    Args:
        year (str): year to scrape data from and write data to
    """
    df = webScraper(year)
    writeStatsToDb('Zscore', calcZscore(df), year)
    writeStatsToDb('Mean', calcMean(df), year)
    writeStatsToDb('Std', calcStd(df), year)

def calcZscore(df: pd.DataFrame) -> pd.DataFrame:
    """Calculates z-scores for dataframe given to it

    Args:
        df (pd.DataFrame): scraped data dataframe to be calculated on

    Returns:
        pd.DataFrame: 2d dataframe with z-scores from original dataframe
    """
    col = df.pop('Name')
    df2 = df.apply(zscore).round(3)
    df2.insert(0, col.name, col)
    return df2

def calcMean(df: pd.DataFrame) -> pd.DataFrame:
    """Calculates mean of fields for dataframe given to it

    Args:
        df (pd.DataFrame): scraped data dataframe to be calculated on

    Returns:
        pd.DataFrame: 1d dataframe with mean from original dataframe
    """
    df2 = df.mean(numeric_only=True).to_frame().transpose().round(3)
    return df2

def calcStd(df: pd.DataFrame) -> pd.DataFrame:
    """Calculates standard deviation of fields for dataframe given to it

    Args:
        df (pd.DataFrame): scraped data dataframe to be calculated on

    Returns:
        pd.DataFrame: 1d dataframe with standard deviation from original dataframe
    """
    df2 = df.std(numeric_only=True).to_frame().transpose().round(3)
    return df2

def writeStatsToDb(stat: str, df: pd.DataFrame, year: str):
    """Helper function to standardize writing to database

    Args:
        stat (str): type of stat being written to
        df (pd.DataFrame): dataframe being written to db
        year (str): year the data is taken from and being written to
    """
    database = 'NBAMatchups' + stat
    collection = 'NbaTeamStats' + stat + "_"
    writeData(df, year, database, collection)
    
    
    
           
    