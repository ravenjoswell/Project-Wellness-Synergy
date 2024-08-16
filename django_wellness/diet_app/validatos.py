from django.core.exceptions import ValidationError

def validate_meal_time(value):
    valid_meal_times = ['breakfast', 'lunch', 'dinner', 'snack']
    if value.lower() not in valid_meal_times:
        raise ValidationError(f'{value} is not a valid meal time. Choose from {valid_meal_times}.')
