from rest_framework import serializers
from .models import MentalWellBeingLog

class MentalWellBeingLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = MentalWellBeingLog
        fields = ['id', 'user', 'date', 'mood', 'stress_level', 'sleep_hours', 'anxiety_level', 'depression_level']
