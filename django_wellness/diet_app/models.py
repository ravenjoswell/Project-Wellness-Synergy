from django.db import models
from user_app.models import User
from recipe_app.models import Recipe

class DietPlan(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    recipes = models.ManyToManyField(Recipe, through='DietPlanRecipe')

   
class DietPlanRecipe(models.Model):
    diet_plan = models.ForeignKey(DietPlan, on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    meal_time = models.CharField(max_length=50)  # breakfast, lunch, dinner
    date = models.DateField(blank=True, null=True)


class DailyDietPlan(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField()
    meals = models.ManyToManyField(Recipe, through='DailyDietPlanMeal')


class DailyDietPlanMeal(models.Model):
    daily_diet_plan = models.ForeignKey(DailyDietPlan, on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    meal_time = models.CharField(max_length=50)  # breakfast, lunch, dinner


