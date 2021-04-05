    var scene=viewer.scene;
	var ellipsoid=viewer.scene.globe.ellipsoid;
	var canvas=viewer.scene.canvas;
	var handler0=new Cesium.ScreenSpaceEventHandler(canvas);
	var hander3=new Cesium.ScreenSpaceEventHandler(viewer.canvas);
	var hander4=new Cesium.ScreenSpaceEventHandler(viewer.canvas);
	var pointHander,lineHander,faceHander; 
	var latitudeString,longitudeString;
	var cartesian0=null,cartesian3=null,cartesian4=null;
	var polylinePath3=[],polygonPath4=[],publicArray=[],ventitiestemp=[];
	var polyline3=undefined,polygon4=undefined;
	var entityOBJ,publicValue,publicArray2;
	var faceToline2=[];
	var polyline10 = undefined;
	var flagNum=0;
	var ii=0,gg=0,hh=0;
	var panelId=document.getElementById('panelId');
	var getValue=document.getElementById("getValue");
	var getDraw=document.getElementById("getDraw");
	var getFile=document.getElementById("btnfile");

	//鼠标移动时跟随的提示div
    var nameOverlay = document.createElement('div');
		viewer.container.appendChild(nameOverlay);
		nameOverlay.className = 'backdrop';
		nameOverlay.style.display = 'none';
		nameOverlay.style.position = 'absolute';
		nameOverlay.style.bottom = '0';
		nameOverlay.style.left = '0';
		nameOverlay.style['pointer-events'] = 'none';
		nameOverlay.style.padding = '4px';
		nameOverlay.style.backgroundColor = 'black';

	function isTrue(flag){
	   if(flag=="undefined"||flag=="null"||flag=="")  return false;
	   else   return true;
	}

		//点标注
	function pointMarker(){
		//viewer.entities.removeAll();
		//santai_search();
		//handler3.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
		//handler4.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
	    flagNum=1;
		if(flagNum != 1 ) return false;
				 
		 ii=ii+1;
		 panelId.style.position="absolute";	
		 getValue.value="";
		 getDraw.value="";
		 pointHander=handler0.setInputAction( function(movement){
				// var cloNode=document.getElementById( "div-" + ii);
                  viewer.container.appendChild(panelId);
				//捕获椭球体，将笛卡尔二维平面坐标转为椭球体的笛卡尔三维坐标，返回球体表面的点
				 cartesian0=viewer.camera.pickEllipsoid(movement.position, ellipsoid);
				 cartesian1=viewer.scene.pickPosition(movement.position);
				  if(cartesian1){
					   //将笛卡尔三维坐标转为地图坐标（弧度）
					   var cartographic=viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian1);
					   //将地图坐标（弧度）转为十进制的度数
						latitudeString=Cesium.Math.toDegrees(cartographic.latitude);
						longitudeString=Cesium.Math.toDegrees(cartographic.longitude);
						document.getElementById('fileImg').style.display='';
						panelId.style.display="block";
				   }; 
				   var scratch = new Cesium.Cartesian2();				   
				   viewer.scene.preRender.addEventListener(function() {
					   var position = Cesium.Cartesian3.fromDegrees(longitudeString, latitudeString);
					   var canvasPosition = viewer.scene.cartesianToCanvasCoordinates(position, scratch);
					   if (Cesium.defined(canvasPosition)) {
					        //panelId.style.display="block";
							panelId.style.top = canvasPosition.y + 'px';
                            panelId.style.left = canvasPosition.x + 'px';
						}
					})
				   var pinBuilder = new Cesium.PinBuilder();
						entityOBJ=viewer.entities.add({
							id:"label3"+ii,
							position : Cesium.Cartesian3.fromDegrees(longitudeString, latitudeString),
							billboard : {
								image : pinBuilder.fromColor(Cesium.Color.ROYALBLUE, 48).toDataURL(),
								verticalOrigin : Cesium.VerticalOrigin.BOTTOM
							}
						});
				
					handler0.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);  
			},Cesium.ScreenSpaceEventType.LEFT_CLICK );	
			}
	//线标注
	function lineMarker(){
		
		viewer.entities.removeAll();
        ventitiestemp=[];
	    publicArray=[];
		//viewer.entities.removeAll();
		//santai_search();
		//hander0.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
		//hander4.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
	    flagNum=2;
		if(flagNum != 2 ){
			return false;
		}else{
		gg=gg+1;
		panelId.style.position="absolute";	
		getValue.value="";
		getDraw.value="";
				//鼠标左键单击事件
			lineHander=hander3.setInputAction(function(movement){
				cartesian3 = viewer.camera.pickEllipsoid(movement.position, ellipsoid);
				//cartesian4 = viewer.scene.pickPosition(movement.position);
				if(cartesian3){
					if(flagNum==2){
						polylinePath3.push(cartesian3);
						var arrLen=polylinePath3.length;
						if(arrLen<2){
							
							
							var cartographicBegin=ellipsoid.cartesianToCartographic(cartesian3);
							viewer.entities.add({
							    id:"start"+gg,
								position : Cesium.Cartesian3.fromRadians(cartographicBegin.longitude, cartographicBegin.latitude),
								label : {
									text : '起点',
									scale:0.5,
									show:true
								}
							}); 
						}  
						else{calculateDis4(polylinePath3[arrLen-3],polylinePath3[arrLen-2],gg);
						} 
					}
				}
				viewer.selectedEntity=null;
			},Cesium.ScreenSpaceEventType.LEFT_CLICK);
			//鼠标移动事件
			hander3.setInputAction(function(movement){
			cartesian3 = viewer.camera.pickEllipsoid(movement.endPosition, ellipsoid);
			//cartesian3 = viewer.scene.pickPosition(movement.position);
			if(flagNum==2){
				if(cartesian3){
					if (polylinePath3.length < 1) {
							return;
						}
					if (!Cesium.defined(polyline3)) {
							polylinePath3.push(cartesian3);
							polyline3 = new CreatLine(polylinePath3,gg);         //gg      
						}else {
							polyline3.path.pop();
							polyline3.path.push(cartesian3);
						}		  
			}
			}else{
				return;
			}
				
			},Cesium.ScreenSpaceEventType.MOUSE_MOVE);
			//鼠标右键单击完成事件
			hander3.setInputAction(function() {
			　if(flagNum==2){
			    viewer.container.appendChild(panelId);
				document.getElementById('fileImg').style.display='none';
				panelId.style.display="block";
				calculateDis5(polylinePath3[0],polylinePath3[polylinePath3.length-1],'总长度',gg);
				publicArray=[].concat(polylinePath3);
				publicValue=(calculateDis(publicArray[0],publicArray[publicArray.length-1])/1000).toFixed(2);
                var scratch = new Cesium.Cartesian2();	
				var cartographicF=ellipsoid.cartesianToCartographic(polylinePath3[polylinePath3.length-1]);			   
				   viewer.scene.preRender.addEventListener(function() {				       
		var position = Cesium.Cartesian3.fromDegrees(Cesium.Math.toDegrees(cartographicF.longitude),Cesium.Math.toDegrees(cartographicF.latitude));
					   var canvasPosition = viewer.scene.cartesianToCanvasCoordinates(position, scratch);
					   if (Cesium.defined(canvasPosition)) {
							panelId.style.top = canvasPosition.y + 'px';
                            panelId.style.left = canvasPosition.x + 'px';
						}
					})
			    
				//flagNum=0;
				polylinePath3 = [];
				polyline3 = undefined;
			}else{
				return;
			}
			    //flagNum=0;
				hander3.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
				hander4.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
			}, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
			}
	}
		//面标注
		function faceMarker(){
			
            publicArray=[];
			viewer.entities.removeAll();
			//santai_search();
			//hander3.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
		    //hander0.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
		    flagNum=3;
				if(flagNum != 3 ) {
					return false;
				}else{
				hh=hh+1;
				panelId.style.position="absolute";	
				getValue.value="";
				getDraw.value="";
				hander4.setInputAction(function(movement){
	    cartesian4 = viewer.camera.pickEllipsoid(movement.position, ellipsoid);
		if(cartesian4){
		    if(flagNum==3){
			    polygonPath4.push(cartesian4);
				if(faceToline2.length==0){
				faceToline2.push(cartesian4);
				}
			}
		}
		viewer.selectedEntity=null;
	},Cesium.ScreenSpaceEventType.LEFT_CLICK);
	//鼠标移动事件
		hander4.setInputAction(function(movement){
		cartesian4 = viewer.camera.pickEllipsoid(movement.endPosition, ellipsoid);
		if(flagNum==3){
			if(cartesian4){
				if (polygonPath4.length < 2) {
						if((faceToline2.length==1||2)&&(polygonPath4.length==1)){
				    
                   if (!Cesium.defined(polyline10)) {
                    faceToline2.push(cartesian4);
                    polyline10 = new CreatePolyline12(faceToline2);
                    } else {
					
                    polyline10.path.pop();
                    polyline10.path.push(cartesian4);
                    }					 
					}
					return;
					}
				if (!Cesium.defined(polygon4)) {
					viewer.entities.removeById("faceToline"+hh);
						polygonPath4.push(cartesian4);
						polygon4 = new CreatPolygon(polygonPath4);               
					}else {
						polygon4.path.pop();
						polygon4.path.push(cartesian4);
					}		  
		}
		}else{
			return;
		}
			
		},Cesium.ScreenSpaceEventType.MOUSE_MOVE);
		hander4.setInputAction(function() {
		if(flagNum==3){
		viewer.container.appendChild(panelId);
		document.getElementById('fileImg').style.display='none';
		panelId.style.display="block";
		var areaNum=0;
			for(var i=0;i<polygonPath4.length-2;i++){
			var aSide=calculateDis(polygonPath4[0],polygonPath4[i+1]);
			var bSide=calculateDis(polygonPath4[0],polygonPath4[i+2]);
			var cSide=calculateDis(polygonPath4[i+1],polygonPath4[i+2]);
			areaNum=areaNum+triangle(aSide,bSide,cSide);
			}	 
                publicArray=[].concat(polygonPath4);
				areaNumFinal=(areaNum/1000000).toFixed(2);
                publicValue=areaNumFinal;
				var cartographicFinal=ellipsoid.cartesianToCartographic(polygonPath4[polygonPath4.length-1]);
				viewer.entities.add({
				    id:"area"+hh,
					position : Cesium.Cartesian3.fromRadians(cartographicFinal.longitude, cartographicFinal.latitude),
					label : {
						text : '总面积：'+areaNumFinal+'К㎡',
						scale:0.5,
						show:true
					}
				});
				var scratch = new Cesium.Cartesian2();	
				//var cartographicE=ellipsoid.cartesianToCartographic(polylinePath3[polylinePath3.length-1]);			   
				   viewer.scene.preRender.addEventListener(function() {				       
		           var position = Cesium.Cartesian3.fromRadians(cartographicFinal.longitude, cartographicFinal.latitude);
					   var canvasPosition = viewer.scene.cartesianToCanvasCoordinates(position, scratch);
					   if (Cesium.defined(canvasPosition)) {
							panelId.style.top = canvasPosition.y + 'px';
                            panelId.style.left = canvasPosition.x + 'px';
						}
					})
			//flagNum=0;
			polygonPath4 = [];
			polygon4 = undefined;
			polyline10=undefined;
		    faceToline2=[];
		}else{
			return;
		}
			//flagNum=0;
			hander4.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
			hander3.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
		}, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
		}
		}
		//公共函数
		
	function clearForm(){
		 panelId.style.display="none";
		 flagNum=0;
		 //viewer.entities.removeAll();
		viewer.entities.removeById("label3"+ii);
		viewer.entities.removeById("label"+gg);
		viewer.entities.removeById("label2"+hh);
		viewer.entities.removeById("start"+gg);
		viewer.entities.removeById("disLast"+gg);
		viewer.entities.removeById("faceToline"+hh);
		//viewer.entities.removeById("dis"+gg);
		viewer.entities.removeById("area"+hh);
		//hander0.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
		hander3.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
		hander4.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
        for(var i=0;i<ventitiestemp.length;i++){
		   viewer.entities.remove(ventitiestemp[i]);
		}
	}	



$(function () {  	
	$("#Button1").click(function () {
		var NameValue = $("#getValue").val();
		var TextValue=$("#getDraw").val();
		var getFile=$("#btnfile").val(); 
		if(isTrue(NameValue)||isTrue(TextValue)){
		    if(flagNum==1){
				 $("#form1").ajaxSubmit({
					contentType: "application/x-www-form-urlencoded; charset=utf-8",
					url: "http://192.168.10.36:2018/upload.ashx",
					type: "post",
					//data: { longitude: longitudeString, name2: NameValue, latitude: latitudeString, text: TextValue },
					data: { longitude: longitudeString, name2: NameValue, latitude: latitudeString,number: 1202102045, text: TextValue,type:0},
					dataType: "json",
					success: function (data) {
						//清空file控件里面的值
						var file = $("#btnfile");
						file.after(file.clone().val(""));
						file.remove();
						if (data.length == 1) {
							$.messager.show({
								title: '通知',
								msg: '添加成功',
								showType: 'fade',
								width: 150,
								height: 50,
								timeout:1000,
								style: {
								}
							});
							$('#panelId').css('display','none');
							flagNum==0;
							entityOBJ.description = '<table class="cesium-infoBox-defaultTable"><tbody>' +
								'<tr><th>名称</th><td>' + data[0].NAME + '</td></tr>' +
								'<tr><th>经度</th><td>' + data[0].LNG + '</td></tr>' +
								'<tr><th>纬度</th><td>' + data[0].LAT + '</td></tr>' +
								'<tr><th>采集日期</th><td>' + data[0].NOWDATE + '</td></tr>' +
								'<tr><th>设备ID</th><td>' + data[0].PHONEID + '</td></tr>' +
								'<tr><th>内容描述</th><td>' + data[0].TEXT + '</td></tr>' +
								"<tr><th>图片展示</th><td><img src='"  + 
								"http://localhost:2018" + data[0].PATH + 
								"'width='200px' height='200px'/></td></tr>" +
								'</tbody></table>';
						}  
					},
					error:function(XMLHttpRequest){
					   alert(XMLHttpRequest.status);
					}
				});
			   }else if(flagNum==2){
				   flagNum=0;
							hander3.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
				            hander4.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
							//hander1.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
							//hander2.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
			       $("#form1").ajaxSubmit({
					contentType: "application/x-www-form-urlencoded; charset=utf-8",
					url: "http://192.168.10.36:2018/returnMsg.ashx",
					type: "post",
					data: { name2: NameValue, text: TextValue,type:1,location:publicArray,sumLength:publicValue  },
					dataType: "json",
                    traditional: true,
					success: function (data) {
						//清空file控件里面的值
						var file = $("#btnfile");
						file.after(file.clone().val(""));
						file.remove();
						if (data.length == 1) {
							$.messager.show({
								title: '通知',
								msg: '添加成功',
								showType: 'fade',
								width: 150,
								height: 50,
								timeout:1000,
								style: {
								}
							});
							$('#panelId').css('display','none');
							/*flagNum==0;
							hander3.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
				            hander4.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);*/
							entityOBJ.description = '<table class="cesium-infoBox-defaultTable"><tbody>' +
								'<tr><th>名称</th><td>' + data[0].NAME + '</td></tr>' +
								'<tr><th>采集日期</th><td>' + data[0].NOWDATE + '</td></tr>' +
								'<tr><th>设备ID</th><td>' + data[0].PHONEID + '</td></tr>' +
								'<tr><th>内容描述</th><td>' + data[0].TEXT + '</td></tr>' +
                                '<tr><th>总长度(KM)</th><td>' + data[0].SUMLENGTH + '</td></tr>' +
								//"<tr><th>图片展示</th><td><img src='"  + 
								//"http://localhost:2018" + data[0].PATH + 
								//"'width='200px' height='200px'/></td></tr>" +
								'</tbody></table>';
						}  
					},
					error:function(XMLHttpRequest){
					   alert(XMLHttpRequest.status);
					}
				});
			   }else if(flagNum==3){
				   flagNum=0;
							hander3.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
				            hander4.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
							//hander1.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
				            //hander2.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
			      $("#form1").ajaxSubmit({
					contentType: "application/x-www-form-urlencoded; charset=utf-8",
					url: "http://192.168.10.36:2018/returnMsg.ashx",
					type: "post",
					data: { name2: NameValue, text: TextValue ,type:2,location:publicArray,sumArea:publicValue},
					dataType: "json",
                    traditional: true,
					success: function (data) {
						//清空file控件里面的值
						var file = $("#btnfile");
						file.after(file.clone().val(""));
						file.remove();
						if (data.length == 1) {
							$.messager.show({
								title: '通知',
								msg: '添加成功',
								showType: 'fade',
								width: 150,
								height: 50,
								timeout:1000,
								style: {
								}
							});
							$('#panelId').css('display','none');
							/*flagNum=0;
							hander3.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
				            hander4.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);*/
							entityOBJ.description = '<table class="cesium-infoBox-defaultTable"><tbody>' +
								'<tr><th>名称</th><td>' + data[0].NAME + '</td></tr>' +
								'<tr><th>采集日期</th><td>' + data[0].NOWDATE + '</td></tr>' +
								'<tr><th>设备ID</th><td>' + data[0].PHONEID + '</td></tr>' +
								'<tr><th>内容描述</th><td>' + data[0].TEXT + '</td></tr>' +
                                '<tr><th>总面积(К㎡)</th><td>' + data[0].SUMAREA + '</td></tr>' +
								//"<tr><th>图片展示</th><td><img src='"  + 
								//"http://localhost:2018" + data[0].PATH + 
								//"'width='200px' height='200px'/></td></tr>" +
								'</tbody></table>';
						}  
					},
					error:function(XMLHttpRequest){
					   alert(XMLHttpRequest.status);
					}
				});
			   }else{
			      return;
			   }
			handler0.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
			flagNum=0;
		}else{
		 $.messager.alert('提示','输入不能为空','info');
		}
		
	});	
});


//生成线的构造函数
	function CreatLine2(positions,gg){
	   if(!Cesium.defined(positions)){
	       throw new Cesium.DeveloperError('positions is required!');
	   }
	   if(positions.length < 2){
	       throw new Cesium.DeveloperError('positions 的长度必须大于等于2');
	   }
	   this.options={
	         id:"label"+gg,
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
	CreatLine2.prototype.init=function(){
	    var that=this;
		var positionCBP = function() {
                return that.path;
            };
            this.options.polyline.positions = new Cesium.CallbackProperty(positionCBP, false);
            entityOBJ=viewer.entities.add(this.options);
	}
	
	//根据两点求(笛卡尔空间直角坐标)求算两点之间的距离
	//1,先将笛卡尔空间直角坐标转换为地理坐标系下的弧度单位
   //2,再将弧度单位转换为经纬度表示，再根据经纬度来计算两点之间的距离
    
	function calculateDis4(arg1,arg2,gg){
	   var cartographic1=ellipsoid.cartesianToCartographic(arg1);
	   var cartographic2=ellipsoid.cartesianToCartographic(arg2);
	   var lng1=cartographic1.longitude;
	   var lat1=cartographic1.latitude;
	   var lng2=cartographic2.longitude;
	   var lat2=cartographic2.latitude;
	  var  distance=6371004*Math.acos((Math.sin(lat1)*Math.sin(lat2)+Math.cos(lat1)*Math.cos(lat2)*Math.cos(lng2-lng1)));
 
	  var distanceValue=(distance/1000).toFixed(2);

       var ventijk={
        position : Cesium.Cartesian3.fromRadians(lng2, lat2),
		id:"dis"+Math.random(),
        label : {
            text : distanceValue+'km',
			scale:0.5,
			show:true
        }
    };
	  ventitiestemp.push(ventijk);
	  viewer.entities.add(ventijk); 
	}
    function calculateDis5(arg1,arg2,arg3,gg){
	   var cartographic1=ellipsoid.cartesianToCartographic(arg1);
	   var cartographic2=ellipsoid.cartesianToCartographic(arg2);
	   var lng1=cartographic1.longitude;
	   var lat1=cartographic1.latitude;
	   var lng2=cartographic2.longitude;
	   var lat2=cartographic2.latitude;
	  var  distance=6371004*Math.acos((Math.sin(lat1)*Math.sin(lat2)+Math.cos(lat1)*Math.cos(lat2)*Math.cos(lng2-lng1)));
 
	  var distanceValue=(distance/1000).toFixed(2);
        viewer.entities.add({
		id:"disLast"+gg,
        position : Cesium.Cartesian3.fromRadians(lng2, lat2),
        label : {
            text : arg3+distanceValue+'km',
			scale:0.5,
			show:true
        }
    }); 
     return distanceValue;  
	}	
    //面函数
	//生成面的构造函数
	function CreatPolygon2(positions){
	   if(!Cesium.defined(positions)){
	       throw new Cesium.DeveloperError('positions is required!');
	   }
	   if(positions.length < 3){
	       throw new Cesium.DeveloperError('positions 的长度必须大于等于3');
	   }
	   this.options={
	         id:"label2"+hh,
	         polygon : {
                    show : true,
                    hierarchy : undefined,
                    material : Cesium.Color.YELLOW.withAlpha(0.5)
                }
	   },
	   this.path=positions;
	   this.init();
	}
	CreatPolygon2.prototype.init=function(){
	    var that=this;
		var positionCBP = function() {
                return that.path;
            };
            this.options.polygon.hierarchy = new Cesium.CallbackProperty(positionCBP, false);
            entityOBJ=viewer.entities.add(this.options);
	}
	function cancelMark(){
		viewer.entities.removeAll();
		flagNum=0;
	}
	//计算两点之间的距离
	/*function calculateDis3(arg1,arg2){
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
	}*/
	function markmark(){
	
        $.ajax({                                                               //加载点数据
			  contentType: "application/x-www-form-urlencoded; charset=utf-8",
			  url:'http://192.168.10.36:2018/searchPoint.ashx',
			  data:{type:0},
			  dataType:'json',
			  type: "post",
			  success:function(data){
			     var dataLen=data.length;
				 var pinBuilder = new Cesium.PinBuilder();
				 for(var i=0;i<dataLen;i++){
				    viewer.entities.add({
					    id:"labelShow"+i,
					    position : Cesium.Cartesian3.fromDegrees(data[i].LNG, data[i].LAT),
						billboard : {
						image : pinBuilder.fromText(data[i].NAME, Cesium.Color.ROYALBLUE, 40),
						verticalOrigin : Cesium.VerticalOrigin.BOTTOM
							},
						description:'<table class="cesium-infoBox-defaultTable"><tbody>' +
								'<tr><th>名称</th><td>' + data[i].NAME + '</td></tr>' +
								'<tr><th>经度</th><td>' + data[i].LNG + '</td></tr>' +
								'<tr><th>纬度</th><td>' + data[i].LAT + '</td></tr>' +
								'<tr><th>采集日期</th><td>' + data[i].NOWDATE + '</td></tr>' +
								'<tr><th>设备ID</th><td>' + data[i].PHONEID + '</td></tr>' +
								'<tr><th>内容描述</th><td>' + data[i].TEXT + '</td></tr>' +
								"<tr><th>图片展示</th><td><img src='"  + 
								"http://localhost:2018/" + data[i].PATH + 
								"'width='200px' height='200px'/></td></tr>" +
								'</tbody></table>'
					});
				 }
			  },
			  error:function(XMLHttpRequest){
			     alert(XMLHttpRequest.status);
			  }
			});
        $.ajax({                                                               //加载线数据
			  contentType: "application/x-www-form-urlencoded; charset=utf-8",
			  url:'http://192.168.10.36:2018/searchLine.ashx',
			  data:{type:1},
			  dataType:'json',
			  type: "post",
			  success:function(data){
			     var dataLen=data.length;
				 for(var i=0;i<dataLen;i++){
				    viewer.entities.add({
					    id:"LinelabelShow"+i,
						polyline : {
						    show : true,
							width : 2,
							material : new Cesium.PolylineOutlineMaterialProperty({
								color : Cesium.Color.YELLOW.withAlpha(0.6),
								outlineWidth : 0,
								outlineColor : Cesium.Color.YELLOW
							}),
							followSurface : true,
							positions:Cesium.Cartesian3.fromRadiansArray(Carten2Radians(data[i].LOCATION))
							},
						description:'<table class="cesium-infoBox-defaultTable"><tbody>' +
								'<tr><th>名称</th><td>' + data[i].NAME + '</td></tr>' +
								'<tr><th>采集日期</th><td>' + data[i].NOWDATE + '</td></tr>' +
								'<tr><th>设备ID</th><td>' + data[i].PHONEID + '</td></tr>' +
								'<tr><th>总长度(KM)</th><td>' + data[i].SUMLENGTH + '</td></tr>' +
								'<tr><th>内容描述</th><td>' + data[i].TEXT + '</td></tr>' +
								//"<tr><th>图片展示</th><td><img src='"  + 
								//"http://localhost:2018/" + data[i].PATH + 
								//"'width='200px' height='200px'/></td></tr>" +
								'</tbody></table>'
					});
				 }
			  },
			  error:function(XMLHttpRequest){
			     alert(XMLHttpRequest.status);
			  }
			});
        $.ajax({                                                               //加载面数据
			  contentType: "application/x-www-form-urlencoded; charset=utf-8",
			  url:'http://192.168.10.36:2018/searchLine.ashx',
			  data:{type:2},
			  dataType:'json',
			  type: "post",
			  success:function(data){
			     var dataLen=data.length;
				 for(var i=0;i<dataLen;i++){
				    viewer.entities.add({
					    id:"FacelabelShow"+i,
						polygon : {
						    show : true,
							material : Cesium.Color.RED.withAlpha(0.5),
							hierarchy:Cesium.Cartesian3.fromRadiansArray(Carten2Radians(data[i].LOCATION))
							},
						description:'<table class="cesium-infoBox-defaultTable"><tbody>' +
								'<tr><th>名称</th><td>' + data[i].NAME + '</td></tr>' +
								'<tr><th>采集日期</th><td>' + data[i].NOWDATE + '</td></tr>' +
								'<tr><th>设备ID</th><td>' + data[i].PHONEID + '</td></tr>' +
								'<tr><th>总面积(К㎡)</th><td>' + data[i].SUMAREA + '</td></tr>' +
								'<tr><th>内容描述</th><td>' + data[i].TEXT + '</td></tr>' +
								//"<tr><th>图片展示</th><td><img src='"  + 
								//"http://localhost:2018/" + data[i].PATH + 
								//"'width='200px' height='200px'/></td></tr>" +
								'</tbody></table>'
					});
				 }
			  },
			  error:function(XMLHttpRequest){
			     alert(XMLHttpRequest.status);
			  }
			});        
     }
     function Carten2Radians(arc){
	   var array=[],carten3;
	   var tempArray0=arc.substring(1);
	   var tempArray1=tempArray0.substring(0,tempArray0.length-1);
	   var tempArray=tempArray1.split('),(');
	   var arcLen=tempArray.length;
	   for(var j=0;j<arcLen;j++){
	       var tempStringsplit=tempArray[j].split(',');
		   var position = new Cesium.Cartesian3(tempStringsplit[0]*1,tempStringsplit[1]*1,tempStringsplit[2]*1);
           carten3=ellipsoid.cartesianToCartographic(position);
		   array.push(carten3.longitude);
		   array.push(carten3.latitude);
	   }
	   return array;
	}
	//生成线的函数
	  var CreatePolyline12 = (function() {
        function _(positons) {
            if (!Cesium.defined(positons)) {
                throw new Cesium.DeveloperError('positions is required!');
            }
            if (positons.length < 2) {
                throw new Cesium.DeveloperError('positions 的长度必须大于等于2');
            }
            this.options = {
				id:"faceToline"+hh,
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
                    followSurface : true
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
            viewer.entities.add(this.options);
        };

        return _;
    })();