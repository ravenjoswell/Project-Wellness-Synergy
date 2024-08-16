from django.contrib import admin
from .models import JournalEntry

class JournalEntryAdmin(admin.ModelAdmin):
    list_display = ('user', 'date', 'mood')
    search_fields = ('user__email', 'mood')
    list_filter = ('date', 'mood')

admin.site.register(JournalEntry, JournalEntryAdmin)
