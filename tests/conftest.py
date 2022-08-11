from django.contrib.auth.models import User
from django.urls import reverse
from faker import Faker
from rest_framework.test import APIClient
import pytest

from api.models import Board, List


fake = Faker()


@pytest.fixture
def user_data():

    user_data = {
        'username': fake.user_name(),
        'email': fake.email(),
        'password': fake.password(),
        'password2': fake.password()
    }
    return user_data


@pytest.fixture
def user(user_data):

    user = User.objects.create(username=user_data['username'], email=user_data['email'])
    user.set_password(user_data['password'])
    user.save()
    return user


@pytest.fixture
def client():

    return APIClient()


@pytest.fixture
def auth_client(client, user, user_data):

    tokens = client.post(reverse('token_obtain_pair'), {
        'username': user_data['username'],
        'password': user_data['password']
    })
    client.credentials(HTTP_AUTHORIZATION=f"Bearer {tokens.data['access']}")
    return client


@pytest.fixture
def titles():

    titles = {
        'board': fake.text(max_nb_chars=32),
        'list': fake.text(max_nb_chars=32),
        'card': fake.text(max_nb_chars=64)
    }
    return titles


@pytest.fixture
def board(titles, user):

    board = Board.objects.create(user=user, title=titles['board'])
    return board


@pytest.fixture
def list(board, titles):

    list = List.objects.create(board=board, title=titles['list'], order=1)
    return list


@pytest.fixture
def user_data2():

    user_data = {
        'username': fake.user_name(),
        'email': fake.email(),
        'password': fake.password(),
        'password2': fake.password()
    }
    return user_data


@pytest.fixture
def user2(user_data2):

    user = User.objects.create(username=user_data2['username'], email=user_data2['email'])
    user.set_password(user_data2['password'])
    user.save()
    return user


@pytest.fixture
def auth_client2(client, user2, user_data2):

    tokens = client.post(reverse('token_obtain_pair'), {
        'username': user_data2['username'],
        'password': user_data2['password']
    })
    client.credentials(HTTP_AUTHORIZATION=f"Bearer {tokens.data['access']}")
    return client


@pytest.fixture
def titles2():

    titles = {
        'board': fake.text(max_nb_chars=32),
        'list': fake.text(max_nb_chars=32),
        'card': fake.text(max_nb_chars=64)
    }
    return titles
