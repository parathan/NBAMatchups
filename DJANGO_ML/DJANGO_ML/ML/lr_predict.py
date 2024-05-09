import pickle
import numpy as np
import os
# save the iris classification model as a pickle file
model_pkl_file = "lr_model.pkl"  
__location__ = os.path.realpath(
    os.path.join(os.getcwd(), os.path.dirname(__file__)))

# load model from pickle file
with open(os.path.join(__location__, model_pkl_file), "rb") as file:  
    model = pickle.load(file)

# evaluate model 

#takes FGM, FGpercent, threeMade, FTM, ftpercent, DREB, OREB, AST, STL, BLK, TOV, PF as the params inside the params list
def predict(params):
    x = np.array([params])
    y_predict = model.predict_proba(x)
    return y_predict.tolist()[0]
