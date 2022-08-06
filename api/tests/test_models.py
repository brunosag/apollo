from django.contrib.auth.models import User

from .test_setup import TestSetup
from api.models import Board, List, Card


class TestModels(TestSetup):

    def test_models_str(self):
        """
        Models' strings are properly displayed.
        """
        self.client.post(self.register_url, self.user_data, format='json')
        user = User.objects.get(username=self.user_data['username'])
        board = Board.objects.create(title='Test Board', user=user)
        list = List.objects.create(title='Test List', board=board, order=1)
        card = Card.objects.create(title='Test Card', list=list, order=1)
        self.assertEqual(str(board), f'{user.username} | Test Board')  # Board model's string is the same as expected
        self.assertEqual(str(list), f'{user.username} | Test List')  # List model's string is the same as expected
        self.assertEqual(str(card), f'{user.username} | Test Card')  # Card model's string is the same as expected
