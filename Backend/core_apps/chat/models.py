from django.db import models
from core_apps.user.models import User
from django.conf import settings


class ChatTopic(models.Model):
    def __str__(self):
        return self.title
        
    title = models.CharField(max_length=255)
    photo = models.ImageField(default='media/defaults/default_topic_image.jpg', upload_to='media/chat/topic_images/')


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
    topic = models.ForeignKey(ChatTopic, on_delete=models.CASCADE, default=1, related_name='chats')
    photo = models.ImageField(default='media/defaults/default_chat_image.jpg', upload_to='media/chat/chat_images/')

    def __str__(self):
        return self.name


class Message(models.Model):
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    text_content = models.TextField(null=False, blank=True)
    image_content = models.ImageField(null=True, blank=True, upload_to='media/chat/message_images/')
    created_at = models.DateTimeField(auto_now_add=True)
    replied_to = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.text_content and not self.image_content:
            raise ValueError("Both text and image content cannot be empty.")
        super().save(*args, **kwargs)