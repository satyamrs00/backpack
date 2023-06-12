from django.urls import path
from .views import ProductViewSet, RequestProduct, AcceptOrRejectRequest, Profile
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'products', ProductViewSet)

urlpatterns = router.urls
urlpatterns += [
    path('request-product/', RequestProduct.as_view(), name='request-product'),
    path('accept-or-reject-request/', AcceptOrRejectRequest.as_view(), name='accept-or-reject-request'),
    path('profile/',Profile.as_view(),name='profile'),
]
