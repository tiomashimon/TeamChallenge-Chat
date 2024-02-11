from django.contrib import admin
from . import views
from django.urls import path, include
from rest_framework.routers import DefaultRouter

message_list = views.ChatMessageViewSet.as_view(
    {
        'get': 'list',
        'post': 'create'
    }
)

topic_list = views.TopicViewSet.as_view(
    {
        'get': 'list',
        'post': 'create'
    }
)


router = DefaultRouter()
router.register('group', views.GroupViewSet, basename='group')
router.register('group-message', views.GroupMessageViewSet, basename='group-message')
router.register('direct-message', views.DirectMessageViewSet, basename='direct-message')


urlpatterns = [
    path("create/", views.ChatCreate.as_view(), name='chats'),
    path('<int:id>/detail/', views.ChatRetrieve.as_view(), name='chat'),
    path('', views.ChatList.as_view(), name='add-user'),
    path('<int:pk>/delete/', views.ChatDestroy.as_view(), name='chat'),

    path('<int:id>/message/', message_list, name='message'), 
    path('topics/', topic_list, name='topic'), 
]

urlpatterns += [
    path('new/', views.index, name='chat-index'),
    path('direct/<str:room_name>/', views.room, name='chat'),
    path('group/<str:room_name>/', views.group, name='grouping'),

]

urlpatterns += router.urls