import os
from celery import Celery
from celery.schedules import crontab
import sentry_sdk
from sentry_sdk.integrations.celery import CeleryIntegration


sentry_dsn = "https://16c92f76e6209afe15a313ef590155d3@o4506678602170368.ingest.sentry.io/4506678603874304"
sentry_sdk.init(dsn=sentry_dsn, integrations=[CeleryIntegration()])


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'main.settings')


app = Celery('main')


app.config_from_object('django.conf:settings', namespace='CELERY')
app.conf.task_routes = {
    'core_apps.chat.tasks.delete_expired_chats': {'queue': 'queue1'},
    'core_apps.user.tasks.send_mail_to_user': {'queue': 'queue1'},
}

app.autodiscover_tasks()


app.conf.beat_schedule = {
    'delete-expired-chats':
    {
        'task': 'core_apps.chat.tasks.delete_expired_chats',
        'schedule': crontab(minute='*/1')
    }
}
