from django.shortcuts import render
from rest_framework import generics
from .models import Chat
from .serilaizers import ChatSerializer
from rest_framework.response import Response
from rest_framework.views import APIView

    def get(self, request, *args, **kwargs):
        form = self.form_class()
        return render(request, self.template_name, {'form': form})

class ChatAPIView(APIView):
    def get(self,request):
        movies = Chat.objects.all()
        return Response({'chat':ChatSerializer(movies, many=True).data})

    def post(self,request):
        serializer = ChatSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        serializer.save()

        return Response({'Succes':True, 'chat':serializer.data})

    def put(self,request, *args, **kwargs):
        chat_id = kwargs.get('id', None)
        if not chat_id:
            return Response({'error':'Method PUT not allowed'})
        try:
            instance = Chat.objects.get(id=chat_id)

        except:
            return Response({'error':'Object does not exists'})

        serializer = ChatSerializer(data=request.data, instance=instance)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({'Succes':True, 'chat':serializer.data}) 

            form = self.form_class({'name': chat_name, 'deletion_time': deletion_time, 'created_by': user})
        except (json.JSONDecodeError, MultiValueDictKeyError):
            return JsonResponse({'success': False, 'error': 'Invalid form data'})

        if form.is_valid:
            form.save()
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False, 'error': 'Invalid chat info'})
