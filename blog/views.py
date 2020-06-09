from django.views import generic
from rest_framework import viewsets
from blog.models import Post, Comment
#from .serializers import ProjectSerializer

class BlogIndexView(generic.ListView):
    model = Post
    queryset = model.objects.order_by('-created')
    template_name = 'blog/index.html'