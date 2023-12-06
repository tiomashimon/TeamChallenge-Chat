from django.contrib import admin
from . import views
from django.urls import path, include

message_list = views.MessageViewSet.as_view(
    {
        'get': 'list',
        'post': 'create'
    }
)

urlpatterns = [
    path("create/", views.ChatCreate.as_view(), name='chats'),
    path('<int:id>/detail/', views.ChatRetrieve.as_view(), name='chat-detail'),
    path('', views.ChatList.as_view(), name='add-user'),
    path('<int:pk>/delete/', views.ChatDestroy.as_view(), name='chat-delete'),

    path('<int:id>/', message_list, name='message-list'), 
]
