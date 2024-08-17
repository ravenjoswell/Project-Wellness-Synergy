from rest_framework import serializers
from .models import DietPlan, DietPlanRecipe, DailyDietPlan, DailyDietPlanMeal
from recipe_app.models import Recipe  # Import the Recipe model
from recipe_app.serializers import RecipeSerializer  # Import the existing RecipeSerializer

class DietPlanRecipeSerializer(serializers.ModelSerializer):
    recipe = RecipeSerializer(read_only=True)  # Serialize the recipe correctly

    class Meta:
        model = DietPlanRecipe
        fields = ['id', 'meal_time', 'date', 'recipe']

class DietPlanSerializer(serializers.ModelSerializer):
    recipes = DietPlanRecipeSerializer(source='dietplanrecipe_set', many=True, read_only=True)

    class Meta:
        model = DietPlan
        fields = ['id', 'user', 'name', 'recipes']

    def create(self, validated_data):
        recipes_data = self.initial_data.get('recipes', [])
        diet_plan = DietPlan.objects.create(**validated_data)

        for recipe_data in recipes_data:
            recipe = Recipe.objects.get(uri=recipe_data['recipe']['uri'])
            DietPlanRecipe.objects.create(diet_plan=diet_plan, recipe=recipe, **recipe_data)

        return diet_plan

class DailyDietPlanMealSerializer(serializers.ModelSerializer):
    recipe = RecipeSerializer(read_only=True)  # Correctly serialize the recipe

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
            DailyDietPlanMeal.objects.create(daily_diet_plan=daily_diet_plan, recipe=recipe, **meal_data)

        return daily_diet_plan
