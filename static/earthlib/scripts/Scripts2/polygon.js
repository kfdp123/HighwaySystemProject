var drawFlag2=false;
	var scene=viewer.scene;
	var ellipsoid=scene.globe.ellipsoid;
	var cartesian2 = null;
	var polygonPath=[];
	var polygon=undefined;
	
	//按钮事件
	document.getElementById('startDraw2').onclick=function(){
	     drawFlag2=true;
		 viewer.entities.removeAll();
		 //hander1.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
		// hander1.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
	};
	var hander2=new Cesium.ScreenSpaceEventHandler(scene.canvas);
	//鼠标左键单击事件
	hander2.setInputAction(function(movement){
	    cartesian2 = viewer.camera.pickEllipsoid(movement.position, ellipsoid);
		if(cartesian2){
		    if(drawFlag2){
			    polygonPath.push(cartesian2);
			}
		}
	},Cesium.ScreenSpaceEventType.LEFT_CLICK);
	//鼠标移动事件
	hander2.setInputAction(function(movement){
	  cartesian2 = viewer.camera.pickEllipsoid(movement.endPosition, ellipsoid);
	   if(drawFlag2==true){
	      if(cartesian2){
		     if (polygonPath.length < 2) {
                    return;
                }
			 if (!Cesium.defined(polygon)) {
                    polygonPath.push(cartesian2);
                    polygon = new CreatPolygon(polygonPath);               
		        }else {
                    polygon.path.pop();
                    polygon.path.push(cartesian2);
                }		  
	   }
	   }else{
	      return;
	   }
		
	},Cesium.ScreenSpaceEventType.MOUSE_MOVE);
	hander2.setInputAction(function() {
       if(drawFlag2=true){
	   var areaNum=0;
		for(var i=0;i<polygonPath.length-2;i++){
		   var aSide=calculateDis(polygonPath[0],polygonPath[i+1]);
		   var bSide=calculateDis(polygonPath[0],polygonPath[i+2]);
		   var cSide=calculateDis(polygonPath[i+1],polygonPath[i+2]);
		   areaNum=areaNum+triangle(aSide,bSide,cSide);
		}	 
         	areaNumFinal=(areaNum/1000000).toFixed(2);
			var cartographicFinal=ellipsoid.cartesianToCartographic(polygonPath[polygonPath.length-1]);
		    viewer.entities.add({
				position : Cesium.Cartesian3.fromRadians(cartographicFinal.longitude, cartographicFinal.latitude),
				label : {
					text : '总面积：'+areaNumFinal+'К㎡',
					scale:0.5,
					show:true
				}
			});
        drawFlag2 = false;
        polygonPath = [];
        polygon = undefined;
	   }else{
	     return;
	   }
		
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
	//生成面的构造函数
	function CreatPolygon(positions){
	   if(!Cesium.defined(positions)){
	       throw new Cesium.DeveloperError('positions is required!');
	   }
	   if(positions.length < 3){
	       throw new Cesium.DeveloperError('positions 的长度必须大于等于3');
	   }
	   this.options={
	         polygon : {
                    show : true,
                    hierarchy : undefined,
                    material : Cesium.Color.YELLOW.withAlpha(0.5)
                }
	   },
	   this.path=positions;
	   this.init();
	}
	CreatPolygon.prototype.init=function(){
	    var that=this;
		var positionCBP = function() {
                return that.path;
            };
            this.options.polygon.hierarchy = new Cesium.CallbackProperty(positionCBP, false);
            viewer.entities.add(this.options);
	}
	//计算两点之间的距离
	function calculateDis(arg1,arg2){
	   var cartographic1=ellipsoid.cartesianToCartographic(arg1);
	   var cartographic2=ellipsoid.cartesianToCartographic(arg2);
	   var lng1=cartographic1.longitude;
	   var lat1=cartographic1.latitude;
	   var lng2=cartographic2.longitude;
	   var lat2=cartographic2.latitude;
	   var  distance=6371004*Math.acos((Math.sin(lat1)*Math.sin(lat2)+Math.cos(lat1)*Math.cos(lat2)*Math.cos(lng2-lng1)));
       return   distance;
	}
	//根据三角形三条边长度计算三角形面积
	var triArea;
	function triangle(arg1,arg2,arg3){
	   var trilen=(arg1+arg2+arg3)/2;
	   triArea=Math.sqrt(trilen*(trilen-arg1)*(trilen-arg2)*(trilen-arg3));
	   return triArea;
	}