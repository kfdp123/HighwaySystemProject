
///////////////////////////////////////////////////////////////////////////
//全局变量
var __GVSTATIONS = null;

var __GFUNC = {
    INIT:"INIT",
    ONE: "1STA_",
    N: "NSTA_",
    DIS: "DISSTA_",

    ONE_PEAK: "1STA_PEAK_",
    N_PEAK: "NSTA_PEAK_",
    DIS_PEAK: "DISSTA_PEAK_",

    ONE_EVEN: "1STA_EVEN_",
    N_EVEN: "NSTA_EVEN_",
    DIS_EVEN: "DISSTA_EVEN_"
};


//中当前操作状态
var _GVOPTNOW = __GFUNC.INIT;
var __GVIDS = {
    DLGSEARCH:"#dlgqueryswdb",
    SEARCH: "#stahistquery",
    ONE: "#onesta",
    N: "#multista",
    PEAK: "#minmax1sta",
    NPEAK: "#minmaxNsta",
    DLG: "#dlgqueryswdb",
    STA: "#selswstation",
    FROM: "#tqbeginsw",
    TO: "#tqendsw",
    RAIN: "#selrs",
    RESERVE: "#txtreserveddt",


    DLGRESULT: "#dgstahistory",
    DLGPEAK: "#dgstapeak"
}

var __GVTIME = ['ss', 'hh', 'dd', 'mon', 'yy'];
var __GVDTADD = ['', ':00:00', ' 00:00:00', '-01 00:00:00', '-01-01 00:00:00'];

var __gvrtulist = [];//rtu list
// xy初始值，对于无效的数字给定之！
var _gRTUINITX = 117.13444, _gRTUINITY = 39.067332;
var _gAddress="http://localhost:5555/";

var __VIDSSEL = null;//选中的要进行查询操作的站点编号字符串，以逗号分隔
var __VQPRE = 'NSTA_';
var __OPEN_CHECKBOX=false;
var __TIMER_RT=null;
///////////////////////////////////////////////////////////////////////////
function isvalid(vvv)
{
    return (vvv != null && vvv != 'undefined');
}

function isbad(vvv) {
    return (vvv == null || vvv == 'undefined');
}

///////////////////////////////////////////////////////////////////////
//main及必要的初始化  时间字符串 在客户端完成 2018-01-17 15:32:11格式的拼装
///////////////////////////////////////////////////////////////////////
function tree_ckbox(node) {
    if (node.attributes != null && node.attributes.staid != null)
        return true;

    return false;
}

function open_treebox(vchk)
{
    var vopt = $('#treestas').tree('options');
    vopt.checkbox = __OPEN_CHECKBOX = vchk;
    $('#treestas').tree('loadData', __VPCACODEHN);

    $("#swasaveas").hide();
    fill_stations(__GVSTATIONS);
    $("#wstastatus").window('open');
}
///////////////////////////////////////////////////////////////////////
//通用ready函数查询
///////////////////////////////////////////////////////////////////////

$(document).ready(function () {
    //原始数据的h表
    $(".easyui-dialog").dialog('close');
    $(".easyui-window").window('close');
    //工具栏
    $("#swmain").click(function () {
        $("#wtoolbar").window('open');
		//必要的初始化		//1 加载权限范围内的测站列表
		sw_query_info(fill_stations, 'STATIONLIST', null, null);
		//$("#utistatus").click();
	});
	    //加载测站树列表 更新状态列表
    $("#utistatus").click(function () {
        open_treebox(false);
    });

    _GVOPTNOW = __GFUNC.INIT;

    //用户管理对话框
    //新建用户
    $("#usrmgrlogin").click(function () {
        $("#dlglogin").dialog('open');
    });

    //新建用户
    $("#usrmgrnew").click(function () {
        $("#dlgnewuser").dialog('open');
    });

    //删除用户
    $("#usrmgrdel").click(function () {
        //$("#").dialog('open');
    });
    
    //修改密码
    $("#usrmgrchgpsw").click(function () {
        $("#dlgchgpsw").dialog('open');
    });

    //权限分配
    $("#usrmgrgrant").click(function () {
        //$("#").dialog('open');
    });

    //站点分配
    $("#usrmgrstas").click(function () {
        //$("#").dialog('open');
    });

	//生成等值线数据
    $("#utilisobands").click(function () {
        //rain/snow ，起止时间,  等值线时间间隔
        $("#dlgisobands").dialog('open');
    });

    //生成等值线数据
    $("#btndlgisobands").click(function () {
        //rain/snow ，起止时间,  等值线时间间隔
        var vfm = $("#tqbeginiso").textbox('getValue') ;
        var vto = $("#tqendiso").textbox('getValue') ;
        var vrs = $("#selrsiso").combobox('getValue');//rain snow
        var vspan = $("#seltspaniso").combobox('getValue');//5 10 
        sw_query_info(paint_isobands, 'ISOBAND', vfm, vto, null,vrs, vspan);
    });

    //打开站点查找定位对话框
    $("#utilocatebykey").click(function () {
        $("#dlglocatesta").dialog('open');
    });
    //手动计算统计数据表
    $("#utiupdatehhmonyy").click(function () {
        //手动启动后台自动创建h dd mon yy表格的功能
    });
	

    //打开站点选择对话框
    $("#swaselstasss").click(function () {
        __OPEN_CHECKBOX = false;
        $("#wstastatus").window('close');

        //重新加载
        open_treebox(true);
    });

    //打开定时器，定时查询最新数据.
    $("#rtstass").click(function () {
        //get_latest_status
		init_timer();
        $.messager.confirm('监控类型', '开始降雨量实时监控，单击OK\n如果需要监控降雪量,单击Cancel',
            function (r) {
                var vrs = (r) ? 'rain' : 'snow';
                var vfun = "get_latest_status( '' ,'" + vrs + "')";
                __TIMER_RT = setTimeout( vfun, 1000);
        });
    });

    //执行查询历史数据查询
    $("#swdlgquerygogo").click(function () {
        if (null == __VIDSSEL || 'undefined' == __VIDSSEL) {
            alert("未选中任何站点，请重新选择");
            return;
        }
        //获取站点 及其他参数
        var vdttp = __VQPRE + $("#swtgseldttp").textbox('getValue');
        //$(__GVIDS.RESERVE + vinownow).textbox('getvalue');
        var vfm = $("#swtgdtfrom").textbox('getValue');
        var vto = $("#swtgdtto").textbox('getValue');
        var vrs = $("#swtgselrors").combobox('getValue');//rain snow

        sw_query_info(fill_nstations_query, vdttp.toUpperCase(), vfm, vto,
            __VIDSSEL, vrs);
    });

    //数据查询 单个或者多个测站
    $("#stahistss").click(function () {
        __VQPRE = 'NSTA_';
        query_statistic('ss');
    });
    //统计数据查询 以小时为单位 单个或者多个测站
    $("#stayy").click( function () {
        __VQPRE = 'NSTA_';
        query_statistic('yy');
    });
    //统计数据查询 以小时为单位 单个或者多个测站
    $("#stamon").click( function () {
        __VQPRE = 'NSTA_';
        query_statistic('mon');
    });
    //统计数据查询 以小时为单位 单个或者多个测站
    $("#stadd").click( function () {
        __VQPRE = 'NSTA_';
        query_statistic('dd');
    });
    //统计数据查询 以小时为单位 单个或者多个测站
    $("#stahh").click( function () {
        __VQPRE = 'NSTA_';
        query_statistic('hh');
    });

    // change the http request parameters before load data from server
    $('#swtgdtfrom,#swtgdtto,#swtgselrors,#swtgseldttp').combo({
        onChange: function (newValue, oldValue) {
            $("#swasaveas").hide();
        }
    });

    function query_statistic(vhhddmmyy)
    {
		init_timer();
        __OPEN_CHECKBOX = true;
        __VIDSSEL = null;//初始化选择的站点为空
        var ttle = ('ss' == vhhddmmyy) ? '降雨量/降雪量查询' :
            "降雨量/降雪量查询.请勿选择'原始数据'";
        //$("#rsmsg").html(ttle);
        //$("#rsmsg").attr("title", ttle);
        $('#swtgseldttp').combobox('select', vhhddmmyy);
        $('#swtgseldttp').combobox('disable');
        //$("#dlgquery").dialog('open'); 
        $("#swdlgquery").dialog('open'); 
    }
    

    //统计数据极值查询 以年为单位 单个或者多个测站
    $("#minmaxyy").click(function () {
        __VQPRE = 'NSTA_PEAK_';
        query_statistic('yy');
    });

    //统计数据极值查询 以月为单位 单个或者多个测站
    $("#minmaxmon").click(function () {
        __VQPRE = 'NSTA_PEAK_';
        query_statistic('mon');

    });

    //统计数据极值查询 以日为单位 单个或者多个测站
    $("#minmaxdd").click(function () {
        __VQPRE = 'NSTA_PEAK_';
        query_statistic('dd');

    });

    //统计数据极值查询 以小时为单位 单个或者多个测站
    $("#minmaxhh").click(function () {
        __VQPRE = 'NSTA_PEAK_';
        query_statistic('hh');

    });

    //统计数据极值查询 以秒为单位 单个或者多个测站
    $("#minmaxss").click(function () {
        __VQPRE = 'NSTA_PEAK_';
        query_statistic('ss');
    });

    //重新加载测站列表 
    $("#utiloadstas").click(function () {
        sw_query_info(fill_stations, 'STATIONLIST', null, null);
    });

    //双击站点树，控制地图缩放至所选站点
    $('#treestas').tree({
        //data: __VPCACODEHN,
        checkbox: tree_ckbox,
        onClick: function (node) {
            //$('#treestas').tree('select', node.target);
        },
        onDblClick: function (node) {
            //alert('测站 ' + node.text + ' 被选中');  // alert node text property when clicked
            if ( isvalid( node.attributes)) {
                var vx = node.attributes.x;
                var vy = node.attributes.y;
				if(isvalid(vx) && isvalid(vy))
				{
					vx=parseFloat(vx);
					vy=parseFloat(vy);
					// 1. Fly to a position with a top-down view
					viewer.camera.flyTo({
						destination: Cesium.Cartesian3.fromDegrees(vx, vy, 15000.0)
					});
				}
            }
        },
        onLoadSuccess: function (node, data) {
            //alert(node.text);  // alert node text property when clicked
            //__VTREEDATA = data;
        },
        onContextMenu: function (e, node) {
            e.preventDefault();
            // select the node
            $('#treestas').tree('select', node.target);
            // display context menu
            $('#mm').menu('show', {
                left: e.pageX,
                top: e.pageY
            });
        }
    });
	
	    $('#wtoolbar').window({
        onClose: function () {
			if(__gvrtulist)
			{
				for(var i=0;i<__gvrtulist.length;i++)
					viewer.entities.remove(__gvrtulist[i]);
				__gvrtulist=[];
			}
			if(_gkmlisoband)
			{
				viewer.dataSources.removeAll();
				//clear first
				//var vkml=_gkmlisoband.length;
				//for(var k=0;k<vkml;k++)//失败，不知道为什么图层不消失
				//viewer.dataSources.remove(_gkmlisoband[k]);
				_gkmlisoband=[];
			}
			_gvisobandskmls=[];
		}
		});
$('#wtoolbar').window('close');

    $('#wstastatus').window({
        onClose: function () {
            //返回选择的站点编号
            if (__OPEN_CHECKBOX)//
            {
                //// get checked nodes
                var nodes = $('#treestas').tree('getChecked');
                if ( isbad(nodes) || nodes.length < 1) {
                    $.messager.confirm('重新选择',
                        '没有选择任何站点信息，是否重新选择？',
                        function (r) {
                            if (r) {
                                $('#wstastatus').window('open');
                                return;
                            }
                            //else $('#wstastatus').window('close');
                        });
                    return;
                }

                var ids = [];
                var vlen = nodes.length;
                for (var i = 0; i < vlen; i++) {
                    var vatts = nodes[i].attributes;

                    if (isbad(vatts))
                        continue;
                    if (isbad(vatts.staid))
                        continue;

                    ids.push(vatts.staid);
                }
                if (ids.length > 1)
                    __VIDSSEL = ids.join(',');
                else if (ids.length < 1)
                    __VIDSSEL = null;
                else
                    __VIDSSEL = ids[0];
                //激活查询按钮
                $('#swdlgquerygogo').linkbutton('enable');

                __OPEN_CHECKBOX = false;
            }
            //alert('loaded successfully');
        }
    });
	
    $("#wstastatus").window('close');
});


///////////////////////////////////////////////////////////////////////
//查询结果展示，貌似是两个同类函数
//多站点正常查询 HISTORY_SS 在另外文件jschart.js
//多站点正常查询 HISTORY_N_SS
function fill_nstations_query(vjson) {
    if ( isbad( vjson ))    return;
	  
	var vxlsnm = vjson.name;
    if (isbad( vxlsnm ))      return;
    //for xls download
    $("#swasaveas").attr('href', _gAddress + vxlsnm);
    $("#swasaveas").show();
	
    var vdst = vjson.dataset;
    if (isbad(vdst))        return;
    var vtable = vdst.Table;
    if (isbad(vtable ))      return;

    var vidtg= (vxlsnm.indexOf('peak', 0) >= 0) ?
         '#dgstapeak' : '#dgstahistory';
    //这样+分组+分页的不知道结果是什么样子
    $(vidtg).datagrid({ loadFilter: pagerFilter })
                  .datagrid('loadData', vtable);
	$(vidtg).datagrid('fitColumns');  // fit all columns size

    //chart
    fill_station_chart(vtable);
    __OPEN_CHECKBOX = false;
    $("#dlgrwresult").window('open');
}

//多站点极值正常查询 HISTORY_N_SS
function fill_nstation_peak_query(vjson) {
    if (vjson == null || vjson == 'undefined')
        return;
    var vtable = vjson.Table;
    if (vtable == null || vtable == 'undefined')
        return;
    //这样+分组+分页的不知道结果是什么样子
    $('#dgstapeak').datagrid({ loadFilter: pagerFilter })
                  .datagrid('loadData', vjson.Table);
    $("#dlgrwresult").window('open');
}

function doSearch(value, name) {
    ///alert('输入信息为: ' + value + '(' + name + ')');
    if(__GVSTATIONS == null || 'undefined' == __GVSTATIONS)
    {
        alert("站点列表为空，请重新加载站点.");
        return -1;
    }
    if (name == 'all') {
        var ino = find_station('stno', value);
        var inm = find_station('stname', value);
        var iad = find_station('address', value);
        if (ino >= 0) return ino;
        if (inm >= 0) return inm;
        if (iad >= 0) return iad;
    }
    else{
        return  find_station(name, value);
    }

    alert('找不到站点');
    return -1;
}

function find_station(vkey, vvalue) {
    if (__GVSTATIONS == null) return -2;
    if (__GVSTATIONS.Table == null) return -2;

    var vlen = __GVSTATIONS.Table.length;
    for (var i = 0; i < vlen; i++) {
        var vijk = __GVSTATIONS.Table[i];
        if ( isbad( vijk )) continue;

        var vvijk = vijk[vkey];
        if ( isbad(vvijk ))
            continue;

        var vvv = "" + vvalue;//数字转字符串
        if (vvv == vvijk)
            return i;
    }

    //alert('找不到站点');
    return -1;
}

function init_timer()
{
	if (__TIMER_RT != null) clearTimeout(__TIMER_RT);
	__TIMER_RT = null;
}
///////////////////////////////////////////////////////////////////////
//测试
/////////////////////////////////////////////////////////////////////// 

/*
$(document).ready(function () {

    //测试用
    $("#btnstationlist").click(function () {
    });

    $("#btnrainquery").click(function () {
        $("#selswstation").combobox('setValue', 13);
        $("#dlgqueryswdb").dialog('open');
    });

    $("#stahistquery").click(function () {
        var vid = $("#selswstation").combobox('getValue');
        var vfromtime = $("#tqbeginsw").textbox('getValue');
        var vtotime = $("#tqendsw").textbox('getValue');
        var vstatp = "Rain";
        sw_query_info(fill_station_query, 'HISTORY', vfromtime, vtotime, vid, vstatp);
    });

    $("#btnsnowquery").click(function () {
        $("#dlgqueryswdb").dialog('open');
    });
    //测试结束

});
*/
///////////////////////////////////////////////////////////////////////////

//vcallbk 成功后的回调函数 其参数为json数据 
function sw_query_info(vcallbk,vqtype, vfrom, vto, vid, vrainsnow,vspan) {
    $.ajax({
        url: _gAddress + 'gHDBserver.ashx',
        type: 'GET', //GET POST
        async: true,    //或false,是否异步
        data: {
            QUERY: vqtype, ID: vid,
            FROM: vfrom, TO: vto,
            RAINSNOW: vrainsnow,TIMESPAN:vspan//isoband时间间隔
        },
        timeout: 300000,    //超时时间
        dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
        beforeSend: function (xhr) {
            //console.log(xhr);
            //console.log('发送前');
        },
        success: function (data, textStatus, jqXHR) {
            if(vcallbk != null) vcallbk(data);
        },
        error: function (xhr, textStatus) {
            alert(textStatus);
        },
        complete: function () {
            //console.log('结束');
        }
    })
}

//设备电压低于10 红色警告
function formatvolt(val, row) {
    if (val < 10) {
        return '<span style="color:red;">(' + val + ')</span>';
    } else {
        return val;
    }
}

//填成查询表格里的站点号
function fill_stations_into_combox(vcbid) {
    var vstas = [];
    var vtbl = __GVSTATIONS.Table;
    var vlen = vtbl.length;
    for (var i = 0; i < vlen; i++) {
        var voj = {
            stano: vtbl[i].stno,
            staname: vtbl[i].stname + vtbl[i].stno//有正式名字后修改goose
        };
        vstas.push(voj);
    }
    //test
    vstas.push({ stano: '13', staname: '测试' });

    $('#' + vcbid).combobox('loadData', vstas);
}

//填充站点表
function fill_stations(vjson) {
    if (vjson == null || vjson == 'undefined')
        return;
	if(null == __GVSTATIONS)
		__GVSTATIONS = vjson;

    //显示至球上 goose
    fill_markers_rtu();
	fill_status(__GVSTATIONS);
    //折叠树控件
    sw_tree_collapse();
}


function tree_formatno(node){
    var s=node.text;
    if (node.children){
        s += ('&nbsp;<span style=\' color:blue\'>(' +
        node.children.length + ')</span>');
    }
    return s;
}


function fill_status(vdataset)
{
   if (vdataset == null || vdataset == 'undefined')
        return;
    var vtree = $("#treestas");
    if (null == vtree || 'undefined' == vtree) return;

    //加载到树表格控件上
    var vjson = vdataset.Table;
    if (null == vjson || 'undefined' == vjson) return;

    var vlen = vjson.length;
    for (var i = 0; i < vlen; i++) {
        ///parent
        var vcode = vjson[i].deptcode;
        var vparent = vtree.tree('find', vcode);
        if (null == vparent || 'undefined' == vparent)
            continue;
        var vnodeme = vtree.tree('find', vjson[i].stno);
        if (vnodeme != null) continue;

        ///append
        var vnodee = {
            parent: vparent.target,
            data: [{
                id: vjson[i].stno,
                text: vjson[i].stno + '_' + vjson[i].stname,
                checked: false,
                attributes: {
                    staid: vjson[i].stno,
                    water: vjson[i].water,
                    river: vjson[i].river,
                    address: vjson[i].address,
                    x: vjson[i].x,
                    y: vjson[i].y
                }
            }]
        };

        vtree.tree('append', vnodee);
    }
}

function sw_tree_collapse() {
	tree_collapse("#treestas");
}



//根据站点号、地址或者名称查询站点
function search_station()
{
    $("#dlglocatesta").dialog('open');    
}

///////////////////////////////////////////////////////////////////////////

//填充站点时间查询表
function fill_station_chart(vjson) {
    var vdset = prepare_emchart_dataset(vjson);
    if (null == vdset) {
        alert("数据解析失败");
    }
    
    //创建stock站点瞬间及累积降水直方图
    create_emchart("emmyChartrs", vdset.rt, "站点累积降水量", "站点当前降水量");
    //创建stock河道瞬间及累积水位直方图
    create_emchart("emmyChartwater", vdset.acc, "河道累积水位", "河道当前水位");

    $("a[href='http://www.amcharts.com']").css('display', 'none');
}

//将统一的表格转换为多个表格，用于显示多数据集。
//原始数据格式为站点号 ...其他信息
// datatable
//结果为根据站点号的多个表格数据，以emchart控件使用
function prepare_emchart_dataset(vdata) {
    if ( isbad(vdata)) return null;
    //遍历然后获取所有的站点号
    var vtable = vdata;

    var vchartdtacc = new Array();//累计降雨量
    var vchartdtrt = new Array();//降雨量

    var vlen = vtable.length;
    for (var i = 0; i < vlen; i++) {
        var vsstaij = vtable[i].stano;
        if (vsstaij == null || vsstaij == 'undefined') continue;

        if (vchartdtrt[vsstaij] == null) {
            vchartdtrt[vsstaij] = [];
            vchartdtacc[vsstaij] = [];
        }
        //将该数据加入数据集中
        var vcktm = vtable[i].RainCheckTime;
        if (null == vcktm || 'undefined' == vcktm)
            continue;
        vcktm = vcktm.replace('T', ' ');;//2018-01-03T06:05:39
        var vdt = vcktm.split(/[\-\s\:]{1}/);//2018-01-03 06:05:39

        vchartdtrt[vsstaij].push({
            date: new Date(vdt[0], vdt[1] - 1, vdt[2], vdt[3], vdt[4], vdt[5]),
            value: vtable[i].Rainfall,
            volume: vtable[i].AccumulatedRainfall
        });
        //
        var vwckt = vtable[i].WaterCheckTime;
        if (null == vwckt || 'undefinied' == vwckt)
            continue;
        vwckt = vwckt.replace('T', ' ');;//2018-01-03T06:05:39
        var vdt = vwckt.split(/[\-\s\:]{1}/);//2018-01-03 06:05:39
        vchartdtacc[vsstaij].push({
            date: new Date(vdt[0], vdt[1] - 1, vdt[2], vdt[3], vdt[4], vdt[5]),
            value: vtable[i].InstanteWaterLevel,
            volume: vtable[i].InstanteWaterLevel
        });
    }
    return { 'rt': vchartdtrt, 'acc': vchartdtacc };
}

//vdata: dictionary {key : stano, value: data}
function create_emchart(vdiv, vdata, vvolume, vvalue) {
    var vdatasets = [];
    var vlen = vdata.length;
    for (var i in vdata) {
        vdatasets.push({
            //color: "#b0de09",
            fieldMappings: [{
                fromField: "value",
                toField: "value"
            }, {
                fromField: "volume",
                toField: "volume"
            }],
            title: i,
            dataProvider: vdata[i],
            categoryField: "date"
        });
    }

    var chart = AmCharts.makeChart(vdiv, {

        type: "stock",
        categoryAxesSettings: {
            minPeriod: "ss"//second
        },
        dataSets: vdatasets,
        panels: [{
            showCategoryAxis: false,
            title: vvalue,//"当前降水量"
            percentHeight: 70,
            valueAxes: [{
                id: "v1"
            }],
            stockGraphs: [{
                id: "g1",
                valueField: "value",
                type: "smoothedLine",
                lineThickness: 2,
                bullet: "round"
            }],
            stockLegend: {
                valueTextRegular: " ",
                markerType: "none"
            }
        },
        {
            title: vvolume,//"累积降水量",
            percentHeight: 30,
            stockGraphs: [{
                valueField: "volume",
                type: "column",
                cornerRadiusTop: 2,
                fillAlphas: 1
            }],
            stockLegend: {
                valueTextRegular: " ",
                markerType: "none"
            }
        }],

        panelsSettings: {
            usePrefixes: true,
            creditsPosition: "bottom-right"
        },
        chartScrollbarSettings: {
            graph: "g1",
            usePeriod: "10mm",
            position: "top",
            updateOnReleaseOnly: false
        },
        chartCursorSettings: {
            valueBalloonsEnabled: true,
            valueLineBalloonEnabled: true,
            valueLineEnabled: true
        },
        "dataSetSelector": {
            "position": "left"
        },
        periodSelector: {
            position: "top",
            dateFormat: "YYYY-MM-DD HH:NN:SS",
            inputFieldWidth: 150,
            width: 380,
            periodsText: "间隔：",
            toText: "到:",
            fromText: "从:",
            periods: [
            {
                period: "hh",
                count: 1,
                label: "1小时"//,
                //selected: true
            }, {
                period: "DD",
                count: 1,
                label: "1天"
            }, {
                period: "DD",
                count: 7,
                label: "1周"
            }, {
                period: "MM",
                count: 1,
                label: "1月"
            }, {
                period: "YYYY",
                count: 1,
                label: "1年"
            }, {
                period: "MAX",
                label: "全部"
            }
            ]
        },
        pathToImages: "../images/",
        "export": {
            enabled: true,
            language: 'zh',
            position: 'top-right'
        },
        legend: {
            useGraphSettings: true,
            position: "top"
        },
        "responsive": {
            "enabled": true
        }
    });
    AmCharts.useUTC = false;
    // AmCharts.language = 'zh';
    return chart;
}

///////////////////////////////////////////////////////////////////////////

function pagerFilter(data) {
    if (typeof data.length == 'number' && typeof data.splice == 'function') {	// is array
        data = {
            total: data.length,
            rows: data
        }
    }
    var dg = $(this);
    var opts = dg.datagrid('options');
    var pager = dg.datagrid('getPager');
    pager.pagination({
        beforePageText: '第',//页数文本框前显示的汉字 
        afterPageText: '页    共 {pages} 页',
        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录',
        onSelectPage: function (pageNum, pageSize) {
            opts.pageNumber = pageNum;
            opts.pageSize = pageSize;
            pager.pagination('refresh', {
                pageNumber: pageNum,
                pageSize: pageSize
            });
            dg.datagrid('loadData', data);
        }
    });
    if (!data.originalRows) {
        data.originalRows = (data.rows);
    }
    var start = (opts.pageNumber - 1) * parseInt(opts.pageSize);
    var end = start + parseInt(opts.pageSize);
    data.rows = (data.originalRows.slice(start, end));
    return data;
}



////////////////////////////////////////////////////////////////////////////////////////
//GITR-Earth操作
////////////////////////////////////////////////////////////////////////////////////////
function fill_markers_rtu() {
    if (null == __GVSTATIONS || __GVSTATIONS.Table == null ||
        __GVSTATIONS.Table.length < 1) return;
    if (__gvrtulist != null) __gvrtulist = [];

    var vtbl = __GVSTATIONS.Table;
    var vlen = vtbl.length;
    var vx, vy;
    for (var i = 0; i < vlen; i++) {
        var vijkj = vtbl[i];
        vx = parseFloat(vijkj.x), vy = parseFloat(vijkj.y);
        // 对于无效的数字给个初始值；而不能忽略之
        if (vx <= 60 || vy <= 10 || isNaN(vx) || isNaN(vy)) {
            vx = _gRTUINITX; vy = _gRTUINITY;
        } 
		//var vid = 'car' + vgcar.values.length;
		var venet = create_marker(vx, vy, vijkj.CARID, vijkj.ENGINE_ID,
			make_detail_rtu(vijkj), 'images/meas-srok.png',32 , 32);
		__gvrtulist.push(venet);
		viewer.entities.add(venet);        
    } //mlpoint.getExtent().expand(2)
    viewer.zoomTo(viewer.entities);
    //map2d.centerAndZoom(new esri.geometry.Point(vx, vy, wgs4326), 8);
}

function fine_info(vinfo)
{
	return (isvalid(vinfo)) ? vinfo : '';
}

function make_detail_rtu(vijkj)
{
    var vdet = "<pre><p style='whiteSpace:pre;' >";
    vdet += ("站点ID:" + vijkj.stno + "&#9;");
    vdet += ("名称:" + fine_info(vijkj.stname) + "&#9;");
    vdet += ("类型:" + fine_info(vijkj.sttype) + "</br>");
    vdet += ("地址:" + fine_info(vijkj.address) + "</br>");
    vdet += ("单位:" + fine_info(vijkj.dept) + "</br>");
    vdet += ("水系:" + fine_info(vijkj.water) + "&#9;");
    vdet += ("河流:" + fine_info(vijkj.river) + "</br>");
    vdet += ("电压:" + fine_info(vijkj.voltage) + "&#9;");
    vdet += ("电压检测时间:" + fine_info(vijkj.checktime) + "</br>");
    vdet += ("<img alt='' style='width:100%;height:100%;' src='" + _gAddress + vijkj.image + "' /> </br>");
	vdet += "</br>";
	vdet += "</br>";
	vdet += "</br>";
	vdet += "</br>";
	vdet += "</br>";
	vdet += "</br>";
	vdet += "</br>";
	vdet += "</br>";
	vdet += "</br>";
	vdet += "</br>";
	vdet += "</br>";
	vdet += "</br>";
   	vdet += "</br>";
	vdet += "</br>";
 //vdet += ("纬度:" + vijkj.y + "</br>");
    //vdet += ("经度:" + vijkj.x + "</br>");

    vdet += "</p></pre>";

    return vdet;
}

var _gvisobandskmls=[];
var _gkmlisoband=[];
//等值线绘制，按照时间动态展示
function paint_isobands(vjson)
{
    if (null == vjson || vjson == 'undefined') {
        alerta('查询不到数据');
        return;
    }
	//clear first
	viewer.dataSources.removeAll();
	_gkmlisoband=[];
	//var vkml=_gkmlisoband.length;
	//for(var k=0;k<vkml;k++)
	//{
	//viewer.dataSources.remove(_gkmlisoband[k]);
	//}

    var vlen = vjson.length;
	_gvisobandskmls=[];
    for(var i=0;i<vlen;i++)
    {
		_gvisobandskmls.push(_gAddress+vjson[i]);
		var promise1 = Cesium.KmlDataSource.load(
			_gvisobandskmls[i],
			{
			  camera: viewer.scene.camera,
			  canvas: viewer.scene.canvas
			});

		_gkmlisoband.push(promise1);		
    }

	//var viewer = new Cesium.Viewer('cesiumContainer');
	viewer.dataSources.add(_gkmlisoband[0]);
    viewer.zoomTo(_gkmlisoband[0]);
	
	}

//获取最新的所有站点状态信息，包括电压以及降雨量信息 goose 2018年3月11日
//用于timer事件中定时触发，并自动更新对应的站点图标以及等值线
function get_latest_status(vidone,vrs) {
	init_timer();
    //
    var myDate = new Date();
    var vdtfrom = myDate;
    vdtfrom.setMinutes(myDate.getMinutes() - 5);
    var vf = vdtfrom.Format("yyyy-MM-dd hh:mm:ss");

    //前后共计5分钟时间间隔
    var vdtto = myDate;
    //vdtto.setMinutes(myDate.getMinutes() + 2);
    var vt = vdtto.Format("yyyy-MM-dd hh:mm:ss");

    // 获取所有站点信息(如果站点id仅有一个表示当前站点信息)
    sw_query_info(update_stations, 'RTSTAS', vf, vt, vidone, vrs);
}

//更新站点状态，包括电压对应的图标修改以及降雨量对应的属性数据
function update_stations(vjson) {
    if ( isbad(vjson)  || isbad(vjson.dataset) || isbad(vjson.dataset.Table)) {
        alert('站点信息无效，请重新加载'); return;
    }

    var vtbs = vjson.dataset.Table;//    
    var vlen = vtbs.length;
    //对于单个站点，显示more按钮用于查询实时/历史数据disable
    //if (vlen == 1) $('#btndetail').linkbutton('enable');

    for (var i = 0; i < vlen; i++) {
        var vijk = vtbs[i];
        var ventity = viewer.entities.getById(vijk.id);
        if (null == ventity || 'undefined' == ventity) continue;

        var vvolt = floatParse(ventity.attributes.voltage);
        var vrfall = ventity.attributes.rainfall;
        var vvolttime = ventity.attributes.volttime;
        var vrfalltime = ventity.attributes.rainfalltime;
        if (isvalid(vvolt) && vvolt < 10.0) {
            ventity.billboard.image = "images/meas-sr.png";
        }
        else ventity.billboard.image = "images/meas-srok.png";
    }

    //等高线绘制
    if(isvalid(vjson.name))
    {
        	//clear first
		var vkml=_gkmlisoband.length;
		for(var k=0;k<vkml;k++)
			viewer.dataSources.remove(_gvisobandskmls[i]);

		_gvisobandskmls=[];
		{
			_gvisobandskmls.push(_gAddress+vjson.name);//path
			_gkmlisoband.push(//datasource
				Cesium.KmlDataSource.load(
				_gvisobandskmls[0],
				{
				  camera: viewer.scene.camera,
				  canvas: viewer.scene.canvas
				})
			);
		}

		//var viewer = new Cesium.Viewer('cesiumContainer');
		viewer.dataSources.add(_gkmlisoband[0]);
		//viewer.dataSources.lowerToBottom(_gkmlisoband[0]);
        viewer.zoomTo(_gkmlisoband[0]);
	}
}