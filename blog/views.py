from django.urls import reverse
from django.views import generic
from rest_framework.viewsets import ModelViewSet
from . import models
from . import forms
from . import serializers

class IndexView(generic.ListView):
    model = models.Post
    queryset = model.objects.order_by('-created')
    template_name = 'blog/index.html'


class DetailView(generic.edit.FormMixin, generic.DetailView):
    model = models.Post
    form_class = forms.CommentForm
    template_name = 'blog/detail.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        post = models.Post.objects.get(pk=self.object.pk)
        context['comments'] = models.Comment.objects.filter(post=post)
        return context
    
    def get_success_url(self):
        return reverse('blog:detail', kwargs={'pk': self.object.pk})

    def post(self, request, *args, **kwargs):
        self.object = self.get_object()
        form = self.get_form()
        if form.is_valid():
            return self.form_valid(form)
        else:
            return self.form_invalid(form)

    def form_valid(self, form):
        post = models.Post.objects.get(pk=self.object.pk)
        comment = models.Comment(
            author=form.cleaned_data['author'],
            body=form.cleaned_data["body"],
            post=post
        )
        comment.save()
        return super().form_valid(form)     


class CategoryApiView(ModelViewSet):
    """
    API endpoint that allows blog's categories to be viewed or edited.
    """
    queryset = models.Category.objects.all()
    serializer_class = serializers.CategorySerializer


class PostApiView(ModelViewSet):
    """
    API endpoint that allows blog's posts to be viewed or edited.
    """
    queryset = models.Post.objects.all()
    serializer_class = serializers.PostSerializer


class CommentApiView(ModelViewSet):
    """
    API endpoint that allows blog's comments to be viewed or edited.
    """
    queryset = models.Comment.objects.all()
    serializer_class = serializers.CommentSerializer