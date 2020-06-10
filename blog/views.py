from django.views import generic
from rest_framework import viewsets
from . import models
from . import serializers

class IndexView(generic.ListView):
    model = models.Post
    queryset = model.objects.order_by('-created')
    template_name = 'blog/index.html'


class DetailView(generic.DetailView):
    model = models.Post
    template_name = 'blog/detail.html'


class CategoryApiView(viewsets.ModelViewSet):
    """
    API endpoint that allows blog's categories to be viewed or edited.
    """
    queryset = models.Category.objects.all()
    serializer_class = serializers.CategorySerializer


class PostApiView(viewsets.ModelViewSet):
    """
    API endpoint that allows blog's posts to be viewed or edited.
    """
    queryset = models.Post.objects.all()
    serializer_class = serializers.PostSerializer


class CommentApiView(viewsets.ModelViewSet):
    """
    API endpoint that allows blog's comments to be viewed or edited.
    """
    queryset = models.Comment.objects.all()
    serializer_class = serializers.CommentSerializer