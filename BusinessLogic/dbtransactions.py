from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from decouple import config
import pandas as pd

def writeData(df: pd.DataFrame, year: str, database: str, collection: str):
    '''
    Writes panda dataframe to mongo database to
    collection named by given year

    Args:
        df (pd.DataFrame): Panda Dataframe to be written to db
        year (str): year of data taken to be used for name
        database (str): database written to
        collection (str): collection + year is collection written to
    
    Returns:
        Nothing
    '''
    documents = df.to_dict('records')

    # Connection to MongoDB
    user = config('MONGO_USERNAME')
    password = config('MONGO_PASSWORD')
    
    mongoUri = "mongodb+srv://" + user + ":" + password + "@nbamatchups.ygk98ot.mongodb.net/?retryWrites=true&w=majority"
    client = MongoClient(mongoUri, server_api=ServerApi('1'))


    # Clear Collection and Add new data for mongoDB data.
    try:
        db = client[database]
        collection = db[collection + year]
        collection.drop()
        collection.insert_many(documents)
        print("Successfully updated NBA Team Stat Data for " + year)
    except Exception as e:
        print(e)