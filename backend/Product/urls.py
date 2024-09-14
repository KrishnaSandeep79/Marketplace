from django.urls import path, include
from rest_framework import routers

from .views import product_create_view, category_create_view, all_products_view, categories_view

router = routers.DefaultRouter()
router.register(r'all_products', all_products_view)
router.register(r'categories', categories_view)

urlpatterns = [
    path('', include(router.urls)),
    path('create_product', product_create_view),
    path('create_category', category_create_view),
]
