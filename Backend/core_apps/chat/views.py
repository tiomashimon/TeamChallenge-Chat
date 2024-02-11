from django.shortcuts import render
from rest_framework import generics
from .models import (
    Chat, 
    ChatMessage, 
    ChatTopic,
    Group,
    GroupMessage,
    DirectMessage
)
from django.db.models import Prefetch  

from .serilaizers import (
    ChatSerializer,
    ChatMessageSerializer,
    ChatTopicSerializer,
    GroupSerializer,
    GroupMessageSerializer, 
    DirectMessageSerializer
)
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



class DirectMessageViewSet(ModelViewSet):
    queryset = DirectMessage.objects.all()
    serializer_class = DirectMessageSerializer

    def create(self, request):
        serializer = DirectMessageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class GroupViewSet(ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

    def create(self, request):
        serializer = GroupSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)

class GroupMessageViewSet(ModelViewSet):
    queryset = GroupMessage.objects.all()
    serializer_class = GroupMessageSerializer

    def create(self, request):
        data = request.data
        data['user'] = request.user.id
        print(data)
        serializer = GroupMessageSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        print(request.user,123)

        return Response(serializer.data)
    





def index(request):
    chats = Chat.objects.all()
    return render(request, "chat/index.html", {'chats':chats})


def room(request, room_name):
    chat = Chat.objects.filter(name=room_name).first()
    return render(request, "chat/room.html", {"chat": chat})