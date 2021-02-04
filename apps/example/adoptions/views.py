from django.shortcuts import render
from django.http import Http404
from .models import Pet 

def index(request):
    pets = Pet.objects.all()
    return render(request, "example/adoptions/index.html", {
            'pets': pets
        })

def detail(request, pet_id):
    try:
        pet = Pet.objects.get(id=pet_id)
    except Pet.DoesNotExist:
        raise Http404('pet not found')
    return render(request, "example/adoptions/detail.html", {
            'pet': pet
        })
