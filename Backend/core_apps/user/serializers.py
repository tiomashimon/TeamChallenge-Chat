import uuid

from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User, Settings


class SettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Settings
        fields = '__all__'


class GuestSerializer(serializers.ModelSerializer):
    settings = SettingsSerializer(required=False)
    username = serializers.CharField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'nickname', 'username', 'is_guest', 'settings']

    def create(self, validated_data):
        settings_data = validated_data.pop('settings', None)
        validated_data['password'] = User.objects.make_random_password()
        validated_data['username'] = uuid.uuid4().hex[:30]
        validated_data['is_guest'] = True
        if not settings_data:
            settings_data = {}
        validated_data['settings'] = Settings.objects.create(**settings_data)
        return super(GuestSerializer, self).create(validated_data)

    def update(self, instance, validated_data):
        settings_data = validated_data.pop('settings', None)
        instance = super().update(instance, validated_data)
        if settings_data:
            instance.settings = SettingsSerializer().update(instance.settings, settings_data)
        instance.save()
        return instance


class UserSerializer(serializers.ModelSerializer):
    settings = SettingsSerializer(required=False)
    password = serializers.CharField(
        write_only=True,
        required=True,
        help_text='Leave empty if no change needed',
        style={'input_type': 'password', 'placeholder': 'Password'}
    )

    class Meta:
        model = User
        fields = ['id', 'nickname', 'username', 'password', 'is_guest', 'settings']

    def create(self, validated_data):
        settings_data = validated_data.pop('settings', None)
        validated_data['password'] = make_password(validated_data.get('password'))
        if not settings_data:
            settings_data = {}
        validated_data['settings'] = Settings.objects.create(**settings_data)
        return super(UserSerializer, self).create(validated_data)

    def update(self, instance, validated_data):
        settings_data = validated_data.pop('settings', None)
        password = validated_data.pop('password', None)
        instance = super().update(instance, validated_data)
        if settings_data:
            instance.settings = SettingsSerializer().update(instance.settings, settings_data)
        if password:
            instance.set_password(make_password(password))
        instance.save()
        return instance
