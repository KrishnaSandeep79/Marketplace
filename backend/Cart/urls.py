from django.contrib import admin
from django.urls import path
from . views import cart_view, cart_create_view

urlpatterns = [
    path('cart/<int:user_id>', cart_view),
    path('create_cart', cart_create_view)
]