//坡度
var latitudeValue,longitudeValue,handler5,handler6,handler7,handler8;
    var layers = viewer.scene.imageryLayers,imgsArray=[]; 
	var tsArray=[];
/* function slopeAnalyst()
{
	handler5=new Cesium.ScreenSpaceEventHandler(canvas);
	handler5.setInputAction( function(movement){
				//捕获椭球体，将笛卡尔二维平面坐标转为椭球体的笛卡尔三维坐标，返回球体表面的点
				var cartesian=viewer.camera.pickEllipsoid(movement.position, ellipsoid);			
				  if(cartesian){
					   //将笛卡尔三维坐标转为地图坐标（弧度）
					   var cartographic=viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian);
					   //将地图坐标（弧度）转为十进制的度数
						latitudeValue=Cesium.Math.toDegrees(cartographic.latitude);
						longitudeValue=Cesium.Math.toDegrees(cartographic.longitude);
						imgsArray.push(imgSlopeTongshi(latitudeValue,longitudeValue,1,slopeFinalValue));
						changeImag("./images/slope.png");
				   }; 
	             handler5.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
			},Cesium.ScreenSpaceEventType.LEFT_CLICK );
	
	
} */
var poduArray=[];
var poduLine=undefined;
function slopeAnalyst()
{   
	poduArray=[];
	poduFlag=true;
	poduLine = undefined;
	//handler5.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
	//handler5.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
	handler5=new Cesium.ScreenSpaceEventHandler(canvas);
	handler5.setInputAction( function(movement){
		 //lng=null,lat=null;
		var cartesian=viewer.camera.pickEllipsoid(movement.position, ellipsoid);
		var cartographic=ellipsoid.cartesianToCartographic(cartesian);
			var lng=Cesium.Math.toDegrees(cartographic.longitude);
			var lat=Cesium.Math.toDegrees(cartographic.latitude);
			if (cartesian) {
				if (poduFlag) {
					if(poduArray.length>=4){
						//var meanLat=(poduArray[1]+poduArray[3])/2;
			//var meanLng=(poduArray[0]+poduArray[2])/2;
			//var lngDis=coorDis(poduArray[0],poduArray[1],poduArray[2],poduArray[1])/222000;
			//var latDis=coorDis(poduArray[0],poduArray[1],poduArray[0],poduArray[3])/222000;
			  if((poduArray[1]<poduArray[3])&&(poduArray[0]<poduArray[2])){
					 imgsArray.push(imgSlopeTongshi(poduArray[1],poduArray[0],poduArray[3],poduArray[2],3));
				}else if((poduArray[1]>poduArray[3])&&(poduArray[0]>poduArray[2])){
					imgsArray.push(imgSlopeTongshi(poduArray[3],poduArray[2],poduArray[1],poduArray[0],3));
				}else if((poduArray[1]>poduArray[3])&&(poduArray[0]<poduArray[2])){
					imgsArray.push(imgSlopeTongshi(poduArray[3],poduArray[0],poduArray[1],poduArray[2],3));
				}else if((poduArray[1]<poduArray[3])&&(poduArray[0]>poduArray[2])){
					imgsArray.push(imgSlopeTongshi(poduArray[1],poduArray[2],poduArray[3],poduArray[0],3));
				}else{
					return;
				}
			changeImag("./images/slope.png");
			viewer.entities.removeById('rectangle'+qq);
						poduFlag = false;
						poduArray = [];
						poduLine = undefined;
						handler5.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
		                handler5.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
						handler5.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
						//lng=null;
						//lat=null;
					}
					poduArray.push(lng);
					poduArray.push(lat); 
									
				}
			}			
		},Cesium.ScreenSpaceEventType.LEFT_CLICK);
	handler5.setInputAction(function(movement) {
        var ray = viewer.scene.camera.getPickRay(movement.endPosition);
        var cartesian = viewer.scene.globe.pick(ray, viewer.scene);
        
        if (cartesian) {
		var cartographic=ellipsoid.cartesianToCartographic(cartesian);
		var lng=Cesium.Math.toDegrees(cartographic.longitude);
		var lat=Cesium.Math.toDegrees(cartographic.latitude);
            if (poduFlag) {
                if (poduArray.length < 1) {
                    return;
                }
                if (!Cesium.defined(poduLine)) {
                    poduArray.push(lng);
                    poduArray.push(lat);
					/* if((poduArray[1]>poduArray[3])||(poduArray[1]==poduArray[3])||(poduArray[0]==poduArray[2])||(poduArray[0]>poduArray[2])){	
					poduFlag = false;
					poduArray = [];
					poduLine = undefined;
					//lng=null;
					//lat=null;
					handler5.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
					handler5.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
					handler5.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
					return;
						
					} */
                    poduLine = new CreateRectangle(poduArray);

                } else {
                    poduLine.path.pop();
					poduLine.path.pop();
                    poduArray.push(lng);
                    poduArray.push(lat);
                }
            }
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
	handler5.setInputAction(function() {
		document.getElementById('all-in-center').style.display='';
	 //alert(calculateDis1(polylinePath[0],polylinePath[1])+","+polylinePath[0]);
	 //var meanLat=(poduArray[1]+poduArray[3])/2;
	// var meanLng=(poduArray[0]+poduArray[2])/2;
	// var lngDis=coorDis(poduArray[0],poduArray[1],poduArray[2],poduArray[1])/222000;
	// var latDis=coorDis(poduArray[0],poduArray[1],poduArray[0],poduArray[3])/222000;
	if((poduArray[1]<poduArray[3])&&(poduArray[0]<poduArray[2])){
					 imgsArray.push(imgSlopeTongshi(poduArray[1],poduArray[0],poduArray[3],poduArray[2],3));
				}else if((poduArray[1]>poduArray[3])&&(poduArray[0]>poduArray[2])){
					imgsArray.push(imgSlopeTongshi(poduArray[3],poduArray[2],poduArray[1],poduArray[0],3));
				}else if((poduArray[1]>poduArray[3])&&(poduArray[0]<poduArray[2])){
					imgsArray.push(imgSlopeTongshi(poduArray[3],poduArray[0],poduArray[1],poduArray[2],3));
				}else if((poduArray[1]<poduArray[3])&&(poduArray[0]>poduArray[2])){
					imgsArray.push(imgSlopeTongshi(poduArray[1],poduArray[2],poduArray[3],poduArray[0],3));
				}else{
					return;
				}
	 //imgsArray.push(imgSlopeTongshi(poduArray[1],poduArray[0],poduArray[3],poduArray[2],3));
	 changeImag("./images/slope.png");
	
	 viewer.entities.removeById('rectangle'+qq);
        poduFlag = false;
        poduArray = [];
        poduLine = undefined;
		lat=null;
		lng=null;
		handler5.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
		handler5.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
		handler5.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
}

var qq=0;
var CreateRectangle = (function() {
        function _(positons) {
            if (!Cesium.defined(positons)) {
                throw new Cesium.DeveloperError('positions is required!');
            }
            if (positons.length < 4) {
                throw new Cesium.DeveloperError('positions 的长度必须大于等于4');
            }
            this.options = {
				id:'rectangle'+qq,
                rectangle : {
                    show : true,
					height: 10,
					material : Cesium.Color.CHARTREUSE.withAlpha(0.5),
					outline : true ,
                    fill:true					
                }
            };
            this.path = positons;


            this._init();
        }

        _.prototype._init = function() {
            var that = this;
            var positionCBP1 = function() {
				var num;
				if((that.path[1]<that.path[3])&&(that.path[0]<that.path[2])){                                   //左下右上
					 num=Cesium.Rectangle.fromDegrees(that.path[0],that.path[1],that.path[2],that.path[3]);
				}else if((that.path[1]>that.path[3])&&(that.path[0]>that.path[2])){                             //右上左下  
					num=Cesium.Rectangle.fromDegrees(that.path[2],that.path[3],that.path[0],that.path[1]);
				}else if((that.path[1]>that.path[3])&&(that.path[0]<that.path[2])){
					num=Cesium.Rectangle.fromDegrees(that.path[0],that.path[3],that.path[2],that.path[1]);                                                                                            //左上右下               
				}else if((that.path[1]<that.path[3])&&(that.path[0]>that.path[2])){
					num=Cesium.Rectangle.fromDegrees(that.path[2],that.path[1],that.path[0],that.path[3]);                                                                                            //右下左上
				}else{
					return;
				}
				return num;
            };

			this.options.rectangle.coordinates=new Cesium.CallbackProperty(positionCBP1, false);
            viewer.entities.add(this.options);
        };

        return _;
    })();
//通视
/* function tongshiAnalyst()
{
	dispear_img();
	handler6=new Cesium.ScreenSpaceEventHandler(canvas);
	handler6.setInputAction( function(movement){
				//捕获椭球体，将笛卡尔二维平面坐标转为椭球体的笛卡尔三维坐标，返回球体表面的点
				var cartesian=viewer.camera.pickEllipsoid(movement.position, ellipsoid);			
				  if(cartesian){
					   //将笛卡尔三维坐标转为地图坐标（弧度）
					   var cartographic=viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian);
					   //将地图坐标（弧度）转为十进制的度数
						latitudeValue=Cesium.Math.toDegrees(cartographic.latitude);
						longitudeValue=Cesium.Math.toDegrees(cartographic.longitude);
						imgsArray.push(imgTSZB(latitudeValue,longitudeValue,2,color1_Y,color1_N,tsFinalRangeValue,tsFinalAttiValue));
				   }; 
	             handler6.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
			},Cesium.ScreenSpaceEventType.LEFT_CLICK );
	
} */

var tongshiArray=[];
var tongshiLine=undefined;
 function tongshiAnalyst()
{

	dispear_img();
	tongshiArray=[];
	tongshiFlag=true;
	color1_Y=document.getElementById("TScolor1").value.substring(1);
    color1_N=document.getElementById("TScolor2").value.substring(1);
	handler6=new Cesium.ScreenSpaceEventHandler(canvas);
	handler6.setInputAction( function(movement){
		var ray = viewer.scene.camera.getPickRay(movement.position);
        var cartesian = viewer.scene.globe.pick(ray, viewer.scene); 
		    if (cartesian) {
            if (tongshiFlag) {
			    tongshiArray.push(cartesian);
			    if(tongshiArray.length>2){
					var cartographic=viewer.scene.globe.ellipsoid.cartesianToCartographic(tongshiArray[0]);
					var latitudeValue=Cesium.Math.toDegrees(cartographic.latitude);
					var	longitudeValue=Cesium.Math.toDegrees(cartographic.longitude);
imgsArray.push(imgTSZB(latitudeValue,longitudeValue,2,color1_Y,color1_N,calculateDis_toshi(tongshiArray[0],tongshiArray[1])/111000,50,calLatValue(tongshiArray[0],tongshiArray[1])));
			        viewer.entities.removeById('ts'+ff);
				    tongshiFlag = false;
					tongshiArray = [];
					tongshiLine = undefined;
					handler6.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
					handler6.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
					handler6.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
				}
                
            }
        }
		},Cesium.ScreenSpaceEventType.LEFT_CLICK );
		
	handler6.setInputAction(function(movement) {
        var ray = viewer.scene.camera.getPickRay(movement.endPosition);

        var cartesian = viewer.scene.globe.pick(ray, viewer.scene);

        if (cartesian) {
            if (tongshiFlag) {
                if (tongshiArray.length < 1) {
                    return;
                }
                if (!Cesium.defined(tongshiLine)) {
                    tongshiArray.push(cartesian);

                    tongshiLine = new TS_ZBJ(tongshiArray);

                } else {
                    tongshiLine.path.pop();
                    tongshiLine.path.push(cartesian);
                }
            }
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
	
	handler6.setInputAction(function() {
	 var cartographic=viewer.scene.globe.ellipsoid.cartesianToCartographic(tongshiArray[0]);
					var latitudeTS=Cesium.Math.toDegrees(cartographic.latitude);
					var	longitudeTS=Cesium.Math.toDegrees(cartographic.longitude);
		imgsArray.push(imgTSZB(latitudeTS,longitudeTS,2,color1_Y,color1_N,calculateDis_toshi(tongshiArray[0],tongshiArray[1])/111000,50,calLatValue(tongshiArray[0],tongshiArray[1])));
					viewer.entities.removeById('ts'+ff);
        tongshiFlag = false;
        tongshiArray = [];
        tongshiLine = undefined;
		handler6.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
		handler6.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
		handler6.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
}
	var ff=0;	
var TS_ZBJ = (function() {
        function _(positons) {
            if (!Cesium.defined(positons)) {
                throw new Cesium.DeveloperError('positions is required!');
            }
            if (positons.length < 2) {
                throw new Cesium.DeveloperError('positions 的长度必须大于等于2');
            }
            this.options = {
				id:"ts"+ff,
                ellipse : {
                    show : true,
					height: 0,
					material : Cesium.Color.CHARTREUSE.withAlpha(0.5),
					outline : true   
                }
            };
            this.path = positons;
            this._init();
        }

        _.prototype._init = function() {
            var that = this;
            var positionCBP1 = function() {
                return that.path[0];
            };
			var positionCBP2= function() {
                return calculateDis_toshi(that.path[0],that.path[1]);
            };
		   
            this.options.position = new Cesium.CallbackProperty(positionCBP1, false);
			this.options.ellipse.semiMinorAxis=new Cesium.CallbackProperty(positionCBP2, false);
			this.options.ellipse.semiMajorAxis=new Cesium.CallbackProperty(positionCBP2, false);
            viewer.entities.add(this.options);
        };
        return _;
    })();
	//计算两点之间的距离(笛卡尔坐标)
	function calculateDis_toshi(arg1,arg2){
	   var cartographic1=ellipsoid.cartesianToCartographic(arg1);
	   var cartographic2=ellipsoid.cartesianToCartographic(arg2);
	   var lng1=cartographic1.longitude;
	   var lat1=cartographic1.latitude;
	   var lng2=cartographic2.longitude;
	   var lat2=cartographic2.latitude;
	   var  distance=6371004*Math.acos((Math.sin(lat1)*Math.sin(lat2)+Math.cos(lat1)*Math.cos(lat2)*Math.cos(lng2-lng1)));
	   var distanceValue=distance.toFixed(2);
	   return distanceValue*1;
	   }
	   //计算两点之间的距离(经纬度坐标)
	   function coorDis(arc1,arc2,arc3,arc4){
		   var lat1=Cesium.Math.toRadians(arc2);
		   var lat2=Cesium.Math.toRadians(arc4);
		   var lng1=Cesium.Math.toRadians(arc1);
		   var lng2=Cesium.Math.toRadians(arc3);
		   var distance=6371004*Math.acos((Math.sin(lat1)*Math.sin(lat2)+Math.cos(lat1)*Math.cos(lat2)*Math.cos(lng2-lng1)));
		   var distanceValue=distance.toFixed(2);
	       return distanceValue*1;
	   }
	   //计算两点之间的纬度差
	   function calLatValue(arg1,arg2){
		   var returnValue;
		   var cartographic1=ellipsoid.cartesianToCartographic(arg1);
	       var cartographic2=ellipsoid.cartesianToCartographic(arg2);
		   var lng1=cartographic1.longitude;
		   var lng2=cartographic2.longitude;
		   var lngValue=Math.abs(lng1-lng2);
		   if(lngValue<=0.1){
			   returnValue=10;
		   }else{
			   returnValue=lngValue.toFixed(1)*10;
		   }
		   return returnValue; 
	   }

//遮蔽角
/* var zhebijiaoArray=[];
function zhebijiaoAnalyst()
{
	 dispear_img();
	  zhebijiaoArray=[];
	handler8=new Cesium.ScreenSpaceEventHandler(canvas);
	handler8.setInputAction( function(movement){
				//捕获椭球体，将笛卡尔二维平面坐标转为椭球体的笛卡尔三维坐标，返回球体表面的点
				var cartesian=viewer.camera.pickEllipsoid(movement.position, ellipsoid);			
				  if(cartesian){
					   //将笛卡尔三维坐标转为地图坐标（弧度）
					   var cartographic=viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian);
					   //将地图坐标（弧度）转为十进制的度数
						latitudeValue=Cesium.Math.toDegrees(cartographic.latitude);
						longitudeValue=Cesium.Math.toDegrees(cartographic.longitude);
						zhebijiaoArray.push(longitudeValue);
						zhebijiaoArray.push(latitudeValue);
						imgsArray.push(imgTSZB(latitudeValue,longitudeValue,2,color2_Y,color2_N,zbFinalRangeValue,zbFinalAttiValue));
						  entityPoint=viewer.entities.add({
					      name:longitudeValue+'@'+latitudeValue,
                          position : Cesium.Cartesian3.fromDegrees(longitudeValue, latitudeValue,1000),
                          point : {
                              show : true, // default
                              color : Cesium.Color.SKYBLUE, // default: WHITE
                              pixelSize : 5 // default: 1

                          }});
						document.getElementById('radarPanels').style.display='';
				   }; 
	             handler8.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
			},Cesium.ScreenSpaceEventType.LEFT_CLICK );
	
} */
var zhebijiaoArray=[];
var zhebijiaoLine=undefined;
var latitudeZBJ,longitudeZBJ;
function zhebijiaoAnalyst()
{

	dispear_img();
	zhebijiaoFlag=true;
	zhebijiaoArray=[];
	color2_Y=document.getElementById("ZBcolor1").value.substring(1);
    color2_N=document.getElementById("ZBcolor2").value.substring(1);
	handler8=new Cesium.ScreenSpaceEventHandler(canvas);
	handler8.setInputAction( function(movement){
		var ray = viewer.scene.camera.getPickRay(movement.position);
        var cartesian = viewer.scene.globe.pick(ray, viewer.scene); 
		    if (cartesian) {
            if (zhebijiaoFlag) {
			    zhebijiaoArray.push(cartesian);
			    if(zhebijiaoArray.length>2){
					var cartographic=viewer.scene.globe.ellipsoid.cartesianToCartographic(zhebijiaoArray[0]);
				latitudeZBJ=Cesium.Math.toDegrees(cartographic.latitude);
				longitudeZBJ=Cesium.Math.toDegrees(cartographic.longitude);
				var imgreturn=imgTSZB(latitudeZBJ,longitudeZBJ,9,color2_Y,color2_N,calculateDis_toshi(zhebijiaoArray[0],zhebijiaoArray[1])/111000,15,calLatValue(zhebijiaoArray[0],zhebijiaoArray[1]))
			    imgsArray.push(imgreturn);
			      entityPoint=viewer.entities.add({
					      name:longitudeZBJ+'@'+latitudeZBJ,
                          position : Cesium.Cartesian3.fromDegrees(longitudeZBJ, latitudeZBJ,1000),
                          point : {
                              show : true, // default
                              color : Cesium.Color.SKYBLUE, // default: WHITE
                              pixelSize : 5 // default: 1

                          }});
			        viewer.entities.removeById('ts'+ff);
					//document.getElementById('radarPanels').style.display='';
					 if(Cesium.defined(imgreturn)){
						radar_plline_draw();
					} 
					
					//radar_polar_draw();
				    zhebijiaoFlag = false;
					//zhebijiaoArray = [];
					zhebijiaoLine = undefined;
					handler8.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
					handler8.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
				}
                
            }
        }
		},Cesium.ScreenSpaceEventType.LEFT_CLICK );
		handler8.setInputAction(function(movement) {
        var ray = viewer.scene.camera.getPickRay(movement.endPosition);

        var cartesian = viewer.scene.globe.pick(ray, viewer.scene);

        if (cartesian) {
            if (zhebijiaoFlag) {
                if (zhebijiaoArray.length < 1) {
                    return;
                }
                if (!Cesium.defined(zhebijiaoLine)) {
                    zhebijiaoArray.push(cartesian);

                    zhebijiaoLine = new TS_ZBJ(zhebijiaoArray);

                } else {
                    zhebijiaoLine.path.pop();
                    zhebijiaoLine.path.push(cartesian);
                }
            }
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
	
	handler8.setInputAction(function() {
	 var cartographic=viewer.scene.globe.ellipsoid.cartesianToCartographic(zhebijiaoArray[0]);
					 latitudeZBJ=Cesium.Math.toDegrees(cartographic.latitude);
					 longitudeZBJ=Cesium.Math.toDegrees(cartographic.longitude);
					imgsArray.push(imgTSZB(latitudeZBJ,longitudeZBJ,9,color2_Y,color2_N,calculateDis_toshi(zhebijiaoArray[0],zhebijiaoArray[1])/111000,15,calLatValue(zhebijiaoArray[0],zhebijiaoArray[1])));
					entityPoint=viewer.entities.add({
					      name:longitudeZBJ+'@'+latitudeZBJ,
                          position : Cesium.Cartesian3.fromDegrees(longitudeZBJ, latitudeZBJ,1000),
                          point : {
                              show : true, // default
                              color : Cesium.Color.SKYBLUE, // default: WHITE
                              pixelSize : 5 // default: 1

                          }});
					viewer.entities.removeById('ts'+ff);
					//document.getElementById('radarPanels').style.display='';
					radar_plline_draw();
					//radar_polar_draw();
        zhebijiaoFlag = false;
        //zhebijiaoArray = [];
        zhebijiaoLine = undefined;
		handler8.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
		handler8.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
		
}
//两点间剖面高程
var poumianArray=[];
var poumianLine=undefined;
function poumianAnalyst(){
	
	var poumianFlag=true;
	dispear_img();
	handler7=new Cesium.ScreenSpaceEventHandler(canvas);
	handler7.setInputAction(function(movement){
				var cartesian=viewer.camera.pickEllipsoid(movement.position, ellipsoid);
				   if(cartesian){
					  poumianArray.push(cartesian);	
					  if(poumianArray.length>2){
						  tsArray=carteTodegree(poumianArray);
						  imgsArray.push(imgTwoAtti(tsArray));	
						  twopoint_attitude2(tsArray[0],tsArray[1],tsArray[2],tsArray[3]);
						  poumianFlag=false;
		                  poumianArray=[];
                          poumianLine = undefined;
						  handler7.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
						  
					  }
				   }else{
					   return;
				   }; 
	             viewer.selectedEntity=null;
			},Cesium.ScreenSpaceEventType.LEFT_CLICK);
	handler7.setInputAction(function(movement){
	  var cartesian = viewer.camera.pickEllipsoid(movement.endPosition, ellipsoid);
	      if(cartesian){
		     if (poumianArray.length < 1) {
                    return;
                }
			 if (!Cesium.defined(poumianLine)) {
                    poumianArray.push(cartesian);
                    poumianLine = new CreatLine(poumianArray);               
		        }else {
                    poumianLine.path.pop();
                    poumianLine.path.push(cartesian);
                }		  
	   }else{
		   return;
	   }	
	},Cesium.ScreenSpaceEventType.MOUSE_MOVE);
	
	handler7.setInputAction(function() {
		tsArray=carteTodegree(poumianArray);
		imgsArray.push(imgTwoAtti(tsArray));	
		twopoint_attitude2(tsArray[0],tsArray[1],tsArray[2],tsArray[3]);
		poumianFlag=false;
		poumianArray=[];
        poumianLine = undefined;
		handler7.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);   
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
			
}
function carteTodegree(arc){
	var tsArrayTemp=[];
	var cartographic1=viewer.scene.globe.ellipsoid.cartesianToCartographic(arc[0]);
	var cartographic2=viewer.scene.globe.ellipsoid.cartesianToCartographic(arc[1]);
	var latitudeValue1=Cesium.Math.toDegrees(cartographic1.latitude);
	var longitudeValue1=Cesium.Math.toDegrees(cartographic1.longitude);
	var latitudeValue2=Cesium.Math.toDegrees(cartographic2.latitude);
	var longitudeValue2=Cesium.Math.toDegrees(cartographic2.longitude);
	tsArrayTemp.push(longitudeValue1);
	tsArrayTemp.push(latitudeValue1);
	tsArrayTemp.push(longitudeValue2);
	tsArrayTemp.push(latitudeValue2);
	return tsArrayTemp;
}
//坡度通视取消 

function tongshiAnalyst_Cancel(){
	dispear_img();
	
	for(var i=0;i<imgsArray.length;i++){
		viewer.scene.imageryLayers.remove(imgsArray[i]);
	}
	//handler5.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
	//handler6.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
	//handler7.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
	//handler8.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
	dispear_img();
	
}
//坡度函数
function imgSlopeTongshi(arc1,arc11,arc2,arc22,arc3)
{	
var image_type = layers.addImageryProvider(new Cesium.SingleTileImageryProvider({
		url :'http://localhost:9090/WebForm'+arc3+'.aspx?lat1='+arc1+'&lon1='+arc11+'&lat2='+arc2+'&lon2='+arc22, 
		rectangle : Cesium.Rectangle.fromDegrees(arc11, arc1, arc22, arc2)
		}));
		if(typeof(image_type)=='object'){
			document.getElementById('all-in-center').style.display='none';
		}else{
			alert('加载失败');
		}
	image_type.alpha=0.3;
	
	return image_type;
}
//通视+遮蔽角函数
function imgTSZB(arc1,arc2,arc3,arc4,arc5,arc6,arc7,arc8)
{	

var image_type = layers.addImageryProvider(new Cesium.SingleTileImageryProvider({
		url :'http://localhost:9090/WebForm'+arc3+'.aspx?lat='+arc1+'&lon='+arc2+'&len='+arc6+'&c1='+arc4+'&c2='+arc5+'&h='+arc7+'&num='+arc8, 
		rectangle : Cesium.Rectangle.fromDegrees(arc2-arc6, arc1-arc6, arc2+arc6, arc1+arc6)
		}));
	image_type.alpha=0.3;
	return image_type;
}

//两点间高程函数
function imgTwoAtti(arc1)
{	
var entity = viewer.entities.add({
	
    polyline : {
        positions : Cesium.Cartesian3.fromDegreesArray(arc1),
        width : 10,
        material : new Cesium.PolylineGlowMaterialProperty({
            glowPower : 0.2,
            color : Cesium.Color.BLUE
        }),
		 followSurface : true
    }
});
	return entity;
}
/* function argumentWin(arc){
	$('#argumentWindow').window('open');
	if(arc==0){
	$('#argumentSet').tabs('select',0);
	}else if(arc==1){
	$('#argumentSet').tabs('select',1);	
	}else if(arc==2){
	$('#argumentSet').tabs('select',2);	
	}
} */
//遮蔽角取消
$('#radarZBJID').window({
			 onClose:function(){
		   radar_div.style.display='none';
		   viewer.scene.imageryLayers.remove(radar_image);
		   viewer.entities.remove(glowingPoint);
           viewer.entities.remove(glowingLine);
		   viewer.entities.removeAll();
		   radarPanels.style.display='none';
		   for(var i=0;i<imgsArray.length;i++){
		viewer.scene.imageryLayers.remove(imgsArray[i]);
	       }
       	
		   
	  }
		 });
//高程取消
	 $('#attiPMID').window({
			 onClose:function(){
		   //drawpicture2.style.display="none";
		  
		   //$("#radar_all").hide();
		   radar_div.style.display='none';
		   viewer.scene.imageryLayers.remove(radar_image);
		   viewer.entities.remove(glowingPoint);
           viewer.entities.remove(glowingLine);
		   viewer.entities.removeAll();
		   radarPanels.style.display='none';
		   //tongshiAnalyst_Cancel();
		   for(var i=0;i<imgsArray.length;i++){
		viewer.scene.imageryLayers.remove(imgsArray[i]);
	       }
		//handler7.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);   
		   
	 }
		 });