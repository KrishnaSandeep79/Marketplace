from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone

from User.models import TimestampModel


class Category(TimestampModel):
    category = models.CharField(max_length=15, default='none')
    def __str__(self):
        return self.category
    def serialize(self):
        return {
            "id": self.id,
            "category": self.category
        }

class Product(TimestampModel):
    name = models.CharField(max_length=40, null=False)
    image = models.FileField(upload_to='products')
    posted_date_time = models.DateTimeField(default=timezone.now)
    categories = models.ManyToManyField(Category)
    price = models.CharField(max_length=5, null=False)
    rating = models.CharField(max_length=5, default='none')
    information = models.CharField(max_length=1000, default='none')
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)

    def __str__(self):
        return "Product" + " " + str(self.id)