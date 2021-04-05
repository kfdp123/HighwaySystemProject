 viewer.camera.changed.addEventListener(function (percentage) {
        getCenterPosition();
        getCurrentExtent();
        // 打印中心点坐标、高度、当前范围坐标
        console.log(getCenterPosition());
        console.log("bounds",getCurrentExtent());
    });
	
function getHeight() {
      if (viewer) {
        var scene = viewer.scene;
        var ellipsoid = scene.globe.ellipsoid;
        var height = ellipsoid.cartesianToCartographic(viewer.camera.position).height;
        return height;
      }
}

function getCenterPosition() {
      var result = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(viewer.canvas.clientWidth / 2, viewer.canvas
        .clientHeight / 2));
      var curPosition = Cesium.Ellipsoid.WGS84.cartesianToCartographic(result);
      var lon = curPosition.longitude * 180 / Math.PI;
      var lat = curPosition.latitude * 180 / Math.PI;
      var height = getHeight();
      return {
        lon: lon,
        lat: lat,
        height: height
      };
    }
function getCurrentExtent() {
        var extent = {};
        var scene = viewer.scene;
        var ellipsoid = scene.globe.ellipsoid;
        var canvas = scene.canvas;
        var car3_lt = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(0, 0), ellipsoid);
        var car3_rb = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(canvas.width, canvas.height), ellipsoid);
        if (car3_lt && car3_rb) {
            var carto_lt = ellipsoid.cartesianToCartographic(car3_lt);
            var carto_rb = ellipsoid.cartesianToCartographic(car3_rb);
            extent.xmin = Cesium.Math.toDegrees(carto_lt.longitude);
            extent.ymax = Cesium.Math.toDegrees(carto_lt.latitude);
            extent.xmax = Cesium.Math.toDegrees(carto_rb.longitude);
            extent.ymin = Cesium.Math.toDegrees(carto_rb.latitude);
        }
        else if (!car3_lt && car3_rb) {
            var car3_lt2 = null;
            var yIndex = 0;
            do {
                yIndex <= canvas.height ? yIndex += 10 : canvas.height;
                car3_lt2 = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(0, yIndex), ellipsoid);
            } while (!car3_lt2);
            var carto_lt2 = ellipsoid.cartesianToCartographic(car3_lt2);
            var carto_rb2 = ellipsoid.cartesianToCartographic(car3_rb);
            extent.xmin = Cesium.Math.toDegrees(carto_lt2.longitude);
            extent.ymax = Cesium.Math.toDegrees(carto_lt2.latitude);
            extent.xmax = Cesium.Math.toDegrees(carto_rb2.longitude);
            extent.ymin = Cesium.Math.toDegrees(carto_rb2.latitude);
        }
 
        // 获取高度
        extent.height = Math.ceil(viewer.camera.positionCartographic.height);
        return extent;
}