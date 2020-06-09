from django.urls import path, include
from rest_framework import routers
from . import views

app_name = 'projects'

router = routers.DefaultRouter()
router.register(r'projects', views.ProjectApiView)

urlpatterns = [
    path('api/v1/', include(router.urls)),
    path('projects/', views.IndexView.as_view(), name='index'),
    path('projects/<int:pk>/', views.DetailView.as_view(), name='detail'),
]