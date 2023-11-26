from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import User

from phonenumber_field.modelfields import PhoneNumberField


class UserRegistrationForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['nickname',]