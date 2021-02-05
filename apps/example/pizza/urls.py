from django.urls import path
from . import views 

app_name = 'pizza'
urlpatterns = [
    path('', views.index, name='index'),
    path('order', views.order, name='order'),
    path('pizzas', views.pizzas, name='pizzas'),
]
