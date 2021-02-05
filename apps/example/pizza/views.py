from django.shortcuts import render
from .forms import PizzaForm

def index(request):
    return render(request, 'example/pizza/index.html')

def order(request):
    form = PizzaForm()
    return render(request, 'example/pizza/order.html', {'pizza_form': form})