from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import MyTokenObtainPairView, RegisterView, BoardsView, BoardView, ListsView


urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='register'),
    path('boards/', BoardsView.as_view(), name='boards'),
    path('boards/<int:pk>', BoardView.as_view(), name='board'),
    path('boards/<int:pk>/lists', ListsView.as_view(), name='lists'),
]
