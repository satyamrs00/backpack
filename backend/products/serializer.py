from .models import Product, Transaction
from rest_framework import serializers
from .models import Product, Transaction


class ProductSerializer(serializers.ModelSerializer):
    photo1 = serializers.ImageField(required=False)
    photo2 = serializers.ImageField(required=False)
    photo3 = serializers.ImageField(required=False)
    photo4 = serializers.ImageField(required=False)
    photo5 = serializers.ImageField(required=False)
    class Meta:
        model = Product
        fields = ('name','description','owner','current_owner','photo1','photo2','photo3','photo4','photo5','available', 'id')

    def create(self, validated_data):
        product = Product.objects.create(
            name=validated_data['name'],
            description=validated_data['description'],
            photo1=validated_data['photo1'],
            photo2=validated_data['photo2'],
            photo3=validated_data['photo3'],
            photo4=validated_data['photo4'],
            photo5=validated_data['photo5'],
            owner=validated_data['owner'],
            current_owner=validated_data['current_owner'],
            available=True,
        )
        product.save()
        return product


class TransactionSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all(), required=False)
    class Meta:
        model = Transaction
        fields = ('product','fromOwner','toOwner', 'status')
        read_only_fields = ('status','fromOwner','toOwner',)

    def create(self, validated_data):
        transaction = Transaction.objects.create(
            product=validated_data['product'],
            fromOwner=Product.objects.get(id=validated_data['product'].id).current_owner,
            toOwner=self.context['request'].user,
        )
        transaction.save()
        return transaction

    def update(self, instance, validated_data):
        instance.status = 'accepted'
        instance.product = validated_data.get('product', instance.product)
        instance.fromOwner = validated_data.get('fromOwner', instance.fromOwner)
        instance.toOwner = validated_data.get('toOwner', instance.toOwner)
        instance.save()
        return instance