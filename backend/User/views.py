from django.contrib.auth import login
from django.contrib.auth.models import User
from django.shortcuts import render
from rest_framework import permissions
from rest_framework import views
from rest_framework.response import Response
from . models import UserDetails, Name, ContactDetails, Address
from Product.models import Product
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework import status
from . serializer import NameSerializer, ContactDetailsSerializer, AddressSerializer, UserDetailsSerializer, UserSerializer, LoginSerializer

# Create your views here.
class LoginView(views.APIView):
    # This view should be accessible also for unauthenticated users.
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = LoginSerializer(data=self.request.data,
            context={ 'request': self.request })
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return Response(None, status=status.HTTP_200_OK)


@api_view(['POST'])
def name_create_view(request, *args, **kwargs):
    
    if(request.method == 'POST'):
        serializer = NameSerializer(data = request.data or None)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status = status.HTTP_201_CREATED)

    return JsonResponse({}, status = status.HTTP_400_BAD_REQUEST) 

@api_view(['POST'])
def contact_details_create_view(request, *args, **kwargs):
    
    if(request.method == 'POST'):
        serializer = ContactDetailsSerializer(data = request.data or None)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status = status.HTTP_201_CREATED)

    return JsonResponse({}, status = status.HTTP_400_BAD_REQUEST) 

@api_view(['POST'])
def address_create_view(request, *args, **kwargs):
    
    if(request.method == 'POST'):
        serializer = AddressSerializer(data = request.data or None)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status = status.HTTP_201_CREATED)

    return JsonResponse({}, status = status.HTTP_400_BAD_REQUEST) 

@api_view(['POST'])
def user_details_create_view(request, *args, **kwargs):
    
    if(request.method == 'POST'):
        serializer = UserDetailsSerializer(data = request.data or None)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status = status.HTTP_201_CREATED)

    return JsonResponse({}, status = status.HTTP_400_BAD_REQUEST) 

@api_view(['POST'])
def user_create_view(request, *args, **kwargs):
    
    if(request.method == 'POST'):
        serializer = UserSerializer(data = request.data or None)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status = status.HTTP_201_CREATED)

    return JsonResponse({}, status = status.HTTP_400_BAD_REQUEST) 

@api_view(['GET'])
def user_view(request, user_id,  *args, **kwargs):
   
   data = {
        "id" : user_id
   }

   status = 200

   try:

    user = User.objects.get(id = user_id)
    data['user_name'] = user.user_name
    data['create_date_time'] = user.create_date_time

   except:

    data['message'] = "Not Found"
    status = 404

   return JsonResponse(data, status = status)



def user_details_view(request, user_id, *args, **kwargs):
    
   data = {
        "id" : user_id
   }

   status = 200

   try:

    user = User.objects.get(id = user_id)
    data['user_name'] = user.user_name
    user_details = UserDetails.objects.get(user = user.user_details_id.id)
    name = Name.objects.get(id = user_details.name_id.id)
    address = Address.objects.get(id = user_details.address_id.id)
    contact_details = ContactDetails.objects.get(id = user_details.contact_id.id)
    products = Product.objects.filter(user_id = user_id)
    products_list = [product.serialize() for product in products]

    #Name
    name_obj = {}
    name_obj['first_name'] = name.first_name
    name_obj['last_name'] = name.last_name
    data['name'] = name_obj

    #Address
    address_obj = {}
    address_obj['address_line1'] = address.address_line1
    address_obj['country'] = address.country
    address_obj['state'] = address.state
    address_obj['city'] = address.city
    address_obj['zipcode'] = address.zipcode
    data['address'] = address_obj

    #Contact Details
    contact_obj = {}
    contact_obj['phone1'] = contact_details.phone1
    contact_obj['email'] = contact_details.email
    data['contact'] = contact_obj

    #Products
    data['products'] = products_list

   except:

    data['message'] = "Not Found"
    status = 404

   return JsonResponse(data, status = status)