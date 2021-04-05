/*
*天津师范大学倾斜摄影数据图书馆查询
*
*/
//创建弹出的div


var jump_div=document.createElement('div');
viewer.container.appendChild(jump_div);
var blockquote=document.createElement('blockquote');
jump_div.appendChild(blockquote);
var img=document.createElement('img');
img.src='images/tjsdtsg.jpg';
blockquote.appendChild(img);
var p=document.createElement('p');
p.innerHTML='天津师范大学图书馆始建于1958年，历经50多年发展历程，经过几代图书馆人和建设者的艰苦努力，如今已成为集“藏书、借阅、信息咨询、电子信息资源服务、学术研究和自动化管理”为一体的现代化大学图书馆。';
blockquote.appendChild(p);
var audio=document.createElement('audio');
audio.src='littleSweet.mp3';
audio.controls="controls";
blockquote.appendChild(audio);
jump_div.id='introduce';
p.id='paragraph1';
jump_div.style.width='300px';
jump_div.style.height='300px';
//jump_div.style.display='none';
jump_div.style.position='absolute';
jump_div.style.border='solid 1px rgba(7, 86, 152, 0.3)';
jump_div.style.background='rgba(7, 86, 152, 0.3)';

document.getElementById('paragraph1').onclick=function(e){   //点击消失
            e.stopPropagation();
            jump_div.style.visibility='hidden'; 
}


//定义当前场景中对画布元素的事件处理
        var handler=new Cesium.ScreenSpaceEventHandler(canvas);
        //设置鼠标移动事件的处理函数，负责监听屏幕中x,y值的变化
        handler.setInputAction( function(movement){
            //捕获椭球体，将笛卡尔二维平面坐标转为椭球体的笛卡尔三维坐标，返回球体表面的点
             cartesian=viewer.camera.pickEllipsoid(movement.position, ellipsoid);
			 var latitudeString,longitudeString,m=117.1191,n=117.12316388,w=39.06259444,z=39.06383611;
              if(cartesian){
                   //将笛卡尔三维坐标转为地图坐标（弧度）
                   var cartographic=viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian);
                   //将地图坐标（弧度）转为十进制的度数
                    latitudeString=Cesium.Math.toDegrees(cartographic.latitude);
                    longitudeString=Cesium.Math.toDegrees(cartographic.longitude);
               }
			    if((m<=longitudeString)&&(longitudeString<=n)&&(w<=latitudeString)&&(latitudeString<=z)){
			   var scratch = new Cesium.Cartesian2();
			   viewer.scene.preRender.addEventListener(function() {
                   var position = Cesium.Cartesian3.fromDegrees(longitudeString, latitudeString);
                   var canvasPosition = viewer.scene.cartesianToCanvasCoordinates(position, scratch);
                   if (Cesium.defined(canvasPosition)) {
				       jump_div.style.display="block";	
                       jump_div.style.top = canvasPosition.y + 'px';
                       jump_div.style.left = canvasPosition.x + 'px';
                   }
				   })
               }
			   //selectedEntity.name="天津师大图书馆";
			   //viewer.selectedEntity = selectedEntity;
        },Cesium.ScreenSpaceEventType.LEFT_CLICK );