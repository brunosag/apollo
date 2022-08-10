from django.urls import reverse
import pytest


@pytest.mark.django_db
def test_register_fail(client, user_data):
    """
    User cannot register with no or invalid data.
    """

    response_blank = client.post(reverse('register'))
    response_invalid = client.post(reverse('register'), {
        'username': user_data['username'],
        'email': user_data['email'],
        'password': user_data['password'],
        'confirmation': user_data['password2']
    })

    assert response_blank.status_code == 400
    assert response_invalid.status_code == 400
    assert response_invalid.data['detail'][0].code == 'invalid'
    assert 'username' and 'email' and 'password' and 'confirmation' in response_blank.data


@pytest.mark.django_db
def test_register_success(client, user_data):
    """
    User can register with valid data.
    """

    response = client.post(reverse('register'), {
        'username': user_data['username'],
        'email': user_data['email'],
        'password': user_data['password'],
        'confirmation': user_data['password']
    })

    assert response.status_code == 201
    assert response.data['username'] == user_data['username']
    assert response.data['email'] == user_data['email']
    assert response.data['password'].startswith('pbkdf2_sha256$')
    assert 'confirmation' not in response.data


@pytest.mark.django_db
def test_login_fail(client, user_data):
    """
    User cannot login with no or invalid data.
    """

    response_blank = client.post(reverse('token_obtain_pair'))
    response_invalid = client.post(reverse('token_obtain_pair'), {
        'username': user_data['username'],
        'password': user_data['password']
    })

    assert response_blank.status_code == 400
    assert response_invalid.status_code == 401
    assert response_invalid.data['detail'].code == 'no_active_account'
    assert 'username' and 'password' in response_blank.data


@pytest.mark.django_db
def test_login_success(client, user, user_data):
    """
    User can login with valid data.
    """

    response = client.post(reverse('token_obtain_pair'), {
        'username': user_data['username'],
        'password': user_data['password']
    })

    assert response.status_code == 200
    assert 'access' and 'refresh' in response.data
