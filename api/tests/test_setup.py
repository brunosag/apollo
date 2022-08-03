from django.urls import reverse
from faker import Faker
from rest_framework.test import APITestCase


class TestSetup(APITestCase):

    def setUp(self):

        self.register_url = reverse('register')
        self.login_url = reverse('token_obtain_pair')

        self.fake = Faker()
        password = self.fake.password()
        self.user_data = {
            'username': self.fake.user_name(),
            'email': self.fake.email(),
            'password': password,
            'confirmation': password
        }
