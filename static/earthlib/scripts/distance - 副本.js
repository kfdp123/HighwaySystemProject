var drawFlag1=false;
	var scene=viewer.scene;
	var ellipsoid=scene.globe.ellipsoid;
	var cartesian1 = null;
	var polylinePath=[];
	var polyline=undefined;
	var hander1=new Cesium.ScreenSpaceEventHandler(scene.canvas);
	//按钮事件
	document.getElementById('startDraw').onclick=function(){
	     drawFlag1=true;
		 viewer.entities.removeAll();
		  //$(".cesium-infoBox-visible").css("display","none");
		 
		 //document.getElementsByClassName('cesium-infoBox-visible')[0].style.display='none';
		 //santai_search();
		 //hander2.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
		 //hander2.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
		 //鼠标左键单击事件
	hander1.setInputAction(function(movement){
		//$(".cesium-infoBox-visible").css("display","none");
		//$(".cesium-selection-wrapper-visible").css("visibility","hidden");
		//if(flagNum==4) return ;
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
		viewer.selectedEntity=null;
	},Cesium.ScreenSpaceEventType.LEFT_CLICK);
	//鼠标移动事件
	hander1.setInputAction(function(movement){
		//$(".cesium-infoBox-visible").css("display","none");
		//$(".cesium-selection-wrapper-visible").css("visibility","hidden");
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
		calculateDisFinal(polylinePath[polylinePath.length-2],polylinePath[polylinePath.length-1]);
		//calculateDis1(polylinePath[polylinePath.length-2],polylinePath[polylinePath.length-1]);
	   calculateDis2(faceDisArray,spaDisArray,polylinePath[polylinePath.length-1]);
	   
        drawFlag1 = false;
        polylinePath = [];
		faceDisArray=[];
		spaDisArray=[];
        polyline = undefined;
		hander1.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
	}else{
	    return;
	}
	    
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
	};
	
	
	
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
   var faceDisArray=[],spaDisArray=[];   //存储平面距离和空间距离
   

	function calculateDis1(arg1,arg2){
	   var cartographic1=ellipsoid.cartesianToCartographic(arg1);
	   var cartographic2=ellipsoid.cartesianToCartographic(arg2);
	   var lng1=cartographic1.longitude;
	   var lng11=Cesium.Math.toDegrees(lng1);
	   var lat1=cartographic1.latitude;
	   var lat11=Cesium.Math.toDegrees(lat1);
	   var lng2=cartographic2.longitude;
	   var lng22=Cesium.Math.toDegrees(lng2);
	   var lat2=cartographic2.latitude;
	   var lat22=Cesium.Math.toDegrees(lat2);
	  //var  distance=6371004*Math.acos((Math.sin(lat1)*Math.sin(lat2)+Math.cos(lat1)*Math.cos(lat2)*Math.cos(lng2-lng1)));
	  // var distanceValue=(distance/1000).toFixed(2);
	  var faceDis='http://localhost:9090/WebForm11.aspx?lat1='+lat11+'&lon1='+lng11+'&lat2='+lat22+'&lon2='+lng22+'&num=1';
	  var spaDis='http://localhost:9090/WebForm6.aspx?lat1='+lat11+'&lon1='+lng11+'&lat2='+lat22+'&lon2='+lng22+'&num=100';
	   $.ajax({                                                               //计算空间直线距离
			  contentType: "application/x-www-form-urlencoded; charset=utf-8",
			  url:faceDis,
			  dataType:'json',
			  type: "get",
			  success:function(data){
			    var returnfaceDis=(data/1000).toFixed(2);
				  faceDisArray.push(returnfaceDis);
				         $.ajax({                                                               //计算空间直线距离
							contentType: "application/x-www-form-urlencoded; charset=utf-8",
							url:spaDis,
							dataType:'json',
							type: "get",
							success:function(data1){
								var returnspaDis=(data1/1000).toFixed(2);
								spaDisArray.push(returnspaDis);
								viewer.entities.add({
									position : Cesium.Cartesian3.fromRadians(lng2, lat2),
									label : {
										text : '平面距离'+returnfaceDis+'km\n表面距离'+returnspaDis+'km',
										scale:0.5,
										show:true
									}
								});
								},
							error:function(XMLHttpRequest){
								alert(XMLHttpRequest.status);
							}
							}); 
			  },
			  error:function(XMLHttpRequest){
			     alert(XMLHttpRequest.status);
			  }
			});           
	}
	function calculateDisFinal(arg1,arg2){
	   var cartographic1=ellipsoid.cartesianToCartographic(arg1);
	   var cartographic2=ellipsoid.cartesianToCartographic(arg2);
	   var lng1=cartographic1.longitude;
	   var lng11=Cesium.Math.toDegrees(lng1);
	   var lat1=cartographic1.latitude;
	   var lat11=Cesium.Math.toDegrees(lat1);
	   var lng2=cartographic2.longitude;
	   var lng22=Cesium.Math.toDegrees(lng2);
	   var lat2=cartographic2.latitude;
	   var lat22=Cesium.Math.toDegrees(lat2);
	  //var  distance=6371004*Math.acos((Math.sin(lat1)*Math.sin(lat2)+Math.cos(lat1)*Math.cos(lat2)*Math.cos(lng2-lng1)));
	  // var distanceValue=(distance/1000).toFixed(2);
	  var faceDis='http://localhost:9090/WebForm11.aspx?lat1='+lat11+'&lon1='+lng11+'&lat2='+lat22+'&lon2='+lng22+'&num=1';
	  var spaDis='http://localhost:9090/WebForm6.aspx?lat1='+lat11+'&lon1='+lng11+'&lat2='+lat22+'&lon2='+lng22+'&num=100';
	 
	   $.ajax({                                                               //计算空间直线距离
			  contentType: "application/x-www-form-urlencoded; charset=utf-8",
			  url:faceDis,
			  dataType:'json',
			  async: false,
			  type: "get",
			  success:function(data){
			   var  returnfaceDis=(data/1000).toFixed(2);
				  faceDisArray.push(returnfaceDis);
				         $.ajax({                                                               //计算空间直线距离
							contentType: "application/x-www-form-urlencoded; charset=utf-8",
							url:spaDis,
							dataType:'json',
							 async: false,
							type: "get",
							success:function(data1){
								var returnspaDis=(data1/1000).toFixed(2);
								spaDisArray.push(returnspaDis);
								
								},
							error:function(XMLHttpRequest){
								alert(XMLHttpRequest.status);
							}
							}); 
			  },
			  error:function(XMLHttpRequest){
			     alert(XMLHttpRequest.status);
			  }
			}); 
			

			
	}
    /*function calculateDis2(arg1,arg2,arg3){
	   var cartographic1=ellipsoid.cartesianToCartographic(arg1);
	   var cartographic2=ellipsoid.cartesianToCartographic(arg2);
	   var lng1=cartographic1.longitude;
	   var lng11=Cesium.Math.toDegrees(lng1);
	   var lat1=cartographic1.latitude;
	   var lat11=Cesium.Math.toDegrees(lat1);
	   var lng2=cartographic2.longitude;
	   var lng22=Cesium.Math.toDegrees(lng2);
	   var lat2=cartographic2.latitude;
	   var lat22=Cesium.Math.toDegrees(lat2);
	  //var  distance=6371004*Math.acos((Math.sin(lat1)*Math.sin(lat2)+Math.cos(lat1)*Math.cos(lat2)*Math.cos(lng2-lng1)));
      //var distanceValue=(distance/1000).toFixed(2);
	  var faceDis='http://localhost:9090/WebForm11.aspx?lat1='+lat11+'&lon1='+lng11+'&lat2='+lat22+'&lon2='+lng22+'&num=1';
	  var spaDis='http://localhost:9090/WebForm6.aspx?lat1='+lat11+'&lon1='+lng11+'&lat2='+lat22+'&lon2='+lng22+'&num=1000';
	  
	   $.ajax({                                                               //计算空间直线距离
			  contentType: "application/x-www-form-urlencoded; charset=utf-8",
			  url:spaDis,
			  dataType:'json',
			  type: "get",
			  success:function(data){
			     var returnspaDis=(data/1000).toFixed(2);
					viewer.entities.add({
						position : Cesium.Cartesian3.fromRadians(lng2, lat2),
						label : {
							text : '水平距离'+distanceValue+'km,空间距离'+returnspaDis+'km',
							scale:0.5,
							show:true
						}
						});
			  },
			  error:function(XMLHttpRequest){
			     alert(XMLHttpRequest.status);
			  }
			});   
	}*/
	function calculateDis2(arc1,arc2,arc3){
		var cartographic=ellipsoid.cartesianToCartographic(arc3);
		var lng1=cartographic.longitude;
	    //var lng11=Cesium.Math.toDegrees(lng1);
	    var lat1=cartographic.latitude;
	    //var lat11=Cesium.Math.toDegrees(lat1);
		var faceDisLength=arc1.length;
		var spaDisLength=arc2.length;
		var faceAllLength=0,spaAllLength=0;
		for(var i=0;i<faceDisLength;i++){
			faceAllLength=faceAllLength+arc1[i]*1;
		}
		for(var j=0;j<spaDisLength;j++){
			spaAllLength=spaAllLength+arc2[j]*1;
		}
         viewer.entities.add({
						position : Cesium.Cartesian3.fromRadians(lng1, lat1),
						label : {
							text : '平面总距离'+faceAllLength.toFixed(2)+'km\n表面总距离'+spaAllLength.toFixed(2)+'km',
							scale:0.5,
							show:true
						}
						});
		
	}