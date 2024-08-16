from django.db import models
from user_app.models import User

class Ingredient(models.Model):
    name = models.CharField(max_length=255)
    text = models.TextField()
    quantity = models.FloatField(default=0.0)
    measure = models.CharField(max_length=100, blank=True, null=True)
    food = models.CharField(max_length=255, default="Unknown")
    weight = models.FloatField(blank=True, null=True)

    class Meta:
        unique_together = ('name', 'text', 'quantity', 'measure', 'food', 'weight')

class Nutrient(models.Model):
    label = models.CharField(max_length=255)
    quantity = models.FloatField()
    unit = models.CharField(max_length=50)

    class Meta:
        unique_together = ('label', 'quantity', 'unit')

class RecipeCategory(models.Model):
    name = models.CharField(max_length=255)

class Recipe(models.Model):
    uri = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    image = models.URLField(max_length=5000, blank=True, null=True)
    ingredients = models.ManyToManyField(Ingredient)
    diet_labels = models.CharField(max_length=1000, blank=True, null=True)
    health_labels = models.CharField(max_length=1000, blank=True, null=True)
    cautions = models.CharField(max_length=255, blank=True, null=True)
    nutritional_facts = models.ManyToManyField(Nutrient, related_name='recipes')
    instructions = models.TextField(blank=True, null=True)
    categories = models.ManyToManyField(RecipeCategory)
    cuisine_type = models.CharField(max_length=255, blank=True, null=True)
    meal_type = models.CharField(max_length=255, blank=True, null=True)
    dish_type = models.CharField(max_length=255, blank=True, null=True)

class MyCookbook(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'recipe')
