from django.shortcuts import render

# Create your views here.
def video_index(request):
    return render(request,'videomodule/video_index.html')