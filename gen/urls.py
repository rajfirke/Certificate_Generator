from django.contrib import admin
from django.urls import path,include
from gen import views
urlpatterns = [
    path('', views.main,name = 'main'),
    path('generated/', views.generate_certificates,name = 'generate_certificates'),
]