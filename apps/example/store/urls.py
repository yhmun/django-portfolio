from django.urls import path
from . import views
from . import api_views

app_name = "store"
urlpatterns = [
    path('api/v1/products/', api_views.ProductList.as_view()),

    path('', views.index, name='index'),
    path('products/<int:id>/', views.show, name='show-product'),
    path('cart/', views.cart, name='shopping-cart'),
]
