var flag2d = false;
var map2d;
var navigatepos;

function Init() {
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
				 { "level": 19, "resolution": 0.298582141647617, "scale": 1128.497176 }];

    var startExent = new esri.geometry.Extent(
      {
          'xmin': 60.0, 'ymin': 0.0,
          'xmax': 180.0, 'ymax': 60.0,
          'spatialReference': 4326
      });
    map2d = new esri.Map('My2dMap', { logo: false, lods: lods, slider: false, extent: startExent });
    //vaddbase + "/world/MapServer"

    var vaddtile = vadd108 + "tilemap";
    var vaddcontour = vadd108 + "bxs";

    map2d.addLayer(new esri.layers.ArcGISTiledMapServiceLayer(vaddtile + "/r0_8/MapServer"),
			{
			    id: "streets08", displayLevels: [0, 1, 2, 3, 4, 5, 6, 7, 8]//,
			    //tileServers: [vaddbase + "/world/MapServer", vaddtile + "r1_8/MapServer"]
			});
    //  var MyTiledMapServiceLayer = new esri.layers.ArcGISTiledMapServiceLayer(
    //"http://server.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer");			
    map2d.addLayer(new esri.layers.ArcGISTiledMapServiceLayer(vaddtile + "/r8/MapServer"),
			{ id: "streets8", displayLevels: [8] });
    map2d.addLayer(new esri.layers.ArcGISTiledMapServiceLayer(vaddtile + "/r9/MapServer"),
			{ id: "streets9", displayLevels: [9] });
    map2d.addLayer(new esri.layers.ArcGISTiledMapServiceLayer(vaddtile + "/r10/MapServer"),
			{ id: "streets10", displayLevels: [10] });
    map2d.addLayer(new esri.layers.ArcGISTiledMapServiceLayer(vaddtile + "/r11/MapServer"),
			{ id: "streets11", displayLevels: [11] });

    map2d.addLayer(new esri.layers.ArcGISTiledMapServiceLayer(vaddcontour + "/BXS_12/MapServer"),
                { id: "streets151", displayLevels: [12] });						 
    map2d.addLayer(new esri.layers.ArcGISTiledMapServiceLayer(vaddcontour + "/BXS_13/MapServer"),
                { id: "streets151", displayLevels: [13] });						 
    map2d.addLayer(new esri.layers.ArcGISTiledMapServiceLayer(vaddcontour + "/BXS_14/MapServer"),
                { id: "streets151", displayLevels: [14] });						 
    map2d.addLayer(new esri.layers.ArcGISTiledMapServiceLayer(vaddcontour + "/BXS_15/MapServer"),
                { id: "streets151", displayLevels: [15] });
    map2d.addLayer(new esri.layers.ArcGISTiledMapServiceLayer(vaddcontour + "/BXS_16/MapServer"),
			{ id: "streets161", displayLevels: [16] });
    map2d.addLayer(new esri.layers.ArcGISTiledMapServiceLayer(vaddcontour + "/BXS_17/MapServer"),
			{ id: "streets171", displayLevels: [17] });
    map2d.addLayer(new esri.layers.ArcGISTiledMapServiceLayer(vaddcontour + "/BXS_18/MapServer"),
		    { id: "streets18", displayLevels: [18, 19] });

    map2d.addLayer(new esri.layers.ArcGISTiledMapServiceLayer(vaddtile + "/r12/MapServer"),
    { id: "streets12", displayLevels: [12] });
    map2d.addLayer(new esri.layers.ArcGISTiledMapServiceLayer(vaddtile + "/r13/MapServer"),
			{ id: "streets13", displayLevels: [13] });

    map2d.addLayer(new esri.layers.ArcGISTiledMapServiceLayer(vaddtile + "/r14/MapServer"),
			{ id: "streets14", displayLevels: [14] });
    map2d.addLayer(new esri.layers.ArcGISTiledMapServiceLayer(vaddtile + "/r15/MapServer"),
			{ id: "streets15", displayLevels: [15] });
    /*
    map2d.addLayer(new esri.layers.ArcGISTiledMapServiceLayer(vaddtile + "/r16/MapServer"),
			{ id: "streets16", displayLevels: [16] });
    map2d.addLayer(new esri.layers.ArcGISTiledMapServiceLayer(vaddtile + "/r17/MapServer"),
			{ id: "streets17", displayLevels: [17] });
     */

    //	  map2d.addLayer(new esri.layers.ArcGISDynamicMapServiceLayer(vaddbase+"/baxianshanDEM/MapServer"),
    //			{ id: "streets12" });
    dojo.connect(map2d, "onExtentChange", mapExtentChange);
    SGWorld65.Open("http://59.67.76.11:87/11211.FLY");//"bxs.mpt@59.67.76.103:83"
    SGWorld65.AttachEvent("OnLoadFinished", OnLoadFinish);
    SGWorld65.AttachEvent("OnFrame", SetMap2D);
    map2d.onMouseDown = function () {
        flag2d = true;
    }
    init_map2d();
}

function mapExtentChange(extent, delta, levelChange, lod) {
    if (flag2d == false) {
        return;
    }
    flag2d = false;

    var mx = map2d.extent.getCenter().getLongitude();
    var my = map2d.extent.getCenter().getLatitude();
    var mh = lod.scale / 6;
    var pos = SGWorld65.navigate.getPosition();
    if (isNaN(mx) || isNaN(my) || isNaN(mh)) return;

    var vsgpos = SGWorld65.Creator.CreatePosition(
        mx, my, mh, 0, pos.yaw, pos.pitch, pos.roll)

    SGWorld65.navigate.setPosition(vsgpos);
}

function SetMap2D() {

    var navigatepos1 = SGWorld65.navigate.getPosition();
    if (navigatepos != null && navigatepos1.Altitude == navigatepos.Altitude &&
    navigatepos1.X == navigatepos.X && navigatepos1.Y == navigatepos.Y &&
    navigatepos1.Yaw == navigatepos.Yaw && navigatepos1.Pitch == navigatepos.Pitch &&
    navigatepos1.Roll == navigatepos.Roll) {
        return;
    }
    navigatepos = navigatepos1;
    flag2d = false;

    //    var mapdiv = dojo.byId("My2dMap");
    //    dojo.setStyle(mapdiv, "mozTransform", "rotate(1.76deg)");
    //    dojo.setStyle(mapdiv, "webkitTransform", "rotate(1.76deg)");
    //    dojo.setStyle(mapdiv, "oTransform", "rotate(1.76deg)");
    //    dojo.setStyle(mapdiv, "msTransform", "rotate(230.76deg)");

    var minfo = SGWorld65.Window.GetMouseInfo();
    if (minfo.X <= 0 || minfo.Y <= 0) return;
    var pos = SGWorld65.Window.PixelToWorld(minfo.X, minfo.Y, -1);
    if (pos == null || flag2d) return;

    var center_position = SGWorld65.Window.CenterPixelToWorld(0);
    var height = SGWorld65.Navigate.GetPosition(3).Altitude;
    var level = CheckHeightLevel(height);
    map2d.setScale(getMap2dScale(level));
    map2d.centerAt(new esri.geometry.Point({
        'x': center_position.Position.X,
        'y': center_position.Position.Y,
        'spatialReference': 4326
    }));
};

function getMap2dScale(level) {

    var scale = 591657527.591555;

    if (level == 0) {
        scale = 591657527.591555;
    }
    else if (level == 1) {
        scale = 295828763.795777;
    }
    else if (level == 2) {
        scale = 147914381.897889;
    }
    else if (level == 3) {
        scale = 73957190.948944;
    }
    else if (level == 4) {
        scale = 36978595.474472;
    }
    else if (level == 5) {
        scale = 18489297.737236;
    }
    else if (level == 6) {
        scale = 9244648.868618;
    }
    else if (level == 7) {
        scale = 4622324.434309;
    }
    else if (level == 8) {
        scale = 2311162.217155;
    }
    else if (level == 9) {
        scale = 1155581.108577;
    }
    else if (level == 10) {
        scale = 577790.554289;
    }
    else if (level == 11) {
        scale = 288895.277144;
    }
    else if (level == 12) {
        scale = 144447.638572;
    }
    else if (level == 13) {
        scale = 72223.819286;
    }
    else if (level == 14) {
        scale = 36111.909643;
    }
    else if (level == 15) {
        scale = 18055.954822;
    }
    else if (level == 16) {
        scale = 9027.977411;
    }
    else if (level == 17) {
        scale = 4513.988705;
    }
    else if (level == 18) {
        scale = 2256.994353;
    }
    else if (level == 19) {
        scale = 1128.497176;
    }
    return scale;
};

function CheckHeightLevel(height) {
    level = Math.floor(Math.log(height) / Math.log(2.0) - 7);
    if (level < 1) level = 1;
    if (level > 19) level = 19;
    return 19 - level;
}

function OnLoadFinish() {
    var mapCenter = map2d.extent.getCenter();
    var center = new esri.geometry.Point({
        'x': mapCenter.getLongitude(),
        'y': mapCenter.getLatitude(),
        'spatialReference': 4326
    });
    var p1 = new esri.geometry.Point({
        'x': map2d.extent.xmin,
        'y': map2d.extent.ymin,
        'spatialReference': 102113
    });
    var p2 = new esri.geometry.Point({
        'x': map2d.extent.xmax,
        'y': map2d.extent.ymax,
        'spatialReference': 102113
    });
    var dstance = SGWorld65.CoordServices.GetDistance(
        p1.getLongitude(), p1.getLatitude(),
        p2.getLongitude(), p2.getLatitude());
    var height = dstance / 2.0 * 2.006;
    PositionAttach(center, height);

    SGWorld65.AttachEvent("OnLButtonDown", LButtonDown);
}
function LButtonDown(Flag, X, Y) {
    flag2d = false;
}

function MouseWheel(Flags, zDelta, X, Y) {
    if (flag2d) return true;
}
function PositionAttach(center, height) {
    var postion = SGWorld65.Creator.CreatePosition(center.x, center.y, 0);
    postion.Altitude = height;
    var pos = SGWorld65.navigate.getPosition();
    postion.Yaw = pos.Yaw;
    postion.Pitch = pos.Pitch;
    postion.Roll = pos.Roll;
    SGWorld65.Navigate.SetPosition(postion);
}