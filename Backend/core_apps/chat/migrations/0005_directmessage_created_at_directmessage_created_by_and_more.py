# Generated by Django 4.2.5 on 2024-01-18 17:23

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('chat', '0004_directmessage'),
    ]

    operations = [
        migrations.AddField(
            model_name='directmessage',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='directmessage',
            name='created_by',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='directmessage',
            name='image_content',
            field=models.ImageField(blank=True, null=True, upload_to='media/chat/message_images/'),
        ),
        migrations.AddField(
            model_name='directmessage',
            name='replied_to',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='chat.directmessage'),
        ),
        migrations.AddField(
            model_name='directmessage',
            name='text_content',
            field=models.TextField(blank=True, null=True),
        ),
    ]