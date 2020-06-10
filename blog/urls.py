from django.urls import path, include
from rest_framework import routers
from . import views

app_name = 'blog'

router = routers.DefaultRouter()
router.register(r'blog/categories', views.CategoryApiView)
router.register(r'blog/posts', views.PostApiView)
router.register(r'blog/comments', views.CommentApiView)

urlpatterns = [
    path('api/v1/', include(router.urls)),
    path('blog/', views.IndexView.as_view(), name='index'),
    path('blog/<int:pk>/', views.DetailView.as_view(), name='detail'),
]