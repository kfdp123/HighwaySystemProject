
/*
以上是初始化的创建的时候将函数绑定到某个事件；使用方法是： class = "scroll"
$(scroll).slider('方法名');
For EXM:
$(scroll).slider('getValue);//获取当前滑块所处位置值
var opts = $(this).slider('options');
return opts.min + (opts.max-opts.min)*(pos/size);        
*/

/*
 * 
function fresh_track_marker_per(viii)
{
    if (vsel_per_idx === -1 || null === vjson_perlist ||
        null === vtrackresult ) return;

    var v0 = vtrackresult[viii];
    if (v0 === null) return;
    
    //vgcar.clear();

    var vx = parseFloat(v0.X), vy = parseFloat(v0.Y);
    var vtitle = vjson_perlist[vsel_per_idx].NAME;

    var vgg = create_marker_person(vx, vy, v0, 'images/person32.png', vtitle);
    var vpt = new esri.geometry.Point(vx, vy, wgs4326);
    map2d.centerAt(vpt);
    map2d.infoWindow.setFeatures([vgg]);
    map2d.infoWindow.show(vpt);
}

function fresh_track_marker(viii)
{
    if (vsel_car_idx === -1 || null === vjson_carlist ||
        null === vtrackresult ) return;

    var v0 = vtrackresult[viii];
    if (v0 === null) return;
    
    //vgcar.clear();

    var vx = parseFloat(v0.X), vy = parseFloat(v0.Y);
    var vtitle = vjson_carlist[vsel_car_idx].DRIVER_NAME;

    var vgg = create_marker(vx, vy, v0, 'images/car32r.png', vtitle);
    var vpt = new esri.geometry.Point(vx, vy, wgs4326);
    map2d.centerAt(vpt);
    map2d.infoWindow.setFeatures([vgg]);
    map2d.infoWindow.show(vpt);
}
 */

//填充数据到输入框中
function init_sellist()
{
    var vsel, vvls;
    // fill data
    if (vjson_carlist !== null)
    {
        vsel = $('#selcaridstat');
        vvls = vsel.combobox('getValues');
        if (vvls === null)
        {
            vsel.combobox('loadData', vjson_carlist);
            vsel.combobox('select', '9091215557');
        }
    }
    if (vjson_perlist !== null)
    {
        vsel = $('#selperidstat');
        vvls = vsel.combobox('getValues');
        if (vvls === null)
        {
            vsel.combobox('loadData', vjson_perlist);
            //vsel.combobox('select', '9091215557');
        }
    }
}

// ======<img>=== 还有一点挺重要，就是用下面的属性，可以去掉图处点击后的虚框。
//onfocus=this.blur()
//<img onfocus=this.blur() id="img_a" border=0 
//align="middle" src="login_image/a_1.jpg" alt="没有图片！"> </img> 

//$('#dlg').dialog('open');//dojo.byId("dlg").show();

/*
var vdgdg = $(vgridid);//表格控件
vdgdg.combogrid('loadData', vjson_carlist);
vdgdg.combogrid("reload"); // ok 表格控件
vdgdg.combogrid("checkAll"); // ok 表格控件
 */

function update_markers_per(vrtpos) {
    var vlen = vrtpos.length;
    if (null === vrtpos || vlen < 1) return null;

    var vpt;
    for (var i = 0; i < vlen; i++) {
        var vijklmn = vrtpos[i];
        var vidx = find_per_idx(vijklmn.CARID);
        if (-1 === vidx) continue;

        var vx = parseFloat(vijklmn.X);
        var vy = parseFloat(vijklmn.Y);
        vpt = new esri.geometry.Point(vx, vy, wgs4326);

        var vgi = vgraphicLayer.graphics[vidx];
        vgi.attributes.SPEED = vijklmn.SPEED;
        vgi.attributes.TIME = vijklmn.TIME;
        vgi.attributes.X = vijklmn.X;
        vgi.attributes.Y = vijklmn.Y;
        vgi.setGeometry(vpt);

        //速度警报
        var vsped = parseFloat(vijklmn.SPEED);
        if (vsped >= vspeed_max || vsped <= vspeed_min) {
            $.messager.show({
                title: '车辆超速行驶！',
                msg: "驾驶员：" + vgi.attributes.DRIVER_NAME +
                    "<br/>当前速度： " + vsped +
                    "  限速: " + vspeed_min + "至" + vspeed_max,
                timeout: 3000,
                showType: 'slide',
                style: {
                    left: 0,
                    right: '',
                    top: '',
                    bottom: -document.body.scrollTop - document.documentElement.scrollTop
                }
            });

            map2d.centerAt(vpt);
            map2d.infoWindow.setFeatures([vgi]);
            map2d.infoWindow.show(vpt);
        }
    }
    map2d.centerAt(vpt);
    return vpt;
}


// for track searching dialog // goose 废止 2015年8月24日
function open_track(bopen) {
    // fill data
    if (vjson_carlist != null) {
        var vsel = $('#selcarid');
        var vvls = vsel.combobox('getValues');
        if (vvls == null || vvls.length != vjson_carlist.length)
            vsel.combobox('loadData', vjson_carlist);
        vsel.combobox('select', '9091215557');
    }

    if (bopen)// 停止当前的timer事件，结束实时监控
    {
        if (vtimer != null || vtimer != 'undefined') {
            clearInterval(vtimer);//clearTimeout
            vtimer = null;
        }

        vmode_now = vmodes.MM_HIS;//进入历史信息查询模式
        vsel_car_idx = -1;//初始化
        //clearInterval(vtimer);
        //清空当前的标注，或者在查询成功后再删除标注亦可
    }
    else {// 停止当前的timer事件，开始实时监控
        //重新添加标注
        //fill_markers();
        //vtimer = setTimeout(timer_real_time_pos, 5000);
        // 发送请求获取汽车字符串 并且将其存储到缓存localstorage中
        init_carlist(req);
        vmode_now = vmodes.MM_RT;//默认是实时位置监控

        vsel_car_idx = -1;
        //vtimer = setInterval();
    }
    //准备工作完成，打开对话框
    var vttt = bopen ? 'open' : 'close';
    $("#dlgtrack").dialog(vttt);
}


function rt_car(vbonly) {
    // 发送请求获取汽车字符串 并且将其存储到缓存localstorage中
    vmode_now = vmodes.MM_RT;//默认是实时位置监控    
    close_wins();// 隐藏相关对话框
    init_carlist();

    fill_markers();
    vbfilled = true;
    // 启动定时器，每隔1s取一次位置数据，以及速度。
    //(test, 5000); setTimeout 
    stop_watch();//stop first!!!
    if (vbonly == true) {
        if (vtimer == null)
            vtimer = setInterval(timer_rt_pos_car, 5000);
    }
}

function rt_per(vbonly) {
    // 发送请求获取汽车字符串 并且将其存储到缓存localstorage中
    vmode_now = vmodes.MM_RT;//默认是实时位置监控
    init_perlist();

    close_wins(); // 隐藏相关对话框
    vsel_per_idx = -1;//设置选中的person为空

    fill_markers_person();
    vbfilled = true;
    // 启动定时器，每隔1s取一次位置数据，以及速度。
    stop_watch();
    if (vbonly == true) {
        if (vtimer == null)
            vtimer = setInterval(timer_rt_pos_per, 5000);
    }
}

//每1秒执行函式test()
//每隔一定时间获取车辆位置。默认是全部汽车的实时位置。
//根据需要可以增加根据选择的车辆获取实时位置。
function timer_rt_pos_car() {
    //do something...
    var myDate = new Date();
    var vnoew = myDate.toLocaleString(); //2009年3月27日 12:59:59 
    //测试用时间 
    vnoew = "2010年7月23日 2:24:21";

    var layersRequest = esri.request({
        url: "bxsstatistic.aspx",
        content: { 'QTYPE': 'CARRT', 'TIME': vnoew },
        handleAs: "json"//,  callbackParamName: "callback"
    });
    layersRequest.then(
        function (res) {
            update_markers(res);
            //console.log("Success: ", response.layers);
        }, function (err) {
            //console.log("Error: ", error.message);
            alert(err.message);
        });
}

function timer_rt_pos_per() {
    //do something...
    var myDate = new Date();
    //var vnoew = new Date().Format("yyyy-MM-dd HH:mm:ss");
    var vnoew = myDate.toLocaleString(); //2009年3月27日 12:59:59 
    //测试用时间 
    vnoew = "2010年7月23日 2:24:21";

    var layersRequest = esri.request({
        url: "bxsstatistic.aspx",
        content: { 'QTYPE': 'PERRT', 'TIME': vnoew },
        handleAs: "json"//,  callbackParamName: "callback"
    });
    layersRequest.then(
        function (res) {
            update_markers_per(res);
            //console.log("Success: ", response.layers);
        }, function (err) {
            //console.log("Error: ", error.message);
            alert(err.message);
        });

}

function timer_rt_pos_all() {
    //do something...
    var myDate = new Date();
    //var vnoew = new Date().Format("yyyy-MM-dd HH:mm:ss");
    var vnoew = myDate.toLocaleString(); //2009年3月27日 12:59:59 
    //测试用时间 
    vnoew = "2010年7月23日 2:24:21";

    var layersRequest = esri.request({
        url: "bxsstatistic.aspx",
        content: { 'QTYPE': 'ALLRT', 'TIME': vnoew },
        handleAs: "json"//,  callbackParamName: "callback"
    });
    layersRequest.then(
        function (res) {
            update_markers_per(res);
            //console.log("Success: ", response.layers);
        }, function (err) {
            //console.log("Error: ", error.message);
            alert(err.message);
        });

}


/* require new init 
require([
        "esri/map", "esri/dijit/OverviewMap", "esri/dijit/LocateButton",
        "esri/dijit/Scalebar", "esri/dijit/Measurement", "esri/geometry/Point",
        "esri/geometry/Multipoint", "esri/geometry/Extent",
        'dojo/_base/array', 'dojo/_base/lang', 'dojo/_base/event',
        'dojo/on', 'dojox/grid/DataGrid', 'dojo/data/ItemFileWriteStore',
        'dijit/form/Button','dijit/form/TextBox', "dijit/Dialog", 'dojo/dom', 'dojo/request',
        'dojo/parser', 'dojo/domReady!', "esri/dijit/HorizontalSlider"
      ],
      function (Map, OverviewMap, LocateButton, ScaleBar, Measurement,
            Point,MultiPoint,Extent,
            array, lang, event, on, DataGrid, Dialog,
            ItemFileWriteStore, Button,TextBox, dom, request, parser, HorizontalSlider
      ) {
          parser.parse();
          init_symbols();//初始化一些图标风格
          // fallback to proxy for non-CORS capable browsers
          //esriConfig.defaults.io.proxyUrl = "/proxy/";
          create_map(Map, OverviewMap, LocateButton, ScaleBar, Measurement,
                      array, lang, event, on, DataGrid, Dialog,
                      ItemFileWriteStore, Button, dom);

          // 初始化轨迹滑动条控件
          //init_slider(HorizontalSlider);
          //var hslider = new esri.dijit.HorizontalSlider(
          //    { labels: ["1", "5", "10"] }, "slider");
          open_init_carlist();// 进入实时监控模式
      });
*/

/*setvalue();
function setvalue() {
    $.messager.prompt('设置速度上限', '请你设置超速警告的限速（km/h）:',
    function (v) {
        if (v) {
            vspeed_limit = parseFloat(v);
            //$('#state').combobox('setValue',v);
        }
    });
}
*/

/*
取得所有选中行的 itemid：

	var ids = [];
	var rows = $('#tt').datagrid('getSelections');
	for(var i=0; i<rows.length; i++){
		ids.push(rows[i].itemid);
	}
	alert(ids.join('\n'));
*/

/*
function create_map(Map, OverviewMap, LocateButton, ScaleBar, Measurement,
      array, lang, event, on, DataGrid, Dialog,
      ItemFileWriteStore, Button, dom)
{
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
              'xmin': 110.339766, 'ymin': 20.19156,
              'xmax': 120.717696, 'ymax': 39.568937,
              'spatialReference': 4326
          });
    map2d = new esri.Map('mapDiv',
        {
            //nav: false, slider: false, showAttribution: false,
            logo: false, lods: lods //, sliderStyle: "large"// 显示缩放slider
        });
    //map2d.showZoomSlider();
    //var map2d = new esri.Map("mapDiv");
    //note that if you do not have public Internet access then you will need to point this url to your own locally accessible cached service.
    //var myTiledMapServiceLayer = new esri.layers.ArcGISTiledMapServiceLayer(
    //		"http://server.arcgisonline.com/ArcGIS/rest/services/NGS_Topo_US_2D/MapServer");

    //map2d.addLayer(myTiledMapServiceLayer);

    map2d.addLayer(new esri.layers.ArcGISTiledMapServiceLayer(
              "http://59.67.76.103/ArcGIS/rest/services/contour/MapServer"),
              { id: "streets11", displayLevels: [15, 16, 17, 18, 19] });
    map2d.addLayer(new esri.layers.ArcGISTiledMapServiceLayer(
              "http://59.67.76.103/ArcGIS/rest/services/r8/MapServer"),
              { id: "streets", displayLevels: [8] });
    map2d.addLayer(new esri.layers.ArcGISTiledMapServiceLayer(
              "http://59.67.76.103/ArcGIS/rest/services/r9/MapServer"),
              { id: "streets1", displayLevels: [9] });
    map2d.addLayer(new esri.layers.ArcGISTiledMapServiceLayer(
              "http://59.67.76.103/ArcGIS/rest/services/r10/MapServer"),
              { id: "streets11", displayLevels: [10] });
    map2d.addLayer(new esri.layers.ArcGISTiledMapServiceLayer(
              "http://59.67.76.103/ArcGIS/rest/services/r11/MapServer"),
              { id: "streets11", displayLevels: [11] });
    map2d.addLayer(new esri.layers.ArcGISTiledMapServiceLayer(
              "http://59.67.76.103/ArcGIS/rest/services/r12/MapServer"),
              { id: "streets11", displayLevels: [12] });
    map2d.addLayer(new esri.layers.ArcGISTiledMapServiceLayer(
              "http://59.67.76.103/ArcGIS/rest/services/r13/MapServer"),
              { id: "streets11", displayLevels: [13] });
    map2d.addLayer(new esri.layers.ArcGISTiledMapServiceLayer(
              "http://59.67.76.103/ArcGIS/rest/services/r14/MapServer"),
              { id: "streets11", displayLevels: [14] });
    map2d.addLayer(new esri.layers.ArcGISTiledMapServiceLayer(
              "http://59.67.76.103/ArcGIS/rest/services/r15/MapServer"),
              { id: "streets11", displayLevels: [15] });
    map2d.addLayer(new esri.layers.ArcGISTiledMapServiceLayer(
              "http://59.67.76.103/ArcGIS/rest/services/r16/MapServer"),
              { id: "streets11", displayLevels: [16] });
    map2d.addLayer(new esri.layers.ArcGISTiledMapServiceLayer(
              "http://59.67.76.103/ArcGIS/rest/services/r17/MapServer"),
              { id: "streets11", displayLevels: [17] });
    var vly0 = new esri.layers.ArcGISTiledMapServiceLayer(
              "http://59.67.76.103/ArcGIS/rest/services/world/MapServer");
    map2d.addLayer(vly0, { id: "streets", displayLevels: [0, 1, 2, 3, 4, 5, 6, 7, 8] });

    var overviewMapDijit = new OverviewMap({
        map: map2d,
        attachTo: "bottom-right",
        baseLayer: vly0,
        width: 200,
        visible: false//search_from_grid默认最小化显示
    });
    overviewMapDijit.startup();

    //var scalebar = new ScaleBar({ map: map2d, scalebarUnit: "metric" });
    var geoLocate = new LocateButton({ map: map2d }, "LocateButton");
    geoLocate.startup();

    map2d.centerAndZoom(new esri.geometry.Point(117.339766, 40), 8);

    dojo.connect(map2d, 'resize', MapResize);
    
    /*
    var measurement = new esri.dijit.Measurement({
        map: map2d
    }, dojo.byId('measurementDiv'));
    * /

    wgs4326 = new esri.SpatialReference(4326);//{ "wkid": 4326 }
    //创建图层
    vgraphicLayer = new esri.layers.GraphicsLayer();
    map2d.addLayer(vgraphicLayer);
    //电子围栏图层
    vgfences = new esri.layers.GraphicsLayer({opacity:0.30});
    map2d.addLayer(vgfences);
}
*/

/*
document.onkeyup = function (e)
{
    e = e || window.event;
    var code = e.which || e.keyCode;
    if (code == 27)
    {
        // TODO
    }      

    if (e.ctrlKey && e.which == 13) {
        alert("You clicked Ctrl+Enter");
    } else if (e.shiftKey && e.which == 13) {
        alert("You clicked Shift+Enter");
    } else if (e.altKey && e.which == 65) {
        alert("You clicked Alt+A");
    }
       
}
*/

// 打开所有警报统计信息查询窗口，包括超速和电子围栏越界警告两类。
/*
switch (vm) {
    case 2://里程统计
        break;
    case 3://轨迹查询
        break;
    case 4://统计指定日期的所有警报信息
        break;
    case 11://超速
        break;
    case 12://电子围栏
        break;
    case 1://全部
    default:
        break;
}
*/

/*
 *	function show1(){
trace("每隔1秒我就会显示一次");
}
function show2(str){
trace(str);
}
setInterval(show1,5000);
setInterval(show2,2000,"每隔2秒我就会显示一次"); 
 */

/*//dijit.byId("carlist").show();
vdlgcarlist = new dijit.Dialog({
    title: "车辆列表",
    content: "Test content."//, style: "width: 300px"
});
//hide the ordinary close button from the user...
// dojo.style(d.closeButtonNode, "visibility", "hidden");

var b = new dijit.form.Button({ label: "Do not press this button" });
var handle = dojo.connect(b, "onClick", function () {
d.hide();
dojo.disconnect(handle);b.domNode
});
vdlgcarlist.setContent("kjjhgsadghjk");
vdlgcarlist.hide();
*/
/*
            // get the latest 1000 photos from instagram/laguna beach
            var photos = esriRequest({
              url: "data/1000-photos.json",
              handleAs: "json"
            });
            photos.then(addClusters, error);
          });


          require([
  "esri/request", ... 
], function(esriRequest, ... ) {
  var layerUrl = "http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Census_USA/MapServer/layers";
  var layersRequest = esriRequest({
    url: layerUrl,
    content: { f: "json" },
    handleAs: "json",
    callbackParamName: "callback"
  });
  layersRequest.then(
    function(response) {
      console.log("Success: ", response.layers);
  }, function(error) {
      console.log("Error: ", error.message);
  });
  ...
});

*/

/*
自己写的WKID=4326 WKID=102100互相转换的 (2014-01-21 15:18:17)
转载
▼
分类： ArcGis
//墨卡托转经纬度
private void mercatorToLonLat(double x, double y)
{
    double toX=x/ 20037508.34 * 180;
double toY=y/ 20037508.34 * 180;
toY = 180 / Math.PI * (2 * Math.Atan(Math.Exp(toY * Math.PI / 180)) - Math.PI / 2);
}
//经纬度转墨卡托
private string lonLatToMercator(double x,double y)
{
    double toX = x * 20037508.34 / 180;
double toY = Math.Log(Math.Tan((90 + y) * Math.PI / 360)) / (Math.PI / 180);
toY = toY * 20037508.34 / 180;
//Console.WriteLine("x:" + x + "-----y:" + y);
//Console.WriteLine("toX:" + toX + "-----toY:" + toY);
string r = toX.ToString() + "," + toY.ToString();
return r;
}
*/

/*
vjson_carlist ="[ " + 
 "{ 'ID': 9090000002, 'SIM No': 13023563268, 'Brand': '宝马', 'Color': '白色', 'Name': '张三', 'DriverPhone': 13256598651, 'LastX': 112365986, 'LastY': 34653268, 'LastTime': '2010/1/19 0:03:41', 'RegTime': '2010/1/19 0:03:41', 'CarNo': '豫B-2356', 'EngineNo': '12345' },"+ 
"{ 'ID': 9090000003, 'SIM No': 13025897845, 'Brand': '铃木', 'Color': '蓝色', 'Name': '周杰伦', 'DriverPhone': 13525784163, 'LastX': 113489625, 'LastY': 35894126, 'LastTime': '2010/7/2 18:24:21', 'RegTime': '2010/7/2 18:24:21', 'CarNo': '豫A5555', 'EngineNo': '456123' },"+ 
"{ 'ID': 9090000001, 'SIM No': 13698632541, 'Brand': '奔驰', 'Color': '黑色', 'Name': '李四', 'DriverPhone': 13025496325, 'LastX': 113568924, 'LastY': 36257894, 'LastTime': '2010/6/30 16:57:57', 'RegTime': '2010/6/30 16:57:57', 'CarNo': '豫A6666', 'EngineNo': '789456' },"+ 
"{ 'ID': 9090000005, 'SIM No': 13256845621, 'Brand': '奥迪', 'Color': '红色', 'Name': '王五', 'DriverPhone': 13635852169, 'LastX': 113615278, 'LastY': 36785692, 'LastTime': '2010/6/29 9:39:22', 'RegTime': '2010/6/29 9:39:22', 'CarNo': '豫A9999', 'EngineNo': '456789' },"+ 
"{ 'ID': 9091215557, 'SIM No': 18749218630, 'Brand': '中华', 'Color': '蓝色', 'Name': '张文', 'DriverPhone': 13585632458, 'LastX': 114524238, 'LastY': 33783225, 'LastTime': '2010/7/25 23:24:23', 'RegTime': '2010/7/21 15:07:51', 'CarNo': '豫O8866', 'EngineNo': 'abc12345' },"+ 
"{ 'ID': 9091215274, 'SIM No': 13937164702, 'Brand': '奇瑞', 'Color': '红色', 'Name': '王昊', 'DriverPhone': 13665852156, 'LastX': 0, 'LastY': 0, 'LastTime': '2010/7/21 15:09:54', 'RegTime': '2010/7/21 15:09:54', 'CarNo': '豫A6789', 'EngineNo': 'okd4567' },"+ 
"{ 'ID': 9090000002, 'SIM No': 13023563268, 'Brand': '宝马', 'Color': '白色', 'Name': '张三', 'DriverPhone': 13256598651, 'LastX': 112365986, 'LastY': 34653268, 'LastTime': '2010/1/19 0:03:41', 'RegTime': '2010/1/19 0:03:41', 'CarNo': '豫B-2356', 'EngineNo': '12345' },"+ 
"{ 'ID': 9090000003, 'SIM No': 13025897845, 'Brand': '铃木', 'Color': '蓝色', 'Name': '周杰伦', 'DriverPhone': 13525784163, 'LastX': 113489625, 'LastY': 35894126, 'LastTime': '2010/7/2 18:24:21', 'RegTime': '2010/7/2 18:24:21', 'CarNo': '豫A5555', 'EngineNo': '456123' }"+
"]";
    <script type="text/javascript" src="http://localhost/3.12/js/dojo/jodo/jodo.js" data-dojo-config="isDebug: true, async: true, parseOnLoad: false"></script>
    <meta http-equiv="x-ua-compatible" content="IE=10" />
	<script type="text/javascript" src="scripts/jquery.min.js"></script>
	<script type="text/javascript" src="scripts/jquery.easyui.min.js"></script>



-		vjson_carlist	[[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]]	Object, (Array)
+		__proto__	[]	Object, (Array)
		length	6	Number
-		[0]	{...}	Object
+		__proto__	{...}	Object
		CAR_BRAND	"奇瑞"	String
		CAR_COLOR	"红色"	String
		CAR_REG_DATE	"2010/7/21 15:09:54"	String
		CARID	"9091215274"	String
		DRIVER_NAME	"王昊"	String
		DRIVER_TEL	"13665852156"	String
		ENGINE_ID	"okd4567"	String
		GSM_NUMBER	"13937164702"	String
		LAST_TIME	"2010/7/21 15:09:54"	String
		LAST_X	"0"	String
		LAST_Y	"0"	String
		LICENSEPLATE	"豫A6789"	String

*/

/*
 var d=new dojox.collections.Dictionary(); 

 d.add("foo","bar"); 
 d.add("baz","fab"); 
 d.add("buck","shot"); 
 d.add("apple","orange"); 

 t.assertTrue(d.containsKey("buck")); 
 t.assertTrue(d.containsValue("shot")); 
 t.assertEqual("foo,baz,buck,apple", d.getKeyList().join(",")); 
 t.assertEqual("bar,fab,shot,orange", d.getValueList().join(",")); 
 d.remove("baz"); 
 t.assertEqual(3, d.count); 
 t.assertEqual(undefined, d.item("baz"));



 setAttributes

方法1：

var JsonObj={
Name:”西直门”,id:”01”
}
graphic.setAttributes(JsonObj); 

方法2:
graphic.atrributes.Name=”西直门”;
graphic.attributes.id=”01”;
 
设置
graphic.atrributes.Name=”西直门”;
graphic.attributes.id=”01”;

onMouseOver/onMouseOut事件

举例：鼠标悬浮在pointGraphic上,graphic图片放大。

              鼠标移开，图片变小。

 

  dojo.connect(map.graphics, "onMouseOver", function(e){

              var graphic=e.graphic;

              var bigSymbol=new esri.symbol.PictureMarkerSymbol(imgUrl,25,20)

              graphic.setSymbol(bigSymbol);

});

 

  dojo.connect(map.graphics, "onMouseOut", function(e){

              var graphic=e.graphic;

              var smallSymbol=new esri.symbol.PictureMarkerSymbol(imgUrl,20,20)

              graphic.setSymbol(smallSymbol);

});   


Graphic部件 infoTemplate

说明：graphic的弹出窗体 通过 infoTemplate控制。

       graphic.setInfoTemplate(infoTemplate);

 

 
构造函数:

var  infoTemplate = new esri.InfoTemplate("Attributes", "<tr>State Name: <td>${STATE_NAME}

  </tr></td><br><tr>Population:<td>${Pop2001}</tr></td>");

 

 
举例,infoTemplate插入链接

  var infoTemplate = new esri.InfoTemplate("${title}", 
  "<tr>途经换乘:<a href='http://www.baidu.com'>http://www.baidu.com</a>
  <td>${routeName}</tr></td><br><tr>点到点OD总量:<td>${ODTotal}</tr></td><br>
  <tr>本方案OD量:<td>${ODValue}</tr></td><br><tr>占比:<td>${ODPartition}</tr></td>");

middlefeature.setInfoTemplate(infoTemplate);

 
显示所有属性的infoTemplate

var template = new esri.InfoTemplate("${name}", "${*}");

 
带按钮,input录入框的popWindow[动态Popwindow]

路子：

function createPopUpWindow(){

       var operPane=document.createElement(“div”);

       operPane.innerHTML=htmlString;

       operPane.onclick=function(e){

       var operId=e.target.id;

       if(operId==””){

}

else if(operId==””){

}

…

return operPane;

}

 想找一个不依赖GeometryService量算面积的方法，经过别人的帮助，终于在js帮助页上找到了。
 就是esri/geometry/geodesicUtils中的geodesicAreas方法，该方法通过Geometry获取其面积，
 在geodesicUtils还有一个获取几何要素长度的方法，geodesicLengths，可以用来获取长度。
	当然，在使用这些方法之前，有些需要将Geometry转换一下投影，可以使用Geometry下的
    webMercatorUtils，在其中有webMercatorToGeographic(geometry)和
    geographicToWebMercator(geometry)这两个方法。不然，转出来的面积长度有可能是不对的。

下面是我做的一个例子，结合了draw这个方法：
画线和画面：
	function measureLenght() {
            toolbar.activate(esri.toolbars.Draw.POLYLINE);
        }
        function measureArea() {
            toolbar.activate(esri.toolbars.Draw.POLYGON);
        }
在地图初始化的时候添加监听画图的事件：
            dojo.connect(toolbar, "onDrawEnd", GetLenthorArea);

量算面积和长度方法：
function GetLenthorArea(geometry) {//画图完毕后计算距离或者面积
            if (geometry.type == "polyline") {
                var geo = esri.geometry.webMercatorToGeographic(geometry);
                var Length = esri.geometry.geodesicLengths([geo], esri.Units.METERS);

                Map.infoWindow.setContent("距离：" + Length+ "米");
                Map.infoWindow.show();
            }
            else if(geometry.type == "polygon") {
                var geo = esri.geometry.webMercatorToGeographic(geometry);
                var Area = esri.geometry.geodesicAreas([geo], esri.Units.SQUARE_METERS);
                Map.infoWindow.setContent("面积：" + Area + "平方米");
                Map.infoWindow.show();
            }
        }

最后，别忘了添加引用

  var infoContent =getODWPopup(tempGra);                 

 mapAppObj.map.infoWindow.setTitle("站点信息");

mapAppObj.map.infoWindow.setContent(infoContent);

mapAppObj.map.infoWindow.resize(300, 260);                  

mapAppObj.map.infoWindow.show(tempGra.geometry, mapAppObj.map.getInfoWindowAnchor(tempGra.geometry));
*/