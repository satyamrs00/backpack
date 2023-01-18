from .models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.core.files.uploadhandler import MemoryFileUploadHandler
from django.core.files.storage import default_storage


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
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
    profile_pic = serializers.ImageField(required=False)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2', 'address', 'phone', 'college', 'profile_pic', 'batch', 'email', 'first_name', 'last_name')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):

        user = User.objects.create(
            username=validated_data['username'],
            address=validated_data['address'],
            phone=validated_data['phone'],
            college=validated_data['college'],
            profile_pic=self.context['request'].FILES['profile_pic'],
            batch=validated_data['batch'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )

        user.set_password(validated_data['password'])
        user.save()

        return user


class UserSerializer (serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name', 'address', 'phone', 'college', 'batch', 'profile_pic','id')