<!-- 经纬度实时显示 -->
var longitude_show=document.getElementById('longitude_show');
var latitude_show=document.getElementById('latitude_show');
var altitude_show=document.getElementById('altitude_show');
var canvas=viewer.scene.canvas;
//具体事件的实现
var ellipsoid=viewer.scene.globe.ellipsoid;
var handler = new Cesium.ScreenSpaceEventHandler(canvas);
handler.setInputAction(function(movement){
            //捕获椭球体，将笛卡尔二维平面坐标转为椭球体的笛卡尔三维坐标，返回球体表面的点
             var cartesian=viewer.camera.pickEllipsoid(movement.endPosition, ellipsoid);
			 var ray=viewer.camera.getPickRay(movement.endPosition);
			 var myselfCoor=viewer.scene.globe.pick(ray,viewer.scene);

			if(myselfCoor == null || myselfCoor == 'undefined')  return;

			var myselfCoor2=Cesium.Cartographic.fromCartesian(myselfCoor);
              if(cartesian){
				  //var worldPosition = viewer.scene.pickPosition(movement.position);
	              //var cartographic1=Cesium.Cartographic.fromCartesian(worldPosition);
                   //将笛卡尔三维坐标转为地图坐标（弧度）
                   var cartographic=viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian);
                   //将地图坐标（弧度）转为十进制的度数
                    var lat_String=Cesium.Math.toDegrees(cartographic.latitude).toFixed(4);
                    var log_String=Cesium.Math.toDegrees(cartographic.longitude).toFixed(4);
				    var alti_String=myselfCoor2.height.toFixed(2);
					//var alti_String=(viewer.camera.positionCartographic.height/1000).toFixed(2);
					longitude_show.innerHTML=log_String;
					latitude_show.innerHTML=lat_String;
					altitude_show.innerHTML=alti_String;
               }
        },Cesium.ScreenSpaceEventType.MOUSE_MOVE);
