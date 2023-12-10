from django.contrib import admin
from django.contrib.auth import logout

from . import views
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import GuestView, UserView

router = DefaultRouter()
router.register('guest', GuestView, basename='guest')
router.register('', UserView, basename='user')


urlpatterns = router.urls

