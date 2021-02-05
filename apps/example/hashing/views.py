import hashlib
from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse
from .forms import HashForm
from .models import Hash

def index(request):
    if request.method == 'POST':
        filled_form = HashForm(request.POST)
        if filled_form.is_valid():
            text = filled_form.cleaned_data['text']
            text_hash = hashlib.sha256(text.encode('utf-8')).hexdigest()
            try:
                Hash.objects.get(hash=text_hash)
            except Hash.DoesNotExist:
                hash = Hash()
                hash.text = text
                hash.hash = text_hash
                hash.save()
            return redirect('hashing:hash', hash=text_hash)
    form = HashForm()
    return render(request, "example/hashing/index.html", {'form': form})

def hash(request, hash):
    hash = Hash.objects.get(hash=hash)
    return render(request, "example/hashing/hash.html", {'hash': hash})

def quick_hash(request):
    text = request.GET['text']
    json = {'hash': hashlib.sha256(text.encode('utf-8')).hexdigest()}
    return JsonResponse(json)
