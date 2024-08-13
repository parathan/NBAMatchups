'pip install example' to install dependencies:
django
djangorestframework
numpy
scikit-learn
scipy

To run:
python manage.py runserver

Example Postman Get Request:
http://127.0.0.1:8000/LR_pred/?FGM=43&FGpercent=49.4&threeMade=17&FTM=14&ftpercent=77.8&DREB=42&OREB=12&AST=33&STL=7&BLK=4&TOV=18&PF=18

Should return:

{
    "prob_loss": 0.01238308785343023,
    "prob_win": 0.9876169121465698
}