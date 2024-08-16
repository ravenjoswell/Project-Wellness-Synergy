import openai
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST
from .models import JournalEntry
from .serializers import JournalEntrySerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.conf import settings



class JournalEntryListView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


    def get(self, request):
        entries = JournalEntry.objects.filter(user=request.user)
        serializer = JournalEntrySerializer(entries, many=True)
        return Response(serializer.data, status=HTTP_200_OK)

    def post(self, request):
        app_key = settings.OPENAI_APP_KEY
        if not request.user.is_authenticated:
            return Response({"error": "Authentication required"}, status=HTTP_400_BAD_REQUEST)

        serializer = JournalEntrySerializer(data=request.data)
        if serializer.is_valid():
            entry = serializer.save(user=request.user)
            
            openai.api_key = f'{app_key}'
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": f"Respond to this journal entry: {entry.entry_text}"}
                ],
                max_tokens=30
            )
            ai_response = response['choices'][0]['message']['content'].strip()
            
            return Response({"entry": serializer.data, "ai_response": ai_response}, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
class JournalEntryDetailView(APIView):
    def get(self, request, journal_entry_id):
        try:
            journal_entry = JournalEntry.objects.get(id=journal_entry_id, user=request.user)
            serializer = JournalEntrySerializer(journal_entry)
            return Response(serializer.data, status=HTTP_200_OK)
        except JournalEntry.DoesNotExist:
            return Response({"error": "Journal Entry not found"}, status=HTTP_400_BAD_REQUEST)

    def delete(self, request, journal_entry_id):
        try:
            journal_entry = JournalEntry.objects.get(id=journal_entry_id, user=request.user)
            journal_entry.delete()
            return Response(status=HTTP_204_NO_CONTENT)
        except JournalEntry.DoesNotExist:
            return Response({"error": "Journal Entry not found"}, status=HTTP_400_BAD_REQUEST)
