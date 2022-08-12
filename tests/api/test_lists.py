from django.urls import reverse
import pytest


@pytest.mark.django_db
def test_lists_invalid(auth_client, board):
    """
    User cannot create lists without required data.
    """

    response = auth_client.post(reverse('lists'))

    assert response.status_code == 400
    assert 'board' and 'title' and 'order' in response.data


@pytest.mark.django_db
def test_lists_unauthorized(auth_client2, board, client, titles):
    """
    Unauthorized user cannot list or create lists.
    """

    client.credentials()

    response_unauthenticated_create = client.post(reverse('lists'), {
        'board': board.id,
        'title': titles['list'],
        'order': 1
    })
    response_unauthenticated_list = client.post(reverse('lists'))
    response_unauthorized_create = auth_client2.post(reverse('lists'), {
        'board': board.id,
        'title': titles['list'],
        'order': 1
    })
    response_unauthorized_list = auth_client2.post(reverse('lists'))
    responses = [
        response_unauthenticated_create,
        response_unauthenticated_list,
        response_unauthorized_create,
        response_unauthorized_list
    ]

    assert all(i.status_code == 401 for i in responses)
    assert all(i.data['detail'].code == 'not_authenticated' for i in responses)


@pytest.mark.django_db
def test_lists_success(auth_client, board, titles, titles2):
    """
    Authorized user can list and create lists.
    """

    response_create = auth_client.post(reverse('lists'), {'board': board.id, 'title': titles['list'], 'order': 1})
    response_create2 = auth_client.post(reverse('lists'), {'board': board.id, 'title': titles2['list'], 'order': 2})
    response_list = auth_client.get(reverse('lists'))

    assert response_create.status_code and response_create2.status_code == 201
    assert response_list.status_code == 200
    assert response_create.data['board'] and response_create2.data['board'] == board.id
    assert response_create.data['title'] == titles['list']
    assert response_create2.data['title'] == titles2['list']
    assert response_create.data['order'] == 1
    assert response_create2.data['order'] == 2
    assert len(response_list.data) == 2


@pytest.mark.django_db
def test_list_invalid(auth_client, list):
    """
    User cannot update lists with blank data.
    """

    response = auth_client.put(reverse('list', args=[list.id]), {'board': '', 'title': '', 'order': ''})

    assert response.status_code == 400
    assert 'board' and 'title' and 'order' in response.data


@pytest.mark.django_db
def test_list_unauthorized(auth_client2, client, list):
    """
    Unauthorized user cannot retrieve, update, or delete lists.
    """

    client.credentials()

    response_unauthenticated = client.get(reverse('list', args=[list.id]))
    response_unauthorized = auth_client2.get(reverse('list', args=[list.id]))
    responses = [response_unauthenticated, response_unauthorized]

    assert all(i.status_code == 401 for i in responses)
    assert all(i.data['detail'].code == 'not_authenticated' for i in responses)


@pytest.mark.django_db
def test_list_success(auth_client, board, board2, list, titles2):
    """
    Authorized user can retrieve, update, and delete lists.
    """

    response_retrieve = auth_client.get(reverse('list', args=[list.id]))
    response_update = auth_client.put(reverse('list', args=[list.id]), {
        'board': board2.id,
        'title': titles2['list'],
        'order': 2
    })
    response_delete = auth_client.delete(reverse('list', args=[list.id]))

    assert response_retrieve.status_code and response_update.status_code == 200
    assert response_delete.status_code == 204
    assert response_retrieve.data['id'] == list.id
    assert response_retrieve.data['board'] == board.id
    assert response_retrieve.data['title'] == list.title
    assert response_retrieve.data['order'] == list.order
    assert response_update.data['board'] == board2.id
    assert response_update.data['title'] == titles2['list']
    assert response_update.data['order'] == 2
    assert 'cards' in response_retrieve.data
