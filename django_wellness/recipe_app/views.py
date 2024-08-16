from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_201_CREATED, HTTP_204_NO_CONTENT
from .models import Recipe, MyCookbook, Ingredient, Nutrient, RecipeCategory
from .serializers import RecipeSerializer, MyCookbookSerializer
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
import requests
from django.conf import settings
from rest_framework.authentication import TokenAuthentication


class RecipeListView(APIView):

    def get(self, request):
        app_id = settings.EDAMAM_APP_ID
        app_key = settings.EDAMAM_APP_KEY
        query = request.GET.get('query', '')
        diet = request.GET.get('diet', '')
        allergies = request.GET.get('allergies', '')
        next_page_url = request.GET.get('next', '')

        # Determine API URL based on   paginating or doing an initial search
        if next_page_url:
            api_url = next_page_url
        else:
            api_url = f"https://api.edamam.com/api/recipes/v2?type=public&q={query}&app_id={app_id}&app_key={app_key}"
            if diet:
                api_url += f"&diet={diet}"
            if allergies:
                api_url += f"&health={allergies}"

        try:
            response = requests.get(api_url)
            response.raise_for_status()
            data = response.json()

            # Save recipes to database,initial search and pagination
            for hit in data['hits']:
                recipe_data = hit['recipe']
                Recipe.objects.get_or_create(
                    uri=recipe_data['uri'],
                    defaults={
                        'name': recipe_data['label'],
                        'image': recipe_data['image'][:5000],  # Truncate if too long
                        'diet_labels': ', '.join(recipe_data.get('dietLabels', []))[:255],
                        'health_labels': ', '.join(recipe_data.get('healthLabels', []))[:255],
                        'cautions': ', '.join(recipe_data.get('cautions', []))[:255],
                        'instructions': recipe_data.get('url', ''),
                        'cuisine_type': ', '.join(recipe_data.get('cuisineType', []))[:255],
                        'meal_type': ', '.join(recipe_data.get('mealType', []))[:255],
                        'dish_type': ', '.join(recipe_data.get('dishType', []))[:255],
                    }
                )

            response_data = {
                'hits': data['hits'],
                'next': data['_links'].get('next', {}).get('href', None),  # Get the next page URL if available
            }

            return Response(response_data, status=HTTP_200_OK)

        except requests.exceptions.RequestException as e:
            return Response({"error": str(e)}, status=HTTP_400_BAD_REQUEST)

class RecipeDetailView(APIView):
    def get(self, request, recipe_id):
        try:
            recipe = Recipe.objects.get(id=recipe_id)
            ser_recipe = RecipeSerializer(recipe)
            return Response(ser_recipe.data, status=HTTP_200_OK)
        except Recipe.DoesNotExist:
            return Response({'detail': 'Recipe not found'}, status=HTTP_400_BAD_REQUEST)

class RecipesByCategory(APIView):
    def get(self, request, category):
        recipes = Recipe.objects.filter(categories__name__iexact=category)
        ser_recipe = RecipeSerializer(recipes, many=True)
        return Response(ser_recipe.data, status=HTTP_200_OK)


class AddToCookbookView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        recipe_uri = request.data.get('uri')

        try:
            recipe = Recipe.objects.get(uri=recipe_uri)
            MyCookbook.objects.get_or_create(user=user, recipe=recipe)
            return Response({'message': 'Recipe added to cookbook'}, status=HTTP_201_CREATED)
        except Recipe.DoesNotExist:
            return Response({"error": "Recipe not found"}, status=HTTP_400_BAD_REQUEST)

class CookbookView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        cookbook = MyCookbook.objects.filter(user=user)
        serializer = MyCookbookSerializer(cookbook, many=True)
        return Response(serializer.data)