from django.urls import path
from .views import DietPlanListView, DietPlanDetailView, DailyDietPlanListView, DailyDietPlanDetailView, AddToDietPlanView

urlpatterns = [
    path('diet-plans/', DietPlanListView.as_view(), name='diet_plan_list'),
    path('diet-plans/<int:diet_plan_id>/', DietPlanDetailView.as_view(), name='diet_plan_detail'),  # Handles GET and DELETE
    path('daily-diet-plans/', DailyDietPlanListView.as_view(), name='daily_diet_plan_list'),
    path('daily-diet-plans/<int:daily_diet_plan_id>/', DailyDietPlanDetailView.as_view(), name='daily_diet_plan_detail'),
      path('add-to-diet/', AddToDietPlanView.as_view(), name='add_to_diet'),  # Handles GET and DELETE if needed
]
 