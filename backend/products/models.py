from django.db import models
from authentication.models import User
import json


# Create your models here.
class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    photo1 = models.ImageField(upload_to='product_pics',null=True)
    photo2 = models.ImageField(upload_to='product_pics',null=True)
    photo3 = models.ImageField(upload_to='product_pics',null=True)
    photo4 = models.ImageField(upload_to='product_pics',null=True)
    photo5 = models.ImageField(upload_to='product_pics',null=True)
    owner = models.ForeignKey(User,related_name='owned_products',on_delete=models.CASCADE)
    current_owner = models.ForeignKey(User, related_name='current_products',on_delete=models.CASCADE)
    available = models.BooleanField(default=True)

    def __str__(self):
        return json.dumps({
            'name': self.name,
            'description': self.description,
            'photo1': self.photo1,
            'photo2': self.photo2,
            'photo3': self.photo3,
            'photo4': self.photo4,
            'photo5': self.photo5,
            'owner': self.owner.username,
            'current_owner': self.current_owner.username,
            'available': self.available,
        })


class Transaction(models.Model):
    product = models.ForeignKey(Product,on_delete=models.CASCADE)
    fromOwner = models.ForeignKey(User, related_name='requests_to_me',on_delete=models.CASCADE)
    toOwner = models.ForeignKey(User, related_name='my_requests',on_delete=models.CASCADE)
    status = models.CharField(max_length=20, default='pending')