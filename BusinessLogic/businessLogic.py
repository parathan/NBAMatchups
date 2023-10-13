from decouple import config
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import numpy as np
import pandas as pd
from webScraper import *
from dbtransactions import *

def rawData(year: str):
    df = webScraper(year)
    uploadRawData(df, year)

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
    
    
    
           
    