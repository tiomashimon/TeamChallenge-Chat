from main.celery import app
from datetime import timedelta
from django.utils import timezone
from .models import Chat
import os
from django.conf import settings


@app.task(autoretry_for=(ConnectionError,), default_retry_delay=5,
          retry_kwargs={'max_retrues': 5})
def delete_expired_chats():
    now = timezone.now()

    try:
        alive_chats = Chat.objects.filter(is_alive=True)
    except ConnectionError:
        raise (ConnectionError)

    for chat in alive_chats:
        expiration_time = chat.created_at + timedelta(hours=chat.deletion_time)
        if now >= expiration_time:
            print('Delete chat: ' + chat.name)
            chat.is_alive = False
            chat.save()


@app.task()
def save_file_async(uploaded_file_name, file_content, chat_type):
    chat_type_directory = os.path.join(settings.MEDIA_ROOT, chat_type, f'{chat_type}_images')
    os.makedirs(chat_type_directory, exist_ok=True)

    file_path = os.path.join(chat_type_directory, uploaded_file_name)
    with open(file_path, 'wb') as destination:
        destination.write(file_content)

    file_url = os.path.join(settings.MEDIA_URL, chat_type, f'{chat_type}_images', uploaded_file_name)
    return file_url


# @app.task
# def test_task():
#     print("Task started.")
#     time.sleep(60)
#     print("Task completed.")
