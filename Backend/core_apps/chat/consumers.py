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
        message = text_data_json.get('message')
        photo = text_data_json.get('photo')
        print('================================>', photo)

        room_type = text_data_json.get("room_type")
        user = self.scope['user']
        if room_type == "chat":
            chat = await database_sync_to_async(Chat.objects.get)(id=self.room_name)
            await self.save_chat_message(chat=chat, user=user, message=message, photo=photo)
        elif room_type == "direct":
            direct = await database_sync_to_async(Direct.objects.get)(id=self.room_name)
            await self.save_direct_message(direct, user=user, message=message, photo=photo)
        elif room_type == "group":
            group = await database_sync_to_async(Group.objects.get)(id=self.room_name)
            await self.save_group_message(group, user=user, message=message, photo=photo)

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
    def save_chat_message(self, chat, user, message=None, photo=None):
        context = {'type': 'chat_message'}
        if photo and message:
            ChatMessage.objects.create(chat=chat, text_content=message, image_content=photo, created_by=user)
            context['message'] = message
            context['photo'] = photo
        elif message:
            ChatMessage.objects.create(chat=chat, text_content=message, created_by=user)
            context['message'] = message
        elif photo:
            ChatMessage.objects.create(chat=chat, image_content=photo, created_by=user)
            context['photo'] = photo
        self.channel_layer.group_send(
            self.room_group_name, context
        )

    @database_sync_to_async
    def save_direct_message(self, direct, user, message=None, photo=None):
        context = {"type": "direct_message"}
        if photo and message:
            DirectMessage.objects.create(direct=direct, text_content=message, image_content=photo, created_by=user)
            context['message'] = message
            context['photo'] = photo
        elif message:
            DirectMessage.objects.create(direct=direct, text_content=message, created_by=user)
            context['message'] = message
        elif photo:
            DirectMessage.objects.create(direct=direct, image_content=photo, created_by=user)
            context['photo'] = photo
        self.channel_layer.group_send(
            self.room_group_name, context
        )

    @database_sync_to_async
    def save_group_message(self, group, user, message=None, photo=None):
        context = {"type": "group_message"}
        if photo and message:
            GroupMessage.objects.create(group=group, text_content=message, image_content=photo, created_by=user)
            context['message'] = message
            context['photo'] = photo
        elif message:
            GroupMessage.objects.create(group=group, text_content=message, created_by=user)
            context['message'] = message
        elif photo:
            GroupMessage.objects.create(group=group, image_content=photo, created_by=user)
            context['photo'] = photo
        self.channel_layer.group_send(
            self.room_group_name, context
        )
