from django.urls import path

from .views import CategoryItemListView, CategoryListView, ProductListView, ProductView

app_name = "store"

urlpatterns = [
    path("api/", ProductListView.as_view(), name="store_home"),
    path("api/category/", CategoryListView.as_view(), name="categories"),
    path("api/<slug:slug>/", ProductView.as_view(), name="product"),
    path("api/category/<slug:slug>/", CategoryItemListView.as_view(), name="category_items")
]
