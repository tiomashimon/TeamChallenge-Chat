import os
from celery import Celery
from celery.schedules import crontab


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'main.settings')


app = Celery('main')


app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks()


app.conf.beat_schedule = {
    'delete-expired-chats':
    {
        'task': 'core_apps.chat.tasks.delete_expired_chats',
        'schedule': crontab(minute='*/5')
    }
}