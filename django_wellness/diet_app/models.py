from django.db import models
from user_app.models import User
from recipe_app.models import Recipe
from .validatos import validate_meal_time
from datetime import timedelta
from django.utils import timezone

class DietPlan(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    start_date = models.DateField(default=timezone.now)
    end_date = models.DateField(default=timezone.now() + timedelta(days=7))
    recipes = models.ManyToManyField(Recipe, through='DietPlanRecipe')

    def __str__(self):
        return f"{self.name} - {self.start_date} to {self.end_date}"

class DietPlanRecipe(models.Model):
    diet_plan = models.ForeignKey(DietPlan, on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    meal_time = models.CharField(max_length=50, validators=[validate_meal_time])
    day_of_week = models.CharField(max_length=9, choices=[
        ('Monday', 'Monday'),
        ('Tuesday', 'Tuesday'),
        ('Wednesday', 'Wednesday'),
        ('Thursday', 'Thursday'),
        ('Friday', 'Friday'),
        ('Saturday', 'Saturday'),
        ('Sunday', 'Sunday'),
    ], default='Monday')

    def __str__(self):
        return f"{self.day_of_week} - {self.meal_time}: {self.recipe.name}"

class DailyDietPlan(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField()
    meals = models.ManyToManyField(Recipe, through='DailyDietPlanMeal')

    def __str__(self):
        return f"Daily Plan for {self.user.username} on {self.date}"

class DailyDietPlanMeal(models.Model):
    daily_diet_plan = models.ForeignKey(DailyDietPlan, on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    meal_time = models.CharField(max_length=50, validators=[validate_meal_time])

    def __str__(self):
        return f"{self.meal_time}: {self.recipe.name} on {self.daily_diet_plan.date}"

class WeeklyLogEntry(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    reflection = models.TextField()
    goals_for_next_week = models.TextField()
    challenges = models.TextField()
    highlights = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)
