from django.contrib import admin
from . import views
from django.urls import path, include

urlpatterns = [
    path("register/", views.RegistrationView.as_view(), name='register'),
]
