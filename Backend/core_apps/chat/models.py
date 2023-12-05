from django.db import models
from core_apps.user.models import User
from django.conf import settings


class Chat(models.Model):
    DELETE_TIME_CHOICES = [
        (72, "72 hours"),
        (48, "48 hours"),
    ]

    name = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    is_alive = models.BooleanField(default=True)
    deletion_time = models.IntegerField(choices=DELETE_TIME_CHOICES, default=72)
    users = models.ManyToManyField(User, blank=True, related_name="chats")

    def __str__(self):
        return self.name


class Message(models.Model):
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    content = models.TextField(null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)