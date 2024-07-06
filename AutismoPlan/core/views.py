from django.shortcuts import render,HttpResponse
from django.template import loader
# Create your views here.


def creditos(request):
    return render(request, "core/creditos.html")

def acercade(request):
    return render(request, "core/acercade.html")

def home(request):
    return render(request, "core/index.html")