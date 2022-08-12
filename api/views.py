from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, permissions

from .models import Board, List, Card
from .serializers import RegisterSerializer, BoardSeriazlier, ListSerializer, CardSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer


class BoardsView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = BoardSeriazlier

    def get_queryset(self):
        boards = Board.objects.filter(user=self.request.user)
        return boards

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class BoardView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = BoardSeriazlier

    def get_object(self):
        board = Board.objects.get(user=self.request.user, pk=self.kwargs['pk'])
        return board


class ListsView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ListSerializer

    def get_queryset(self):
        boards = Board.objects.filter(user=self.request.user)
        lists = List.objects.filter(board__in=boards)
        return lists


class ListView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ListSerializer

    def get_object(self):
        list = List.objects.get(pk=self.kwargs['pk'])
        return list


class CardsView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CardSerializer

    def get_queryset(self):
        boards = Board.objects.filter(user=self.request.user)
        lists = List.objects.filter(board__in=boards)
        cards = Card.objects.filter(list__in=lists)
        return cards


class CardView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CardSerializer

    def get_object(self):
        card = Card.objects.get(pk=self.kwargs['pk'])
        return card
