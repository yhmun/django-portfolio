from django.urls import path, re_path
from django.contrib.auth.views import LogoutView
from . import views

app_name = 'main'
urlpatterns = [
    path('', views.index, name='index'),
    path('test/', views.test, name='test'),
    path('login/', views.login_view, name='login'),
    path('register/', views.register_user, name='register'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('error-404/', views.error_404, name='error-404'),
    path('error-500/', views.error_500, name='error-500'),
    re_path(r'^examples/.*\.html', views.examples, name='examples'),   
]
