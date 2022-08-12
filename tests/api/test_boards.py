from django.urls import reverse
import pytest


@pytest.mark.django_db
def test_boards_fail(client, titles):
    """
    Unauthenticated user cannot list or create boards.
    """

    response_create = client.post(reverse('boards'), {'title': titles['board']})
    response_list = client.get(reverse('boards'))
    responses = [response_create, response_list]

    assert all(i.status_code == 401 for i in responses)
    assert all(i.data['detail'].code == 'not_authenticated' for i in responses)


@pytest.mark.django_db
def test_boards_success(auth_client, titles):
    """
    Authenticated user can list and create boards.
    """

    response_create = auth_client.post(reverse('boards'), {'title': titles['board']})
    response_list = auth_client.get(reverse('boards'))

    assert response_create.status_code == 201
    assert response_list.status_code == 200
    assert response_list.data[0]['title'] == titles['board']


@pytest.mark.django_db
def test_board_invalid(auth_client, board):
    """
    User cannot update boards with blank data.
    """

    response = auth_client.put(reverse('board', args=[board.id]), {'title': ''})

    assert response.status_code == 400
    assert 'title' in response.data


@pytest.mark.django_db
def test_board_unauthorized(auth_client2, board, client):
    """
    Unauthorized user cannot retrieve, update, or delete boards.
    """

    client.credentials()

    response_unauthenticated = client.get(reverse('board', args=[board.id]))
    response_unauthorized = auth_client2.get(reverse('board', args=[board.id]))
    responses = [response_unauthenticated, response_unauthorized]

    assert all(i.status_code == 401 for i in responses)
    assert all(i.data['detail'].code == 'not_authenticated' for i in responses)


@pytest.mark.django_db
def test_board_success(auth_client, board, titles2):
    """
    Authorized user can retrieve, update, and delete boards.
    """

    response_retrieve = auth_client.get(reverse('board', args=[board.id]))
    response_update = auth_client.put(reverse('board', args=[board.id]), {'title': titles2['board']})
    response_delete = auth_client.delete(reverse('board', args=[board.id]))

    assert response_retrieve.status_code and response_update.status_code == 200
    assert response_delete.status_code == 204
    assert response_retrieve.data['id'] == board.id
    assert response_retrieve.data['title'] == board.title
    assert response_update.data['title'] == titles2['board']
    assert 'lists' in response_retrieve.data
