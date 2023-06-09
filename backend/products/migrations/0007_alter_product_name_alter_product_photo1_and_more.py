# Generated by Django 4.1.5 on 2023-06-09 11:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0006_alter_product_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='name',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='product',
            name='photo1',
            field=models.ImageField(upload_to='product_pics'),
        ),
        migrations.AlterField(
            model_name='product',
            name='photo2',
            field=models.ImageField(blank=True, null=True, upload_to='product_pics'),
        ),
        migrations.AlterField(
            model_name='product',
            name='photo3',
            field=models.ImageField(blank=True, null=True, upload_to='product_pics'),
        ),
        migrations.AlterField(
            model_name='product',
            name='photo4',
            field=models.ImageField(blank=True, null=True, upload_to='product_pics'),
        ),
        migrations.AlterField(
            model_name='product',
            name='photo5',
            field=models.ImageField(blank=True, null=True, upload_to='product_pics'),
        ),
    ]