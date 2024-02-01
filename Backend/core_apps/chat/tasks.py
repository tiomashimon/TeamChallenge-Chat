from main.celery import app
from datetime import timedelta
from django.utils import timezone
from .models import Chat


@app.task(autoretry_for=(ConnectionError,), default_retry_delay=5,
          retry_kwargs={'max_retrues':5})
def delete_expired_chats():
    now = timezone.now()

    try:
        alive_chats = Chat.objects.filter(is_alive=True)
    except ConnectionError:
        raise(ConnectionError)

    for chat in alive_chats:
        expiration_time = chat.created_at + timedelta(hours=chat.deletion_time)
        if now >= expiration_time:
            print('Delete chat: ' + chat.name)
            chat.is_alive = False
            chat.save()



# @app.task
# def test_task():
#     print("Task started.")
#     time.sleep(60)
#     print("Task completed.")