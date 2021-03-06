
function isvalid(vele) {
    return vele != null && vele != 'undefined';
}

function isinited(vv) {
    return !(vv === null || vv === undefined || vv === "undefined" || vv === '');
}

//vpts:[x,y,x,y,x,y...]
function create_polyline(vpts, vname, vdetail) {
    if (!isvalid(vpts)) return null;

    var vpl = new Cesium.PolylineGraphics({
        positions: Cesium.Cartesian3.fromDegreesArray(vpts),
        width: 0,
        //material: Cesium.Color.RED
        material: new Cesium.PolylineOutlineMaterialProperty({
            color: Cesium.Color.ORANGE,
            outlineWidth: 3,
            outlineColor: Cesium.Color.BLACK
        })
    });

    var entity = new Cesium.Entity({
        name: vname,
        polyline: vpl,
        description: vdetail
    });
    //viewer.zoomTo(viewer.entities);
    return entity;
}

//vpt:[x,y]
function create_marker(vx, vy, vid, vname, vdetail, vimgurl, vimgw, vimgh) {

    var citizensBankPark = new Cesium.Entity({
        id: vid,
        //name: vname,
        description: vdetail,
        position: Cesium.Cartesian3.fromDegrees(vx, vy),
        billboard: {
            image: vimgurl,
            width: vimgw,
            height: vimgh
        },
        label: {
            text: '',
            font: '14pt monospace',
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            outlineWidth: 2,
            verticalOrigin: Cesium.VerticalOrigin.TOP,
            pixelOffset: new Cesium.Cartesian2(0, 32)
        }
    });

    return citizensBankPark;
}

/*Pick----屏幕坐标   Cartesian----世界坐标  cartographic-----地理坐标（弧度）
Point----经纬度坐标
//1.屏幕坐标转世界坐标
var pick= new Cesium.Cartesian2(window.innerWidth,window.innerHeight);
var cartesian = scene.globe.pick(viewer.camera.getPickRay(pick), scene);

注：一共是两步(在2D下上述方法不适用)，改成：

var pick= new Cesium.Cartesian2(0,0);
var cartesian = viewer.camera.pickEllipsoid(pick, viewer.scene.globe.ellipsoid);
2.世界坐标转地理坐标（弧度）
var cartographic = scene.globe.ellipsoid.cartesianToCartographic(cartesian);
或
var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
3.世界坐标转屏幕坐标
var pick = Cesium.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, cartesian);
4.地理坐标（弧度）转经纬度坐标
var point=[ cartographic.longitude / Math.PI * 180, cartographic.latitude / Math.PI * 180];
5.地理坐标（弧度）转世界坐标
var  cartesian = scene.globe.ellipsoid. cartographicTo Cartesian (cartographic);
6.经纬度坐标转地理坐标（弧度）
var cartographic = Cesium.Cartographic.fromDegree(point);
7.经纬度坐标转世界坐标
var  cartesian  =  Cesium. Cartesian 3.fromDegree(point);

*/

function screen2wgs(vx, vy) {
    var pick = new Cesium.Cartesian2(vx, vy);
    //世界坐标
    var cartesian = viewer.scene.globe.pick(viewer.camera.getPickRay(pick), viewer.scene);
    //转弧度坐标
    var cartographic1 = Cesium.Cartographic.fromCartesian(cartesian);
    //转经纬度坐标
    longitudeString1 = Cesium.Math.toDegrees(cartographic1.longitude).toFixed(6);
    latitudeString1 = Cesium.Math.toDegrees(cartographic1.latitude).toFixed(6);
    return [longitudeString1, latitudeString1];
}

function getdist(vx0, vx1,vy0,vy1) {
    //var vdddd = esri.geometry.getLength(vpt1,vpt2);
    var vdx = vx1 - vx0;
    var vdy = vy0 - vy1;
    return Math.sqrt(vdx * vdx + vdy * vdy);
}
