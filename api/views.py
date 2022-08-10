from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, permissions

from .models import Board, List
from .serializers import RegisterSerializer, BoardSeriazlier, ListSeriazlier


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
        return Board.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class BoardView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = BoardSeriazlier

    def get_queryset(self):
        return Board.objects.filter(user=self.request.user, pk=self.kwargs['pk'])


class ListsView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ListSeriazlier

    def get_queryset(self):
        board = Board.objects.get(user=self.request.user, pk=self.kwargs['pk'])
        return List.objects.filter(board=board)

    def perform_create(self, serializer):
        serializer.save(board_id=self.kwargs['pk'])
