import openai
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST
from .models import MentalWellBeingLog
from .serializers import MentalWellBeingLogSerializer

class MentalWellBeingLogListView(APIView):
    def get(self, request):
        logs = MentalWellBeingLog.objects.filter(user=request.user)
        serializer = MentalWellBeingLogSerializer(logs, many=True)
        return Response(serializer.data, status=HTTP_200_OK)

    def post(self, request):
        serializer = MentalWellBeingLogSerializer(data=request.data)
        if serializer.is_valid():
            log = serializer.save(user=request.user)
            
            # Interacting with OpenAI for personalized response
            openai.api_key = OPENAI_API_KEY
            response = openai.Completion.create(
                engine="text-davinci-003",
                prompt=f"Provide feedback for this mental well-being log: {log}",
                max_tokens=50
            )
            feedback = response.choices[0].text.strip()
            
            return Response({"log": serializer.data, "feedback": feedback}, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

class MentalWellBeingLogDetailView(APIView):
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
