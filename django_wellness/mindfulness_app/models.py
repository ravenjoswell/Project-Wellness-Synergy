from django.db import models
from user_app.models import User 
from django.utils import timezone

class MentalWellBeingLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField(default=timezone.now)
    mood = models.IntegerField()  # 1-10
    stress_level = models.IntegerField()  # 1-10
    sleep_hours = models.DecimalField(max_digits=4, decimal_places=2) 
    anxiety_level = models.IntegerField()  # 1-10
    depression_level = models.IntegerField()  # 1-10
    additional_notes = models.TextField(blank=True)
    


