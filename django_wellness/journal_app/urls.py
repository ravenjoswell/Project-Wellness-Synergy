from django.urls import path
from .views import JournalEntryListView, JournalEntryDetailView

urlpatterns = [
    path('journal-entries/', JournalEntryListView.as_view(), name='journal_entry_list'),
    path('journal-entries/<int:journal_entry_id>/', JournalEntryDetailView.as_view(), name='journal_entry_detail'),  # Handles GET and DELETE
]
