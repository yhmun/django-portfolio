from django.shortcuts import render

def index(request):
    return render(request, "example/adoptions/index.html")

def detail(request, pet_id):
    return render(request, "example/adoptions/detail.html", {
            'pet_id': pet_id
        })
