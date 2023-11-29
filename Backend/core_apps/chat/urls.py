from django.contrib import admin
from . import views
from django.urls import path, include

urlpatterns = [
    path("create/", views.ChatCreate.as_view(), name='chat-create'),
]
