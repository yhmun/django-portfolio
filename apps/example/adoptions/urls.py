from django.urls import path 
from . import views

app_name = 'adoptions'
urlpatterns = [
    path('', views.index, name='index'),
    path('<int:pet_id>/', views.detail, name='detail'),
]