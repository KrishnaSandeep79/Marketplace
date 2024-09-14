from django.conf import settings 
from rest_framework import serializers
from . models import Cart


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ['product_id', 'buyer_id', 'seller_id']