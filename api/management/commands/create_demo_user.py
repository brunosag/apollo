from django.contrib.auth.models import User
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = 'Deletes any existing demo user and creates a new one.'
    name = 'create_demo_user'

    def handle(self, *args, **options):
        username = 'demouser'
        password = 'demouser'

        try:
            User.objects.get(username=username).delete()
        except User.DoesNotExist:
            pass

        User.objects.create_user(username=username, password=password)
