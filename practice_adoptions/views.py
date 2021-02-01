from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return HttpResponse('<p>Index page</p>')

def detail(request, pet_id):
    return HttpResponse(f'<p>Detail Page with Id {pet_id}</p>')
