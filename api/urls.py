from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import MyTokenObtainPairView, RegisterView, BoardsView, BoardView, ListsView, ListView, CardsView


urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='register'),
    path('boards/', BoardsView.as_view(), name='boards'),
    path('boards/<int:pk>', BoardView.as_view(), name='board'),
    path('boards/<int:board_id>/lists/', ListsView.as_view(), name='lists'),
    path('boards/<int:board_id>/lists/<int:pk>', ListView.as_view(), name='list'),
    path('boards/<int:board_id>/lists/<int:list_id>/cards/', CardsView.as_view(), name='cards'),
]
