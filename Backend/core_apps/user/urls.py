from django.contrib import admin
from . import views
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import RegistrationView

router = DefaultRouter()
router.register('register', RegistrationView, basename='register')
# urlpatterns = [
#     path("register/", views.RegistrationView.as_view(), name='register'),
# ]

urlpatterns = router.urls