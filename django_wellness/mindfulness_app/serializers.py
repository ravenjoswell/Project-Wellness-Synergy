from rest_framework import serializers
from .models import MentalWellBeingLog

class MentalWellBeingLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = MentalWellBeingLog
        fields = ['date', 'mood', 'stress_level', 'sleep_hours', 'anxiety_level', 'depression_level', 'additional_notes']
        extra_kwargs = {
            'mood': {'required': False, 'allow_null': True},
            'stress_level': {'required': False, 'allow_null': True},
            'sleep_hours': {'required': False, 'allow_null': True},
            'anxiety_level': {'required': False, 'allow_null': True},
            'depression_level': {'required': False, 'allow_null': True},
            'additional_notes': {'required': False, 'allow_blank': True},
        }