from .models import Product, Transaction
from rest_framework import serializers
from .models import Product, Transaction
from authentication.serializer import RegisterSerializer


class ProductSerializer(serializers.ModelSerializer):
    owner = RegisterSerializer(read_only=True)
    current_owner = RegisterSerializer(required=False)
    class Meta:
        model = Product
        fields = ('name','description','owner','current_owner','available', 'id','photo1','photo2','photo3','photo4','photo5')

    def create(self, validated_data):
        product = Product.objects.create(
            name=validated_data.get('name'),
            description=validated_data.get('description'),
            photo1=validated_data.get('photo1', None),
            photo2=validated_data.get('photo2', None),
            photo3=validated_data.get('photo3', None),
            photo4=validated_data.get('photo4', None),
            photo5=validated_data.get('photo5', None),
            owner=self.context['request'].user,
            current_owner=self.context['request'].user,
        )
        product.save()
        return product
    
    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.photo1 = validated_data.get('photo1', instance.photo1)
        instance.photo2 = validated_data.get('photo2', instance.photo2)
        instance.photo3 = validated_data.get('photo3', instance.photo3)
        instance.photo4 = validated_data.get('photo4', instance.photo4)
        instance.photo5 = validated_data.get('photo5', instance.photo5)
        instance.current_owner = validated_data.get('current_owner', instance.current_owner)
        instance.available = validated_data.get('available', instance.available)
        instance.save()
        return instance


class TransactionSerializer(serializers.HyperlinkedModelSerializer):
    fromOwner = RegisterSerializer(read_only=True)
    toOwner = RegisterSerializer(read_only=True)
    product = ProductSerializer(required=False, read_only=True)
    product_id = serializers.IntegerField(write_only=True, required=False)
    transaction_id = serializers.IntegerField(write_only=True, required=False)

    class Meta:
        model = Transaction
        fields = ('product','fromOwner','toOwner', 'status', 'id', 'product_id', 'transaction_id')

    def create(self, validated_data):
        transaction = Transaction.objects.create(
            product=Product.objects.get(id=validated_data['product_id']),
            fromOwner=Product.objects.get(id=validated_data['product_id']).current_owner,
            toOwner=self.context['request'].user,
        )
        transaction.save()
        return transaction

    def update(self, instance, validated_data):
        instance.status = validated_data.get('status', instance.status)
        instance.fromOwner = validated_data.get('fromOwner', instance.fromOwner)
        instance.toOwner = validated_data.get('toOwner', instance.toOwner)
        if validated_data.get('status') == 'accepted':
            instance.product.current_owner = instance.toOwner
            instance.product.available = False
            instance.product.save()
        if validated_data.get('product_id'):
            instance.product = Product.objects.get(id=validated_data['product_id'])
        instance.save()
        return instance
    
    def validate(self, data):
        if self.context['request'].method == 'POST' and 'product_id' not in data:
            raise serializers.ValidationError("Product id is required")
        
        if self.context['request'].method in ['PUT', 'PATCH'] and 'transaction_id' not in data:
            raise serializers.ValidationError("Transaction id is required")
        
        if self.context['request'].method in ['PUT', 'PATCH'] and 'status' not in data:
            raise serializers.ValidationError("Status is required")

        return data

    def validate_product_id(self, value):

        if not Product.objects.filter(id=value).exists():
            raise serializers.ValidationError("This product does not exist")
        
        if Product.objects.get(id=value).current_owner == self.context['request'].user:
            raise serializers.ValidationError("You cannot request your own product")

        if Product.objects.get(id=value).available == False:
            raise serializers.ValidationError("This product is not available")        
        
        if Transaction.objects.filter(product_id=value, toOwner=self.context['request'].user, status='pending').exists():
            raise serializers.ValidationError("You have already requested this product")
        
        return value
    
    def validate_transaction_id(self, value):
        if not Transaction.objects.filter(id=value).exists():
            raise serializers.ValidationError("This transaction does not exist")
        
        if Transaction.objects.get(id=value).fromOwner != self.context['request'].user:
            raise serializers.ValidationError("You cannot accept or reject this request")
        
        if Transaction.objects.get(id=value).status != 'pending':
            raise serializers.ValidationError("This request has already been accepted or rejected")
        return value