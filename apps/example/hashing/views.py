from django.shortcuts import render

def index(request):
    return render(request, "example/hashing/index.html")
