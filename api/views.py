from rest_framework import generics, permissions
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import Board, List, Card
from .serializers import (
    MyTokenObtainPairSerializer,
    RegisterSerializer,
    BoardSeriazlier,
    ListSerializer,
    CardSerializer
)


class MyTokenObtainPairView(TokenObtainPairView):
    """
    Takes the user's credentials and returns both an access and refresh type JSON web tokens.
    """
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    """
    Creates a new user instance.
    """
    serializer_class = RegisterSerializer


class BoardsView(generics.ListCreateAPIView):
    """
    get:
    Returns a list of all the user's boards.

    post:
    Creates a new board instance.
    """
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = BoardSeriazlier

    def get_queryset(self):
        boards = Board.objects.filter(user=self.request.user).order_by('-last_access')
        return boards

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class BoardView(generics.RetrieveUpdateDestroyAPIView):
    """
    get:
    Returns a board's details.

    put:
    Updates a board's details.

    patch:
    Partially updates a board's details.

    delete:
    Deletes a board instance.
    """
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = BoardSeriazlier

    def get_object(self):
        board = Board.objects.get(user=self.request.user, pk=self.kwargs['pk'])
        return board


class ListsView(generics.ListCreateAPIView):
    """
    get:
    Returns a list of all the user's lists.

    post:
    Creates a new list instance.
    """
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ListSerializer

    def get_queryset(self):
        boards = Board.objects.filter(user=self.request.user)
        lists = List.objects.filter(board__in=boards)
        return lists


class ListView(generics.RetrieveUpdateDestroyAPIView):
    """
    get:
    Returns a list's details.

    put:
    Updates a list's details.

    patch:
    Partially updates a list's details.

    delete:
    Deletes a list instance.
    """
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ListSerializer

    def get_object(self):
        list = List.objects.get(pk=self.kwargs['pk'])
        return list


class CardsView(generics.ListCreateAPIView):
    """
    get:
    Returns a list of all the user's cards.

    post:
    Creates a new card instance.
    """
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CardSerializer

    def get_queryset(self):
        boards = Board.objects.filter(user=self.request.user)
        lists = List.objects.filter(board__in=boards)
        cards = Card.objects.filter(list__in=lists)
        return cards


class CardView(generics.RetrieveUpdateDestroyAPIView):
    """
    get:
    Returns a card's details.

    put:
    Updates a card's details.

    patch:
    Partially updates a card's details.

    delete:
    Deletes a card instance.
    """
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CardSerializer

    def get_object(self):
        card = Card.objects.get(pk=self.kwargs['pk'])
        return card
