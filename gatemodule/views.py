from django.shortcuts import render

# Create your views here.
def gate_login(request):
    return render(request,'gatemodule/login.html')


def gate_regist(request):
    return render(request,'gatemodule/regist.html')