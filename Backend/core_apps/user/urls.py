from django.contrib import admin
from django.contrib.auth import logout

from . import views
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import RegistrationView

router = DefaultRouter()
router.register('', RegistrationView, basename='register')


urlpatterns = router.urls

