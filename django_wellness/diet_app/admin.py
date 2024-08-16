from django.contrib import admin
from .models import DietPlan, DailyDietPlan, DietPlanRecipe, DailyDietPlanMeal

class DietPlanRecipeInline(admin.TabularInline):
    model = DietPlanRecipe
    extra = 1

class DietPlanAdmin(admin.ModelAdmin):
    list_display = ('user', 'name')
    search_fields = ('user__email', 'name')
    inlines = [DietPlanRecipeInline]

class DailyDietPlanMealInline(admin.TabularInline):
    model = DailyDietPlanMeal
    extra = 1

class DailyDietPlanAdmin(admin.ModelAdmin):
    list_display = ('user', 'date')
    search_fields = ('user__email',)
    inlines = [DailyDietPlanMealInline]

admin.site.register(DietPlan, DietPlanAdmin)
admin.site.register(DailyDietPlan, DailyDietPlanAdmin)
