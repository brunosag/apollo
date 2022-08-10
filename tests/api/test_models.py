import pytest

from api.models import Board, List, Card


@pytest.mark.django_db
def test_models_str(user, titles):
    """
    Models' strings are correctly displayed.
    """

    board = Board.objects.create(user=user, title=titles['board'])
    list = List.objects.create(board=board, title=titles['list'], order=1)
    card = Card.objects.create(list=list, title=titles['card'], order=1)

    assert str(board) == f"{user.username} | {titles['board']}"  # Board model's string is the expected
    assert str(list) == f"{user.username} | {titles['list']}"  # List model's string is the expected
    assert str(card) == f"{user.username} | {titles['card']}"  # Card model's string is the expected
