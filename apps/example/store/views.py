from django.shortcuts import render
from .models import Product, ShoppingCart

def index(request):
    context = {
        'products': Product.objects.all(),
    }
    return render(request, 'example/store/product_list.html', context)

def show(request, id):
    context = {
        'product': Product.objects.get(id=id),
    }
    return render(request, 'example/store/product.html', context)

def cart(request):
    context = {
        'items': [],
        'subtotal': 1.0,
        'tax_rate': int(ShoppingCart.TAX_RATE * 100.0),
        'tax_total': 2.0,
        'total': 3.0,
    }
    return render(request, 'example/store/cart.html', context)