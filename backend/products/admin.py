from django.contrib import admin
from products.models import Product, Transaction

# Register your models here.
admin.site.register(Product)
admin.site.register(Transaction)