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
import json
from django.utils.datastructures import MultiValueDictKeyError
from .models import User

@method_decorator(csrf_exempt, name='dispatch')
class RegistrationView(View):
    template_name = 'user/register.html'
    form_class = UserRegistrationForm
    success_url = reverse_lazy('register')

    # MAX_USERNAME_ATTEMPTS = 10

    # def generate_random(self):
    #     for _ in range(self.MAX_USERNAME_ATTEMPTS):
    #         username = ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(8))
    #         print(f'Спроба імені: {username}')
    #         if not User.objects.filter(username=username).exists() and username:
    #             return username

    #     raise ValueError("Не вдається згенерувати унікальне та непорожнє ім'я користувача.")

    def post(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body.decode('utf-8'))
            form = self.form_class(data)
        except (json.JSONDecodeError, MultiValueDictKeyError):
            return JsonResponse({'success': False, 'error': 'Invalid form data'})

        if form.is_valid():
            user = form.save()
            login(request, user)
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False, 'error': 'Invalid registration credentials'})

    def get(self, request, *args, **kwargs):
        form = self.form_class()
        return render(request, self.template_name, {'form': form})

