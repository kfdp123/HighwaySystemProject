function add_TJ(){
	viewer.scene.globe.depthTestAgainstTerrain = true;
	
	var viewModel = {
		height: 0
	};
	
	Cesium.knockout.track(viewModel);
	
	var tileset = new Cesium.Cesium3DTileset({
		url:'./SampleData/Cesium3DTiles/Tilesets/Tileset/tileset.json'
	});
	
	tileset.readyPromise.then(function(tileset){
		viewer.scene.primitives.add(tileset);
		viewer.zoomTo(tileset, new Cesium.HeadingPitchRange(0.0, -0.5, tileset.boundingSphere.radius * 2.0));
	}).otherwise(function(error){
		console.log(error);
	});
	
	Cesium.knockout.getObservable(viewModel, 'height').subscribe(function(height) {
    height = Number(height);
    if (isNaN(height)) {
        return;
    }

    var cartographic = Cesium.Cartographic.fromCartesian(tileset.boundingSphere.center);
    var surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
    var offset = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, height);
    var translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
    tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
    });
}
