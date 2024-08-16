from django.urls import path
from .views import MentalWellBeingLogListView, MentalWellBeingLogDetailView

urlpatterns = [
    path('well-being-logs/', MentalWellBeingLogListView.as_view(), name='well_being_log_list'),
    path('well-being-logs/<int:log_id>/', MentalWellBeingLogDetailView.as_view(), name='well_being_log_detail'),  # Handles GET and DELETE
]
