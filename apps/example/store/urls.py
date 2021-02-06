from django.urls import path
from . import views
from . import api_views

app_name = "store"
urlpatterns = [
    path('api/v1/products/', api_views.ProductList.as_view()),
    path('api/v1/products/create', api_views.ProductCreate.as_view()),
    #path('api/v1/products/<int:id>/delete', api_views.ProductDestory.as_view()),
    path('api/v1/products/<int:id>/', api_views.ProductRetriveUpdateDestory.as_view()),
    path('api/v1/products/<int:id>/stats', api_views.ProductStats.as_view()),

    path('', views.index, name='index'),
    path('products/<int:id>/', views.show, name='show-product'),
    path('cart/', views.cart, name='shopping-cart'),
]
