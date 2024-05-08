from django.db import models

# Create your models here.
class LR_pred(models.Model):
    FGM = models.DecimalField(max_digits=8, decimal_places=5)
    FGpercent = models.DecimalField(max_digits=8, decimal_places=5) 
    threeMade = models.DecimalField(max_digits=8, decimal_places=5)
    FTM = models.DecimalField(max_digits=8, decimal_places=5)
    ftpercent = models.DecimalField(max_digits=8, decimal_places=5)
    DREB = models.DecimalField(max_digits=8, decimal_places=5)
    OREB = models.DecimalField(max_digits=8, decimal_places=5)
    AST = models.DecimalField(max_digits=8, decimal_places=5)
    STL = models.DecimalField(max_digits=8, decimal_places=5)
    BLK = models.DecimalField(max_digits=8, decimal_places=5)
    TOV = models.DecimalField(max_digits=8, decimal_places=5)
    PF = models.DecimalField(max_digits=8, decimal_places=5)

    def __str__(self):
        return self.title