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
    '''

    if type(df) is not pd.DataFrame:
        raise TypeError("df is not a dataframe")
    if type(year) is not str:
        raise TypeError("year is not a string")
    if type(database) is not str:
        raise TypeError("database is not a string")
    if type(collection) is not str:
        raise TypeError("collection is not a string")

    documents = df.to_dict('records')

    # Connection to MongoDB
    user = config('MONGO_USERNAME')
    password = config('MONGO_PASSWORD')
    
    mongoUri = "mongodb+srv://" + user + ":" + password + "@nbamatchups.ygk98ot.mongodb.net/?retryWrites=true&w=majority"
    try:
        client = MongoClient(mongoUri, server_api=ServerApi('1'))
    except Exception as e:
        print(e)


    # Clear Collection and Add new data for mongoDB data.
    try:
        db = client[database]
        collectionName = collection + year
        collection = db[collectionName]
        collection.drop()
        collection.insert_many(documents)
        print("Successfully updated " + collectionName + " in " + database)
    except Exception as e:
        print(e)

def upsertData(df: pd.DataFrame, year: str, databaseName: str, collectionName: str):
    if type(df) is not pd.DataFrame:
        raise TypeError("df is not a dataframe")
    if type(year) is not str:
        raise TypeError("year is not a string")
    if type(databaseName) is not str:
        raise TypeError("database is not a string")
    if type(collectionName) is not str:
        raise TypeError("collection is not a string")
    
    documents = df.to_dict('records')

    # Connection to MongoDB
    user = config('MONGO_USERNAME')
    password = config('MONGO_PASSWORD')
    
    mongoUri = "mongodb+srv://" + user + ":" + password + "@nbamatchups.ygk98ot.mongodb.net/?retryWrites=true&w=majority"
    try:
        client = MongoClient(mongoUri, server_api=ServerApi('1'))
    except Exception as e:
        print(e)


    # Clear Collection and Add new data for mongoDB data.
    try:
        db = client[databaseName]
        collection = db[collectionName]
        for element in documents:
            collection.replace_one({'Name': element['Name'], 'year': element['year']}, element, upsert=True)   
        print("Successfully updated " + collectionName + " in " + databaseName)
    except Exception as e:
        print(e)