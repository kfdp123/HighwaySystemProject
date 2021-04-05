/* 
*天津师范大学&丹江口&陶岔
*倾斜摄影
*
 */
 
 function titleset_show(URL)
{
var titleset_type = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
                           url : URL	
                            }));
	return titleset_type;
}

function titleset_show1(URL)
{
var titleset_type = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
                           url : URL	
                            }));
	titleset_type.readyPromise.then(function() {
    var boundingSphere = titleset_type.boundingSphere;
	var heightOffset = -7350;
	var cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
	var surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude,0);
	var offset = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, heightOffset);
	var translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
	titleset_type.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
   
												});						
	return titleset_type;
}
function titleset_showzz(URL)
{
var titleset_type = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
                           url : URL	
                            }));
//进入相机视角设置
	titleset_type.readyPromise.then(function() {      
    var boundingSphere = titleset_type.boundingSphere;
	var heightOffset = 400;
	var cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
	var surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude,0);
	var offset = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, heightOffset);
	var translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
	titleset_type.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
   //监控参数
	var m=titleset_type.modelMatrix;
	var k=m;
	var m1=Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(0));
	Cesium.Matrix4.multiplyByMatrix3(k,m1,k);
	
	var l=k;
	var m2=Cesium.Matrix3.fromRotationY(Cesium.Math.toRadians(0));
	Cesium.Matrix4.multiplyByMatrix3(l,m2,l);
	
	var w =1;
	var m3=Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(0));
	Cesium.Matrix4.multiplyByMatrix3(w,m3,w);
	titleset_type.modelMatrix=w;
												});						
	return titleset_type;
}
function titleset_show2(URL)
{
var titleset_type = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
                           url : URL	
                            }));
		/*titleset_type.readyPromise.then(function() {   
    var boundingSphere = titleset_type.boundingSphere;   
    viewer.camera.viewBoundingSphere(boundingSphere, new Cesium.HeadingPitchRange(0.0, -0.5, boundingSphere.radius));
    viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
}).otherwise(function(error) {
    throw(error);
});*/
	titleset_type.readyPromise.then(function() {
    var boundingSphere = titleset_type.boundingSphere;
	var heightOffset = -7405;
	var cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
	var lat_String=Cesium.Math.toDegrees(cartographic.latitude).toFixed(4)*1;  
    var log_String=Cesium.Math.toDegrees(cartographic.longitude).toFixed(4)*1; 
	var surface = Cesium.Cartesian3.fromDegrees(log_String, lat_String,0);
	var offset = Cesium.Cartesian3.fromDegrees(117.1267, 39.0581, heightOffset);
	//var offset = Cesium.Cartesian3.fromDegrees(117.1312, 39.0623, heightOffset);
	//var offset = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, heightOffset);
	//var offset = Cesium.Cartesian3.fromDegrees(117.1203, 39.0570, heightOffset);
	var translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
	titleset_type.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
   
												});				
	return titleset_type;
}
 
function titleset_show3(URL)
{
var titleset_type = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
                           url : URL	
                            }));
	titleset_type.readyPromise.then(function() {
    var boundingSphere = titleset_type.boundingSphere;
	var offset = Cesium.Cartesian3.fromDegrees(113.616542, 34.747869, 10);
	var m=titleset_type.modelMatrix;
	var translation = Cesium.Cartesian3.subtract(offset, boundingSphere.center, new Cesium.Cartesian3());
	Cesium.Matrix4.multiplyByTranslation(m,translation,m);
	//titleset_type.modelMatrix=m;  

    var k=m;
var m1=Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(-53));
Cesium.Matrix4.multiplyByMatrix3(k,m1,k);
//titleset_type.modelMatrix=k;	

var l=k;
var m2=Cesium.Matrix3.fromRotationY(Cesium.Math.toRadians(-20));
Cesium.Matrix4.multiplyByMatrix3(l,m2,l);
//titleset_type.modelMatrix=l;

var w=l;
var m3=Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(13));
Cesium.Matrix4.multiplyByMatrix3(w,m3,w);
titleset_type.modelMatrix=w;
												});				
	return titleset_type;
}
 
function titleset_show4(URL)
{
var titleset_gbj = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
                           url : URL	
                            }));
	titleset_gbj.readyPromise.then(function() {
    var boundingSphere = titleset_gbj.boundingSphere;
	var offset = Cesium.Cartesian3.fromDegrees(117.123433, 39.0617, 4);
	var m=titleset_gbj.modelMatrix;
	var translation = Cesium.Cartesian3.subtract(offset, boundingSphere.center, new Cesium.Cartesian3());
	Cesium.Matrix4.multiplyByTranslation(m,translation,m);


    var k=m;
var m1=Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(-48));
Cesium.Matrix4.multiplyByMatrix3(k,m1,k);
	

var l=k;
var m2=Cesium.Matrix3.fromRotationY(Cesium.Math.toRadians(-20));
Cesium.Matrix4.multiplyByMatrix3(l,m2,l);


var w=l;
var m3=Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(198));
Cesium.Matrix4.multiplyByMatrix3(w,m3,w);
titleset_gbj.modelMatrix=w;
												});				
	return titleset_gbj;
}
function titleset_show5(URL)
{
var titleset_gbj = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
                           url : URL	
                            }));
	titleset_gbj.readyPromise.then(function() {
    var boundingSphere = titleset_gbj.boundingSphere;
	var offset = Cesium.Cartesian3.fromDegrees(105.6420+0.0624, 32.3439+0.0758, 100);
	var m=titleset_gbj.modelMatrix;
	var translation = Cesium.Cartesian3.subtract(offset, boundingSphere.center, new Cesium.Cartesian3());
	Cesium.Matrix4.multiplyByTranslation(m,translation,m);
    var k=m;
	var m2=Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(-55));
	Cesium.Matrix4.multiplyByMatrix3(k,m1,k);
		
	
	var l=k;
	
	var m2=Cesium.Matrix3.fromRotationY(Cesium.Math.toRadians(-12));
	Cesium.Matrix4.multiplyByMatrix3(l,m2,l);
	
	
	titleset_gbj.modelMatrix=l;
	
	

	var m2=Cesium.Matrix3.fromRotationY(Cesium.Math.toRadians(180));
	Cesium.Matrix4.multiplyByMatrix3(l,m2,l);
	



	var m2=Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(180));
	Cesium.Matrix4.multiplyByMatrix3(l,m2,l);

	var m2=Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(9));  
	Cesium.Matrix4.multiplyByMatrix3(l,m2,l);
	titleset_gbj.modelMatrix=l;
	

   
												});				
	return titleset_gbj;
}