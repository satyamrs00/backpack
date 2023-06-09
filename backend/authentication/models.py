from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):
    email = models.EmailField(max_length=254, unique=True)
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=150)
    password2 = models.CharField(max_length=150)
    address = models.TextField()
    phone = models.CharField(max_length=20)
    college = models.CharField(max_length=100)
    profile_pic = models.ImageField(upload_to='profile_pics', blank=True)
    batch = models.CharField(max_length=10)
    first_name = models.CharField(max_length=49)
    last_name = models.CharField(max_length=48, blank=True, null=True)

    def get_name(self):
        return self.first_name + " " + self.last_name
