from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'projects', views.ProjectApiView)

app_name = 'projects'
urlpatterns = [
    path('api/v1/', include(router.urls)),
    path('projects/', views.IndexView.as_view(), name='index'),
    path('projects/<int:pk>/', views.DetailView.as_view(), name='detail'),
]