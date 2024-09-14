from django.db import models
from Product.models import Product
from User.models import User, TimestampModel


# Create your models here.
class Cart(TimestampModel):
    product_id = models.OneToOneField(Product, on_delete = models.CASCADE, null = False)
    buyer_id = models.ForeignKey(User, on_delete = models.CASCADE, null = False, related_name = "buyer")
    seller_id = models.ForeignKey(User, on_delete = models.CASCADE, null = False, related_name = "seller")

    def __str__(self):
        return  "Cart Product" +" "+ str(self.id)

    def serialize(self):
        return {
            "id": self.id,
            "product_id" : self.product_id,
            "buyer_id": self.buyer_id,
            "seller_id": self.seller_id
        }  

        