    var drawFlag2=false;
	var scene=viewer.scene;
	scene.pickTranslucentDepth = true;
	scene.globe.depthTestAgainstTerrain = false;
	var ellipsoid=scene.globe.ellipsoid;
	var cartesian2 = null;
	var polygonPath=[];//存储面的坐标值
	var faceToline=[];//存储第一和第二个点的坐标值
	var polyline1 = undefined;//第一个点和第二点连线
	var polygon=undefined;
	var flagfaceline=0;
	var hander6=new Cesium.ScreenSpaceEventHandler(scene.canvas);
	//按钮事件
	//document.getElementById('measure_face').onclick=function(){
	radio2.addEventListener("click", function(){
		if(radio2.checked){
			
			 drawFlag1 = false;
        polylinePath = [];
		allLength0=0;
        polyline = undefined;
		hander11.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
		hander11.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
			line_polygon_switch.innerHTML=faceStr;
			drawFlag2=true;
		  flagfaceline=flagfaceline+1;
	//鼠标左键单击事件
	hander6.setInputAction(function(event){
		cartesian2 = viewer.scene.pickPosition(event.position);
		if(cartesian2){
		    if(drawFlag2){
			    polygonPath.push(cartesian2);
				if(faceToline.length==0){
				faceToline.push(cartesian2);
				}
			}
		}
		viewer.selectedEntity=null;
	},Cesium.ScreenSpaceEventType.LEFT_CLICK);
	//鼠标移动事件
	hander6.setInputAction(function(event){
	 cartesian2 = viewer.scene.pickPosition(event.endPosition);
	   if(drawFlag2==true){
	      if(cartesian2){
		     if (polygonPath.length < 2) {
                    if((faceToline.length==1||2)&&(polygonPath.length==1)){
				    
                   if (!Cesium.defined(polyline1)) {
                    faceToline.push(cartesian2);
                    polyline1 = new CreatePolyline11(faceToline);
                    } else {
					
                    polyline1.path.pop();
                    polyline1.path.push(cartesian2);
                    }					 
					}
					return;
                }
			 if (!Cesium.defined(polygon)) {
				 viewer.entities.removeById('faceline'+flagfaceline);
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
	//鼠标右键结束事件
	hander6.setInputAction(function() {
       if(drawFlag2=true){
	       var areaNum=0;
			for(var i=0;i<polygonPath.length-2;i++){
			var aSide=calculateDis(polygonPath[0],polygonPath[i+1]);
			var bSide=calculateDis(polygonPath[0],polygonPath[i+2]);
			var cSide=calculateDis(polygonPath[i+1],polygonPath[i+2]);
			areaNum=areaNum+triangle(aSide,bSide,cSide);
			}
        var areaNumFinal=areaNum.toFixed(2);			
	     
        document.getElementById('polygon2').innerHTML=areaNumFinal+'㎡';	 
		var cartographicFinal=ellipsoid.cartesianToCartographic(polygonPath[polygonPath.length-1]);
		 geometrys.push(viewer.entities.add({
					position : Cesium.Cartesian3.fromRadians(cartographicFinal.longitude, cartographicFinal.latitude,cartographicFinal.height+10),
					label : {
						text : '平面面积：'+areaNumFinal+'㎡',
						scale:0.5,
						show:true,
						heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND
					}
				})
				);	 
			
		    
        drawFlag2 = false;
        polygonPath = [];
		polyline1=undefined;
		faceToline=[];
        polygon = undefined;
		areaNumFinal=0;
		hander6.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
		hander6.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
	   }else{
	     return;
	   }
		
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
		}else{
		return;
		}
	});	
	    
	
	//};
	
	
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
                    material : Cesium.Color.YELLOW.withAlpha(0.5),
					clampToGround:true,
					classificationType:Cesium.ClassificationType.CESIUM_3D_TILE
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
            geometrys.push(viewer.entities.add(this.options));
	}
	
	//生成线的函数(画面时第一个点和第二个点之间的连线)
	
	  var CreatePolyline11 = (function() {
        function _(positons) {
            if (!Cesium.defined(positons)) {
                throw new Cesium.DeveloperError('positions is required!');
            }
            if (positons.length < 2) {
                throw new Cesium.DeveloperError('positions 的长度必须大于等于2');
            }
            this.options = {
				id:'faceline'+flagfaceline,
                polyline : {
                    show : true,
                    width : 1,
                    material : new Cesium.PolylineOutlineMaterialProperty({
                        color : Cesium.Color.YELLOW.withAlpha(0.5),
                        outlineWidth : 0,
                        outlineColor : Cesium.Color.YELLOW.withAlpha(0.5)
                    }),
                    depthFailMaterial : new Cesium.PolylineOutlineMaterialProperty({
                        color : Cesium.Color.YELLOW.withAlpha(0.5),
                        outlineWidth : 0,
                        outlineColor : Cesium.Color.YELLOW.withAlpha(0.5)
                    }),
					clampToGround:true
                    //followSurface : true
                }
            };
            this.path = positons;

            this._init();
        }

        _.prototype._init = function() {
            var that = this;
            var positionCBP = function() {
                return that.path;
            };
            this.options.polyline.positions = new Cesium.CallbackProperty(positionCBP, false);
            geometrys.push(viewer.entities.add(this.options));
        };

        return _;
    })();
	
	
	//计算一个三角形面中各边两点之间的距离
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
	

	