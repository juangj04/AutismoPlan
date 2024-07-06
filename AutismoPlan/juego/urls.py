from django.contrib import admin
from django.urls import path
from juego import views

urlpatterns = [
    path('juego/',views.juego)
]