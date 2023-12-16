import jwt
from django.contrib.auth import login, logout
from django.http import JsonResponse
import django_filters
from rest_framework import status, generics
from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny, BasePermission
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User
from .serializers import UserSerializer, GuestSerializer, ChangePasswordSerializer, UserCreateSerializer


class UserFilter(django_filters.FilterSet):
    nickname = django_filters.CharFilter(field_name='nickname', lookup_expr='icontains')
    username = django_filters.CharFilter(field_name='username', lookup_expr='icontains')

    class Meta:
        model = User
        fields = ['nickname', 'username']


class GuestView(ModelViewSet):
    """
        list, get, create, update and delete user and settings for him.
    """

    queryset = User.objects.filter(is_guest=True).prefetch_related('settings')
    serializer_class = GuestSerializer
    filterset_class = UserFilter

    # permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        # Log in the user after successful creation
        # login(request, user)
        refresh = RefreshToken.for_user(user)
        token_data = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

        # Add token data to the response
        response_data = {
            'user': serializer.data,
            'token': token_data,
        }

        return Response(response_data, status=status.HTTP_201_CREATED)
        # return Response(serializer.data)

    # def get_permissions(self):
    #     if self.action == 'post':
    #         permission_classes = [AllowAny]
    #     else:
    #         permission_classes = [IsAuthenticated]
    #     return [permission() for permission in permission_classes]


class UserView(ModelViewSet):
    """
        list, get, create, update and delete user and settings for him.
    """
    queryset = User.objects.all().prefetch_related('settings')
    serializer_class = UserSerializer
    filterset_class = UserFilter
    # permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        # Log in the user after successful creation
        # login(request, user)
        refresh = RefreshToken.for_user(user)
        token_data = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

        # Add token data to the response
        response_data = {
            'user': serializer.data,
            'token': token_data,
        }

        return Response(response_data, status=status.HTTP_201_CREATED)

    def get_serializer_class(self, *args, **kwargs):
        if self.action == 'create':
            return UserCreateSerializer
        else:
            return UserSerializer


class ChangePasswordView(generics.UpdateAPIView):
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = ChangePasswordSerializer

