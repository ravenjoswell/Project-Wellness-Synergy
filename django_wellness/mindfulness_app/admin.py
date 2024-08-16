from django.contrib import admin
from .models import MentalWellBeingLog

class MentalWellBeingLogAdmin(admin.ModelAdmin):
    list_display = ('user', 'date', 'mood', 'stress_level', 'sleep_hours')
    search_fields = ('user__email', 'mood')
    list_filter = ('date', 'mood', 'stress_level')

admin.site.register(MentalWellBeingLog, MentalWellBeingLogAdmin)
