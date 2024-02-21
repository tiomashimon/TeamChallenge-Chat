from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import GuestView, UserView, ChangePasswordView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView, TokenVerifyView,
)
from django.contrib.auth.views import LogoutView

router = DefaultRouter()
router.register('guest', GuestView, basename='guest')
router.register('', UserView, basename='user')

urlpatterns = [path('change_password/<int:pk>/', ChangePasswordView.as_view(), name='auth_change_password'),
               path('password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
               path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
               path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
               path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
               path('logout/', LogoutView.as_view(), name='token_logout'),
               ]
urlpatterns += router.urls
