from django.urls import path
from . import views 

app_name = 'pizza'
urlpatterns = [
    path('', views.index, name='index'),
    path('order', views.order, name='order'),
    path('pizzas', views.pizzas, name='pizzas'),
    path('order/<int:pk>', views.edit_order, name='edit_order'),
]
