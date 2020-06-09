from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'projects', views.ProjectViewSet)

app_name = 'projects'
urlpatterns = [        
    path('api/v1/', include(router.urls)),
    path('projects/', views.ProjectIndexView.as_view(), name='index'),
    path('projects/<int:pk>/', views.ProjectDetailView.as_view(), name='detail'),
]
