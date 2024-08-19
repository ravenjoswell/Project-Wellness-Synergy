from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_204_NO_CONTENT
from .models import DietPlan, DailyDietPlan, DietPlanRecipe, DailyDietPlanMeal, WeeklyLogEntry
from .serializers import DietPlanSerializer, DailyDietPlanSerializer
from recipe_app.models import Recipe
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from user_app.models import User
from django.core.exceptions import ValidationError
from django.utils import timezone
from datetime import timedelta
from datetime import datetime
import pytz
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated


class DietPlanListView(APIView):
    def get(self, request):
        diet_plans = DietPlan.objects.filter(user=request.user).order_by('start_date')
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
        daily_diet_plans = DailyDietPlan.objects.filter(user=request.user).order_by('date')
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
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        recipe_uri = request.data.get('uri')
        meal_time = request.data.get('meal_time')
        day_of_week = request.data.get('day_of_week')
        date = request.data.get('date')

        if not recipe_uri or not meal_time or not day_of_week or not date:
            return Response({"error": "Missing required fields."}, status=HTTP_400_BAD_REQUEST)

        try:
            recipe = Recipe.objects.get(uri=recipe_uri)

            # Ensure the meal time does not already have a recipe for this day in the DietPlan
            if DietPlanRecipe.objects.filter(
                diet_plan__user=user,  # Filter by the current user
                meal_time=meal_time, 
                day_of_week=day_of_week
            ).exists():
                return Response({"error": "Meal time already has a recipe for this day."}, status=HTTP_400_BAD_REQUEST)

            # Add to DietPlan
            diet_plan, _ = DietPlan.objects.get_or_create(
                user=user,
                name="My Diet Plan",
                defaults={'start_date': timezone.now(), 'end_date': timezone.now() + timedelta(days=7)}
            )
            DietPlanRecipe.objects.create(
                diet_plan=diet_plan, 
                recipe=recipe, 
                meal_time=meal_time, 
                day_of_week=day_of_week
            )

            # Add to DailyDietPlan
            daily_diet_plan, _ = DailyDietPlan.objects.get_or_create(user=user, date=date)
            DailyDietPlanMeal.objects.create(
                daily_diet_plan=daily_diet_plan, 
                recipe=recipe, 
                meal_time=meal_time
            )

            return Response({"message": "Recipe added to diet plan."}, status=HTTP_201_CREATED)
        except Recipe.DoesNotExist:
            return Response({"error": "Recipe not found."}, status=HTTP_400_BAD_REQUEST)
        
    def delete(self, request):
        recipe_id = request.data.get('recipe_id')
        meal_time = request.data.get('meal_time')
        day_of_week = request.data.get('day_of_week')
        date = request.data.get('date')

        if not recipe_id or not meal_time or not day_of_week or not date:
            return Response({"error": "Missing required fields."}, status=HTTP_400_BAD_REQUEST)

        try:
            # Fetch the recipe based on recipe_id
            recipe = Recipe.objects.get(id=recipe_id)

            # Remove from DietPlan
            diet_plan = DietPlan.objects.get(user=request.user, name="My Diet Plan")
            DietPlanRecipe.objects.filter(
                diet_plan=diet_plan, 
                recipe=recipe, 
                meal_time=meal_time, 
                day_of_week=day_of_week
            ).delete()

            # Remove from DailyDietPlan
            daily_diet_plan = DailyDietPlan.objects.get(user=request.user, date=date)
            DailyDietPlanMeal.objects.filter(
                daily_diet_plan=daily_diet_plan, 
                recipe=recipe, 
                meal_time=meal_time
            ).delete()

            return Response({"message": "Removed from diet."}, status=HTTP_204_NO_CONTENT)
        except Recipe.DoesNotExist:
            return Response({"error": "Recipe not found."}, status=HTTP_400_BAD_REQUEST)







class WeeklyLogView(APIView):
    def post(self, request):
        data = request.POST
        reflection = data.get('reflection', '')  # Default to an empty string if not provided
        goals_for_next_week = data.get('goals_for_next_week', '')
        challenges = data.get('challenges', '')
        highlights = data.get('highlights', '')

        # Create the weekly log entry with the provided data
        WeeklyLogEntry.objects.create(
            user=request.user,
            reflection=reflection,
            goals_for_next_week=goals_for_next_week,
            challenges=challenges,
            highlights=highlights
        )

        # Clear out the meals from existing DailyDietPlan entries without deleting the entries themselves
        daily_diet_plans = DailyDietPlan.objects.filter(user=request.user)
        for daily_diet_plan in daily_diet_plans:
            DailyDietPlanMeal.objects.filter(daily_diet_plan=daily_diet_plan).delete()

        # Optionally, reset other fields in DailyDietPlan if needed
        # for daily_diet_plan in daily_diet_plans:
        #     daily_diet_plan.some_field = None
        #     daily_diet_plan.save()

        return Response({"message": "Weekly log saved, diet plan cleared, and days reset."})

