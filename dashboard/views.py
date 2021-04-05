from django.shortcuts import render

# Create your views here.


def dashboard_main_index(request):
    return render(request,'dashboard/xizang_earth.html')