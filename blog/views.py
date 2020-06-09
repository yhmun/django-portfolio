from django.views import generic
from rest_framework import viewsets
from blog.models import Post, Comment
from .serializers import PostSerializer

class PostApiView(viewsets.ModelViewSet):
    """
    API endpoint that allows blog's posts to be viewed or edited.
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class IndexView(generic.ListView):
    model = Post
    queryset = model.objects.order_by('-created')
    template_name = 'blog/index.html'