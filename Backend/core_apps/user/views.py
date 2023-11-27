from django.shortcuts import render
from rest_framework.generics import CreateAPIView

from .forms import UserRegistrationForm
from django.contrib.messages.views import SuccessMessageMixin
from django.views.generic.edit import CreateView
from django.urls import reverse_lazy
from django.contrib.auth import login
import random
import string
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer


class RegistrationView(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        # Log in the user after successful creation
        login(request, user)
        return Response(serializer.data)




# class RegistrationView(SuccessMessageMixin, CreateView):
#     template_name = 'user/register.html'
#     form_class = UserRegistrationForm
#     success_url = reverse_lazy('register')
#     success_message = "Your profile was created successfully"
#
#     def get_context_data(self, **kwargs):
#         context = super().get_context_data(**kwargs)
#         context['form'] = UserRegistrationForm()
#         return context
#
#     def generate_random(self):
#         password_length = 8
#         characters = string.ascii_letters + string.digits
#         return ''.join(random.choice(characters) for i in range(password_length))
#
#     def form_valid(self, form):
#         form.instance.username = self.generate_random()
#         form.instance.set_password(self.generate_random())
#
#         user = form.save()
#         login(self.request, user)
#
#         return super().form_valid(form)
