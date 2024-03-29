from .models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.core.files.uploadhandler import MemoryFileUploadHandler
from django.core.files.storage import default_storage
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    permission_classes = (AllowAny,)
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        token['address'] = user.address
        token['phone'] = user.phone
        token['college'] = user.college
        token['batch'] = user.batch
        # ...

        return token


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'password2', 'address', 'phone', 'college', 'profile_pic', 'batch', 'email', 'first_name', 'last_name')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data.get('username'),
            address=validated_data.get('address'),
            phone=validated_data.get('phone'),
            college=validated_data.get('college'),
            profile_pic=validated_data.get('profile_pic'),
            batch=validated_data.get('batch'),
            email=validated_data.get('email'),
            first_name=validated_data.get('first_name'),
            last_name=validated_data.get('last_name')
        )

        user.set_password(validated_data.get('password'))
        user.save()

        return user

