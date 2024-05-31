import pickle
import numpy as np
import os


model_pkl_file = "pipelineModel.pkl"  
__location__ = os.path.realpath(
    os.path.join(os.getcwd(), os.path.dirname(__file__)))

# load model from pickle file
with open(os.path.join(__location__, model_pkl_file), "rb") as file:  
    logistic_model = pickle.load(file)



def predict(params):
    x = np.array([params])
    y_predict = logistic_model.predict_proba(x)
    return y_predict.tolist()[0]

def getFeatures():
    features = []
    file = open('features.txt', 'r')
    lines = file.readlines()

    for line in lines:
        features.append(str(line).strip())
    return features
