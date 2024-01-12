from django.shortcuts import render
from rest_framework import generics
from .models import Chat, ChatMessage, ChatTopic
from django.db.models import Prefetch  

from .serilaizers import ChatSerializer, ChatMessageSerializer, ChatTopicSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from rest_framework import filters
from rest_framework.generics import (
     CreateAPIView,
     UpdateAPIView,
     RetrieveAPIView,
     DestroyAPIView,
     ListAPIView
)

from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated


from django_celery_beat.models import PeriodicTask, IntervalSchedule
from .tasks import delete_expired_chats


# class ChatAPIView(APIView):
#     def get(self,request):
#         movies = Chat.objects.all()
#         return Response({'chat':ChatSerializer(movies, many=True).data})

#     def post(self,request):
#         serializer = ChatSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
        
#         serializer.save()

#         return Response({'Succes':True, 'chat':serializer.data})

#     def put(self,request, *args, **kwargs):
#         chat_id = kwargs.get('id', None)
#         if not chat_id:
#             return Response({'error':'Method PUT not allowed'})
#         try:
#             instance = Chat.objects.get(id=chat_id)

#         except:
#             return Response({'error':'Object does not exists'})

#         serializer = ChatSerializer(data=request.data, instance=instance)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()

#         return Response({'Succes':True, 'chat':serializer.data}) 


class ChatCreate(CreateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer


class ChatUpdate(UpdateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer


class ChatRetrieve(RetrieveAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer

    lookup_field = 'id'


class ChatDestroy(DestroyAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({'Message': 'Chat successfully deleted'})


class ChatList(ListAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer


class ChatMessageViewSet(ModelViewSet):
    queryset = ChatMessage.objects.all()
    serializer_class = ChatMessageSerializer

    # permission_classes = [IsAuthenticated]
    def list(self, request, **kwargs):
        chat_id = kwargs.get('id')

        queryset = ChatMessage.objects.filter(chat=chat_id)
        serializer = ChatMessageSerializer(queryset, many=True)

        return Response(serializer.data)
    
    def create(self, request, id):
        data = request.data
        data['user'] = request.user.id
        serializer = ChatMessageSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        print(request.user,123)

        return Response(serializer.data)
    


class ChatTopicSetPagination(PageNumberPagination):
    page_size = 1
    page_size_query_param = 'page_size'
    max_page_size = 100



class TopicViewSet(ModelViewSet):
    from django.db.models import Prefetch

    queryset = ChatTopic.objects.prefetch_related(
    Prefetch('chats', queryset=Chat.objects.filter(is_alive=True))
        ).filter(chats__is_alive=True).distinct()
    serializer_class = ChatTopicSerializer
    pagination_class = ChatTopicSetPagination
    search_fields = ['title',]
    filter_backends = (filters.SearchFilter,)




# def create_delete_expired_chats_task():
#     interval, created = IntervalSchedule.objects.get_or_create(every=1, period=IntervalSchedule.HOURS)

#     delete_expired_chats_task, created = PeriodicTask.objects.get_or_create(
#         interval=interval,
#         name='Delete Expired Chats',
#         task='chat.tasks.delete_expired_chats'
#     )

#     delete_expired_chats_task.enabled = True
#     delete_expired_chats_task.save()





def index(request):
    chat_rooms = Chat.objects.all()
    return render(request, 'chat/index.html', {'chatrooms': chat_rooms})


def chatroom(request, room_name):
    chat = Chat.objects.get(name=room_name)
    messages = Message.objects.filter(chat=chat)
    return render(request, 'chat/room.html', {'chatroom': chat, 'messages':messages})
