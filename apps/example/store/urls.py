from django.urls import path
from . import views

app_name = "store"
urlpatterns = [
    path('', views.index, name='index'),
    path('products/<int:id>/', views.show, name='show-product'),
    path('cart/', views.cart, name='shopping-cart'),
]
