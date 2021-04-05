/* var measure=document.getElementById('measure');
measure.onclick=function(){
	$('#measure_win').window('open');
	$('#measure_win').window({
		left:1250,
		top:120
	});
} */




    var drawFlag_m1=false; 
    var allLength0=0;  //点击各个长度值的累加
	var scene_m=viewer.scene;
	var ellipsoid_m=scene.globe.ellipsoid;
	var cartesian_m1 = null;
	var polylinePath_m1=[];//存储线的坐标值
	var geometrys=[];//存储添加的entity,方便最后删除
	var polyline_m=undefined;
	var hander_m1=new Cesium.ScreenSpaceEventHandler(scene.canvas);
	
	var lineStr='<label>直线距离:</label>'+
			         '<span id="line"></span>'+
			         '<br>'+
			         '<label>水平距离:</label>'+
			         ' <span id="shuiping"></span>'+
					'<br>'+
					'<label>垂直距离：</label>'+
						'<span id="vertical"></span>'+
					'<br>';
	var faceStr='<label>平面面积:</label><span id="polygon2"></span>';
	var radio1=document.getElementById('kj');
	var radio2=document.getElementById('td');
	var line_polygon_switch=document.getElementById('line_polygon_switch');
	radio1.addEventListener("click", function(){
		if(radio1.checked){
			
			drawLine();
		}else{
		return;
		}
	});
	
	//按钮事件
	document.getElementById('3dstartDraw').onclick=function(){
	    document.getElementById('clgl').style.display='';
		//$('#clg1').window('open');
		drawLine();
		
	}; 
	
	
	
	
	//生成线的构造函数
	function CreatLine_m(positions){
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
                        outlineWidth : 2,
                        outlineColor : Cesium.Color.YELLOW
                    }),
                    depthFailMaterial : new Cesium.PolylineOutlineMaterialProperty({
                        color : Cesium.Color.RED,
                        outlineWidth : 0,
                        outlineColor : Cesium.Color.RED
                    }),
					clampToGround:true
                    
                }
	   },
	   this.path=positions;
	   this.init();
	}
	CreatLine_m.prototype.init=function(){
	    var that=this;
		var positionCBP = function() {
                return that.path;
            };
            this.options.polyline.positions = new Cesium.CallbackProperty(positionCBP, false);
            geometrys.push(viewer.entities.add(this.options));
	}
	
	
 
   
   



//计算最新两点之间的距离并与之前所有点距离之和
	function calculateDis1(arg1,arg2){
	   var cartographic1=ellipsoid.cartesianToCartographic(arg1);
	   var cartographic2=ellipsoid.cartesianToCartographic(arg2);
	   var lng1=cartographic1.longitude;
	   var lat1=cartographic1.latitude;
	   var lng2=cartographic2.longitude;
	   var lat2=cartographic2.latitude;
	   var  distance=6371004*Math.acos((Math.sin(lat1)*Math.sin(lat2)+Math.cos(lat1)*Math.cos(lat2)*Math.cos(lng2-lng1)));
	   var distanceValue=(distance/1000).toFixed(2);
	   allLength0=allLength0+distanceValue*1;        
	}
	//计算最后两点之间的距离并与之前所有点距离之和，添加label
	function calculateDisFinal(arg1,arg2,arg3,arg4){
	   var cartographic1=ellipsoid.cartesianToCartographic(arg1);
	   var cartographic2=ellipsoid.cartesianToCartographic(arg2);
	   var lng1=cartographic1.longitude;
	   var lat1=cartographic1.latitude;
	   var lng2=cartographic2.longitude;
	   var lat2=cartographic2.latitude;
	  var  distance=6371004*Math.acos((Math.sin(lat1)*Math.sin(lat2)+Math.cos(lat1)*Math.cos(lat2)*Math.cos(lng2-lng1)));
	   var distanceValue=distance.toFixed(2);
	    var finalValue3=(arg4+distanceValue*1).toFixed(2);
		var gaoCha=Math.abs(cartographic1.height-cartographic2.height).toFixed(2);
		document.getElementById('shuiping').innerHTML=finalValue3+'m';
		document.getElementById('vertical').innerHTML=gaoCha+'m';
		document.getElementById('line').innerHTML=Math.sqrt(Math.pow(finalValue3,2)+Math.pow(gaoCha,2)).toFixed(2)+'m';
		geometrys.push(
		  viewer.entities.add({
        position : Cesium.Cartesian3.fromRadians(lng2, lat2,cartographic2.height+5),
        label : {
            text : arg3+finalValue3+'m\n,高差'+gaoCha+'m',
			scale:0.5,
			show:true,
			heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND
        }
      })
		);
		
	}
	/* 量测弹出层关闭事件 */
  document.getElementById('close').onclick=function(){
	 document.getElementById('clgl').style.display='none';
		drawFlag_m1 = false;
		polylinePath_m1 = [];
		polyline_m = undefined;
		drawFlag_m2 = false;
		polygonPath_m1 = [];
		polygon_m = undefined;
	
	for(var i=0;i<geometrys.length;i++){
		   viewer.entities.remove(geometrys[i]);
		}
		
	line_polygon_switch.innerHTML=lineStr;
	
	//radio1.setAttribute("checked",checked);
	//radio1.checked=true;
	$('#kj').prop('checked','checked');
  }

	/* 划线函数
	*/
	function drawLine(){
		
		drawFlag_m2 = false;
        polygonPath_m1 = [];
		polyline_m=undefined;
		faceToline_m=[];
        polygon_m = undefined;
		areaNumFinal=0;
		hander_m2.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
		hander_m2.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
		line_polygon_switch.innerHTML=lineStr;
			 drawFlag_m1=true;
		 
		 //鼠标左键单击事件
	hander_m1.setInputAction(function(event){
		cartesian_m1 = viewer.scene.pickPosition(event.position);
		if(cartesian_m1){
		    if(drawFlag_m1){
			    polylinePath_m1.push(cartesian_m1);
				var arrLen=polylinePath_m1.length;
				if(arrLen<2){           //当点击第一个点时
				    var cartographicBegin=ellipsoid.cartesianToCartographic(cartesian_m1);
					geometrys.push(viewer.entities.add({
						position : Cesium.Cartesian3.fromRadians(cartographicBegin.longitude, cartographicBegin.latitude,cartographicBegin.height+5),
						label : {
							text : '起点',
							scale:0.5,
							show:true,
							heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND
						}
					}) 
					);
				}  
				else{calculateDis1(polylinePath_m1[arrLen-3],polylinePath_m1[arrLen-2]); //计算最新两点之间的距离并与之前所有点距离之和
				} 
			}
		}
		viewer.selectedEntity=null;
	},Cesium.ScreenSpaceEventType.LEFT_CLICK);
	//鼠标移动事件
	hander_m1.setInputAction(function(event){

	  cartesian_m1 = viewer.scene.pickPosition(event.endPosition);
	   if(drawFlag_m1==true){
	      if(cartesian_m1){
		     if (polylinePath_m1.length < 1) {
                    return;
                }
			 if (!Cesium.defined(polyline_m)) {
                    polylinePath_m1.push(cartesian_m1);
                    polyline_m = new CreatLine_m(polylinePath_m1);               
		        }else {
                    polyline_m.path.pop();
                    polyline_m.path.push(cartesian_m1);
                }		  
	   }
	   }else{
	      return;
	   }
		
	},Cesium.ScreenSpaceEventType.MOUSE_MOVE);
	//鼠标右键单击完成事件
	hander_m1.setInputAction(function() {
	　if(drawFlag_m1=true){
		calculateDisFinal(polylinePath_m1[polylinePath_m1.length-2],polylinePath_m1[polylinePath_m1.length-1],'水平距离',allLength0);
        drawFlag_m1 = false;
        polylinePath_m1 = [];
		allLength0=0;
        polyline_m = undefined;
		hander_m1.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
		hander_m1.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
		
	
	}else{
	    return;
	}
	    
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
	}
	
	