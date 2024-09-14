from Cart.models import Cart
from django.http import JsonResponse
from rest_framework.decorators import api_view
from . serializer import CartSerializer
from rest_framework import status

# Create your views here.

@api_view(['POST'])
def cart_create_view(request, *args, **kwargs):
    
    if(request.method == 'POST'):
        serializer = CartSerializer(data = request.data or None)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status = status.HTTP_201_CREATED)

    return JsonResponse({}, status = status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def cart_view(request, user_id,  *args, **kwargs):
   
   data = {
        "id" : user_id
   }

   status = 200

   try:

    cart_items = Cart.objects.filter(buyer_id = user_id)
    cart_list = [cart_item.serialize() for cart_item in cart_items]

    product_list = []

    for cart_item in cart_list:
        product_list.append(cart_item["product_id"])

    product_list = [product.serialize() for product in product_list]
    data['cart_items'] = product_list

   except:

    data['message'] = "Not Found"
    status = 404

   return JsonResponse(data, status = status)


