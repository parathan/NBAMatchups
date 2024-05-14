from django.http import JsonResponse
from rest_framework.decorators import api_view
from .ML import lr_predict
# Create your views here.

@api_view(['GET'])
def LR_pred(request):
    response = {"Error" : "LR_pred.Views.DJANGO_ML has not performed"}

    if request.method == 'GET':
        FGM = request.GET.get("FGM")
        FGpercent = request.GET.get("FGpercent")
        threeMade = request.GET.get("threeMade")
        FTM = request.GET.get("FTM")
        ftpercent = request.GET.get("ftpercent")
        DREB = request.GET.get("DREB")
        OREB = request.GET.get("OREB")
        AST = request.GET.get("AST")
        STL = request.GET.get("STL")
        BLK = request.GET.get("BLK")
        TOV = request.GET.get("TOV")
        PF = request.GET.get("PF")
        params = [FGM, FGpercent, threeMade, FTM, ftpercent, DREB, OREB, AST, STL, BLK, TOV, PF]
        if not validateGETParam(params):
            return JsonResponse({"Error" : "Bad or Missing Request Parameter"})

        params = list(map(float, params))
        predict = lr_predict.predict(params)
        response = {
            "prob_loss" : predict[0],
            "prob_win" : predict[1]
        }

    return JsonResponse(response)

def validateGETParam(params):
    for param in params:
        try:
            float(param)
        except:
            return False
    return True
