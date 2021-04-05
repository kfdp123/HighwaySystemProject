//坡度
var latitudeValue,longitudeValue,handler5,handler6,handler7,handler8;
    var layers = viewer.scene.imageryLayers,imgsArray=[]; 
	
	var tsArray=[];

var poduArray=[];
var poduLine=undefined;
function slopeAnalyst1()
{   
	poduArray=[];
	poduFlag=true;
	poduLine = undefined;

	handler5=new Cesium.ScreenSpaceEventHandler(canvas);
	handler5.setInputAction( function(movement){

		var cartesian=viewer.camera.pickEllipsoid(movement.position, ellipsoid);
		var cartographic=ellipsoid.cartesianToCartographic(cartesian);
			var lng=Cesium.Math.toDegrees(cartographic.longitude);
			var lat=Cesium.Math.toDegrees(cartographic.latitude);
			if (cartesian) {
				if (poduFlag) {
					if(poduArray.length>=4){

			  if((poduArray[1]<poduArray[3])&&(poduArray[0]<poduArray[2])){
					 //imgsArray.push(imgSlopeTongshi(poduArray[1],poduArray[0],poduArray[3],poduArray[2],3));
					 setValue(poduArray[1],poduArray[0],poduArray[3],poduArray[2]);
				}else if((poduArray[1]>poduArray[3])&&(poduArray[0]>poduArray[2])){
					//imgsArray.push(imgSlopeTongshi(poduArray[3],poduArray[2],poduArray[1],poduArray[0],3));
					setValue(poduArray[3],poduArray[2],poduArray[1],poduArray[0]);
				}else if((poduArray[1]>poduArray[3])&&(poduArray[0]<poduArray[2])){
					//imgsArray.push(imgSlopeTongshi(poduArray[3],poduArray[0],poduArray[1],poduArray[2],3));
					setValue(poduArray[3],poduArray[0],poduArray[1],poduArray[2]);
				}else if((poduArray[1]<poduArray[3])&&(poduArray[0]>poduArray[2])){
					//imgsArray.push(imgSlopeTongshi(poduArray[1],poduArray[2],poduArray[3],poduArray[0],3));
					setValue(poduArray[1],poduArray[2],poduArray[3],poduArray[0]);
				}else{
					return;
				}

			viewer.entities.removeById('rectangle'+qq);
			jump_DIV.style.display='block';
			
						poduFlag = false;
						poduArray = [];
						poduLine = undefined;
						handler5.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
		                handler5.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
						handler5.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);

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

	if((poduArray[1]<poduArray[3])&&(poduArray[0]<poduArray[2])){
					 //imgsArray.push(imgSlopeTongshi(,3));
					 setValue(poduArray[1],poduArray[0],poduArray[3],poduArray[2]);
				}else if((poduArray[1]>poduArray[3])&&(poduArray[0]>poduArray[2])){
					//imgsArray.push(imgSlopeTongshi(,3));
					setValue(poduArray[3],poduArray[2],poduArray[1],poduArray[0]);
				}else if((poduArray[1]>poduArray[3])&&(poduArray[0]<poduArray[2])){
					//imgsArray.push(imgSlopeTongshi(,3));
					setValue(poduArray[3],poduArray[0],poduArray[1],poduArray[2]);
				}else if((poduArray[1]<poduArray[3])&&(poduArray[0]>poduArray[2])){
					//imgsArray.push(imgSlopeTongshi(,3));
					setValue(poduArray[1],poduArray[2],poduArray[3],poduArray[0]);
				}else{
					return;
				}

	
	 viewer.entities.removeById('rectangle'+qq);
	  jump_DIV.style.display='block';
	 
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



	var ff=0;	









//坡度通视取消 

function tongshiAnalyst_Cancel(){
	dispear_img();
	
	for(var i=0;i<imgsArray.length;i++){
		viewer.scene.imageryLayers.remove(imgsArray[i]);
	}

	
}
//坡度函数
function imgSlopeTongshi(arc1,arc11,arc2,arc22,arc3)
{	
var image_type = layers.addImageryProvider(new Cesium.SingleTileImageryProvider({
		//url :'http://localhost:9090/WebForm'+arc3+'.aspx?lat1='+arc1+'&lon1='+arc11+'&lat2='+arc2+'&lon2='+arc22, 
		rectangle : Cesium.Rectangle.fromDegrees(arc11, arc1, arc22, arc2)
		}));
	
	image_type.alpha=0.3;
	
	return image_type;
}

//赋值函数
function setValue(arc1,arc11,arc2,arc22){
	$("#left_lng").textbox('setValue',arc1); 
	$("#left_lat").textbox('setValue',arc11);
    $("#right_lng").textbox('setValue',arc2); 
	$("#right_lat").textbox('setValue',arc22);	
	
}

//后台传值
var submit_values=document.getElementById('submit_values');
submit_values.onclick=function(){
	var left_lat=$("#left_lng").textbox('getValue');
	var left_lng=$("#left_lat").textbox('getValue');
	var right_lat=$("#right_lng").textbox('getValue');
	var right_lng=$("#right_lat").textbox('getValue');
	var export_path=$("#data_export").textbox('getValue');
	var import_path=$("#data_import").textbox('getValue');
	var data_type=$('#getdType').combobox('getValue');
	var tile_level=$('#getdLevel').combobox('getValue');
	$.ajax({
		  type: "post", //请求方式
		  url: "http://localhost:97/select_tiles_btob.ashx?LEFT_LAT=" + left_lat + "&LEFT_LNG=" + left_lng + "&RIGHT_LAT=" + right_lat + "&RIGHT_LNG=" + right_lng+"&EXP_PATH=" + export_path + "&IMP_PATH=" + import_path + "&DATA_TYPE=" + data_type+ "&TILE_LEVEL=" + tile_level, //地址，就是json文件的请求路径
		  dataType: "json", //数据类型可以为 text xml json  script  jsonp
		  success: function (result) { //返回的参数就是 action里面所有的有get和set方法的参数
				  {
alert("正在裁剪");
				  }
			  },
			  error: function () {
				  console.log('ajax请求失败！');
			  }

		  });
				jump_DIV.style.display='none';
	  
	
}





