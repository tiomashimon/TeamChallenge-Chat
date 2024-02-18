from django.contrib.auth.forms import UserCreationForm
from .models import User


class UserRegistrationForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['nickname', 'username', 'password1', 'password2']
