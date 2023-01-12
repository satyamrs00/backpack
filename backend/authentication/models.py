from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):
    address = models.TextField()
    phone = models.CharField(max_length=20)
    college = models.CharField(max_length=100)
    profile_pic = models.ImageField(upload_to='profile_pics', blank=True)
    batch = models.CharField(max_length=20)




