from django.urls import path
from . import views

app_name = 'webgl'
urlpatterns = [
    path('webgl/', views.IndexView.as_view(), name='index'), 
]
