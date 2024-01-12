from django.contrib import admin
from . import views
from django.urls import path, include

message_list = views.ChatMessageViewSet.as_view(
    {
        'get': 'list',
        'post': 'create'
    }
)

topic_list = views.TopicViewSet.as_view(
    {
        'get': 'list',
        'post': 'create'
    }
)

urlpatterns = [
    path("create/", views.ChatCreate.as_view(), name='chats'),
    path('<int:id>/detail/', views.ChatRetrieve.as_view(), name='chat'),
    path('', views.ChatList.as_view(), name='add-user'),
    path('<int:pk>/delete/', views.ChatDestroy.as_view(), name='chat'),

    path('<int:id>/message/', message_list, name='message'), 
    path('topics/', topic_list, name='topic'), 
    path("index/", views.index, name="index"),
    path("<str:room_name>/", views.chatroom, name="room"),
]

