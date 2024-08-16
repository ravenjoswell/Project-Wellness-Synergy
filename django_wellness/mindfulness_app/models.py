from django.db import models
from user_app.models import User 

class MentalWellBeingLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    mood = models.IntegerField()  # Scale of 1-10
    stress_level = models.IntegerField()  # Scale of 1-10
    sleep_hours = models.DecimalField(max_digits=4, decimal_places=2)  # 0.0 hours
    anxiety_level = models.IntegerField()  # Scale of 1-10
    depression_level = models.IntegerField()  # Scale of 1-10


