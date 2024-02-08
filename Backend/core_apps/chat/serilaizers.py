from rest_framework import serializers
from .models import (
    Chat, 
    ChatMessage, 
    ChatTopic,
    Group, 
    GroupMessage, 
    DirectMessage
)
from ..user.models import User
from ..user.serializers import UserSerializer


class ChatMessageSerializer(serializers.ModelSerializer):
    created_by = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    class Meta:
        model = ChatMessage
        fields = "__all__"


class ChatSerializer(serializers.Serializer):
    DELETE_TIME_CHOICES = [
        (72, "72 hours"),
        (48, "48 hours"),
    ]
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=50)
    deletion_time = serializers.ChoiceField(
                            choices = DELETE_TIME_CHOICES)
    created_at = serializers.DateTimeField(read_only=True)
    created_by = serializers.PrimaryKeyRelatedField(queryset=User.objects.all()) 
    is_alive = serializers.BooleanField(default=True)
    users = UserSerializer(many=True, read_only=True)
    # messages = MessageSerializer(many=True, read_only=True)
    topic = serializers.PrimaryKeyRelatedField(queryset=ChatTopic.objects.all()) 
    photo = serializers.ImageField()
    max_users = serializers.IntegerField()
    
    def create(self, validated_data):
        return Chat.objects.create(**validated_data)


    def update(self, instance, validated_data):
        user_id = validated_data.get('user_id')

        if user_id:
            user = User.objects.get(id=user_id)

            instance.users.add(user)
                

        instance.save()

        return instance




class ChatTopicSerializer(serializers.Serializer):
    chats = ChatSerializer(many=True, read_only=True)
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(max_length=255)

    def create(self, validated_data):
        return ChatTopic.objects.create(**validated_data)


class GroupSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=50)
    description = serializers.CharField(max_length=50)
    created_at = serializers.DateTimeField(read_only=True)
    created_by = serializers.PrimaryKeyRelatedField(queryset=User.objects.all()) 
    users = UserSerializer(many=True, read_only=True)
    photo = serializers.ImageField()

    
    def create(self, validated_data):
        return Group.objects.create(**validated_data)

class GroupMessageSerializer(serializers.Serializer):
    class Meta:
        fields = ('__all__')
        model = GroupMessage
    
    def create(validated_data):
        return GroupMessage.objects.create(**validated_data)


class DirectMessageSerializer(serializers.Serializer):
    text_content = serializers.CharField(required=False)
    image_content = serializers.ImageField(required=False)
    created_at = serializers.DateTimeField(read_only=True)
    replied_to = serializers.PrimaryKeyRelatedField(queryset=DirectMessage.objects.all())
    sender = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    receiver = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    
    def create(self, validated_data):
        return DirectMessage.objects.create(**validated_data)