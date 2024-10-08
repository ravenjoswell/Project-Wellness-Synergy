from django.urls import path
from .views import DietPlanListView, DietPlanDetailView, DailyDietPlanListView, DailyDietPlanDetailView, AddToDietPlanView, WeeklyLogView, RemoveFromDietPlanView

urlpatterns = [
    path('diet-plans/', DietPlanListView.as_view(), name='diet_plan_list'),
    path('diet-plans/<int:diet_plan_id>/', DietPlanDetailView.as_view(), name='diet_plan_detail'),  # GET and DELETE
    path('daily-diet-plans/', DailyDietPlanListView.as_view(), name='daily_diet_plan_list'),
    path('daily-diet-plans/<int:daily_diet_plan_id>/', DailyDietPlanDetailView.as_view(), name='daily_diet_plan_detail'),
    path('add-to-diet/', AddToDietPlanView.as_view(), name='add_to_diet'),  # GET and DELETE 
    path('remove-from-diet/<int:diet_plan_meal_id>/', RemoveFromDietPlanView.as_view(), name='remove_from_diet'),
    path('weekly-log/', WeeklyLogView.as_view(), name='weekly_log'), 
]
