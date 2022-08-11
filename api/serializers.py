from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

from .models import Board, List, Card


class RegisterSerializer(serializers.ModelSerializer):

    confirmation = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'confirmation']
        extra_kwargs = {
            'email': {'required': True},
            'password': {'validators': [validate_password]}
        }

    def validate(self, data):
        if data['password'] != data['confirmation']:
            raise serializers.ValidationError({'detail': 'Passwords must match.'})
        return data

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class BoardSeriazlier(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = ['id', 'title', 'lists']
        extra_kwargs = {
            'lists': {'required': False}
        }


class ListSerializer(serializers.ModelSerializer):
    class Meta:
        model = List
        fields = ['id', 'title', 'order', 'cards']


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ['id', 'title', 'order']
