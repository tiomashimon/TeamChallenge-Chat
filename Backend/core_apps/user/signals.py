from django.dispatch import receiver
from django_rest_passwordreset.signals import reset_password_token_created
from core_apps.user.tasks import send_mail_to_user


@receiver(reset_password_token_created)
def handle_reset_password_token_created(sender, instance, reset_password_token, *args, **kwargs):
    user = reset_password_token.user
    email_subject = 'Reset Your Password'
    email_message = f'Use this key for reset your password: {reset_password_token.key}'
    send_mail_to_user.delay(email_subject, email_message, [user.email])
