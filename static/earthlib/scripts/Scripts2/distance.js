var drawFlag1=false;
	var scene=viewer.scene;
	var ellipsoid=scene.globe.ellipsoid;
	var cartesian1 = null;
	var polylinePath=[];
	var polyline=undefined;
	//按钮事件
	document.getElementById('startDraw').onclick=function(){
	     drawFlag1=true;
		 viewer.entities.removeAll();
		 //hander2.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
		 //hander2.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
	};
	
	var hander1=new Cesium.ScreenSpaceEventHandler(scene.canvas);
	//鼠标左键单击事件
	hander1.setInputAction(function(movement){
	    cartesian1 = viewer.camera.pickEllipsoid(movement.position, ellipsoid);
		if(cartesian1){
		    if(drawFlag1){
			    polylinePath.push(cartesian1);
				var arrLen=polylinePath.length;
				if(arrLen<2){
				    var cartographicBegin=ellipsoid.cartesianToCartographic(cartesian1);
					viewer.entities.add({
						position : Cesium.Cartesian3.fromRadians(cartographicBegin.longitude, cartographicBegin.latitude),
						label : {
							text : '起点',
							scale:0.5,
							show:true
						}
					}); 
				}  
				else{calculateDis1(polylinePath[arrLen-3],polylinePath[arrLen-2]);
				} 
			}
		}
	},Cesium.ScreenSpaceEventType.LEFT_CLICK);
	//鼠标移动事件
	hander1.setInputAction(function(movement){
	  cartesian1 = viewer.camera.pickEllipsoid(movement.endPosition, ellipsoid);
	   if(drawFlag1==true){
	      if(cartesian1){
		     if (polylinePath.length < 1) {
                    return;
                }
			 if (!Cesium.defined(polyline)) {
                    polylinePath.push(cartesian1);
                    polyline = new CreatLine(polylinePath);               
		        }else {
                    polyline.path.pop();
                    polyline.path.push(cartesian1);
                }		  
	   }
	   }else{
	      return;
	   }
		
	},Cesium.ScreenSpaceEventType.MOUSE_MOVE);
	//鼠标右键单击完成事件
	hander1.setInputAction(function() {
	　if(drawFlag1=true){
	   calculateDis2(polylinePath[0],polylinePath[polylinePath.length-1],'总长度');
        drawFlag1 = false;
        polylinePath = [];
        polyline = undefined;
	}else{
	    return;
	}
	    
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
	//生成线的构造函数
	function CreatLine(positions){
	   if(!Cesium.defined(positions)){
	       throw new Cesium.DeveloperError('positions is required!');
	   }
	   if(positions.length < 2){
	       throw new Cesium.DeveloperError('positions 的长度必须大于等于2');
	   }
	   this.options={
	         polyline : {
                    show : true,
                    width : 2,
                    material : new Cesium.PolylineOutlineMaterialProperty({
                        color : Cesium.Color.YELLOW.withAlpha(0.6),
                        outlineWidth : 0,
                        outlineColor : Cesium.Color.YELLOW
                    }),
                    depthFailMaterial : new Cesium.PolylineOutlineMaterialProperty({
                        color : Cesium.Color.RED,
                        outlineWidth : 0,
                        outlineColor : Cesium.Color.RED
                    }),
                    followSurface : true
                }
	   },
	   this.path=positions;
	   this.init();
	}
	CreatLine.prototype.init=function(){
	    var that=this;
		var positionCBP = function() {
                return that.path;
            };
            this.options.polyline.positions = new Cesium.CallbackProperty(positionCBP, false);
            viewer.entities.add(this.options);
	}
	
	//根据两点求(笛卡尔空间直角坐标)求算两点之间的距离
	//1,先将笛卡尔空间直角坐标转换为地理坐标系下的弧度单位
   //2,再将弧度单位转换为经纬度表示，再根据经纬度来计算两点之间的距离

	function calculateDis1(arg1,arg2){
	   var cartographic1=ellipsoid.cartesianToCartographic(arg1);
	   var cartographic2=ellipsoid.cartesianToCartographic(arg2);
	   var lng1=cartographic1.longitude;
	   var lat1=cartographic1.latitude;
	   var lng2=cartographic2.longitude;
	   var lat2=cartographic2.latitude;
	  var  distance=6371004*Math.acos((Math.sin(lat1)*Math.sin(lat2)+Math.cos(lat1)*Math.cos(lat2)*Math.cos(lng2-lng1)));
 
	  var distanceValue=(distance/1000).toFixed(2);
        viewer.entities.add({
        position : Cesium.Cartesian3.fromRadians(lng2, lat2),
        label : {
            text : distanceValue+'km',
			scale:0.5,
			show:true
        }
    });   
	}
    function calculateDis2(arg1,arg2,arg3){
	   var cartographic1=ellipsoid.cartesianToCartographic(arg1);
	   var cartographic2=ellipsoid.cartesianToCartographic(arg2);
	   var lng1=cartographic1.longitude;
	   var lat1=cartographic1.latitude;
	   var lng2=cartographic2.longitude;
	   var lat2=cartographic2.latitude;
	  var  distance=6371004*Math.acos((Math.sin(lat1)*Math.sin(lat2)+Math.cos(lat1)*Math.cos(lat2)*Math.cos(lng2-lng1)));
 
	  var distanceValue=(distance/1000).toFixed(2);
        viewer.entities.add({
        position : Cesium.Cartesian3.fromRadians(lng2, lat2),
        label : {
            text : arg3+distanceValue+'km',
			scale:0.5,
			show:true
        }
    });   
	}