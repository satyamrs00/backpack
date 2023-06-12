from django.shortcuts import render
from .serializer import ProductSerializer, TransactionSerializer
from .models import Product, Transaction
from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated, BasePermission, SAFE_METHODS
from rest_framework.mixins import ListModelMixin, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin
from django.core.mail import send_mail
from django.conf import settings
from authentication.models import User
from authentication.serializer import RegisterSerializer
from rest_framework import viewsets
from rest_framework import serializers
# Create your views here.

class IsCurrentOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user == obj.product.current_owner
    
class IsCurrentOwnerOrAuthenticated(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS or request.method == "POST":
            return request.user.is_authenticated
        return request.user == obj.current_owner

class ProductViewSet(viewsets.GenericViewSet, ListModelMixin, RetrieveModelMixin, CreateModelMixin, UpdateModelMixin):
    permission_classes = [IsCurrentOwnerOrAuthenticated]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    parser_classes = (MultiPartParser, FormParser)

class RequestProduct(generics.GenericAPIView, CreateModelMixin):
    class IsSameCollegeButNotSelf(BasePermission):
        def has_object_permission(self, request, view, obj):
            return request.user.college == Product.objects.get(id=request.data["product_id"]).current_owner.college and request.user != Product.objects.get(id=request.data["product_id"]).current_owner

    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [IsSameCollegeButNotSelf]

    def create(self, request, *args, **kwargs):
        serializer = TransactionSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()

        subject = f'Backpack - New Request'
        message = f'Hi {Product.objects.get(id=request.data["product_id"]).current_owner.first_name}, {request.user.get_name()} has requested for your product {Product.objects.get(id=request.data["product_id"]).name}. \nPlease login to your account to accept or reject the request.'
        send_mail(subject=subject, message=message,from_email=settings.DEFAULT_FROM_EMAIL, recipient_list=[Product.objects.get(id=request.data["product_id"]).current_owner.email], fail_silently=False)

        return Response(serializer.data)
    
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

class AcceptOrRejectRequest(generics.GenericAPIView, UpdateModelMixin):

    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated, IsCurrentOwner]

    def update(self, request, *args, **kwargs):
        try:
            transaction = Transaction.objects.get(id=request.data.get("transaction_id"))
        except Transaction.DoesNotExist:
            raise serializers.ValidationError({"transaction_id": ["Invalid transaction id"]})

        serializer = TransactionSerializer(transaction, data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()

        if request.data["status"] == "rejected":
            subject = f'Backpack - Request rejected'
            message = f'Hi {transaction.toOwner.first_name}, your request for {transaction.product.name} has been rejected.\nHead over to the product page to see the details.'
        elif request.data["status"] == "accepted":
            subject = f'Backpack - Request accepted'
            message = f'Hi {transaction.toOwner.first_name}, your request for {transaction.product.name} has been accepted.\nHead over to the product page to see the details.'

        send_mail(subject=subject, message=message,from_email=settings.DEFAULT_FROM_EMAIL, recipient_list=[transaction.toOwner.email], fail_silently=False)
        
        if request.data["status"] == "accepted":
            Product.objects.filter(id=transaction.product.id).update(current_owner=transaction.toOwner, available=False)
            other_requests = Transaction.objects.filter(product=transaction.product, status='pending').exclude(id=transaction.id)
            for request in other_requests:
                request.status = 'rejected'
                request.save()
                subject = f'Backpack - Request rejected'
                message = f'Hi {request.toOwner.first_name}, your request for {request.product.name} has been rejected.\nHead over to the product page to see the details.'
                send_mail(subject=subject, message=message,from_email=settings.DEFAULT_FROM_EMAIL, recipient_list=[request.toOwner.email], fail_silently=False)

        return Response(serializer.data)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

class Profile(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]   

    def get(self, request, *args, **kwargs):

        my_request = Transaction.objects.filter(toOwner=request.user)
        request_to_me = Transaction.objects.filter(fromOwner=request.user)
        products = Product.objects.filter(current_owner=request.user)
        product_serializer = ProductSerializer(products, many=True)
        user_serializer = RegisterSerializer(request.user)
        transactions_serializer_my_request = TransactionSerializer(my_request, many=True, context={'request': request})
        transactions_serializer_request_to_me = TransactionSerializer(request_to_me, many=True, context={'request': request})

        json = {
            "product": product_serializer.data,
            "my_request": transactions_serializer_my_request.data,
            "request_to_me": transactions_serializer_request_to_me.data,
            "user": user_serializer.data
        }
        return Response(data=json, status=status.HTTP_200_OK)