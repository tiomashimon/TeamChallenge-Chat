import uuid

from django.utils import timezone
from rest_framework import serializers

from .models import User, Settings


class SettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Settings
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    settings = SettingsSerializer()
    username = serializers.CharField(read_only=True)
    password = serializers.CharField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'nickname', 'username', 'password', 'settings']

    def create(self, validated_data):
        settings_data = validated_data.pop('settings', None)
        password = User.objects.make_random_password()
        user = User.objects.create(
            username=uuid.uuid4().hex[:30],
            nickname=validated_data['nickname'],
        )

        if settings_data:
            settings_instance = Settings.objects.create(**settings_data)
            user.settings = settings_instance

        user.set_password(password)
        user.save()

        return user

    def update(self, instance, validated_data):
        settings_data = validated_data.pop('settings', None)
        instance = super().update(instance, validated_data)

        if settings_data:
            instance.settings = SettingsSerializer().update(instance.settings, settings_data)

        instance.save()
        return instance
