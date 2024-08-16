from rest_framework import serializers
from .models import DietPlan, DietPlanRecipe, DailyDietPlan, DailyDietPlanMeal

class DietPlanRecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DietPlanRecipe
        fields = ['id', 'diet_plan', 'recipe', 'meal_time', 'date']

class DietPlanSerializer(serializers.ModelSerializer):
    recipes = DietPlanRecipeSerializer(many=True, read_only=True)

    class Meta:
        model = DietPlan
        fields = ['id', 'user', 'name', 'recipes']

    def create(self, validated_data):
        # Custom create method to handle nested DietPlanRecipe objects
        recipes_data = self.initial_data.get('recipes', [])
        diet_plan = DietPlan.objects.create(**validated_data)

        for recipe_data in recipes_data:
            DietPlanRecipe.objects.create(diet_plan=diet_plan, **recipe_data)

        return diet_plan

class DailyDietPlanMealSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyDietPlanMeal
        fields = ['id', 'daily_diet_plan', 'recipe', 'meal_time']

class DailyDietPlanSerializer(serializers.ModelSerializer):
    meals = DailyDietPlanMealSerializer(many=True, read_only=True)

    class Meta:
        model = DailyDietPlan
        fields = ['id', 'user', 'date', 'meals']

    def create(self, validated_data):
        # Custom create method to handle nested 'DailyDietPlanMeal' objects
        meals_data = self.initial_data.get('meals', [])
        daily_diet_plan = DailyDietPlan.objects.create(**validated_data)

        for meal_data in meals_data:
            DailyDietPlanMeal.objects.create(daily_diet_plan=daily_diet_plan, **meal_data)

        return daily_diet_plan
