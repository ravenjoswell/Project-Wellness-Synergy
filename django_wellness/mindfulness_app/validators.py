from django.core.exceptions import ValidationError

def validate_scale(value):
    if not (1 <= value <= 10):
        raise ValidationError('This field must be between 1 and 10.')
