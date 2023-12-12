# Generated by Django 4.2.5 on 2023-12-10 16:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0005_chat_topic'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='chat',
            name='topic',
        ),
        migrations.AddField(
            model_name='chat',
            name='topic',
            field=models.ManyToManyField(to='chat.chattopic'),
        ),
    ]