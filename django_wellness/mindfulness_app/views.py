import openai
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST
from .models import MentalWellBeingLog
from .serializers import MentalWellBeingLogSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.conf import settings

class MentalWellBeingLogListView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        logs = MentalWellBeingLog.objects.filter(user=request.user)
        serializer = MentalWellBeingLogSerializer(logs, many=True)
        return Response(serializer.data, status=HTTP_200_OK)

    def post(self, request):
        app_key = settings.OPENAI_APP_KEY
        data = request.data.copy()
        data['user'] = request.user.id
        data.setdefault('mood', None)
        data.setdefault('stress_level', None)
        data.setdefault('sleep_hours', None)
        data.setdefault('anxiety_level', None)
        data.setdefault('depression_level', None)
        data.setdefault('additional_notes', '')

        serializer = MentalWellBeingLogSerializer(data=data)
        if serializer.is_valid():
            log = serializer.save(user=request.user)

            # Determine the best category for guided session
            if log.stress_level >= 7 or log.anxiety_level >= 7:
                recommended_category = 'meditation'
            elif log.sleep_hours < 5:
                recommended_category = 'sleep'
            else:
                recommended_category = 'move'

            openai.api_key = f'{app_key}'
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": f"Provide a guided {recommended_category} session for this user: {log}"}
                ],
                max_tokens=100
            )
            ai_response = response['choices'][0]['message']['content'].strip()

            return Response({
                "log": serializer.data,
                "guided_response": ai_response,
                "recommended_category": recommended_category
            }, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
    
class MentalWellBeingLogDetailView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, log_id):
        try:
            log = MentalWellBeingLog.objects.get(id=log_id, user=request.user)
            serializer = MentalWellBeingLogSerializer(log)
            return Response(serializer.data, status=HTTP_200_OK)
        except MentalWellBeingLog.DoesNotExist:
            return Response({"error": "Log not found"}, status=HTTP_400_BAD_REQUEST)

    def delete(self, request, log_id):
        try:
            log = MentalWellBeingLog.objects.get(id=log_id, user=request.user)
            log.delete()
            return Response(status=HTTP_204_NO_CONTENT)
        except MentalWellBeingLog.DoesNotExist:
            return Response({"error": "Log not found"}, status=HTTP_400_BAD_REQUEST)

class GuidedSessionView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, category):
        app_key = settings.OPENAI_APP_KEY
        openai.api_key = f'{app_key}'

        prompt = f"Provide a detailed guided {category} session."
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a mindfulness coach."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=100
        )
        session_content = response['choices'][0]['message']['content'].strip()

        return Response({"session_content": session_content}, status=HTTP_200_OK)
