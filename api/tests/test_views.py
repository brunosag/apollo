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
