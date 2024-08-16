from rest_framework import serializers
from .models import Recipe, Ingredient, Nutrient, RecipeCategory, MyCookbook

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['name', 'text', 'quantity', 'measure', 'food', 'weight']

class NutrientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nutrient
        fields = ['label', 'quantity', 'unit']

class RecipeCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipeCategory
        fields = ['name']

class RecipeSerializer(serializers.ModelSerializer):
    ingredients = IngredientSerializer(many=True, required=True)
    nutritional_facts = NutrientSerializer(many=True, required=True)
    categories = RecipeCategorySerializer(many=True, required=True)

    class Meta:
        model = Recipe
        fields = [
            'id', 'uri', 'name', 'image', 'ingredients', 'diet_labels', 'health_labels', 
            'cautions', 'nutritional_facts', 'instructions', 'categories', 
            'cuisine_type', 'meal_type', 'dish_type'
        ]

    def create(self, validated_data):
        ingredients_data = validated_data.pop('ingredients')
        nutritional_facts_data = validated_data.pop('nutritional_facts')
        categories_data = validated_data.pop('categories')

        recipe = Recipe.objects.create(**validated_data)

        for ingredient_data in ingredients_data:
            ingredient, _ = Ingredient.objects.get_or_create(**ingredient_data)
            recipe.ingredients.add(ingredient)

        for nutrient_data in nutritional_facts_data:
            nutrient, _ = Nutrient.objects.get_or_create(**nutrient_data)
            recipe.nutritional_facts.add(nutrient)

        for category_data in categories_data:
            category, _ = RecipeCategory.objects.get_or_create(**category_data)
            recipe.categories.add(category)

        return recipe

class MyCookbookSerializer(serializers.ModelSerializer):
    recipe = RecipeSerializer()

    class Meta:
        model = MyCookbook
        fields = ['recipe']