//创建球容器
var html = '<div id="cesiumContainer">';
$('#paper-middle').append(html)

var view = new Cesium.Viewer("cesiumContainer",{
    /*imageryProvider:new Cesium.ArcGisMapServerImageryProvider({
       // url:"https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
       url:'/TServer/ghTilesServer.ashx/GOOGLE_SATE',//取消默认加载底图
    fileExtension: 'jpg'
    })*/
    fullscreenButton:false,
    imageryProvider:new Cesium.OpenStreetMapImageryProvider({
      url:'/TServer/ghTilesServer.ashx/GOOGLE_SATE',//取消默认加载底图
        fileExtension: 'jpg',
        flipXY : true
      }),
    
});

//var view = new Cesium.Viewer("cesiumContainer");
view.scene.globe.enableLighting = true;

//加载谷歌瓦片底图
/*var googleTiles = view.scene.imageryLayers.addImageryProvider(new Cesium.OpenStreetMapImageryProvider({
    url :"http://localhost:8666/tt/ghTilesServer.ashx/GOOGLE_SATE",
    fileExtension: 'jpg',
			flipXY : false
}));*/

/**
* 日期格式比较大小
* @param date1 日期 type: Date
* @param date2 日期 type: Date
* @returns maxDate type:Date
*/
function compareDate(date1,date2){
  var resultDate;
  var oDate1 = new Date(date1);
  var oDate2 = new Date(date2);
  if(oDate1.getTime() > oDate2.getTime()){
    resultDate=oDate1;
  } else {
    resultDate=odate2;
  }
  return resultDate;
}


//格式化时间字符串
function formatDate(date){
  var year = date.getFullYear();
  var month = (date.getMonth()+1).toString().padStart(2, '0');
  var day = date.getDate().toString().padStart(2, '0');
  var hours = date.getHours().toString().padStart(2, '0');
  var minutes = date.getMinutes().toString().padStart(2, '0');
  var seconds = date.getSeconds().toString().padStart(2, '0');
  var milSeconds = date.getMilliseconds().toString().padStart(2, '0');
  return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds+":"+milSeconds;
}

//鼠标移动显示坐标
/*
var handler = new Cesium.ScreenSpaceEventHandler(view.scene.canvas);
var my_ellipsoid = view.scene.globe.ellipsoid; 
handler.setInputAction(function(movement){
　　//获取鼠标位置，camera.pickEllipsoid()返回一个cartesian类型位置
var cartesian = view.camera.pickEllipsoid(
        movement.endPosition,
        view.scene.globe.ellipsoid
      );
　　//位置数据转换只地理数据类型
   if(cartesian)
   {
    //cesium函数转换至地理数据类型的经纬度    
　　var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
        var longitudeString = Cesium.Math.toDegrees(
          cartographic.longitude
        ).toFixed(8);
        var latitudeString = Cesium.Math.toDegrees(
          cartographic.latitude
        ).toFixed(8);
        topDiv.innerHTML="点击坐标的位置为"+longitudeString+"经度，"+latitudeString+"纬度";
   }　　
    //topDiv是html中的div　
},Cesium.ScreenSpaceEventType.MOUSE_MOVE)
*/