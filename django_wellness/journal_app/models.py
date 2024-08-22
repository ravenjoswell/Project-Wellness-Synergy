from django.db import models
from user_app.models import User
from django.utils import timezone

class JournalEntry(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField(default=timezone.now)
    entry_text = models.TextField(null=False, blank=False)  # not empty 
    mood = models.IntegerField(null=False, blank=False)  # not empty 
    gratitude_1 = models.CharField(max_length=255, null=False, blank=False)  # not empty 
    gratitude_2 = models.CharField(max_length=255, null=False, blank=False)
    gratitude_3 = models.CharField(max_length=255, null=False, blank=False)
    highlights = models.TextField(blank=True, null=True)  # option
    challenges = models.TextField(blank=True, null=True)  # option
    goals_for_tomorrow = models.TextField(blank=True, null=True)  # option
    goals_reflection = models.TextField(blank=True, null=True)  # option
    mindfulness_practice = models.TextField(blank=True, null=True)  # option
    self_care_activities = models.TextField(blank=True, null=True)  # option

    def __str__(self):
        return f"Journal Entry by {self.user.username} on {self.date}"
