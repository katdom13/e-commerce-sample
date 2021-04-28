from django.shortcuts import render
from rest_framework import generics

from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer

# Create your views here.


class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductView(generics.RetrieveAPIView):
    lookup_field = "slug"
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class CategoryItemListView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        # return Product.objects.filter(category__slug=self.kwargs.get("slug"))
        return Product.objects.filter(
            category__in=Category.objects.filter(slug=self.kwargs.get("slug")).get_descendants(include_self=True)
        )


class CategoryListView(generics.ListAPIView):
    # queryset = Category.objects.filter(level=1)
    serializer_class = CategorySerializer

    def get_queryset(self):
        return Category.objects.filter(level=1)
