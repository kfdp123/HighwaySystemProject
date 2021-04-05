//入口函数
dojo.require("esri.map");
dojo.require("esri.dijit.LocateButton");
dojo.require("esri.dijit.Scalebar");
dojo.require("esri.dijit.OverviewMap");
dojo.require("dojo.domReady!");

var mymap = null;
dojo.addOnLoad(init);

function init() {
    // fallback to proxy for non-CORS capable browsers
    //esriConfig.defaults.io.proxyUrl = "/proxy/";

    var lods = [
				 { "level=": 0, "resolution": 156543.033928, "scale": 591657527.591555 },
				 { "level=": 1, "resolution": 78271.5169639999, "scale": 295828763.795777 },
				 { "level=": 2, "resolution": 39135.7584820001, "scale": 147914381.897889 },
				 { "level=": 3, "resolution": 19567.8792409999, "scale": 73957190.948944 },
				 { "level=": 4, "resolution": 9783.93962049996, "scale": 36978595.474472 },
				 { "level=": 5, "resolution": 4891.96981024998, "scale": 18489297.737236 },
				 { "level=": 6, "resolution": 2445.98490512499, "scale": 9244648.868618 },
				 { "level=": 7, "resolution": 1222.99245256249, "scale": 4622324.434309 },
				 { "level=": 8, "resolution": 611.49622628138, "scale": 2311162.217155 },
				 { "level": 9, "resolution": 305.748113140558, "scale": 1155581.108577 },
				 { "level": 10, "resolution": 152.874056570411, "scale": 577790.554289 },
				 { "level": 11, "resolution": 76.4370282850732, "scale": 288895.277144 },
				 { "level": 12, "resolution": 38.2185141425366, "scale": 144447.638572 },
				 { "level": 13, "resolution": 19.1092570712683, "scale": 72223.819286 },
				 { "level": 14, "resolution": 9.55462853563415, "scale": 36111.909643 },
				 { "level": 15, "resolution": 4.77731426794937, "scale": 18055.954822 },
				 { "level": 16, "resolution": 2.38865713397468, "scale": 9027.977411 },
				 { "level": 17, "resolution": 1.19432856685505, "scale": 4513.988705 },
				 { "level": 18, "resolution": 0.597164283559817, "scale": 2256.994353 },
				 { "level": 19, "resolution": 0.298582141647617, "scale": 1128.497176}];

    var startExent = new esri.geometry.Extent(
				{
				    'xmin': 110.339766, 'ymin': 20.19156,
				    'xmax': 120.717696, 'ymax': 39.568937,
				    'spatialReference': 4326
				});
    var mymap = new esri.Map('mapDiv', { logo: false, lods: lods });
    //var mymap = new esri.Map("mapDiv");
    //note that if you do not have public Internet access then you will need to point this url to your own locally accessible cached service.
    //var myTiledMapServiceLayer = new esri.layers.ArcGISTiledMapServiceLayer(
    //		"http://server.arcgisonline.com/ArcGIS/rest/services/NGS_Topo_US_2D/MapServer");

    //mymap.addLayer(myTiledMapServiceLayer);

    mymap.addLayer(new esri.layers.ArcGISTiledMapServiceLayer(
					"http://59.67.76.103/ArcGIS/rest/services/contour/MapServer"),
					{ id: "streets11", displayLevels: [15, 16, 17, 18, 19] });
    mymap.addLayer(new esri.layers.ArcGISTiledMapServiceLayer(
					"http://59.67.76.103/ArcGIS/rest/services/r8/MapServer"),
					{ id: "streets", displayLevels: [8] });
    mymap.addLayer(new esri.layers.ArcGISTiledMapServiceLayer(
					"http://59.67.76.103/ArcGIS/rest/services/r9/MapServer"),
					{ id: "streets1", displayLevels: [9] });
    mymap.addLayer(new esri.layers.ArcGISTiledMapServiceLayer(
					"http://59.67.76.103/ArcGIS/rest/services/r10/MapServer"),
					{ id: "streets11", displayLevels: [10] });
    mymap.addLayer(new esri.layers.ArcGISTiledMapServiceLayer(
					"http://59.67.76.103/ArcGIS/rest/services/r11/MapServer"),
					{ id: "streets11", displayLevels: [11] });
    mymap.addLayer(new esri.layers.ArcGISTiledMapServiceLayer(
					"http://59.67.76.103/ArcGIS/rest/services/r12/MapServer"),
					{ id: "streets11", displayLevels: [12] });
    mymap.addLayer(new esri.layers.ArcGISTiledMapServiceLayer(
					"http://59.67.76.103/ArcGIS/rest/services/r13/MapServer"),
					{ id: "streets11", displayLevels: [13] });
    mymap.addLayer(new esri.layers.ArcGISTiledMapServiceLayer(
					"http://59.67.76.103/ArcGIS/rest/services/r14/MapServer"),
					{ id: "streets11", displayLevels: [14] });
    mymap.addLayer(new esri.layers.ArcGISTiledMapServiceLayer(
					"http://59.67.76.103/ArcGIS/rest/services/r15/MapServer"),
					{ id: "streets11", displayLevels: [15] });
    mymap.addLayer(new esri.layers.ArcGISTiledMapServiceLayer(
					"http://59.67.76.103/ArcGIS/rest/services/r16/MapServer"),
					{ id: "streets11", displayLevels: [16] });
    mymap.addLayer(new esri.layers.ArcGISTiledMapServiceLayer(
					"http://59.67.76.103/ArcGIS/rest/services/r17/MapServer"),
					{ id: "streets11", displayLevels: [17] });
    var vly0 = new esri.layers.ArcGISTiledMapServiceLayer(
					"http://59.67.76.103/ArcGIS/rest/services/world/MapServer");
    mymap.addLayer(vly0,	{ id: "streets", displayLevels: [0, 1, 2, 3, 4, 5, 6, 7, 8] });


    var overviewMapDijit = new esri.dijit.OverviewMap({
        map: mymap,
        attachTo: "bottom-right",
        baseLayer: vly0,
        width: 200,
        visible: true
    });
    var scalebar = new esri.dijit.ScaleBar({ map: mymap, scalebarUnit: "metric" });
    var geoLocate = new esri.dijit.LocateButton({ map: mymap }, "LocateButton");
    overviewMapDijit.startup();
    geoLocate.startup();


    mymap.centerAndZoom(new esri.geometry.Point(117.339766, 40), 8);
}

