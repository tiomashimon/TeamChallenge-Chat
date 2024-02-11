import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .models import Chat, Direct, Group, ChatMessage, DirectMessage, GroupMessage

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_uuid"]
        self.room_group_name = f"chat_{self.room_name}"

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        message_type = text_data_json.get("message_type")
        user = self.scope['user']
        if message_type == "chat":
            chat = await database_sync_to_async(Chat.objects.get)(id=self.room_name)
            await self.save_chat_message(chat, message, user)
        elif message_type == "direct":
            direct = await database_sync_to_async(Direct.objects.get)(id=self.room_name)
            await self.save_direct_message(direct, message, user)
        elif message_type == "group":
            group = await database_sync_to_async(Group.objects.get)(id=self.room_name)
            await self.save_group_message(group, message, user)

    async def chat_message(self, event):
        message = event["message"]
        await self.send(text_data=json.dumps({"message": message}))

    async def direct_message(self, event):
        message = event["message"]
        await self.send(text_data=json.dumps({"message": message}))

    async def group_message(self, event):
        message = event["message"]
        await self.send(text_data=json.dumps({"message": message}))

    @database_sync_to_async
    def save_chat_message(self, chat, message, user):
        ChatMessage.objects.create(chat=chat, text_content=message, created_by=user)
        self.channel_layer.group_send(
            self.room_group_name, {"type": "chat_message", "message": message}
        )

    @database_sync_to_async
    def save_direct_message(self, direct, message, user):
        DirectMessage.objects.create(direct_chat=direct, text_content=message, created_by=user)
        self.channel_layer.group_send(
            self.room_group_name, {"type": "direct_message", "message": message}
        )

    @database_sync_to_async
    def save_group_message(self, group, message, user):
        GroupMessage.objects.create(group=group, text_content=message, created_by=user)
        self.channel_layer.group_send(
            self.room_group_name, {"type": "group_message", "message": message}
        )
