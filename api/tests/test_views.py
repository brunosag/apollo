from django.urls import reverse
from .test_setup import TestSetup


class TestViews(TestSetup):

    def test_register_blank(self):
        """
        User cannot register with no data.
        """
        response = self.client.post(self.register_url)
        self.assertEqual(response.status_code, 400)  # Status is 'Bad Request'

    def test_register_unmatched(self):
        """
        User cannot register with unmatched passwords.
        """
        self.user_data['confirmation'] = self.fake.password()
        response = self.client.post(self.register_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 400)  # Status is 'Bad Request'

    def test_register_valid(self):
        """
        User can register with valid data.
        """
        response = self.client.post(self.register_url, self.user_data, format='json')
        self.assertEqual(response.data['username'], self.user_data['username'])  # Username is the same as provided
        self.assertEqual(response.data['email'], self.user_data['email'])  # Email is the same as provided
        self.assertIn('pbkdf2_sha256$', response.data['password'])  # Password is hashed
        self.assertEqual(response.status_code, 201)  # Status is 'Created'

    def test_login_blank(self):
        """
        User cannot login with no data.
        """
        response = self.client.post(self.login_url)
        self.assertEqual(response.status_code, 400)  # Status is 'Bad Request'

    def test_login_valid(self):
        """
        User can login with valid data.
        """
        self.client.post(self.register_url, self.user_data, format='json')
        response = self.client.post(self.login_url, self.user_data, format='json')
        self.assertIn('access', response.data)  # Response contains access token
        self.assertIn('refresh', response.data)  # Response contains refresh token
        self.assertEqual(response.status_code, 200)  # Status is 'OK'

    def test_boards_unauthenticated(self):
        """
        User cannot read or create boards while unauthenticated.
        """
        response_create = self.client.post(reverse('boards'), {'title': 'Test Board'}, format='json')
        response_list = self.client.get(reverse('boards'))
        self.assertEqual(response_create.status_code, 401)  # Status is 'Unauthorized'
        self.assertEqual(response_list.status_code, 401)  # Status is 'Unauthorized'

    def test_boards_authenticated(self):
        """
        User can read and create boards while authenticated.
        """
        self.client.post(self.register_url, self.user_data, format='json')
        tokens = self.client.post(self.login_url, self.user_data, format='json')
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {tokens.data['access']}")
        response_create = self.client.post(reverse('boards'), {'title': 'Test Board'}, format='json')
        response_list = self.client.get(reverse('boards'))
        self.assertEqual(response_list.data[0]['title'], 'Test Board')  # Created board's title is the same as provided
        self.assertEqual(response_create.status_code, 201)  # Status is 'Created'
        self.assertEqual(response_list.status_code, 200)  # Status is 'OK'

    def test_board_own(self):
        """
        User can update and delete own boards.
        """
        self.client.post(self.register_url, self.user_data, format='json')  # Register
        tokens = self.client.post(self.login_url, self.user_data, format='json')  # Get tokens
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {tokens.data['access']}")  # Set credentials
        created_board = self.client.post(reverse('boards'), {'title': 'Test Board'}, format='json')  # Create board
        board_id = created_board.data['id']  # Get created board's id
        response_update = self.client.put(
            reverse('board', args=[board_id]), {'title': 'Updated Board'}, format='json')  # Update board's title
        response_delete = self.client.delete(reverse('board', args=[board_id]))  # Delete board
        response_retrieve = self.client.get(reverse('board', args=[board_id]))  # Retrieve board
        self.assertEqual(response_update.status_code, 200)  # Status is 'OK'
        self.assertEqual(response_update.data['title'], 'Updated Board')  # Updated board's title is the provided
        self.assertEqual(response_delete.status_code, 204)  # Status is 'OK'
        self.assertEqual(response_retrieve.status_code, 404)  # Status is 'Not Found'

    def test_board_others(self):
        """
        User cannot update or delete other users' boards.
        """
        self.client.post(self.register_url, self.user_data, format='json')  # Register
        tokens = self.client.post(self.login_url, self.user_data, format='json')  # Get tokens
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {tokens.data['access']}")  # Set credentials
        created_board = self.client.post(reverse('boards'), {'title': 'Test Board'}, format='json')  # Create board
        board_id = created_board.data['id']  # Get created board's id
        self.setUp()  # Generate new user data
        self.client.post(self.register_url, self.user_data, format='json')  # Register
        tokens = self.client.post(self.login_url, self.user_data, format='json')  # Get tokens
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {tokens.data['access']}")  # Set credentials
        response_retrieve = self.client.get(reverse('board', args=[board_id]))  # Retrieve board
        response_update = self.client.put(
            reverse('board', args=[board_id]), {'title': 'Updated Board'}, format='json')  # Update board's title
        response_delete = self.client.delete(reverse('board', args=[board_id]))  # Delete board
        self.assertEqual(response_update.status_code, 404)  # Status is 'Not Found'
        self.assertEqual(response_delete.status_code, 404)  # Status is 'Not Found'
        self.assertEqual(response_retrieve.status_code, 404)  # Status is 'Not Found'
