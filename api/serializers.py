from .models import Board, List, Card
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from drf_writable_nested.serializers import WritableNestedModelSerializer
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email

        return token


class RegisterSerializer(serializers.ModelSerializer):
    confirmation = serializers.CharField(
        style={'input_type': 'password'}, write_only=True
    )

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'confirmation']
        extra_kwargs = {
            'email': {'required': True},
            'password': {'validators': [validate_password]},
        }

    def validate(self, data):
        if data['password'] != data['confirmation']:
            raise serializers.ValidationError({'detail': 'Passwords must match.'})
        return data

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'], email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = '__all__'


class ListSerializer(WritableNestedModelSerializer):
    cards = CardSerializer(many=True, required=False)

    class Meta:
        model = List
        fields = '__all__'


class BoardSeriazlier(WritableNestedModelSerializer):
    lists = ListSerializer(many=True, required=False)

    class Meta:
        model = Board
        fields = ['id', 'title', 'lists']
