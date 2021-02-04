from django.shortcuts import render
from .forms import HashForm 

def index(request):
    form = HashForm()
    return render(request, "example/hashing/index.html", {
            'form': form
        })
