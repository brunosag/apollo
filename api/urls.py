from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.documentation import include_docs_urls
from rest_framework.schemas import get_schema_view

from .views import MyTokenObtainPairView, RegisterView, BoardsView, BoardView, ListsView, ListView, CardsView, CardView


details = {'title': 'Apollo API', 'description': 'API for a Kanban-style list-making application.'}

urlpatterns = [

    path('', include_docs_urls(title=details['title'], description=details['description']), name='docs'),
    path('schema/', get_schema_view(title=details['title'], description=details['description']), name='schema'),

    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='register'),
    path('boards/', BoardsView.as_view(), name='boards'),
    path('boards/<int:pk>', BoardView.as_view(), name='board'),
    path('lists/', ListsView.as_view(), name='lists'),
    path('lists/<int:pk>', ListView.as_view(), name='list'),
    path('cards/', CardsView.as_view(), name='cards'),
    path('cards/<int:pk>', CardView.as_view(), name='card')

]
