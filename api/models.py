from django.contrib.auth.models import User
from django.db import models


class Board(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=32)
    last_access = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['id']

    def __str__(self):
        return f'{self.user} | {self.title}'


class List(models.Model):
    board = models.ForeignKey(Board, on_delete=models.CASCADE)
    title = models.CharField(max_length=32)
    order = models.SmallIntegerField()

    class Meta:
        ordering = ['id']

    def __str__(self):
        return f'{self.board.user} | {self.title}'


class Card(models.Model):
    list = models.ForeignKey(List, on_delete=models.CASCADE)
    title = models.CharField(max_length=64)
    order = models.SmallIntegerField()

    class Meta:
        ordering = ['id']

    def __str__(self):
        return f'{self.list.board.user} | {self.title}'
