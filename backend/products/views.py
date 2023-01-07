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
from rest_framework.permissions import AllowAny, IsAuthenticated, BasePermission
from rest_framework.mixins import ListModelMixin, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin
from django.core.mail import send_mail
from django.conf import settings

# Create your views here.
class ProductViewSet(generics.CreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        id = request.GET.get('id')
        if id is not None:
            product = Product.objects.get(id=id)
            serializer = ProductSerializer(product)
            return Response(serializer.data)
        products = Product.objects.filter(current_owner__college=request.user)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)



    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save()

class RequestProduct(generics.GenericAPIView, CreateModelMixin):
    class IsSameCollege(BasePermission):
        def has_permission(self, request, view):
            return request.user.college == Product.objects.get(id=request.data["product"]).current_owner.college

    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [IsSameCollege]

    def post(self, request, *args, **kwargs):
        subject = f'New Request for your product {Product.objects.get(id=request.data["product"]).name}'
        message = f'Hi {Product.objects.get(id=request.data["product"]).current_owner.username}, {request.user.username} has requested for your product {Product.objects.get(id=request.data["product"]).name}. \nPlease login to your account to accept or reject the request.\n Or directly click on the link below to accept the request.\n http://todo.com'
        send_mail(subject=subject, message=message,from_email=settings.DEFAULT_FROM_EMAIL, recipient_list=[Product.objects.get(id=request.data["product"]).current_owner.email], fail_silently=False)
        return self.create(request, *args, **kwargs)

class AcceptRequest(generics.GenericAPIView, UpdateModelMixin):
    class IsCurrentOwner(BasePermission):
        def has_permission(self, request, view):
            return request.user == Transaction.objects.get(id=request.data["transaction"]).product.current_owner

    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated, IsCurrentOwner]

    def update(self, request, *args, **kwargs):
        transaction = Transaction.objects.get(id=self.request.data["transaction"])

        serializer = TransactionSerializer(transaction, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        subject = f'Request for {transaction.product.name} accepted'
        message = f'Hi {transaction.toOwner.username}, your request for {transaction.product.name} has been accepted.\nHead over to the product page to see the details.'
        send_mail(subject=subject, message=message,from_email=settings.DEFAULT_FROM_EMAIL, recipient_list=[transaction.toOwner.email], fail_silently=False)
        
        Product.objects.filter(id=transaction.product.id).update(current_owner=transaction.toOwner, available=False)

        return Response(serializer.data)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)