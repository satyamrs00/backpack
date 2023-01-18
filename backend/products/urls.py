from django.urls import path
from .views import ProductViewSet, RequestProduct, AcceptOrRejectRequest, Profile

urlpatterns = [
    path('products/', ProductViewSet.as_view(), name='products'),
    path('request-product/', RequestProduct.as_view(), name='request-product'),
    path('accept-or-reject-request/', AcceptOrRejectRequest.as_view(), name='accept-or-reject-request'),
    path('profile/',Profile.as_view(),name='profile'),
]
