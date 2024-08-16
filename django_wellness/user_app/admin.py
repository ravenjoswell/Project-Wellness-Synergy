from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User

class UserAdmin(BaseUserAdmin):
    list_display = ('id', 'email', 'full_name', 'is_staff', 'is_superuser')
    search_fields = ('email', 'full_name')
    ordering = ('id',)

admin.site.register(User, UserAdmin)
