from django.shortcuts import render
from rest_framework import generics
from .models import Chat, Message, ChatTopic
from .serilaizers import ChatSerializer, MessageSerializer, ChatTopicSerializer
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


class MessageViewSet(ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    # permission_classes = [IsAuthenticated]
    def list(self, request, **kwargs):
        chat_id = kwargs.get('id')

        queryset = Message.objects.filter(chat=chat_id)
        serializer = MessageSerializer(queryset, many=True)

        return Response(serializer.data)
    


class ChatTopicSetPagination(PageNumberPagination):
    page_size = 1
    page_size_query_param = 'page_size'
    max_page_size = 100


    
class TopicViewSet(ModelViewSet):
    queryset = queryset = ChatTopic.objects.prefetch_related('chats').all()
    serializer_class = ChatTopicSerializer
    pagination_class = ChatTopicSetPagination
    search_fields = ['title',]
    filter_backends = (filters.SearchFilter,)