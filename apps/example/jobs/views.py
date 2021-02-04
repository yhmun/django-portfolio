from django.shortcuts import render

def index(request):
    return render(request, 'example/jobs/index.html')