from django.shortcuts import render
from django.forms import formset_factory
from .forms import PizzaForm, MultiplePizzaForm
from .models import Pizza

def index(request):
    return render(request, 'example/pizza/index.html')

def order(request):
    multiple_form = MultiplePizzaForm()
    if request.method == 'POST':
        filled_form = PizzaForm(request.POST)
        if filled_form.is_valid():
            created_pizza = filled_form.save()
            created_pizza_pk = created_pizza.id
            note = 'Thanks for ordering! Your %s %s and %s pizza is on its way!' % (
                filled_form.cleaned_data['size'], 
                filled_form.cleaned_data['topping1'], 
                filled_form.cleaned_data['topping2'],
            )
            filled_form = PizzaForm()
        else:
            created_pizza_pk = None
            note = 'Pizza order has failed. Try again.'
        return render(request, 'example/pizza/order.html', {
                'created_pizza_pk': created_pizza_pk,
                'pizza_form': filled_form, 
                'note': note,
                'multiple_form': multiple_form,
            }) 
    else:  
        form = PizzaForm()
        return render(request, 'example/pizza/order.html', {
                'pizza_form': form,
                'multiple_form': multiple_form,
            })

def pizzas(request):
    number_of_pizzas = 2
    filled_multiple_pizza_form = MultiplePizzaForm(request.GET)
    if filled_multiple_pizza_form.is_valid():
        number_of_pizzas = filled_multiple_pizza_form.cleaned_data['number']
    PizzaFormSet = formset_factory(PizzaForm, extra=number_of_pizzas)
    formset = PizzaFormSet()
    if request.method == 'POST':
        filled_formset = PizzaFormSet(request.POST)
        if filled_formset.is_valid():
            for form in filled_formset:
                print(form.cleaned_data['topping1'])
            note = 'Pizzas have been ordered!'
        else:
            note = 'Order was not created, please try again'
        return render(request, 'example/pizza/pizzas.html', {
                'note': note,
                'formset': formset, 
            })
    else:
        return render(request, 'example/pizza/pizzas.html', {            
                'formset': formset, 
            })

def edit_order(request, pk):
    pizza = Pizza.objects.get(pk=pk)
    form = PizzaForm(instance=pizza)
    if request.method == 'POST':
        filled_form = PizzaForm(request.POST, instance=pizza)
        if filled_form.is_valid():
            filled_form.save()
            form = filled_form
            note = 'Order has been updated.'
            return render(request, 'example/pizza/edit_order.html', {   
                    'note': note,         
                    'pizza_form': form,
                    'pizza': pizza,
                })
    return render(request, 'example/pizza/edit_order.html', {            
            'pizza_form': form,
            'pizza': pizza,
        })
