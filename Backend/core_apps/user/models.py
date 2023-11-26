from django.db import models
from django.contrib.auth.models import AbstractUser


class Settings(models.Model):
    is_dark_mode = models.BooleanField(default=False)
    is_show_notifications = models.BooleanField(default=True)
    language = models.CharField(max_length=255, default="ua")


class User(AbstractUser):
    nickname = models.CharField(max_length=255, unique=False, default='nick')
    settings = models.OneToOneField(Settings, on_delete=models.CASCADE, default=None, null=True)

