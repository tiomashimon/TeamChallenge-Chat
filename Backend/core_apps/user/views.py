from django.shortcuts import render
from .forms import UserRegistrationForm
from django.contrib.messages.views import SuccessMessageMixin
from django.views.generic.edit import CreateView
from django.urls import reverse_lazy
from django.http import JsonResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.contrib.auth import login
import string
import random

@method_decorator(csrf_exempt, name='dispatch')
class RegistrationView(View):
    template_name = 'user/register.html'
    form_class = UserRegistrationForm
    success_url = reverse_lazy('register')

    def generate_random(self):
        password_length = 8
        characters = string.ascii_letters + string.digits
        return ''.join(random.choice(characters) for _ in range(password_length))

    def post(self, request, *args, **kwargs):
        try:
            nickname = request.POST['nickname']
        except MultiValueDictKeyError:
            return JsonResponse({'success': False, 'error': 'Invalid form data'})

        username = self.generate_random()
        password = self.generate_random()
        form_data = {'nickname': nickname, 'username': username, 'password1': password, 'password2': password}
        form = self.form_class(form_data)  # Use your custom form here

        if form.is_valid():
            user = form.save()
            login(request, user)
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False, 'error': 'Invalid registration credentials'})

    def get(self, request, *args, **kwargs):
        form = self.form_class()
        return render(request, self.template_name, {'form': form})
