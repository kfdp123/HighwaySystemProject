 /* var measure=document.getElementById('measure');
measure.onclick=function(){
	$('#measure_win').window('open');
	$('#measure_win').window({
		left:1250,
		top:120
	});
} */




    var drawFlag11=false; 
    var allLength0=0;  //点击各个长度值的累加
	var scene=viewer.scene;
	var ellipsoid=scene.globe.ellipsoid;
	var cartesian1 = null;
	var polylinePath=[];//存储线的坐标值
	var geometrys=[];//存储添加的entity,方便最后删除
	var polyline=undefined;
	var hander11=new Cesium.ScreenSpaceEventHandler(scene.canvas);
	
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
	

	
	
	
	//生成线的构造函数
	function CreatLine1(positions){
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
					clampToGround:true,
					classificationType:Cesium.ClassificationType.CESIUM_3D_TILE
                    
                }
	   },
	   this.path=positions;
	   this.init();
	}
	CreatLine1.prototype.init=function(){
	    var that=this;
		var positionCBP = function() {
                return that.path;
            };
            this.options.polyline.positions = new Cesium.CallbackProperty(positionCBP, false);
            geometrys.push(viewer.entities.add(this.options));
	}
	
	
 
   
   



//计算最新两点之间的距离并与之前所有点距离之和
	function calculateDis1_mx(arg1,arg2){
	   var cartographic1=ellipsoid.cartesianToCartographic(arg1);
	   var cartographic2=ellipsoid.cartesianToCartographic(arg2);
	   var lng1=cartographic1.longitude;
	   var lat1=cartographic1.latitude;
	   var lng2=cartographic2.longitude;
	   var lat2=cartographic2.latitude;
	   var dis111=dis_latlng(lat1,lng1,lat2,lng2);
	   var distance=6371004*Math.acos((Math.sin(lat1)*Math.sin(lat2)+Math.cos(lat1)*Math.cos(lat2)*Math.cos(lng2-lng1)));
	   var distanceValue=(distance/1000).toFixed(2);
	   allLength0=allLength0+distanceValue*1;        
	}
	//计算最后两点之间的距离并与之前所有点距离之和，添加label
	function calculateDisFinal_mx(arg1,arg2,arg3,arg4){
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
		drawFlag11 = false;
		polylinePath = [];
		polyline = undefined;
		drawFlag2 = false;
		polygonPath = [];
		polygon = undefined;
	
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
		
		drawFlag2 = false;
        polygonPath = [];
		polyline1=undefined;
		faceToline=[];
        polygon = undefined;
		areaNumFinal=0;
		hander6.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
		hander6.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
			line_polygon_switch.innerHTML=lineStr;
			 drawFlag11=true;
		 
		 //鼠标左键单击事件
	hander11.setInputAction(function(event){
		cartesian1 = viewer.scene.pickPosition(event.position);
		if(cartesian1){
		    if(drawFlag11){
			    polylinePath.push(cartesian1);
				var arrLen=polylinePath.length;
				if(arrLen<2){           //当点击第一个点时
				    var cartographicBegin=ellipsoid.cartesianToCartographic(cartesian1);
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
				else{calculateDis1_mx(polylinePath[arrLen-3],polylinePath[arrLen-2]); //计算最新两点之间的距离并与之前所有点距离之和
				} 
			}
		}
		viewer.selectedEntity=null;
	},Cesium.ScreenSpaceEventType.LEFT_CLICK);
	//鼠标移动事件
	hander11.setInputAction(function(event){

	  cartesian1 = viewer.scene.pickPosition(event.endPosition);
	   if(drawFlag11==true){
	      if(cartesian1){
		     if (polylinePath.length < 1) {
                    return;
                }
			 if (!Cesium.defined(polyline)) {
                    polylinePath.push(cartesian1);
                    polyline = new CreatLine1(polylinePath);               
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
	hander11.setInputAction(function() {
	　if(drawFlag11=true){
		calculateDisFinal_mx(polylinePath[polylinePath.length-2],polylinePath[polylinePath.length-1],'水平距离',allLength0);
        drawFlag11 = false;
        polylinePath = [];
		allLength0=0;
        polyline = undefined;
		hander11.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
		hander11.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
		
	
	}else{
	    return;
	}
	    
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
	}
	
	