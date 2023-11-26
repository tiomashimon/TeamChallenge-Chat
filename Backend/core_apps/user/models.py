from django.db import models
from django.contrib.auth.models import AbstractUser


class Settings(models.Model):
    is_dark_mode = models.BooleanField(default=False)
    is_show_notifications = models.BooleanField(default=True)
    language = models.CharField(max_length=255, default="ua")


class User(AbstractUser):
    temp_username = models.CharField(max_length=255, unique=False)
    settings = models.OneToOneField(Settings, on_delete=models.CASCADE, default=None)
