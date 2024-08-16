from django.db import models
from user_app.models import User

class JournalEntry(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    entry_text = models.TextField(null=False, blank=False)  # Non-empty 
    mood = models.IntegerField(null=False, blank=False)  # Non-empty 
    gratitude_1 = models.CharField(max_length=255, null=False, blank=False)  # Non-empty 
    gratitude_2 = models.CharField(max_length=255, null=False, blank=False)
    gratitude_3 = models.CharField(max_length=255, null=False, blank=False)
    highlights = models.TextField(blank=True, null=True)  # Optional 
    challenges = models.TextField(blank=True, null=True)  # Optional 
    goals_for_tomorrow = models.TextField(blank=True, null=True)  # Optional 
    goals_reflection = models.TextField(blank=True, null=True)  # Optional 
    mindfulness_practice = models.TextField(blank=True, null=True)  # Optional 
    self_care_activities = models.TextField(blank=True, null=True)  # Optional 

    def __str__(self):
        return f"Journal Entry by {self.user.username} on {self.date}"
