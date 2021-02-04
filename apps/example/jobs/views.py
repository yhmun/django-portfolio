from django.shortcuts import render

def nick(request):
    return render(request, 'example/jobs/nick.html')