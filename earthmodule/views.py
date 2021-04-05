from django.http import HttpResponse
from django.shortcuts import render
from earthmodule import models
import geopandas as gpd
import matplotlib.pyplot as plt

# Create your views here.
#gitr earth 主页面
def earth_main(request):
    return render(request,'earthmodule/GITR_new.html')

#绘制点线面页面
def earth_draw(request):
    return render(request,'earthmodule/earth_draw.html')

#新球页面
def earth_new_index(request):
    return render(request,'earthmodule/earth_new_index.html')
#缓冲区分析
def earth_buff(request):
    if request.method=="GET" and request.GET:
        point_path=request.GET.get("point_path")
        buffer_path=request.GET.get("buffer_path")

    #基础路径输入
    point_path = 'D:/projects/HighwaySystemProject/earthmodule/data/points.shp'
    buffer_path = 'D:/projects/HighwaySystemProject/earthmodule//data/lines.shp'

    point = gpd.GeoDataFrame.from_file(point_path)

    cities = gpd.read_file(buffer_path)
    cities['geometry'] = cities.buffer(100)

    point_overlay = gpd.sjoin(point, cities, how='left', op='within')
    point_overlay_json = point_overlay.to_json()

    return HttpResponse(point_overlay_json)


def earth_buff_db(request):
    user_list_obj = models.PointRecord.objects.all()

    return HttpResponse(user_list_obj)


