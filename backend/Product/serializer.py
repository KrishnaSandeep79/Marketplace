from django.conf import settings
from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Product, Category


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
    # def get_value(self, dictionary):
    #     return eval(dictionary.get(self.field_name))
    #     super().get_value(dictionary)

class ProductSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    # user = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())
    class Meta:
        model = Product
        fields = "__all__"
        # exclude = ['user']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["sellerName"] = data["user"]["first_name"] + data["user"]["last_name"]
        return data

    # def validate(self, attrs):
    #     pass
    # def save(self):
    #     user = self.context.get("request").user
    #     # title = self.validated_data['title']
    #     # article = self.validated_data['article']
    #     super().save()

    def create(self, validated_data):
        validated_data["user"] = User.objects.get(id = self.context.get("request").user.id)
        return super().create(validated_data)

    # def save(self):
    #     pass

    # def to_internal_value(self, data):
    #     super().to_internal_value(data)



    # def create(self, validated_data):
    #     user_id = validated_data.pop("user_id")
    #     instance = Product.objects.create(user_id=user_id, **validated_data)
    #     # order = Product.objects.get(pk=validated_data.pop('event'))
    #     # Assignment.objects.create(Order=order, Equipment=instance)
    #     return instance


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['product_id', 'category']

class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"