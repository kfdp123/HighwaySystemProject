//入口函数
/// <reference path="scripts/jsapi_vsdoc12_v38.js" />  

//请求类型 
// CARTB CARRT CARTRK CARDIST 车辆列表 实时位置 车辆轨迹 车辆距离
// PERTB PERRT PERTRK PERDIST 人员列表 实时位置 人员轨迹 人员距离
// PERDT ALLRT 人员详细信息 所有信息实时位置
//经纬度偏移参数
var lat_py=0.001389;
var lon_py=0.006338;


var map2d = null, vdlgcarlist = null, vtimer = null;
var vgper = null; // 人员图层
// 车辆图标图层以及电子围栏图层
var vgcar = null, vgfences = null;

var vgcolums = ['数据ID', '人员或车辆ID', '经度', '纬度', '精度', '定位时间', '速度'];

var vjson_carlist = null, vbfilled_car = false; //存储所有车辆列表信息的JSON数据字符串
var vjson_perlist = null, vbfilled_per = false; //存储所有人员列表信息的JSON数据字符串
var vtrackresult, vsel_car_idx, vsel_per_idx;
var vcur_pos_idx = -1;

var vspeed_max = 10; //km/h
var vspeed_min = 5; //km/h

var wgs4326, wm102113; //= new SpatialReference({ "wkid": 4326 });
//监控模式：0 实时监控 1 历史查询 2 管理配置 
var vmodes = {
    "MM_INIT": -1, //初始化
    "MM_RT": 0, //所有监控
    "MM_RT_CAR": 1, "MM_RT_PER": 2, "MM_RT_ALL": 3, //车辆监控、人员监控以及所有监控
    "MM_HIS": 4, "MM_MGR": 5// 历史记录查询 参数管理
};
var vmode_now;
var vviews = { "VM_2D": 0, "VM_3D": 1, "VM_2D3D": 2 };
var vview_now;

// 符号化风格，点 线 面 超速预警点 电子围栏越界点
var vsymbol_pt, vsymbol_pl, vsymbol_poly,
    vsymbol_warn_speed, vsymbol_warn_fence;

// 存储车辆和人员的电子围栏
// 车辆的以一个电子围栏为基准，
// 人员以巡线信息为准，存在多个边界，暂时不实现。
var vfence_car = null, vfence_personal; //

var vdraw_tool = null;
var vplinesymbol = null, vpolygonsymbol = null;
var vbuffer_dist = 0;

///////////////////////////////////////////////////////////////////////////////////////////////////
//var vaddbase = "http://localhost:666/";

//var vaddbase = "http://59.67.76.11/";
var vaddbase='http://127.0.0.1:11934/';
//////////////////////////////////////////////////////////////////////////////////////////////////////

var vbuf_ser = null;

// xy初始值，对于无效的数字给定之！
var INITX = 117.13444, INITY = 39.067332;
//var VPOX = 0.00631570816050, VPOY = 0.00112135735083;
var VPOX = 0, VPOY = 0;
var VSM2KM = 1.0; //1 海里=1.852公里 

// 八仙山范围特殊矩形及手机偏移
var VSPX0 = 117.529647337289, VSPX1 = 117.577123300054,
	VSPY0 = 40.1739642910741, VSPY1 = 40.237014492358;
//var VSPOX = -0.00009250, VSPOY = -0.00020300;
//var VSPOX = 0.00631570816050, VSPOY = 0.00112135735083;
var VSPOX = 0, VSPOY = 0;
function IN_SPBOX(sx, sy) {
    return (sx >= VSPX0 && sx <= VSPX1 && sy >= VSPY0 && sy <= VSPY1);
}

function supports_html5_storage() {
    try {
        return 'localStorage' in window && window.localStorage !== null;
    } catch (e) {
        return false;
    }
}

function get_cache(vkey) {
    if (supports_html5_storage())
        return localStorage.getItem(vkey);
    else
        $.messager.alert('init_carlist()', '不支持localstorage!', 'info');
}

function set_cache(skey, soj) {
    if (supports_html5_storage())
        localStorage.setItem(skey, soj);
    else
        $.messager.alert('set_cache()', '不支持localstorage!', 'info');
}

//在entity中，name存储了carid或者imei字段
function find_idx_viewer(vid) {
    if (!isvalid(viewer.entities) || !isvalid(viewer.entities.values)) 
        return -1;

    var vvvvvs = viewer.entities.values;
    var vlen = vvvvvs.length;
    for (var i = 0; i < vlen; i++) {
        if (vvvvvs[i].id == vid)
            return vvvvvs[i].id;
    }
    return -1;
}

// 根据id返回数组的索引号。
function find_car_idx(vid) {
    if (null === vjson_carlist) return -1;

    var vlen = vjson_carlist.length;
    for (var i = 0; i < vlen; i++) {
        if (vjson_carlist[i].CARID === vid)
            return i;
    }

    return -1;
}

// 根据id返回数组的索引号。
function find_per_idx(vid) {
    if (null === vjson_perlist) return -1;

    var vlen = vjson_perlist.length;
    for (var i = 0; i < vlen; i++) {
        if (vjson_perlist[i].IMEI === vid)
            return i;
    }

    return -1;
}

function get_sel_carids() {
    var ids = [];
    var vtbdg = $('#dg');
    var rows = vtbdg.datagrid('getSelections');
    if (rows === null) {
        rows = vtbdg.datagrid("selectAll");
        rows = vtbdg.datagrid("getSelections");
    }

    var vlen = rows.length;
    for (var i = 0; i < vlen; i++)
        ids.push(rows[i].itemid);

    return ids.join();
}

// 根据id判断是否汽车或者人员，车辆id 0-10e10 人员imei 10e15 
function car_or_per(idd) {
    if (!isinited(idd)) return 'none';
    var ilen = idd.toString().length;
    if (ilen === 10) return 'car';
    else if (ilen === 15) return 'per';
    else return 'none';
}

function open_speed_limit(bshow) {
    var vdlg = (bshow) ? 'open' : 'close';
    $('#speed_limit_dlg').dialog(vdlg);
}

function set_speed_limit() {
    var vspeedmax = $('#txtspeedmax').val();
    var vspeedmin = $('#txtspeedmin').val();
    if (!isNaN(vspeed_max))
        vspeed_max = parseFloat(vspeedmax);
    if (!isNaN(vspeed_min))
        vspeed_min = parseFloat(vspeedmin);

    $('#speed_limit_dlg').dialog('close');
}

//填充数据至combobox控件
function fill_data_grid(vgridid, vdata) {
    if (!isinited(vgridid) || !isinited(vdata))
        return false;

    $(vgridid).combobox('clear');
    $(vgridid).combobox("loadData", vdata);

    return true;
}

// 初始化人员列表
function init_perlist() {
    vsel_per_idx = -1; //设置选中的person为空

    $.ajax({
        type: "POST",
        url: vaddbase + "bxsstatistic.aspx",
        dataType: "json", //我们用text格式接收
        data: { 'QTYPE': 'PERTB' },
        success: function (msg) {
            vjson_perlist = msg; // 存储下来
            //增加id text属性，用于历史记录查询时的显示
            var ilen = vjson_perlist.length;
            for (var i = 0; i < ilen; i++) {
                vjson_perlist[i].ido = vjson_perlist[i].IMEI;
                vjson_perlist[i].text = vjson_perlist[i].NAME;
            }
            set_cache('perlist', msg);
            //添加标记到地图
            fill_markers_person();
           
            //vgper.setVisibility(false);
        },
        error: function () {
            $.messager.alert('init_perlist()', '查不到数据', 'info');
        }
    });
}

function init_carlist() {
    vsel_car_idx = -1; //设置选中的车辆为空

    $.ajax({
        type: "POST",
        url: vaddbase + "Handler1.ashx",       //ly修改--
	   // url: 'http://203.93.127.134:11934/Handler1.ashx',   //ly修改++
        dataType: "json",
        data: { 'QTYPE': 'CARTB' },
        success: function (msg) {
            vjson_carlist = msg; // 存储下来       
			
            //增加id text属性，用于历史记录查询时的显示
            var ilen = vjson_carlist.length;
            for (var i = 0; i < ilen; i++) {
                vjson_carlist[i].ido = vjson_carlist[i].CARID;
                vjson_carlist[i].text = vjson_carlist[i].CARID;
            }
            set_cache('carlist', msg);
            // init_sellist();
            //添加标记到地图
            fill_markers_car();
            stop_watch();
            // 启动定时器，每隔5s取一次位置数据，以及速度。(test, 5000);setTimeout 
            //vtimer = setInterval("timer_rt_pos('CARRT')", 5000);
        }, error: function () {
            $.messager.alert('init_carlist()', '查不到数据', 'info');
        }
    });
}

//初始化2维地图的一些配置
function init_map2d() {
    if (vgper == null) vgper = new Cesium.EntityCollection(viewer);
    if (vgcar == null) vgcar = new Cesium.EntityCollection(viewer);

    vgper.removeAll();
    vgcar.removeAll();
	//viewer.entities.removeById('vijkj.CARID');

    //viewer.entities.removeAll();
    reload_data();
    close_wins();
    //vview_now = vviews.VM_2D3D;//默认为二三维一体化模式
}

/*
DUTY:null
ID:62
IMEI:"869321020379624"
NAME:"测测1"
NO:null
REMARK:null
ido:"869321020379624"
text:"测测1"
*/
function make_detail_per(vattper) {
    var vdet = "<p>";
    vdet += ("手机ID:" + vattper.IMEI + "</br>");
    vdet += ("姓名:" + vattper.NAME + "</br>");

    vdet += "</p>"

    return vdet;
}

/*
CARID:"9150206769"
CAR_BRAND:null
CAR_COLOR:null
CAR_REG_DATE:"2016-04-27T11:57:57"
DRIVER_NAME:null
DRIVER_TEL:null
ENGINE_ID:"7"
GSM_NUMBER:13622157097
LAST_TIME:"2016-12-26T14:42:04"
LICENSEPLATE:"7"
X:117.53921
Y:40.17826
ido:"9150206769"
text:"7"
*/

function make_detail_car(vattcar) {
    var vdet = "<p style='whiteSpace:pre;' >";
    vdet += ("车辆ID:" + vattcar.CARID + "</br>");
    vdet += ("名字:" + vattcar.Name + "</br>");
    vdet += ("电话:" + vattcar.Phone + "</br>");
    vdet += ("单位:" + vattcar.Office + "</br>");
    vdet += ("地区:" + vattcar.Place + "</br>");
    vdet += ("纬度:" + vattcar.Y/1000000 + "</br>");
    vdet += ("经度:" + vattcar.X/1000000 + "</br>");

    vdet += "</p>"

    return vdet;
}


/*
function make_detail_car(vattcar) {
    var vdet = "<p style='whiteSpace:pre;' >";
    vdet += ("车辆ID:" + vattcar.Id + "</br>");
    vdet += ("登记时间:" + vattcar.Name + "</br>");
    vdet += ("车辆编号:" + vattcar.Phone + "</br>");
    vdet += ("最近一次定位时间:" + vattcar.Office + "</br>");
    vdet += ("经度:" + vattcar.X + "</br>");
    vdet += ("纬度:" + vattcar.Y + "</br>");

    vdet += "</p>"

    return vdet;
}
*/
/* 只有2个点时 */
function make_detail_pos(vatt) {
    var vcar = car_or_per(vatt.PCID);
    var vidpro = (vcar === 'car') ? '车辆编号' : '人员编码';
    var vnmpro = (vcar === 'car') ? '车辆编号' : '人员姓名';
    var vdet = "<p style='whiteSpace:pre;' >";

    vdet += (vidpro + ":" + vatt.PCID + '</br>');
    vdet += (vnmpro + ":" + vatt.NAME + '</br>');
    vdet += ('经度:' + vatt.X + '度</br>' );
    vdet += ('纬度:' + vatt.Y + '度</br>')
    vdet += ("时间:" + vatt.TIME + "</br>");
    vdet += ("速度:" + vatt.SPEED + "km/时</br>");
    vdet += ("精度:" + vatt.ACCURACY + "度</br>");

    vdet += "</p>"

    return vdet;
}
/* 只有4个点时 */
function make_detail_pos3(vatt) {
    var vcar = car_or_per(vatt.PCID);
    var vidpro = (vcar === 'car') ? '车辆编号' : '人员编码';
    var vnmpro = (vcar === 'car') ? '车辆编号' : '管理人员姓名';
    var vdet = "<p style='whiteSpace:pre;' >";
    
	vdet += ("编号:" + vatt.SPEED + "</br>");
    vdet += ("站点:" + vatt.ACCURACY + "</br>");
    vdet += (vidpro + ":" + vatt.PCID + '</br>');
    vdet += (vnmpro + ":" + vatt.NAME + '</br>');
    vdet += ('经度:' + vatt.X + '度</br>' );
    vdet += ('纬度:' + vatt.Y + '度</br>')
    vdet += ("时间:" + vatt.TIME + "</br>");
    

    vdet += "</p>"

    return vdet;
}

function fill_markers_person() {
    if (null === vjson_perlist || vjson_perlist.length < 1) return;
    //var mlpoint = new esri.geometry.Multipoint(wgs4326);
    if (vgper != null) vgper.removeAll();
    var vx = INITX, vy = INITY;
    for (var i = 0; i < vjson_perlist.length; i++) {
        var vijkp=vjson_perlist[i];
        //var vid = 'per'+ vgper.values.length;
        var venet = create_marker(vx, vy, vijkp.IMEI, vijkp.NAME,
				make_detail_per(vjson_perlist[i]), 'images/person32.png', 32, 32);
        vgper.add(venet);
        viewer.entities.add(venet);
    }
    viewer.zoomTo(viewer.entities);
}

function fill_markers_car() {
    if (null === vjson_carlist || vjson_carlist.length < 1) return;
    //var mlpoint = new esri.geometry.Multipoint(wgs4326);
    if (vgcar != null) vgcar.removeAll();
    var vx, vy;
    for (var i = 0; i < vjson_carlist.length; i++) {
        var vijkj = vjson_carlist[i];
        vx = parseFloat(vijkj.X)/1000000,
        vy = parseFloat(vijkj.Y)/1000000;
        // 对于无效的数字给个初始值；而不能忽略之
        if (vx <= 60 || vy <= 10 || isNaN(vx) || isNaN(vy)) {
            vx = INITX; vy = INITY;
        }else
		{
        //var vid = 'car' + vgcar.values.length;
        var venet = create_marker(vx, vy, vijkj.CARID, vijkj.ENGINE_ID,
			make_detail_car(vijkj), 'images/car32.png', 32, 32);
        vgcar.add(venet);
        viewer.entities.add(venet);
		}
    } //mlpoint.getExtent().expand(2)
    viewer.zoomTo(viewer.entities);
    //map2d.centerAndZoom(new esri.geometry.Point(vx, vy, wgs4326), 8);
}

//里程统计
function stat_dist(msg) {
    $.messager.alert("里程统计", "共计行驶" + 10 + "公里", "info");
    //    $("#dlgstat").dialog('close');
}

function calc_distance(vgeo) {
    if (!isinited(vgeo))
        return;

    var ddist = 0.0;
    /*
    for(var i=0;i<vgeo.paths.length;i++)
    {
    var vpts=vgeo.paths[i];
    for(var j=0;j<vpts.length-1;j++)
    {
    var vx = vpts[j][0] - vpts[j + 1][0];
    var vy = vpts[j][1] - vpts[j + 1][1];
    ddist += Math.sqrt(vx * vx + vy * vy);
    }
    }
    */
    return ddist / 1000; //km
}

function toggle_visible(vbshow, varr) {
    if (varr == null) return;
    varr.show = !varr.show;
}

//轨迹查询统计 vqtp : car per车辆 人员轨迹查询
function stat_track(msg, vqtp) {
    vtrackresult = msg; //临时存储

    var vvid = $("#selidstat").combobox('getValue');
    var vquetype = parseInt($("#state").combobox('getValue'));
    //toggle_visible(true, vgper);
   // toggle_visible(true, vgcar);
    //查询里程统计时，改变参数，其他都是获取轨迹数据，然后进行判断
    var vidx = -1;
    if (vquetype < 200) {
        // $("#btndetail").hide();//attr("disabled", false);
        //toggle_visible(false, vgper);
        //vgper.setVisibility(false);
        vidx = find_car_idx(vvid);
        if (vidx !== -1) {
            vsel_car_idx = vidx; // 赋值了 存储当前选择的车辆对应数组id
            //fresh_track_marker(0);
        }
        //if (vgcar != null) vgcar.removeAll();
        update_track_line(msg, vjson_carlist[vsel_car_idx].CARID,
            "images/car32.png", 'car');
    }
    if (vquetype > 200) {
        // $("#btndetail").show();
        //toggle_visible(false, vgcar);
        //vgcar.setVisibility(false);
        vidx = find_per_idx(vvid);
        if (vidx !== -1) {
            vsel_per_idx = vidx; // 赋值了 存储当前选择的车辆对应数组id
            //fresh_track_marker_per(0);
        }
        //if (vgper != null) vgper.removeAll();
        update_track_line(msg, vjson_perlist[vsel_per_idx].NAME,
            "images/person32.png", 'per');
    }

    var vlen = msg.length;
    //设置slider最大值
    var vsld = $("#sliderhstat").slider('options');
    vsld.min = 0;
    vsld.max = vlen - 1;
    $("#sliderhstat").slider('setValue', 1);
    $("#sliderhstat").slider('enable');
    //valueOnChange(1);//$("#loctimestat").textbox('setValue', 1);
}

// 超速和电子围栏警报统计
function stat_alarms() {
    var vgeo = vgcar; //.graphics;
    if (vgeo === null || vgeo.length < 1) {
        $.messager.alert('预警统计', '没有查询到选中车辆的警报信息', 'error');
        return;
    }
    //将这些信息放到vgcar
    stat_alarms_fence();
    stat_alarms_speed();
}

//超速判断 更新相应位置图标
function stat_alarms_speed() {
    var vgeo = vgcar; //.graphics;
    if (vgeo === null || vgeo.length < 1) {
        $.message.alert('预警统计', '没有查询到选中车辆的警报信息', 'error');
        return;
    }
    //创建模版
    var vtitle = "当前车辆超速！";
    var vcont = "车辆驾驶员:" + vjson_carlist[vsel_car_idx].LICENSEPLATE + " <br/>" +
        "当前车速：${SPEED}<br/>" +
        "限速：最低" + vspeed_min + " 最高" + vspeed_max;
    /*
    var vit = new esri.InfoTemplate(vtitle, vcont);

    var vlen = vgeo.length;
    for (var i = 0; i < vlen; i++) {
    var vgi = vgeo[i];
    var vsped = parseFloat(vgi.attributes.SPEED);
    //判断是否超速|| vsped <= vspeed_min
    if (vsped >= vspeed_max) {
    vgi.setSymbol(vsymbol_warn_speed);
    vgi.setInfoTemplate(vit);
    }
    }
    */
}

//电子围栏越界判断 更新相应位置图标
function stat_alarms_fence() {
    if (!isinited(vfence_car)) {
        $.messager.alert("电子围栏统计", "电子围栏没有设置，请设置先~", "info");
        return;
    }
    var vgeo = vgcar; //.graphics;
    if (vgeo === null || vgeo.length < 1) {
        $.messager.alert('预警统计', '没有查询到选中车辆的警报信息', 'error');
        return;
    }
    // 显示电子围栏
    //vgfences.setVisibility(true);
    //创建模版
    var vtitle = "当前车辆超出设定范围！";
    var vcont = "驾驶员:" + vjson_carlist[vsel_car_idx].LICENSEPLATE +
        "<br/>当前位置：${X},${Y}<br/>定位时间：${TIME}";
    /*
    var vit = new esri.InfoTemplate(vtitle, vcont);

    var vlen = vgeo.length;
    for (var i = 0; i < vlen; i++) {
    var vgi = vgeo[i];
    if (!vfence_car.contains(vgi.geometry)) {
    vgi.setSymbol(vsymbol_warn_fence);
    vgi.setInfoTemplate(vit);
    }
    }
    */
}


function ontipForMatterwarn(value) {
    var opts = $(this).slider('options');
    return (value + ' / ' + opts.max);
}

function OnChangewarn(value) {
    //$("#loctime").textbox('setValue', value);
    if (vtrackresult !== null && value >= 0 && value < vtrackresult.length)
        $("#loctimestat").textbox('setValue', value + '  ' +
            vtrackresult[value].TIME);
    //更新位置 或者增加新的标记，显示轨迹
    var vg0 = vtrackresult[value]; //vgcar.graphics[value];

}

function fill_img_array(ventity) {
    var vimgsar = [];
    if (isinited(ventity.FOTO0)) vimgsar.push(ventity.FOTO0);
    if (isinited(ventity.FOTO1)) vimgsar.push(ventity.FOTO1);
    if (isinited(ventity.FOTO2)) vimgsar.push(ventity.FOTO2);
    if (isinited(ventity.FOTO3)) vimgsar.push(ventity.FOTO3);
    if (isinited(ventity.FOTO4)) vimgsar.push(ventity.FOTO4);
    //if (isinited(ventity.FOTO5)) vimgsar.push(ventity.FOTO5);

    return vimgsar;
}

//查询人员提交的详细信息，用于显示当前选择记录的详细信息，
//包括坐标信息以及提交的图片信息。
function get_detail() {
    //获取当前选择的对象
    if (-1 == vsel_per_idx || -1 === vcur_pos_idx || null === vjson_perlist)
        return;

    //发送请求
    $.ajax({
        type: "POST",
        url: vaddbase + "bxsstatistic.aspx",
        dataType: "json",
        data: { 'QTYPE': 'PERDT', 'ID': vcur_pos_idx },
        success: function (msg) {
            if (!isinited(msg) || (isinited(msg) && isinited(msg.ERR))) {
                var vifo = (isinited(msg.ERR)) ? msg.ERR : '查不到数据';
                $.messager.alert('get_detail()', vifo, 'info');
                return;
            }
            var vent = msg[0];
            //准备数据
            var vinfo =
                "<b>IMEI:</b>&nbsp;&nbsp" + vent.IMEI +
                "&nbsp;&nbsp<b>定位时间:</b>&nbsp;&nbsp" + vent.TIME + "<br/>" +
                "<b>经纬度:</b>&nbsp;&nbsp" + vent.X + "," + vent.Y +
                "&nbsp;&nbsp<b>定位精度:</b>&nbsp;&nbsp" + vent.ACCURACY + "<br/>" +
                "<b>备注:</b>&nbsp;&nbsp" + vent.REMARK + "&nbsp;&nbsp<b>上传说明:</b>&nbsp;&nbsp" + vent.INFO;
            // 替换无效字符
            vinfo = vinfo.replace(/null/g, "");
            vinfo = vinfo.replace(/undefined/g, "");

            $("#detailinfo").html(vinfo);
            //准备图片
            var vimgsar = fill_img_array(vent);
            for (var i = 0; i < 5; i++) {
                var j = i + 1;
                if (isinited(vimgsar[i])) {
                    $("#img" + j).attr('src', vimgbase + vimgsar[i]);
                    $("#img" + j).show();
                    $("#li" + j).show();
                }
                else {
                    $("#img" + j).hide();
                    $("#li" + j).hide();
                }
            }
            $('.ck-slide').ckSlide();
            //显示对话框
            $("#dlgdetail").dialog("open");
        }, error: function () {
            $.messager.alert('get_detail()', '查不到数据', 'info');
        }
    });
}

// linepts: json of datatable
function update_track_line(linepts, vvname, vimg, vtp) {
    var vlen = linepts.length;
    if (linepts === null || vlen < 2)
        return;

    var vposs = []; // Cesium.Cartesian3.fromDegreesArray([-77, 35,-77.1, 35]),
    //clear
   //viewer.entities.removeAll();
	//diming_show();

	var vprex=0,vprey=0;;
    var head = null, tail = null,middle=null,middle2=null;
	if(vlen==2){
		  for (var i = 0; i < vlen; i++) {
        var vijklmn = linepts[i];
        var vx = parseFloat(vijklmn.X);
        var vy = parseFloat(vijklmn.Y);
		//处理经纬度为零的情况，赋值为上个数据
		if(vx == 0){
			if(i==0) continue;
			else vx = parseFloat(linepts[i-1].X);
		} 
		if(vy == 0){
			if(i==0) continue;
			else vy = parseFloat(linepts[i-1].Y);
		} 
		
		//根据当前点和上个点的距离判断是否分段
		if(i>0){
			var vdis = getdist(vx,vprex,vy,vprey);
			//vdis >  0.00000000001 && 
		//	if(vposs.length >= 2)//110m
		//	{
		//		//polyline
		//		var vpl = create_polyline(vposs, linepts[0].PCID, '');
		//		viewer.entities.add(vpl);
		//		vposs=[];
		//	}	
		//	else
		{
				var vinsp = IN_SPBOX(vx, vy);
                var vppx = (vinsp) ? VSPOX : VPOX; vppx += vx;
                var vppy = (vinsp) ? VSPOY : VPOY; vppy += vy;
				vppx=vppx+lon_py;  //偏移参数ly
				vppy=vppy+lat_py;  //偏移参数ly
                vposs.push(vppx);
				vposs.push(vppy);	
				
				//vposs.push(vx);
				//vposs.push(vy);				
			}
		}
		//new pre x y
		vprex=vx;vprey=vy;
	vposs.push(vx+lon_py);
	vposs.push(vy+lat_py);
        if (i == 0 || i == (vlen - 1))//仅首尾有标签
        {
            var vht = null;
            //增加marker标记所有点位置，为后续判断状态改变图标做准备
            var vpic = (i == 0 || i == (vlen - 1)) ? vimg : '';
            var vdet = make_detail_pos(vijklmn);
            var vidvnow = 'track' + i;
            if (vtp === 'per') {
                var vinsp = IN_SPBOX(vx, vy);
                var vppx = (vinsp) ? VSPOX : VPOX; vppx += vx;
                var vppy = (vinsp) ? VSPOY : VPOY; vppy += vy;

            }
			vx=vx+lon_py;  //偏移参数ly
			vy=vy+lat_py;  //偏移参数ly
            vht = create_marker(vx, vy, vidvnow, vijklmn.NAME, vdet, vpic, 32, 32);
            if (i == 0){
				head = vht;
				}else{
				tail = vht;	
				}
        }
    }

    //polyline
	/*if(isvalid(vposs) && vposs.length > 2) {
		//绘制路径
		var vpl = create_polyline(vposs, linepts[0].PCID, '');
		viewer.entities.add(vpl);		
	}*/
    viewer.entities.add(head);
    viewer.entities.add(tail);
	var heading=Cesium.Math.toRadians(0);
	var pitch=Cesium.Math.toRadians(-90);
    viewer.zoomTo(viewer.entities,new Cesium.HeadingPitchRange(heading, pitch, 2000));
	}else{
		for (var i = 0; i < vlen; i++) {
        var vijklmn = linepts[i];
        var vx = parseFloat(vijklmn.X);
        var vy = parseFloat(vijklmn.Y);
		//处理经纬度为零的情况，赋值为上个数据
		if(vx == 0){
			if(i==0) continue;
			else vx = parseFloat(linepts[i-1].X);
		} 
		if(vy == 0){
			if(i==0) continue;
			else vy = parseFloat(linepts[i-1].Y);
		} 
		
		//根据当前点和上个点的距离判断是否分段
		if(i>0){
			var vdis = getdist(vx,vprex,vy,vprey);
			//vdis >  0.00000000001 && 
		//	if(vposs.length >= 2)//110m
		//	{
		//		//polyline
		//		var vpl = create_polyline(vposs, linepts[0].PCID, '');
		//		viewer.entities.add(vpl);
		//		vposs=[];
		//	}	
		//	else
		{
				var vinsp = IN_SPBOX(vx, vy);
                var vppx = (vinsp) ? VSPOX : VPOX; vppx += vx;
                var vppy = (vinsp) ? VSPOY : VPOY; vppy += vy;
				vppx=vppx+lon_py;  //偏移参数ly
				vppy=vppy+lat_py;  //偏移参数ly
                vposs.push(vppx);
				vposs.push(vppy);	
				
				//vposs.push(vx);
				//vposs.push(vy);				
			}
		}
		//new pre x y
		vprex=vx;vprey=vy;
	vposs.push(vx+lon_py);
	vposs.push(vy+lat_py);
        if (i == 0 || i == (vlen - 1)||i == (vlen - 2)||i == (vlen - 3))//仅首尾有标签
        {
            var vht = null;
            //增加marker标记所有点位置，为后续判断状态改变图标做准备
            //var vpic = (i == 0 || i == (vlen - 1)||i == (vlen - 2)) ? vimg : '';
			if(i == (vlen - 2)){
				var vpic ="images/per11.png";
			}else{
				var vpic ="images/per22.png";
			}
            var vdet = make_detail_pos3(vijklmn);
            var vidvnow = 'track' + i;
            if (vtp === 'per') {
                var vinsp = IN_SPBOX(vx, vy);
                var vppx = (vinsp) ? VSPOX : VPOX; vppx += vx;
                var vppy = (vinsp) ? VSPOY : VPOY; vppy += vy;

            }
			vx=vx+lon_py;  //偏移参数ly
			vy=vy+lat_py;  //偏移参数ly
            vht = create_marker(vx, vy, vidvnow, vijklmn.NAME, vdet, vpic, 32, 32);
            if (i == 0){
				head = vht;
				}else if(i == (vlen - 1)){
				tail = vht;	
				}else if(i == (vlen - 2)){
				 middle=vht; 
				}else if(i == (vlen - 3)){
				 middle2=vht;
				}
        }
    }

    //polyline
	/*if(isvalid(vposs) && vposs.length > 2) {
		//绘制路径
		var vpl = create_polyline(vposs, linepts[0].PCID, '');
		viewer.entities.add(vpl);		
	}*/
    viewer.entities.add(head);
    viewer.entities.add(tail);
	viewer.entities.add(middle);
	var post_enti=viewer.entities.add(middle2);
	var heading=Cesium.Math.toRadians(0);
	var pitch=Cesium.Math.toRadians(-90);
    viewer.zoomTo(post_enti,new Cesium.HeadingPitchRange(heading, pitch,5000));
	}
    
}

function hide_btns(vno) {
    var vdiv = $('#menushow');
    vdiv.toggle();
    //vdiv.style.display = (1 === vno) ? 'none' : 'block';

    var vrr = $('#menuhide');
    vrr.toggle();
    //vrr.style.display = (1 === vno) ? 'block' : 'none';
}

function close_wins() {
    $("#dlgtrack").dialog('close');
    $("#dlgstat").dialog('close');
    open_speed_limit(false);
    $("#dlg_fences_set").dialog("close");
    $("#dlgdetail").dialog("close"); //

    //禁止用户选择查询类型，只能由菜单选择
    $("#state").combobox("disable");
}

function stop_watch() {
    if (isinited(vtimer)) {
        clearInterval(vtimer); //(vtimer);clearTimeout
        $.messager.alert('timer_rt_pos()', '停止监控', 'info');
    }
    vtimer = null;
    vmode_now = vmodes.MM_INIT;
}

/*
说明：
将车辆和人员的实时信息进行统一，在实时监控时提供视图view
包含信息：id,pcid(imei/carid),x,y,time,speed。人员speed默认为0.
2015年10月16日 goose 
*/

//carrt perrt allrt
function rt_pos(vpara) {
    vpara = vpara.toUpperCase();

    close_wins(); // 隐藏相关对话框
    //viewer.entities.removeAll();

    //设置图层显隐
    switch (vpara) {
        case "CARRT":
            //vgcar.setVisibility(true);
            if (!isinited(vjson_carlist)) {
                $.messager.alert('error open_stat_warn()',
                    '车辆列表为空，请单击“加载车辆、人员列表”', 'error');
                return;
            }
            fill_markers_car(); // 设置车辆图层
            break;
        case "PERRT":
            //vgper.setVisibility(true);
            if (!isinited(vjson_perlist)) {
                $.messager.alert('error open_stat_warn()',
                    '人员列表为空，请单击“加载车辆、人员列表”', 'error');
                return;
            }
            fill_markers_person(); //设置人员图层
            break;
        case "ALLRT":
        case "POSRT":
            //vgcar.setVisibility(true);
            //vgper.setVisibility(true);
            if (!isinited(vjson_perlist) || !isinited(vjson_perlist)) {
                $.messager.alert('error open_stat_warn()',
                    '车辆、人员列表为空，请单击“加载车辆、人员列表”', 'error');
                return;
            }
            fill_markers_car(); // 设置车辆图层
            fill_markers_person(); //设置人员图层
            break;
    }

    // 因为第一次启动的时候已经进行了数据缓存，所有车辆和人员列表就不用再次发送请求
    vmode_now = vmodes.MM_RT; //默认是实时位置监控
    // 启动定时器，每隔1s取一次位置数据，以及速度。
    stop_watch();
    var vcbfun = "timer_rt_pos('" + vpara + "')";
    if (vtimer === null) vtimer = setInterval(vcbfun, 3000);
    $.messager.alert('rt_pos()', '开始监控', 'info');
}

//进入实时监控模式，默认监控所有车辆，必要时增加监控单独车辆的功能。
function back2_realtime(vpara) {
    //if (vmode_now === vmodes.MM_RT) return;
    vmode_now = vmodes.MM_INIT; //首先初始化，然后启动进入实时状态
    rt_pos(vpara.toUpperCase());
}

// vpara: 'CARRT','PERRT','ALLRT','POSRT'
function timer_rt_pos(vpara) {
    vpara = vpara.toUpperCase();

    var vnoew = (new Date()).Format("yyyy-MM-dd hh:mm:ss") //2006-07-02 08:09:04 
    //vnoew = "2015-11-05 10: 02: 24";//"2010-07-23 02:24:21";//测试用时间 
    //if (vpara === "PERRT") vnoew = "2015-10-21 11:38:16";

    //ajax to get info
    $.ajax({
        type: "post",
        url: vaddbase + "bxsstatistic.aspx",
        data: { "QTYPE": vpara, 'TIME': vnoew },
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        beforeSend: function (XMLHttpRequest) {
            //ShowLoading();
        },
        complete: function (XMLHttpRequest, textStatus) {
            //HideLoading();
        },
        success: function (data, textStatus) {
            update_markers(data);
        },
        error: function (datas) {
            //请求出错处理
            $.messager.alert('timer_rt_pos()', 'error', 'info');
        }
    });
}

//通过setGeometry函数更新当前标记的位置，如果不可以就通过先删除，后添加的方式
function update_marker_per(vijklmn) {
    var vidx = find_idx_viewer(vijklmn.PCID); 
    if (!isvalid(vidx)) return null;

    var vinsp = IN_SPBOX(vx, vy);
    var vppx = (vinsp) ? VSPOX : VPOX;
    var vppy = (vinsp) ? VSPOY : VPOY;

    var vx = parseFloat(vijklmn.X + vppx);
    var vy = parseFloat(vijklmn.Y + vppy);

    viewer.entities.removeById(vidx);

    var venti = create_marker(vx, vy, vidx, vijklmn.NAME, make_detail_pos(vijklmn),
    	'images/per32.png', 32, 32);
   viewer.entities.add(venti);
   return venti;}

function update_marker_car(vijklmn) {
    var vidx = find_idx_viewer( vijklmn.PCID );
    if (!isvalid(vidx)) return null;

    var vx = parseFloat(vijklmn.X);
    var vy = parseFloat(vijklmn.Y);

    viewer.entities.removeById(vidx);

    var venti = create_marker(vx, vy, vidx, vijklmn.NAME, make_detail_pos(vijklmn),
    	'images/car32.png', 32, 32);
    viewer.entities.add(venti);

    if (vsped >= vspeed_max) {
        vttl = '车辆超速行驶！';
        vmsssg = "驾驶员：" + vijklmn.NAME +
                "<br/>当前速度： " + vsped +
                "  限速: " + vspeed_min + "至" + vspeed_max;
        $.messager.show({
            title: vttl,
            msg: vmsssg,
            timeout: 3000,
            showType: 'slide',
            style: {
                left: 0,
                right: '',
                top: '',
                bottom: -document.body.scrollTop - document.documentElement.scrollTop
            }
        });
    }
	
	return  venti;
}

// view 形式表示数据 ID PCID X Y accuracy TIME SPEED 
//通过setGeometry函数更新当前标记的位置，如果不可以就通过先删除，后添加的方式
function update_markers(vrtpos) {
    if (isinited(vrtpos) && isinited(vrtpos.ERR)) {
        $.messager.show({
            title: '查询实时位置出错！',
            msg: vrtpos.ERR,
            timeout: 2000,
            showType: 'slide',
            style: {
                left: 0,
                right: '',
                top: '',
                bottom: -document.body.scrollTop - document.documentElement.scrollTop
            }
        });
        return;
    }

    var vlen = vrtpos.length;
    if (!isinited(vlen)) return;

    var vpt;
    for (var i = 0; i < vlen; i++) {
        var vijklmn = vrtpos[i];

        var vtp = car_or_per(vijklmn.PCID);
        if (vtp === 'car')
            vpt = update_marker_car(vijklmn);
        else if (vtp === 'per')//人员只需要判断电子围栏即可以及是否出勤
            vpt = update_marker_per(vijklmn);
    }

    $.messager.show({
        title: '实时位置',
        msg: '实时位置：' + vlen + '个',
        timeout: 2000,
        showType: 'slide',
        style: {
            left: 0,
            right: '',
            top: '',
            bottom: -document.body.scrollTop - document.documentElement.scrollTop
        }
    });

	//if(isvalid(vpt))
		//viewer.flyTo(vpt);
}

function submitForm() {
	
    //$('#ff').form('submit');
    var vvid = $("#selidstat").combobox('getValue');
    var vquetype = parseInt($("#state").combobox('getValue'));
    //查询里程统计时，改变参数，其他都是获取轨迹数据，然后进行判断
    var vqkey = "CARTRK"; //(vquetype === 2) ? "DISTOIL" : 
    if (vquetype < 200) vqkey = "CARTRK";
    if (vquetype > 200) vqkey = "PERTRK";
    var vfromtime=$("#tqbeginstat").textbox('getValue');
    var vtotime=$("#tqendstat").textbox('getValue');

    $.ajax({
        type: "POST",
        url: vaddbase + "Handler3.ashx",
	      //url: 'http://203.93.127.134:11934/Handler3.ashx', 
        //我们用text格式接收
        dataType: "json",
        data: {
            'QTYPE': vqkey,
            'ID': vvid,
            'FROM': vfromtime,
            'TO': vtotime
        },
        success: function (msg) {
            //$.messager.progress('close');	// hide progress bar while submit successfully
            if (!isinited(msg) || isinited(msg.ERR)) {
                $.messager.alert('查询统计', (msg.ERR != "") ? msg.ERR : '没有相关数据', 'info');
                return;
            }
            // 清空信息，包括车辆图层以及人员图层

            //里程统计 理解错误 里程自己根据坐标计算
            //if (vquetype === 2) return stat_dist(msg);
            // 其他统计信息的获取
            // 首先处理轨迹数据，然后根据查询类型进行相应判断统计，
            // 以不同图标显示特殊数据。
            stat_track(msg); // 查询的轨迹线存在map.graphics图层中
            $("#btndetail").hide();
            switch (vquetype) {
                case 2: //里程计算
                case 444: //人员里程统计
                    stat_dist();
                    break;
                case 3: //轨迹查询
                    break;
                case 222: //人员轨迹查询   
                    $("#btndetail").show();
                    break;
                case 4: //统计指定日期的所有车辆的警报信息 待实现！！！！
                    //stat_alarms_date();
                    break;
                case 11: //超速
                    stat_alarms_speed();
                    break;
                case 12: //电子围栏
                    stat_alarms_fence();
                    break;
                case 1: //当前车辆指定日期的全部警报
                    stat_alarms();
                    break;
                case 333: //人员预警信息统计
                    break;
                default:
                    break;
            }
        },
        error: function () {
            //$.messager.progress('close');	// hide progress bar while submit successfully
            // view("异常！");    
            $.messager.alert('轨迹查询', '查询轨迹失败', 'info');
            //alert("异常！");    
        }
    });
    // submit the form
    //$.messager.progress();	// display the progress bar
}

function clearForm() {
    $('#fftrack').form('clear');
}

function reload_data() {
    init_perlist();
    init_carlist();
    //init_perlist(); //初始化人员列表信息,默认不显示，不监控
    //init_carlist(); // 进入实时监控模式，默认显示并实时监控

}

//设置选择框的内容为车辆列表_
function prepare_list_car() {
    $("#ncp").text("选择车辆:");
    fill_data_grid("#selidstat", vjson_carlist);
    if (vgcar != null) vgcar.removeAll();
}

//设置选择框的内容为人员列表
function prepare_list_per() {
    $("#ncp").text("选择人员:");
    fill_data_grid("#selidstat", vjson_perlist);
    if (vgper != null) vgper.removeAll();
    vcur_pos_idx = -1;
}

//打开查询对话框
function open_stat_warn(vm, bopen) {
    if (vm < 200) {
        if (!isinited(vjson_carlist)) {
            $.messager.alert('error open_stat_warn()',
                '车辆列表为空，请单击“加载车辆、人员列表”', 'error');
            return;
        }
    }
    if (vm > 200) {
        if (!isinited(vjson_perlist)) {
            $.messager.alert('error open_stat_warn()',
                '人员列表为空，请单击“加载车辆、人员列表”', 'error');
            return;
        }
    }
    // 首先停止实时监控，转换状态为历史信息查询模式
    stop_watch();
    vmode_now = vmodes.MM_HIS; //进入历史信息查询模式

    //确定车辆列表存在
    if (bopen) {
        $("#btndetail").hide();
        if (vm < 200) {
            prepare_list_car();
            $("#selidstat").combobox('select', '9091215557');
        }
        if (vm > 200) {
            $("#btndetail").show();
            prepare_list_per();
        }

        $("#state").combobox('setValue', vm);
        //初始化未查询之前的slider为不可用状态，避免错误
        $("#sliderhstat").slider('disable');
        //清空当前的标注，或者在查询成功后再删除标注亦可
        $("#dlgstat").dialog('open');
    }
    else {
        back2_realtime("CARRT");
    }
}

// 设置电子围栏
function open_fence(vm) {
    $('#dlg_fences_set').dialog('open');

    switch (vm) {
        case 1: //车辆
            break;
        case 2: //人员
            break;
    }
}
