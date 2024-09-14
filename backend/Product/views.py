from django.http import JsonResponse
from rest_framework import status, permissions
from rest_framework import viewsets
from rest_framework.decorators import api_view

from .models import Product, Category
from .serializer import ProductSerializer, CategorySerializer, CategoriesSerializer


# Create your views here.

@api_view(['POST'])
def product_create_view(request, *args, **kwargs):
    if (request.method == 'POST'):
        serializer = ProductSerializer(data=request.data or None)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)

    return JsonResponse({}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def category_create_view(request, *args, **kwargs):
    if (request.method == 'POST'):
        serializer = CategorySerializer(data=request.data or None)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)

    return JsonResponse({}, status=status.HTTP_400_BAD_REQUEST)


class all_products_view(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filterset_fields = ["categories"]
    search_fields = ['information', 'name']

    # def create(self, request, *args, **kwargs):
    #     pass

class categories_view(viewsets.ModelViewSet):
    permission_classes = (permissions.AllowAny,)
    queryset = Category.objects.all()
    serializer_class = CategoriesSerializer

