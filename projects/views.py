from django.views import generic
from rest_framework import viewsets
from .models import Project
from .serializers import ProjectSerializer

class ProjectApiView(viewsets.ModelViewSet):
    """
    API endpoint that allows projects to be viewed or edited.
    """
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class IndexView(generic.ListView):
    model = Project
    template_name = 'projects/index.html'


class DetailView(generic.DetailView):
    model = Project
    template_name = 'projects/detail.html'