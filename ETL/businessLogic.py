import pandas as pd
from webScraper import *
from dbtransactions import *
from scipy.stats import zscore
from scipy.stats import percentileofscore
from scipy.stats import norm
import constants

# TODO: Can utilize multiprocessing to run calculations in parallel
'''
For comparison Stat, percentile is most accurate using cdf function
Z score data is also stored seperately, as well as std and mean
Rankpercentile uses dataframe.rank, which may only rank the values rather than distinguish difference
'''

def writeAllStats(year: str):
    if type(year) is not str:
        raise TypeError("year is not a string")
    
    df = webScraper(year)
    
    teamDatabase = 'NBAMatchups_Team'

    tradCollection = 'NBAMatchups_Team_Traditional'
    percentileCollection = 'NBAMatchups_Team_Percentile'
    meanCollection = 'NBAMatchups_Team_Mean'

    upsertData(df, year, teamDatabase, tradCollection)
    
    # col = df.pop('Name')

    # upsertData(calcPercentile(df, col), year, teamDatabase, percentileCollection)
    # upsertData(calcMean(df), year, teamDatabase, meanCollection)

def rawData(year: str):
    """Scrape data and writes it to database

    Args:
        year (str): year to scrape data from and write data to
    """
    if type(year) is not str:
        raise TypeError("year is not a string")
    
    database = 'NBAMatchups'
    collection = 'NbaTeamStats_'
    df = webScraper(year)
    writeData(df, year, database, collection)

def calcData(year: str):
    """Scrape data and calculate statistics for it and write it to database

    Args:
        year (str): year to scrape data from and write data to
    """
    if type(year) is not str:
        raise TypeError("year is not a string")

    df = webScraper(year)
    col = df.pop('Name')
    # writeStatsToDb('RankPercentile', calcRank(df, col), year)
    writeStatsToDb('Percentile', calcPercentile(df, col), year)
    writeStatsToDb('Mean', calcMean(df), year)

def calcPercentile(df: pd.DataFrame, col: pd.Series) -> pd.DataFrame:
    """Calculates percentiles for dataframe given to it. 
        Converts to Zscore, then uses cdf to find cumulative probability

    Args:
        df (pd.DataFrame): scraped data dataframe to be calculated on

    Returns:
        pd.DataFrame: 2d dataframe with z-scores from original dataframe
    """
    if type(df) is not pd.DataFrame:
        raise TypeError("df is not a dataframe")
    
    df2 = df.apply(zscore)
    for column in df2.columns:
        if column in constants.NEGATIVE_STATS:
            df2[column] = df2[column].map(lambda x: x * -1)
    df2 = df2.map(norm.cdf).round(3)
    df2.insert(0, col.name, col)
    return df2

def calcMean(df: pd.DataFrame) -> pd.DataFrame:
    """Calculates mean of fields for dataframe given to it

    Args:
        df (pd.DataFrame): scraped data dataframe to be calculated on

    Returns:
        pd.DataFrame: 1d dataframe with mean from original dataframe
    """
    if type(df) is not pd.DataFrame:
        raise TypeError("df is not a dataframe")

    df2 = df.mean(numeric_only=True).to_frame().transpose().round(3)
    return df2

def writeStatsToDb(stat: str, df: pd.DataFrame, year: str):
    """Helper function to standardize writing to database

    Args:
        stat (str): type of stat being written to
        df (pd.DataFrame): dataframe being written to db
        year (str): year the data is taken from and being written to
    """
    if type(stat) is not str:
        raise TypeError("stat is not a string")
    if type(df) is not pd.DataFrame:
        raise TypeError("df is not a dataframe")
    if type(year) is not str:
        raise TypeError("year is not a string")

    database = 'NBAMatchups' + stat
    collection = 'NbaTeamStats' + stat + "_"
    writeData(df, year, database, collection)
    
    
    
           
    