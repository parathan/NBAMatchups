from decouple import config
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import numpy as np
import pandas as pd
from webScraper import *
from dbtransactions import *
from scipy.stats import zscore

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
    newdf = calcStats(df)
    database = 'NBAMatchupsCalc'
    collection = 'NbaTeamStatsCalc'
    writeData(newdf, year, database, collection)

def calcStats(df: pd.DataFrame):
    col = df.pop('Name')
    df2 = df.apply(zscore)
    df2.insert(0, col.name, col)
    return df2

def businessLogic(year: str):
    CalculatedStats = []

    user = config("MONGO_USERNAME")
    password = config("MONGO_PASSWORD")

    mongoUri = "mongodb+srv://" + user + ":" + password + "@nbamatchups.ygk98ot.mongodb.net/?retryWrites=true&w=majority"
    client = MongoClient(mongoUri, server_api=ServerApi('1'))

    db = client["NBAMatchups"]
    collection = db["NbaTeamStats_" + year]
    result = list(collection.find())
    mean_dict = {"Name": "Average"}
    std_dict = {"Name": "Standard Deviation"}
    for key in result[0].keys():
        if key != "Name" and key != "_id":
            mean_dict[key] = round(sum(team[key] for team in result) / len(result), 3)
            std_dict[key] = round(np.std(list(team[key] for team in result)), 3)

    df = pd.dataframe(result)
    print(df)
    
    
    
           
    