from django.http import JsonResponse
from rest_framework.decorators import api_view
# Create your views here.

@api_view(['GET'])
def LR_pred(request):
    json = {"Error" : "Only GET Request is allowed"}

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
        if not validateGETParam(FGM, FGpercent, threeMade, FTM, ftpercent, DREB, OREB, AST, STL, BLK, TOV, PF):
            return {"Error" : "Missing or Bad Request Parameter"}

        first_name = request.GET.get("first_name")
        sort = request.GET.get("sort")
        json = {first_name : first_name,
                "sort" : sort ,
                "work" : "works"} 

    return JsonResponse(json)

def validateGETParam(FGM, FGpercent, threeMade, FTM, ftpercent, DREB, OREB, AST, STL, BLK, TOV, PF):
    params = [FGM, FGpercent, threeMade, FTM, ftpercent, DREB, OREB, AST, STL, BLK, TOV, PF]
    for param in params:
        try:
            float(param)
        except ValueError:
            return False
    return True
