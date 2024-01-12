from django.contrib import admin
from .models import Chat, ChatMessage, ChatTopic, Group, GroupMessage, DirectMessage


admin.site.register(Chat)
admin.site.register(ChatMessage)
admin.site.register(ChatTopic)
admin.site.register(Group)
admin.site.register(GroupMessage)
admin.site.register(DirectMessage)