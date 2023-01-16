# Generated by Django 4.1.5 on 2023-01-12 13:57

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('products', '0003_alter_transaction_fromowner_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transaction',
            name='toOwner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='my_requests', to=settings.AUTH_USER_MODEL),
        ),
    ]
