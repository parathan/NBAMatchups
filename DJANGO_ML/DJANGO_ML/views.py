from django.http import JsonResponse
from rest_framework.decorators import api_view
from .ML import lr_predict
from .ML import constants

# Create your views here.
@api_view(['POST'])
def LR_pred(request):
    if request.method == 'POST':
        data = request.data
        params = []

        features = constants.FEATURE_LIST
        print(data)
        for feature in features:
            params.append(data[feature])
        
        if validatePOSTParam(params):
            return JsonResponse({"Error": "Bad or Missing Request Parameter"}, status=400)
        
        try:
            # Perform prediction
            print(params)
            predict = lr_predict.predict(params)
            response = {
                "prob_loss": predict[0],
                "prob_win": predict[1]
            }
            return JsonResponse(response)
        except Exception as e:
            return JsonResponse({"Error": str(e)}, status=500)

    return JsonResponse({"Error": "LR_pred.Views.DJANGO_ML has not performed"}, status=500)

def validatePOSTParam(params):
    all(isinstance(item, (int, float)) for item in params)
