from django.urls import path
from .views import ProductViewSet, RequestProduct, AcceptRequest

urlpatterns = [
    path('products', ProductViewSet.as_view(), name='products'),
    path('request-product', RequestProduct.as_view(), name='request-product'),
    path('accept-request', AcceptRequest.as_view(), name='accept-request')
]
