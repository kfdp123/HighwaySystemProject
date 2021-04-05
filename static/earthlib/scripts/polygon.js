var drawFlag2=false;
	var scene=viewer.scene;
	var ellipsoid=scene.globe.ellipsoid;
	var cartesian2 = null;
	var polygonPath=[];
	//var polygonPath2=[];
	var faceToline=[];
	//var faceToline2=[];
	var polyline1 = undefined;
	var polygon=undefined;
	var flagfaceline=0;
	
	
	var hander2=new Cesium.ScreenSpaceEventHandler(scene.canvas);
	
	function clear_draw_polygon(){
			   
	    hander2.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
		hander2.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
		hander2.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
		drawFlag2=false;
		/**/

	}
	function enddraw(){
	drawFlag1=false;
	drawFlag2=false;
	}
	
	//按钮事件
	function drawpolygon(){
	     drawFlag2=true;
		 //viewer.entities.removeAll();
		  flagfaceline=flagfaceline+1;
		 //santai_search();
		 //hander1.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
		// hander1.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
		//鼠标左键单击事件
	hander2.setInputAction(function(movement){
		//if(flagNum==4) return;
	    //cartesian2 = viewer.camera.pickEllipsoid(movement.position, ellipsoid);
		cartesian7 = viewer.scene.pickPosition(movement.position);
		//$(".cesium-infoBox-visible").css("display","none");
		//$(".cesium-selection-wrapper-visible").css("visibility","hidden");
		if(cartesian7){    //
		    if(drawFlag2){
				if(polygonPath.length==0){
					var entity = viewer.entities.getById(venti_mearsure);
					if(entity) viewer.entities.remove(entity);
					entity=null;
				}
			    polygonPath.push(cartesian7);
				
				
				if(faceToline.length==0){
					faceToline.push(cartesian7);					//
					
				}
			}
		}
		viewer.selectedEntity=null;
	},Cesium.ScreenSpaceEventType.LEFT_CLICK);
	//鼠标移动事件
	hander2.setInputAction(function(movement){
		//$(".cesium-infoBox-visible").css("display","none");
		//$(".cesium-selection-wrapper-visible").css("visibility","hidden");
	  //cartesian2 = viewer.camera.pickEllipsoid(movement.endPosition, ellipsoid);
	  cartesian7 = viewer.scene.pickPosition(movement.endPosition);
	   if(drawFlag2==true){
	      if(cartesian7){     //
		     if (polygonPath.length < 2) {
                    if((faceToline.length==1||2)&&(polygonPath.length==1)){
				    
                   if (!Cesium.defined(polyline1)) {
                    faceToline.push(cartesian7);
					
                    polyline1 = new CreatePolyline11(faceToline);
                    } else {
					
                    polyline1.path.pop();
                    polyline1.path.push(cartesian7);
                    }					 
					}
					return;
                }
			 if (!Cesium.defined(polygon)) {
					viewer.entities.removeById(venti_mearsure);//'faceline'+flagfaceline
                    polygonPath.push(cartesian7);
					
                    polygon = new CreatPolygon(polygonPath);               
		        }else {
                    polygon.path.pop();
                    polygon.path.push(cartesian7);
                }		  
	   }
	   }else{
	      return;
	   }
		
	},Cesium.ScreenSpaceEventType.MOUSE_MOVE);
	
	hander2.setInputAction(function() {
       if(drawFlag2=true){
			var cartographicFinal=ellipsoid.cartesianToCartographic(polygonPath[polygonPath.length-1]);
			var num='1';
			if (Math.abs(polygonPath[1].x-polygonPath[0].x)>1000){num='10'};
			if (Math.abs(polygonPath[1].x-polygonPath[0].x)>3000){num='20'};
			if (Math.abs(polygonPath[1].x-polygonPath[0].x)>30000){num='50'};
			var faceDis='http://localhost:9090/WebForm10.aspx?data='+arrayToString(polygonPath)+'&num='+num;//不加高程面积
			var spaDis='http://localhost:9090/WebForm8.aspx?data='+arrayToString(polygonPath)+'&num='+num;//加高程面积
			var spatj='http://localhost:9090/WebForm7.aspx?data='+arrayToString(polygonPath)+'&num='+num;//加高程体积
			$.ajax({                                                               
				contentType: "application/x-www-form-urlencoded; charset=utf-8",
				url:faceDis,                                 //计算平面表面积
				dataType:'json',
				type: "get",

				success:function(data0){
				  var returnFaceDis=(data0/1000000).toFixed(2);
				  $('#polygonpm').html(returnFaceDis);
				  
				  $.ajax({                                                               
					contentType: "application/x-www-form-urlencoded; charset=utf-8",
					url:spaDis,                                 //计算空间表面积
					dataType:'json',
					type: "get",
					success:function(data){
						var returnspabmj=(data/1000000).toFixed(2);
						$('#polygon-mj').html(returnspabmj);
						$.ajax({                                                               
							contentType: "application/x-www-form-urlencoded; charset=utf-8",
							url:spatj,                                    //计算空间体积
							dataType:'json',
							type: "get",
							success:function(data1){						
								var returnspatj=(data1/1000000000).toFixed(2);
								/*		viewer.entities.add({
								position : Cesium.Cartesian3.fromRadians(cartographicFinal.longitude, cartographicFinal.latitude),
								 label : {
								text : '平面面积：'+returnFaceDis+'К㎡\n表面面积：'+returnspabmj+'К㎡\n立体体积：'+returnspatj+'Кm³',
									scale:0.5,
									show:true
								} */					
							},
							error:function(XMLHttpRequest){
								alert(XMLHttpRequest.status);
							}
						});
				},
				error:function(XMLHttpRequest){
					alert(XMLHttpRequest.status);
				}});
			},
			error:function(XMLHttpRequest){
			alert(XMLHttpRequest.status);
		}});
		    
        //drawFlag2 = false;
        polygonPath = [];
		polyline1=undefined;
		faceToline=[];
        polygon = undefined;		
       
		//hander2.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
	   }
	   /*
	    hander2.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
		hander2.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
		hander2.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
		*/
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
	
	
	
	};
	
	
	//生成面的构造函数
	function CreatPolygon(positions){
	   if(!Cesium.defined(positions)){
	       throw new Cesium.DeveloperError('positions is required!');
	   }
	   if(positions.length < 3){
	       throw new Cesium.DeveloperError('positions 的长度必须大于等于3');
	   }
	   this.options={
		   id:venti_mearsure,
	         polygon : {
                    show : true,
                    hierarchy : undefined,
                    material : Cesium.Color.YELLOW.withAlpha(0.5),
					followSurface : true,
					clampToGround : true,
					classificationType:Cesium.ClassificationType.TERRAIN
					//classificationType:Cesium.ClassificationType.CESIUM_3D_TILE
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
	function CreatPolygon1(positions){
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
					followSurface : true,
					clampToGround : true,
					//classificationType:Cesium.ClassificationType.TERRAIN,
					classificationType:Cesium.ClassificationType.CESIUM_3D_TILE
                }
	   },
	   this.path=positions;
	   this.init();
	}
	CreatPolygon1.prototype.init=function(){
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
	
	//根据数组循环出的坐标值组成字符串
	function arrayToString(arc1){
		var coorAdd='';
	   	var arcLength=arc1.length;
		for(var i=0;i<arcLength;i++){
		var cartographic1=ellipsoid.cartesianToCartographic(arc1[i]);
	    var lng1=Cesium.Math.toDegrees(cartographic1.longitude);
	    var lat1=Cesium.Math.toDegrees(cartographic1.latitude);
		
		if(i==arcLength-1){
	         coorAdd=coorAdd+lng1+","+lat1;
		}else{
			coorAdd=coorAdd+lng1+","+lat1+",";
		}
		}
		return coorAdd;
	}
	//生成线的函数
	
	  var CreatePolyline11 = (function() {
        function _(positons) {
            if (!Cesium.defined(positons)) {
                throw new Cesium.DeveloperError('positions is required!');
            }
            if (positons.length < 2) {
                throw new Cesium.DeveloperError('positions 的长度必须大于等于2');
            }
            this.options = {
				id:venti_mearsure,//'faceline'+flagfaceline,
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
                    followSurface : true,
					clampToGround:true
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
	function drawpolygonmx(){
	     drawFlag2=true;
		 viewer.entities.removeAll();
		  flagfaceline=flagfaceline+1;
		 //santai_search();
		 //hander1.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
		// hander1.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
		//鼠标左键单击事件
	hander2.setInputAction(function(movement){
		//if(flagNum==4) return;
	    cartesian2 = viewer.camera.pickEllipsoid(movement.position, ellipsoid);
		//$(".cesium-infoBox-visible").css("display","none");
		//$(".cesium-selection-wrapper-visible").css("visibility","hidden");
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
	hander2.setInputAction(function(movement){
		//$(".cesium-infoBox-visible").css("display","none");
		//$(".cesium-selection-wrapper-visible").css("visibility","hidden");
	  cartesian2 = viewer.camera.pickEllipsoid(movement.endPosition, ellipsoid);
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
                    polygon = new CreatPolygon1(polygonPath);               
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
			var cartographicFinal=ellipsoid.cartesianToCartographic(polygonPath[polygonPath.length-1]);
			var faceDis='http://localhost:9090/WebForm10.aspx?data='+arrayToString(polygonPath)+'&num=50';//不加高程面积
			var spaDis='http://localhost:9090/WebForm8.aspx?data='+arrayToString(polygonPath)+'&num=50';//加高程面积
			var spatj='http://localhost:9090/WebForm7.aspx?data='+arrayToString(polygonPath)+'&num=50';//加高程体积
			$.ajax({                                                               
			  contentType: "application/x-www-form-urlencoded; charset=utf-8",
			  url:faceDis,                                 //计算平面表面积
			  dataType:'json',
			  type: "get",
			  success:function(data0){
				  var returnFaceDis=(data0/1000000).toFixed(2);
				  $('#3Dpolygonpm').html(returnFaceDis);
				  $.ajax({                                                               
					contentType: "application/x-www-form-urlencoded; charset=utf-8",
					url:spaDis,                                 //计算空间表面积
					dataType:'json',
					type: "get",
					success:function(data){
				    var returnspabmj=(data/1000000).toFixed(2);
					 $('#3Dpolygon-mj').html(returnspabmj);
				         $.ajax({                                                               
								contentType: "application/x-www-form-urlencoded; charset=utf-8",
								url:spatj,                                    //计算空间体积
								dataType:'json',
								type: "get",
								success:function(data1){
									var returnspatj=(data1/1000000000).toFixed(2);
							/*		viewer.entities.add({
							position : Cesium.Cartesian3.fromRadians(cartographicFinal.longitude, cartographicFinal.latitude),
							 label : {
							text : '平面面积：'+returnFaceDis+'К㎡\n表面面积：'+returnspabmj+'К㎡\n立体体积：'+returnspatj+'Кm³',
								scale:0.5,
								show:true
							} */
							
						
						
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
			            },
								error:function(XMLHttpRequest){
									alert(XMLHttpRequest.status);
								}
								});
		    
       // drawFlag2 = false;
        polygonPath = [];
		polyline1=undefined;
		faceToline=[];
        polygon = undefined;
		
       
		hander2.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
	   }else{
	     return;
	   }
	    hander2.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
		hander2.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
		hander2.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
		
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
	  
	   
	};