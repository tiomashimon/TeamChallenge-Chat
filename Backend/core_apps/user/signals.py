from django.dispatch import receiver
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import send_mail


@receiver(reset_password_token_created)
def handle_reset_password_token_created(sender, instance, reset_password_token, *args, **kwargs):
    user = reset_password_token.user
    email_subject = 'Reset Your Password'
    email_message = f'Use this key for reset your password: {reset_password_token.key}'
    send_mail(email_subject, email_message, 'teamchallangechat@ukr.net', [user.email],
              fail_silently=True)
