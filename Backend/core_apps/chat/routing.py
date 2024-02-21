from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    re_path(r"ws/chat/(?P<room_uuid>[0-9a-f-]+)/$", consumers.ChatConsumer.as_asgi()),
    # re_path(r"ws/group/(?P<group_uuid>[0-9a-f-]+)/$", consumers.ChatConsumer.as_asgi()),
    # re_path(r"ws/direct/(?P<direct_uuid>[0-9a-f-]+)/$", consumers.ChatConsumer.as_asgi()),
]
