
var layers = viewer.scene.imageryLayers; 
///公共函数
//定位函数
function locateTO(x,y,h)
{
	viewer.camera.flyTo({
    destination : Cesium.Cartesian3.fromDegrees(x, y, h),
	duration:8
    });
}
//影像加载函数
function image_show(URL,alpha_num)
{//viewer.scene.imageryLayers.remove(image_other);	
var image_type = layers.addImageryProvider(Cesium.createTileMapServiceImageryProvider({
		url :URL,
		fileExtension: 'png',
			flipXY : false
		}));
	image_type.alpha=alpha_num;
	return image_type;
}
function image_show1(URL,alpha_num)
{//viewer.scene.imageryLayers.remove(image_other);	
var image_type = layers.addImageryProvider(Cesium.createOpenStreetMapImageryProvider({
		url :URL,
		fileExtension: 'png',
			flipXY : true
		}));
	image_type.alpha=alpha_num;
	return image_type;
}
function image_show2(URL,alpha_num)
{//viewer.scene.imageryLayers.remove(image_other);	
var image_type = layers.addImageryProvider(Cesium.createOpenStreetMapImageryProvider({
		url :URL,
		fileExtension: 'jpg',
			flipXY : true
		}));
	image_type.alpha=alpha_num;
	return image_type;
}
//影像加载函数
function add_tiles_4326(URL,alpha_num)
{//viewer.scene.imageryLayers.remove(image_other);	
		var vtestbxs = layers.addImageryProvider(Cesium.createTileMapServiceImageryProvider({
				url :URL,
				tilingScheme:new Cesium.GeographicTilingScheme(),//重要！！！！
				fileExtension: 'png',
			flipXY : true
		}));
	vtestbxs.alpha=alpha_num;
	return vtestbxs;
}
function image_sing(URL,alpha_num)
{
	 var image_Press= imageryLayers.addImageryProvider(new Cesium.SingleTileImageryProvider({
                url:URL,
                rectangle:Cesium.Rectangle.fromDegrees(-360,-90,0,90)
            }));
}