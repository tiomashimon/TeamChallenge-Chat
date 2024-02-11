from django.db import models
from core_apps.user.models import User
from django.conf import settings
import uuid 


class ChatTopic(models.Model):
    def __str__(self):
        return self.title
        
    title = models.CharField(max_length=255)
    photo = models.ImageField(default='media/defaults/default_topic_image.jpg', upload_to='media/chat/topic_images/')


class BaseMessage(models.Model):
    class Meta:
        abstract=True


    def __str__(self):
        return self.text_content if self.text_content else 'Photo'
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    text_content = models.TextField(null=True, blank=True)
    image_content = models.ImageField(null=True, blank=True, upload_to='media/chat/message_images/')
    created_at = models.DateTimeField(auto_now_add=True)
    replied_to = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True)

class BaseChat(models.Model):
    class Meta:
        abstract=True
    id = models.UUIDField(unique=True, default=uuid.uuid4, editable=False, primary_key=True)
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=255, default="There is no description :(")
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    photo = models.ImageField(default='media/defaults/default_chat_image.jpg', upload_to='media/chat/chat_images/')

    def get_online_count(self):
        return self.users.count()

    def join(self, user):
        self.users.add(user)
        self.save()

    def leave(self, user):
        self.users.remove(user)
        self.save()

    def __str__(self):
        return f'{self.name} ({self.get_online_count()})'

class Chat(BaseChat):
    DELETE_TIME_CHOICES = [
        (72, "72 hours"),
        (48, "48 hours"),
    ]
    is_alive = models.BooleanField(default=True)
    deletion_time = models.IntegerField(choices=DELETE_TIME_CHOICES, default=72)
    topic = models.ForeignKey(ChatTopic, on_delete=models.CASCADE, default=1, related_name='chats')
    max_users = models.IntegerField(default=99)
    users = models.ManyToManyField(User, blank=True, related_name="chats")


class Group(BaseChat):
    users = models.ManyToManyField(User, blank=True, related_name="user_groups")


class Direct(BaseChat):
    user1 = models.ForeignKey(User, on_delete=models.CASCADE, related_name='direct_chats_user1')
    user2 = models.ForeignKey(User, on_delete=models.CASCADE, related_name='direct_chats_user2')

    def __str__(self):
        return f'Direct Chat between {self.user1} and {self.user2}'


class ChatMessage(BaseMessage):
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE)

class DirectMessage(BaseMessage):
    direct_chat = models.ForeignKey(Direct, on_delete=models.CASCADE)

    def __str__(self):
        return f"DirectMessage in {self.direct_chat}"


class GroupMessage(BaseMessage):
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
