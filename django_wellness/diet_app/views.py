from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_204_NO_CONTENT
from .models import DietPlan, DailyDietPlan, DietPlanRecipe, DailyDietPlanMeal
from .serializers import DietPlanSerializer, DailyDietPlanSerializer
from recipe_app.models import Recipe
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from user_app.models import User


class DietPlanListView(APIView):
    def get(self, request):
        diet_plans = DietPlan.objects.all()
        serializer = DietPlanSerializer(diet_plans, many=True)
        return Response(serializer.data, status=HTTP_200_OK)

    def post(self, request):
        serializer = DietPlanSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

class DietPlanDetailView(APIView):
    def get(self, request, diet_plan_id):
        try:
            diet_plan = DietPlan.objects.get(id=diet_plan_id, user=request.user)
            serializer = DietPlanSerializer(diet_plan)
            return Response(serializer.data, status=HTTP_200_OK)
        except DietPlan.DoesNotExist:
            return Response({"error": "Diet Plan not found"}, status=HTTP_400_BAD_REQUEST)
        
    def delete(self, request, diet_plan_id):
        try:
            diet_plan = DietPlan.objects.get(id=diet_plan_id, user=request.user)
            diet_plan.delete()
            return Response(status=HTTP_204_NO_CONTENT)
        except DietPlan.DoesNotExist:
            return Response({"error": "Diet Plan not found"}, status=HTTP_400_BAD_REQUEST)

class DailyDietPlanListView(APIView):
    def get(self, request):
        daily_diet_plans = DailyDietPlan.objects.all()
        serializer = DailyDietPlanSerializer(daily_diet_plans, many=True)
        return Response(serializer.data, status=HTTP_200_OK)

    def post(self, request):
        serializer = DailyDietPlanSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

class DailyDietPlanDetailView(APIView):
    def get(self, request, daily_diet_plan_id):
        try:
            daily_diet_plan = DailyDietPlan.objects.get(id=daily_diet_plan_id, user=request.user)
            serializer = DailyDietPlanSerializer(daily_diet_plan)
            return Response(serializer.data, status=HTTP_200_OK)
        except DailyDietPlan.DoesNotExist:
            return Response({"error": "Daily Diet Plan not found"}, status=HTTP_400_BAD_REQUEST)


class AddToDietPlanView(APIView):
    @method_decorator(login_required)
    def post(self, request):
        uri = request.data.get('uri')
        meal_time = request.data.get('meal_time')
        date = request.data.get('date')

        # Ensure all fields are present
        if not uri or not meal_time or not date:
            return Response({"error": "Missing required fields."}, status=HTTP_400_BAD_REQUEST)

        try:
            user = request.user
            recipe = Recipe.objects.get(uri=uri)

            # Add to DietPlan
            diet_plan, created = DietPlan.objects.get_or_create(user=user, name="My Diet Plan")
            DietPlanRecipe.objects.create(
                diet_plan=diet_plan, 
                recipe=recipe, 
                meal_time=meal_time, 
                date=date
            )

            # Add to DailyDietPlan
            daily_diet_plan, created = DailyDietPlan.objects.get_or_create(user=user, date=date)
            DailyDietPlanMeal.objects.create(
                daily_diet_plan=daily_diet_plan, 
                recipe=recipe, 
                meal_time=meal_time
            )

            return Response({"message": "Recipe added to diet plan."}, status=HTTP_201_CREATED)
        except Recipe.DoesNotExist:
            return Response({"error": "Recipe not found."}, status=HTTP_400_BAD_REQUEST)

    def delete(self, request):
        uri = request.data.get('uri')
        meal_time = request.data.get('meal_time')
        date = request.data.get('date')

        if not uri or not meal_time or not date:
            return Response({"error": "Missing required fields."}, status=HTTP_400_BAD_REQUEST)

        try:
            user = request.user
            recipe = Recipe.objects.get(uri=uri)

            # Remove from DietPlan
            diet_plan = DietPlan.objects.get(user=user, name="My Diet Plan")
            DietPlanRecipe.objects.filter(diet_plan=diet_plan, recipe=recipe, meal_time=meal_time, date=date).delete()

            # Remove from DailyDietPlan
            daily_diet_plan = DailyDietPlan.objects.get(user=user, date=date)
            DailyDietPlanMeal.objects.filter(daily_diet_plan=daily_diet_plan, recipe=recipe, meal_time=meal_time).delete()

            return Response({"message": "Removed from diet."}, status=HTTP_204_NO_CONTENT)
        except Recipe.DoesNotExist:
            return Response({"error": "Recipe not found."}, status=HTTP_400_BAD_REQUEST)
