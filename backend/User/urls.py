from django.contrib import admin
from django.urls import path, include
from . views import user_view, user_details_view, name_create_view, contact_details_create_view, \
    address_create_view, user_details_create_view, user_create_view 
from User import views

urlpatterns = [
    path('user/<int:user_id>', user_view),
    path('all_users/<int:user_id>', user_details_view),
    path('create_name', name_create_view),
    path('create_contact_details', contact_details_create_view),
    path('create_address', address_create_view),
    path('create_user_details', user_details_create_view),
    path('create_user', user_create_view),
    path('login/', views.LoginView.as_view()),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]