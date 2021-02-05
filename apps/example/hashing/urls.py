from django.urls import path 
from . import views

app_name = 'hashing'
urlpatterns = [
    path('', views.index, name='index'),
    path('hash/<str:hash>', views.hash, name='hash'),
    path('quick_hash', views.quick_hash, name='quick_hash')
]