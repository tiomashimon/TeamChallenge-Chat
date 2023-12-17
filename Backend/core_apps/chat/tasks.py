from main.celery import app
from datetime import timedelta
from django.utils import timezone
from .models import Chat


@app.task
def delete_expired_chats():
    now = timezone.now()

    alive_chats = Chat.objects.filter(is_alive=True)

    for chat in alive_chats:
        expiration_time = chat.created_at + timedelta(hours=chat.deletion_time)
        if now >= expiration_time:
            print('Delete chat: ' + chat.name)
            chat.is_alive = False
            chat.save()


import time

# @app.task
# def test_task():
#     print("Task started.")
#     time.sleep(60)
#     print("Task completed.")