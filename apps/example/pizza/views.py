from django.shortcuts import render

def index(request):
    return render(request, 'example/pizza/index.html')

def order(request):
    return render(request, 'example/pizza/order.html')