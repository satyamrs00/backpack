from django.db import models
from authentication.models import User
import json


# Create your models here.
class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    # photo1 = models.ImageField(upload_to='product_pics',null=True)
    # photo2 = models.ImageField(upload_to='product_pics',null=True)
    # photo3 = models.ImageField(upload_to='product_pics',null=True)
    # photo4 = models.ImageField(upload_to='product_pics',null=True)
    # photo5 = models.ImageField(upload_to='product_pics',null=True)
    owner = models.ForeignKey(User,related_name='owned_products',on_delete=models.CASCADE)
    current_owner = models.ForeignKey(User, related_name='current_products',on_delete=models.CASCADE)
    available = models.BooleanField(default=True)


class Transaction(models.Model):
    product = models.ForeignKey(Product,on_delete=models.CASCADE)
    fromOwner = models.ForeignKey(User, related_name='requests_to_me',on_delete=models.CASCADE)
    toOwner = models.ForeignKey(User, related_name='my_requests',on_delete=models.CASCADE)
    status = models.CharField(max_length=20, default='pending')