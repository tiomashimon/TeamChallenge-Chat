from django.shortcuts import render
from .forms import UserRegistrationForm
from django.contrib.messages.views import SuccessMessageMixin
from django.views.generic.edit import CreateView
from django.urls import reverse_lazy
import random
import string

from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views import View
from django.utils.decorators import method_decorator
from django.utils.datastructures import MultiValueDictKeyError

@method_decorator(csrf_exempt, name='dispatch')
class RegistrationView(View):

    def generate_random(self):
        password_length = 8
        characters = string.ascii_letters + string.digits
        return ''.join(random.choice(characters) for i in range(password_length))

    def post(self, request, *args, **kwargs):
        try:
            nickname = request.POST['nickname']
        except MultiValueDictKeyError:
            return JsonResponse({'success': False, 'error': 'Invalid form data'})
        username = self.generate_random()
        password = self.generate_random()
        form = UserRegistrationForm({'nickname': nickname,'username':usename, 'password1': password, 'password2': password})
        
        if form.is_valid():
            user = form.save()
            login(request, user)
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False, 'error': 'Invalid registration credentials'})




class BackendRegistrationView(SuccessMessageMixin, CreateView):
    template_name = 'user/register.html'
    form_class = UserRegistrationForm
    success_url = reverse_lazy('register')
    success_message = "Your profile was created successfully"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['form'] = UserRegistrationForm()
        return context

    def generate_random(self):
        password_length = 8
        characters = string.ascii_letters + string.digits
        return ''.join(random.choice(characters) for i in range(password_length))

    def form_valid(self, form):
        form.instance.username = self.generate_random()
        form.instance.set_password(self.generate_random())

        user = form.save()
        login(self.request, user)

        return super().form_valid(form)
