from django.urls import path
from .views import RecipeListView, RecipeDetailView, RecipesByCategory, AddToCookbookView, CookbookView

urlpatterns = [
    path('', RecipeListView.as_view(), name='recipe_list'),
    path('recipes/<int:recipe_id>/', RecipeDetailView.as_view(), name='recipe_detail'),  # Handles GET
    path('recipes/category/<str:category>/', RecipesByCategory.as_view(), name='recipes_by_category'),  # Handles GET
    path('cookbook/', CookbookView.as_view(), name='cookbook'),
    path('add-to-cookbook/', AddToCookbookView.as_view(), name='add_to_cookbook'),
]
