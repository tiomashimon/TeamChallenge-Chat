from django.shortcuts import render
from django.http import JsonResponse
from django.views.generic.edit import CreateView
from .models import Chat
from .forms import ChatForm
from django.urls import reverse_lazy
import json
from django.utils.datastructures import MultiValueDictKeyError
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator


@method_decorator(csrf_exempt, name='dispatch')
class ChatCreate(CreateView):
    model = Chat
    template_name = 'chat/chat-create.html'
    form_class = ChatForm
    success_url = reverse_lazy('chat-create')

    def get(self, request, *args, **kwargs):
        form = self.form_class()
        return render(request, self.template_name, {'form': form})

    def post(self, request, *args, **kwargs):
        try:
            data = json.loads(request.data.decode('utf-8'))
            chat_name = data.get('chat-name')
            deletion_time = data.get('deletion-time')
            user = request.user

            form = self.form_class({'name': chat_name, 'deletion_time': deletion_time, 'created_by': user})
        except (json.JSONDecodeError, MultiValueDictKeyError):
            return JsonResponse({'success': False, 'error': 'Invalid form data'})

        if form.is_valid:
            form.save()
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False, 'error': 'Invalid chat info'})
