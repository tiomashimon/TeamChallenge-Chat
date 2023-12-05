from rest_framework import serializers
from .models import Chat
from ..user.models import User
from ..user.serializers import UserSerializer

class ChatSerializer(serializers.Serializer):
    DELETE_TIME_CHOICES = [
        (72, "72 hours"),
        (48, "48 hours"),
    ]

    name = serializers.CharField(max_length=50)
    deletion_time = serializers.ChoiceField(
                            choices = DELETE_TIME_CHOICES)
    created_at = serializers.DateTimeField(read_only=True)
    created_by = serializers.PrimaryKeyRelatedField(queryset=User.objects.all()) 
    is_alive = serializers.BooleanField(default=True)
    users = UserSerializer(many=True, read_only=True)

    def create(self, validated_data):
        return Chat.objects.create(**validated_data)


    def update(self, instance, validated_data):
        user_id = validated_data.get('user_id')

        if user_id:
            user = User.objects.get(id=user_id)

            instance.users.add(user)

        instance.save()

        return instance

