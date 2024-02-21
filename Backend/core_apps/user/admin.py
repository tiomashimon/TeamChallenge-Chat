from django.contrib import admin
from .models import User, Settings


admin.site.register(User)
admin.site.register(Settings)
