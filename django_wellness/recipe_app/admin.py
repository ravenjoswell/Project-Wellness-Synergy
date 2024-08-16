from django.contrib import admin
from .models import Recipe, Ingredient, Nutrient, RecipeCategory, MyCookbook

class RecipeAdmin(admin.ModelAdmin):
    list_display = ('name', 'cuisine_type', 'meal_type', 'dish_type')  # Displaying relevant fields
    search_fields = ('name', 'cuisine_type', 'meal_type', 'dish_type')
    list_filter = ('categories', 'diet_labels', 'health_labels')  # Filtering based on categories and labels

class IngredientAdmin(admin.ModelAdmin):
    list_display = ('name', 'quantity', 'measure', 'food')  # Displaying the new name field
    search_fields = ('name', 'food',)

class NutrientAdmin(admin.ModelAdmin):
    list_display = ('label', 'quantity', 'unit')  # Managing Nutrients display
    search_fields = ('label',)

class RecipeCategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)  # Managing Recipe Categories
    search_fields = ('name',)

class MyCookbookAdmin(admin.ModelAdmin):
    list_display = ('user', 'recipe')  # Displaying fields related to the MyCookbook model
    search_fields = ('user__email', 'recipe__name')  # Assuming User has an email field

# Registering all models with the admin interface
admin.site.register(Recipe, RecipeAdmin)
admin.site.register(Ingredient, IngredientAdmin)
admin.site.register(Nutrient, NutrientAdmin)
admin.site.register(RecipeCategory, RecipeCategoryAdmin)
admin.site.register(MyCookbook, MyCookbookAdmin)
