from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator, validate_email

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    email = models.EmailField(unique=True)
    full_name = models.CharField(
        default='unknown', 
        max_length=50, 
        validators=[
            RegexValidator(
                regex=r'^[A-Za-z]+(?:\s[A-Za-z]+)*$', 
                message='Full name must contain only letters and spaces'
            )
        ]
    )
    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name']

    objects = UserManager()

    def clean(self):
        validate_email(self.email)
        if User.objects.filter(email=self.email).exclude(pk=self.pk).exists():
            raise ValidationError('A user with this email already exists.')
