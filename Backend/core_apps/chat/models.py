from django.db import models

from core_apps.user.models import User


class Chat(models.Model):
    name = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    is_alive = models.BooleanField(default=True)
    deletion_time = models.DateTimeField(null=True, blank=True)
    users = models.ManyToManyField(User, related_name="chats")


class Message(models.Model):
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)


