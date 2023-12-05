from django.contrib import admin
from . import views
from django.urls import path, include

urlpatterns = [
    path("chats/", views.ChatAPIView.as_view(), name='chats'),
    path('chats/<int:id>', views.ChatAPIView.as_view(), name='add-user')
]
