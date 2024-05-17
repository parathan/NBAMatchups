def warn(*args, **kwargs):
    pass
import warnings
warnings.warn = warn

import pickle
import numpy as np
import os
import csv
# save the iris classification model as a pickle file
model_pkl_file = "lr_model.pkl"  
__location__ = os.path.realpath(
    os.path.join(os.getcwd(), os.path.dirname(__file__)))

# load model from pickle file
with open(os.path.join(__location__, model_pkl_file), "rb") as file:  
    model = pickle.load(file)

# evaluate model 

#takes FGM, FGpercent, threeMade, FTM, ftpercent, DREB, OREB, AST, STL, BLK, TOV, PF as the params inside the params list
# def predict(params):
#     x = np.array([params])
#     y_predict = model.predict_proba(x)
#     return y_predict.tolist()[0]

#Create dictionaries to store the team average data and winning percentage from csv files
teamAverages = {}
seedPercentage = {}
with open('teamAVerages.csv') as averages_obj:
    averageReader = csv.DictReader(averages_obj)
    for row in averageReader:
        teamAverages[row['TEAM']] = [
            float(row['FGM']),
            float(row['FG%']),
            float(row['3PM']),
            float(row['FTM']),
            float(row['FT%']),
            float(row['DREB']),
            float(row['OREB']),
            float(row['AST']),
            float(row['STL']),
            float(row['BLK']),
            float(row['PF']),
            float(row['TOV']),
        ]
        seedPercentage[row['TEAM']] = float(row['WIN%'])
# print(teamAverages)

# Test accuracy of both the model method and the standings method
# Tests using average team data from 2022/23 season, and using that as input for the model, and comparing if team actually won given a game
def main():
    modelAccurate = 0
    seedingAccurate = 0
    total = 0
    with open('boxscores.csv') as file_obj: 
      
        # heading = next(file_obj) 
        # Create reader object by passing the file  
        # object to reader method 
        reader_obj = csv.DictReader(file_obj) 
        
        # Iterate over each row in the csv  
        # file using reader object 
        for row in reader_obj: 
            total += 1
            x = np.array([teamAverages[row['TEAM']]])
            oppTeam = row['MATCH UP'].replace(" vs. ", " ").replace(" @ "," ").split()[1]
            opp_x = np.array([teamAverages[oppTeam]])

            y_predict = model.predict_proba(x)
            winPercentage = y_predict.tolist()[0][0]

            yOpp_predict = model.predict_proba(opp_x)
            oppWinPercentage = yOpp_predict.tolist()[0][0]

            seedingPercentage = seedPercentage[row['TEAM']]
            oppSeedingPercentage = seedPercentage[oppTeam]

            if row['W/L'] == 'W' and winPercentage >= oppWinPercentage:
                modelAccurate +=1
            elif row['W/L'] == 'L' and winPercentage < oppWinPercentage:
                modelAccurate +=1
            if row['W/L'] == 'W' and seedingPercentage >= oppSeedingPercentage:
                seedingAccurate +=1
            elif row['W/L'] == 'L' and seedingPercentage < oppSeedingPercentage:
                seedingAccurate +=1
            if total % 100 == 0:
                print(total)
    print("Accuracy based on model: " + str(modelAccurate/total))
    print("Accuracy based on standings: " + str(seedingAccurate/total))

main()