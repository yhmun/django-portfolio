from django.urls import path 
from . import views

app_name = 'practice_adoptions'

urlpatterns = [
    path('practice_adoptions/', views.index, name='index'),
    path('practice_adoptions/<int:pet_id>/', views.detail, name='detail')
]