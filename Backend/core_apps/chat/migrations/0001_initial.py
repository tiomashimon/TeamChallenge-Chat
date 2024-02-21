# Generated by Django 4.2.5 on 2024-02-11 10:38

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Chat',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('name', models.CharField(max_length=50)),
                ('description', models.CharField(default='There is no description :(', max_length=255)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('photo', models.ImageField(default='media/defaults/default_chat_image.jpg', upload_to='media/chat/chat_images/')),
                ('is_alive', models.BooleanField(default=True)),
                ('deletion_time', models.IntegerField(choices=[(72, '72 hours'), (48, '48 hours')], default=72)),
                ('max_users', models.IntegerField(default=99)),
                ('created_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='ChatTopic',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('photo', models.ImageField(default='media/defaults/default_topic_image.jpg', upload_to='media/chat/topic_images/')),
            ],
        ),
        migrations.CreateModel(
            name='Group',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('name', models.CharField(max_length=50)),
                ('description', models.CharField(default='There is no description :(', max_length=255)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('photo', models.ImageField(default='media/defaults/default_chat_image.jpg', upload_to='media/chat/chat_images/')),
                ('created_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
                ('users', models.ManyToManyField(blank=True, related_name='user_groups', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='GroupMessage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text_content', models.TextField(blank=True, null=True)),
                ('image_content', models.ImageField(blank=True, null=True, upload_to='media/chat/message_images/')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('created_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
                ('group', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='chat.group')),
                ('replied_to', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='chat.groupmessage')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='DirectMessage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text_content', models.TextField(blank=True, null=True)),
                ('image_content', models.ImageField(blank=True, null=True, upload_to='media/chat/message_images/')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('created_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
                ('receiver', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='received_direct_messages', to=settings.AUTH_USER_MODEL)),
                ('replied_to', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='chat.directmessage')),
                ('sender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sent_direct_messages', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='ChatMessage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text_content', models.TextField(blank=True, null=True)),
                ('image_content', models.ImageField(blank=True, null=True, upload_to='media/chat/message_images/')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('chat', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='chat.chat')),
                ('created_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
                ('replied_to', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='chat.chatmessage')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.AddField(
            model_name='chat',
            name='topic',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='chats', to='chat.chattopic'),
        ),
        migrations.AddField(
            model_name='chat',
            name='users',
            field=models.ManyToManyField(blank=True, related_name='chats', to=settings.AUTH_USER_MODEL),
        ),
    ]
