from .models import Product, Transaction
from rest_framework import serializers
from .models import Product, Transaction
from authentication.serializer import UserSerializer


class ProductSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    current_owner = UserSerializer(read_only=True)
    photo1 = serializers.ImageField(required=True)
    photo2 = serializers.ImageField(required=False)
    photo3 = serializers.ImageField(required=False)
    photo4 = serializers.ImageField(required=False)
    photo5 = serializers.ImageField(required=False)
    class Meta:
        model = Product
        fields = ('name','description','owner','current_owner','available', 'id','photo1','photo2','photo3','photo4','photo5')
        read_only_fields = ('owner','current_owner','available', 'id')

    def create(self, validated_data):
        product = Product.objects.create(
            name=validated_data['name'],
            description=validated_data['description'],
            photo1=self.context['request'].FILES['photo1'],
            photo2=self.context['request'].FILES.get('photo2', None),
            photo3=self.context['request'].FILES.get('photo3', None),
            photo4=self.context['request'].FILES.get('photo4', None),
            photo5=self.context['request'].FILES.get('photo5', None),
            owner=self.context['request'].user,
            current_owner=self.context['request'].user,
            available=True,
        )
        product.save()
        return product


class TransactionSerializer(serializers.HyperlinkedModelSerializer):
    fromOwner = UserSerializer(read_only=True)
    toOwner = UserSerializer(read_only=True)
    product = ProductSerializer(required=False)
    class Meta:
        model = Transaction
        fields = ('product','fromOwner','toOwner', 'status', 'id')
        read_only_fields = ('status','fromOwner','toOwner', 'id')

    def create(self, validated_data):
        req_data = self.context['request'].data
        transaction = Transaction.objects.create(
            product=Product.objects.get(id=req_data['product']),
            fromOwner=Product.objects.get(id=req_data['product']).current_owner,
            toOwner=self.context['request'].user,
        )
        transaction.save()
        return transaction

    def update(self, instance, validated_data):
        print(self.context['request'].data)
        req_data = self.context['request'].data
        instance.status = req_data.get('status', instance.status)
        instance.product = req_data.get('product', instance.product)
        instance.fromOwner = req_data.get('fromOwner', instance.fromOwner)
        instance.toOwner = req_data.get('toOwner', instance.toOwner)
        instance.save()
        return instance