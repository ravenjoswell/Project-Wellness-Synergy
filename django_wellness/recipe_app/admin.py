from django.contrib import admin
from .models import Recipe, Ingredient, Nutrient, RecipeCategory, MyCookbook

class RecipeAdmin(admin.ModelAdmin):
    list_display = ('name', 'cuisine_type', 'meal_type', 'dish_type')  
    search_fields = ('name', 'cuisine_type', 'meal_type', 'dish_type')
    list_filter = ('categories', 'diet_labels', 'health_labels')  

class IngredientAdmin(admin.ModelAdmin):
    list_display = ('name', 'quantity', 'measure', 'food') 
    search_fields = ('name', 'food',)

class NutrientAdmin(admin.ModelAdmin):
    list_display = ('label', 'quantity', 'unit')  
    search_fields = ('label',)

class RecipeCategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)  
    search_fields = ('name',)

class MyCookbookAdmin(admin.ModelAdmin):
    list_display = ('user', 'recipe')  
    search_fields = ('user__email', 'recipe__name')  


admin.site.register(Recipe, RecipeAdmin)
admin.site.register(Ingredient, IngredientAdmin)
admin.site.register(Nutrient, NutrientAdmin)
admin.site.register(RecipeCategory, RecipeCategoryAdmin)
admin.site.register(MyCookbook, MyCookbookAdmin)
