from rest_framework import serializers
from .models import LR_pred

class LRObjSerializer(serializers.ModelSerializer):
	class Meta:
		model = LR_pred
		fields = ['FGM', 'FGpercent', 'threeMade', 'FTM', 'ftpercent', 'DREB', 'OREB', 'AST', 'STL', 'BLK', 'TOV', 'PF']