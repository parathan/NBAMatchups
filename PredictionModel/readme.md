# Altenrative ML Strategy 

## Data PreProcessing  
This folder is for an alternative ML strategy that focuses on using average team data as the training/test data
with a new approach to the model.  

Express API needs to be running for this script to work and grab team average data

Downloads requests or other modules with py -m pip install -r requirements.txt  

Run dataProcessing.py file

Data is labelled with the later year of the season in mind ie. data labelled 2023 will be for the 2022-23 season  

finalLogisticRegressionModel.py is the script for the final model used and exported through pickle. Pickle folder contains model and scaler pickled, and feature.txt contains features used in feature selection.
