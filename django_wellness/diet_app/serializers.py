from rest_framework import serializers
from .models import DietPlan, DietPlanRecipe, DailyDietPlan, DailyDietPlanMeal
from recipe_app.serializers import RecipeSerializer
from recipe_app.models import Recipe

class DietPlanRecipeSerializer(serializers.ModelSerializer):
    recipe = RecipeSerializer(read_only=True)

    class Meta:
        model = DietPlanRecipe
        fields = ['id', 'meal_time', 'day_of_week', 'recipe']

class DietPlanSerializer(serializers.ModelSerializer):
    recipes = DietPlanRecipeSerializer(source='dietplanrecipe_set', many=True, read_only=True)

    class Meta:
        model = DietPlan
        fields = ['id', 'user', 'name', 'start_date', 'end_date', 'recipes']

    def create(self, validated_data):
        recipes_data = self.initial_data.get('recipes', [])
        diet_plan = DietPlan.objects.create(**validated_data)

        for recipe_data in recipes_data:
            recipe = Recipe.objects.get(uri=recipe_data['recipe']['uri'])
            DietPlanRecipe.objects.create(
                diet_plan=diet_plan,
                recipe=recipe,
                meal_time=recipe_data['meal_time'],
                day_of_week=recipe_data['day_of_week']
            )

        return diet_plan

class DailyDietPlanMealSerializer(serializers.ModelSerializer):
    recipe = RecipeSerializer(read_only=True)

    class Meta:
        model = DailyDietPlanMeal
        fields = ['id', 'meal_time', 'recipe']

class DailyDietPlanSerializer(serializers.ModelSerializer):
    meals = DailyDietPlanMealSerializer(source='dailydietplanmeal_set', many=True, read_only=True)

    class Meta:
        model = DailyDietPlan
        fields = ['id', 'user', 'date', 'meals']

    def create(self, validated_data):
        meals_data = self.initial_data.get('meals', [])
        daily_diet_plan = DailyDietPlan.objects.create(**validated_data)

        for meal_data in meals_data:
            recipe = Recipe.objects.get(uri=meal_data['recipe']['uri'])
            DailyDietPlanMeal.objects.create(
                daily_diet_plan=daily_diet_plan,
                recipe=recipe,
                meal_time=meal_data['meal_time']
            )

        return daily_diet_plan
