from django.urls import reverse
import pytest


@pytest.mark.django_db
def test_boards_fail(client, titles):
    """
    Unauthenticated user cannot list or create boards.
    """

    response_create = client.post(reverse('boards'), {'title': titles['board']})
    response_list = client.get(reverse('boards'))

    assert response_create.status_code == 401
    assert response_list.status_code == 401


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
def test_board_fail(auth_client2, board, client):
    """
    Unauthorized user cannot retrieve, update, or delete board.
    """

    client.credentials()
    response_unauthenticated = client.get(reverse('board', args=[board.id]))
    response_unauthorized = auth_client2.get(reverse('board', args=[board.id]))

    assert response_unauthenticated.status_code == 401
    assert response_unauthorized.status_code == 401


@pytest.mark.django_db
def test_board_success(auth_client, board, titles):
    """
    Authorized user can retrieve, update, & delete board.
    """

    response_retrieve = auth_client.get(reverse('board', args=[board.id]))
    response_update = auth_client.put(reverse('board', args=[board.id]), {'title': titles['board']})
    response_delete = auth_client.delete(reverse('board', args=[board.id]))

    assert response_retrieve.status_code == 200
    assert response_update.status_code == 200
    assert response_delete.status_code == 204
    assert response_retrieve.data['title'] == board.title
    assert response_update.data['title'] == titles['board']
    assert 'id' and 'title' in response_retrieve.data
