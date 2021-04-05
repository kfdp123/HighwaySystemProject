//LBS新的入口函数，goose 2018年4月15日20:54:13

var __lbs_timer = null;

var __lbs_tree = null;
var __lbs_tree_ids = null;
var __lbs_me = null;//当前登录用户

var __lbs_curusers = null;//当前登录用户
var __vspeed_min = 10;
var __vspeed_max = 40;

//var vgfences = null;
//var vgtrackline = null;
//var vtrackresult = null;
var __gvperentites = null;
var  _gvtempentity=null;
var __vgtrackline = null;
var __vtrackpts = null;
var __gvperentites = null;
var __vimgbase = "http://localhost:1234";



if (typeof FENCE_OP == "undefined") {
    var FENCE_OP = {
        FINIT: 0,
        FPOINT: 1,
        FPLINE: 2,
        FPOLYG: 3
    }
}

var viewer = null;
var __vgcanvas = null;
var __vghandler = null;
var __vgfence_om = FENCE_OP.FINIT;//init 1 point 2 polyline 3 polygon
var __vgtemppts = [];//临时坐标数组，用于绘制折线以及多边形
var __vgtempptlast = null;//上一次鼠标位置，用于绘制折线及多边形
var _gvtempentity = null, _gvtempentity_pl = null;//鼠标移动时的临时entity以及鼠标右键的临时entity
var __vgfences = null;//待提交的电子围栏数据


function lbs_init_timer()
{
    if (__lbs_timer != null)
        clearTimeout(__lbs_timer);
        //clearInterval(__lbs_timer);
    __lbs_timer = null;
}

//vcallbk 成功后的回调函数 其参数为json数据 
//vqtype:LOGIN MODIPSW NEWUSER
function lbs_query_user(vcallbk, vqtype, vusernm, vuserpws) {
    lbs_ajax( vcallbk,  {
            QUERY: vqtype, USER: vusernm, PSW: vuserpws
        }, 'GET', 'ghuser.ashx'
    );
}

function lbs_query_pos(vcallbk, vqtype, vfrom, vto, vid) {
    lbs_ajax(vcallbk, {
        QUERY: vqtype, ID: vid,
        FROM: vfrom, TO: vto
    }, 'GET', 'ghstatistic.ashx');
}

//vcallbk 成功后的回调函数 其参数为json数据 
function lbs_ajax(vcallbk,  vdata,vgetpost,vurl) {
    $.ajax({
        url: vurl,//'gHDBserver.ashx',
        type: vgetpost, //GET POST
        async: true,    //或false,是否异步
        data: vdata,
        timeout: 300000,    //超时时间
        dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
        beforeSend: function (xhr) {
            //console.log(xhr);
            //console.log('发送前');
            $("#loading").html("<img src='themes/material/images/loading.gif' />");
        },
        success: function (data, textStatus, jqXHR) {
            if (vcallbk !== null) vcallbk(data);
            $("#loading").empty();
        },
        error: function (xhr, textStatus) {
            alert(textStatus);
            $("#loading").empty();
        },
        complete: function () {
            $("#loading").empty();
            //console.log('结束');
        }
    })
}

$(document).ready(function () {
	    __vgcanvas = viewer.scene.canvas;
    __vghandler = new Cesium.ScreenSpaceEventHandler(__vgcanvas);

	        //关闭主窗体导致的清理，会关闭除主窗体以外所有的窗体
        //由于主窗体自己会关闭自己，因此不用在调用，以免引起死循环
    function close_all_windows() {
        $('#lbsrmenu').menu('hide');
        $("#lbsdlglogin").dialog('close');
        $("#lbsdlgnewuser").dialog('close');
        $("#lbsdlgchgpsw").dialog('close');
        $("#lbsspeed_limit_dlg").dialog('close');
        $("#lbsdlgstat").dialog('close');
        $("#lbsdlgdetail").window('close');
        $("#lbsdlgfenceinfo").dialog('close');

        $("#lbstreedlg").window('close');
    }
	
    $('#lbsmaintb').window({
        onClose: function () {
            if (__vgfences != null && __vgfences.length > 0) {
                $.messager.confirm('保存电子围栏', '是否保存绘制的电子围栏?',
                    function (r) {
                        if (r) {
                            //alert('confirmed: ' + r);
                            lbs_submit_fences();
                        }
                    });
            }
            if (isvalid(__vgfences)) __vgfences = [];
            close_all_windows();
            lbs_init_timer();
            __lbs_tree = null;
            __lbs_tree_ids = null;
            __lbs_me = null;
            __lbs_curusers = null;//当前登录用户

            lbs_init_fence();
            //__vgfence_om=FENCE_OP.FINIT;

            lbs_clear_track_lines();
            __vgtrackline = null;
            vtrackresult = null;

            lbs_clear_entites();;
            __gvperentites = null;

            if (_gvtempentity != null &&
                viewer.entities.contains(_gvtempentity))
                viewer.entities.remove(_gvtempentity)
            _gvtempentity = null;
            __vgtempptlast = null;
            __vgtemppts = [];
            if (_gvtempentity_pl != null &&
                viewer.entities.contains(_gvtempentity_pl))
                viewer.entities.remove(_gvtempentity_pl);
            _gvtempentity_pl = null;
        }
    });
    //启动隐藏所有对话框。关闭主窗体，自动关闭所有窗体
    $("#lbsmaintb").window('close');

    //$(".easyui-window").window('close');
    //工具栏入口
    $("#lbsmain").click(function () {
        $("#lbsmaintb").window('close');
        //打开登陆窗口
        $("#lbsdlglogin").dialog('open');
    });

    //实时监控开始
    $("#lbsrtstart").click(function () {
        alert("实时位置监控开始");
        lbs_init_timer();
        //获取当前用户管辖范围内所有子节点对应的新位置
        var vfun = "lbs_get_latest_poss()";
        __lbs_timer = setTimeout(vfun, 5000);
        //__lbs_timer = setInterval(vfun, 5000);
    });

    //实时监控结束
    $("#lbsrtstop").click(function () {
        lbs_init_timer();
        alert("实时位置监控结束");
    });

    //轨迹查询
    $("#lbstrackquery,#lbsrmtrkq").click(function () {
        lbs_query_history("TRAK", true);
    });

    //超速查询
    $("#lbsspeedquery,#lbsrmspedq").click(function () {
        lbs_query_history("OVSP", true);
    });

    //电子围栏查询
    $("#lbsfencequery,#lbsrmfenceq").click(function () {
        lbs_query_history("FENC", true);
    });

    //已上传照片查询
    $("#lbsfotoquery,#lbsrmfoto").click(function () {
        lbs_query_history("FOTO", true);
    });

    //里程统计
    $("#lbsdistancequery,#lbsrmdis").click(function () {
        lbs_query_history("DIST", true);
    });

    //油耗统计
    $("#lbsoilquery,#lbsrmoil").click(function () {

    });

    //历史推演
    $("#lbshistoryquery,#lbsrmhist").click(function () {

    });

    //设置点电子围栏
    $("#lbsfencept,#lbsrmfenpt").click(function () {
        lbs_prepare_fence(FENCE_OP.FPOINT);
    });

    //设置线电子围栏
    $("#lbsfenceline,#lbsrmfenli").click(function () {
        lbs_prepare_fence(FENCE_OP.FPLINE);
    });

    //设置面电子围栏
    $("#lbsfencepolygon,#lbsrmfenpl").click(function () {
        lbs_prepare_fence(FENCE_OP.FPOLYG);
    });

    //提交电子围栏
    $("#lbsfenceupload,#lbsrmfenup").click(function () {
        lbs_submit_fences();
    });

    //开启电子围栏
    $("#lbsutifence").click(function () {
        toogle_fence(true);
    });

    //限速
    $("#lbsutispeed").click(function () {
        open_speed_limit(true);
    });

    //备/人员树/加载测站树列表 更新状态列表
    $("#lbsutitree,#lbsrmtree").click(function () {
        //发送请求获取所有的人员列表树数据
        lbs_ajax(lbs_fill_tree, { QUERY: "PERLIST" }, 'GET', 'ghuser.ashx');
        //query_info(lbs_fill_tree, "PERLIST");
    });

    //用户管理对话框
	    //退出
    $("#lbslogout,#lbsrmlogout").click(function () {
        //关闭主菜单并执行必要的清理工作
        $("#lbsmaintb").window('close');
        $.messager.show({
            title: '退出系统中...',
            msg: '用户退出系统，感谢使用...',
            timeout: 2000,
            showType: 'slide'
        });
    });

    //用户登陆
    $("#lbsusrmgrlogin").click(function () {
        $("#lbsdlglogin").dialog('open');
    });

    //新建用户
    $("#lbsusrmgrnew").click(function () {
        $("#lbsdlgnewuser").dialog('open');
    });

    //删除用户
    $("#lbsusrmgrdel").click(function () {
        //$("#").dialog('open');
    });

    //修改密码
    $("#lbsusrmgrchgpsw").click(function () {
        $("#lbsdlgchgpsw").dialog('open');
    });

    //权限分配
    $("#lbsusrmgrgrant").click(function () {
        //$("#").dialog('open');
    });

    //站点分配
    $("#lbsusrmgrstas").click(function () {
        //$("#").dialog('open');
    });
	
	    //位置共享给其他用户
    $("#lbsutishareto,#lbsrmposshare").click(function () {
        //$("#").dialog('open');
        $.messager.prompt('共享自己的位置给别人', '输入对方的ID',
            function (r) {
            if (r) {//alert('you type: ' + r);
                //折叠所有级别
                var vtree = $("#lbstreedp");
                var vroot0 = vtree.tree('getRoot');
                if (null == vroot0) return;
                //发送给后台，添加相应记录并在成功后，在树控件中增加相应的叶子节点
                lbs_ajax(lbs_bksharepos, 
                    { 
                        QUERY: "SHAREPOSTO",
                        MYID:vroot0.id,
                        HISID: r
                    },'GET','ghuser.ashx'
                );
            }
        });
    });

    //双击站点树，控制地图缩放至所选站点
    $('#lbstreedp').tree({
        onClick: function (node) {
            //$('#treestas').tree('select', node.target);
        },
        onDblClick: function (node) {
            if (isvalid(node.attributes)) {
                var vx = isvalid(node.attributes.x) ?
                    parseFloat(node.attributes.x) : 117.33;
                var vy = isvalid(node.attributes.y) ?
                    parseFloat(node.attributes.y) : 33.11;
                // 1. Fly to a position with a top-down view
                viewer.camera.flyTo({
                    destination: Cesium.Cartesian3.fromDegrees(vx, vy, 15000.0)
                });
            }
        },
        onLoadSuccess: function (node, data) {
            //alert(node.text);  // alert node text property when clicked
            //__VTREEDATA = data;
        },
        onContextMenu: function (e, node) {
            e.preventDefault();
            // select the node
            //$('#lbstreedp').tree('select', node.target);
            // display context menu
            $('#lbsrmenu').menu('show', {
                left: e.pageX,
                top: e.pageY
            });
        }
    });
});

function lbs_clear_entites()
{
	if (__gvperentites != null )
	{
		for (var k = 0; k < __gvperentites.length; k++)
			viewer.entities.remove(__gvperentites[k]);
	}
	__gvperentites=[];
}

//vjson:{userid:,chinesename:,deviceid:,efenceid:}
function lbs_bksharepos(vjson)
{
    if (isbad(vjson) || isbad(__lbs_tree)) {
        alerta('共享位置失败');
        return;
    }
    //更新树控件 //root :userid或者root
    var vsharend = $('#lbstreedp').tree('find', 'share');
    ///append
    var vnodecont = {
        id: vjson.userid,//共享给某用户的id
        text: vjson.chinesename,
        checked: false,
        attributes: {
            deviceid: vjson.deviceid,
            efenceid: vjson.efenceid,
            x:vjson.attributes.x,//goose
            y:vjson.attributes.y
        }
    };
    var vnodee = {
        parent: vsharend.target,
        data: [vnodecont]
    };
    $('#lbstreedp').tree('append', vnodee);
    //更新树控件数据 新建或者修改
    __lbs_tree[vjson.userid] = vnodecont;
    //更新ids
    if (!__lbs_tree_ids.includes(vjson.userid) ||
        !$.inArray(vjson.userid, __lbs_tree_ids))
        __lbs_tree_ids.push(vjson.userid);
}

function lbs_make_label_pt(vid,vtext,vimg,vx,vy)
{
    return new Cesium.Entity(
    {
        id: vid,
        //name: vjson[i].text,
        position: Cesium.Cartesian3.fromDegrees(
            parseFloat(vx), parseFloat(vy)),
            point : {
                pixelSize : 7,
                color : Cesium.Color.RED,
                outlineColor : Cesium.Color.WHITE,
                outlineWidth : 2
            },
        label: {
            text: vtext,
            font: '14pt monospace',
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            outlineWidth: 2,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            pixelOffset: new Cesium.Cartesian2(0, -9)
        }
    });
}

//显示至球上
function lbs_fill_tree_on_earth(vjson) {
    if (isbad(vjson)) {
        alerta('查询不到当前用户的信息');
        return;
    }
    //显示在地球上
    lbs_clear_entites();
    var vlen = vjson.length;
    for (var i = 0; i < vlen; i++) {
        var veni = lbs_make_label_pt(vjson[i].id,
            vjson[i].text,"", 117.33, 33.11);
        viewer.entities.add(veni);
        __gvperentites.push(veni);
    }
    viewer.zoomTo(viewer.entities);
    //viewer.flyTo(viewer.entities, { maximumHeight: 3000 });
}

function lbs_fill_tree(vjson)
{
    if ( isbad(vjson)) {
        alerta('查询不到当前用户的信息');
        return;
    }
    //根据人员的关系，分组
    __lbs_tree = []; __lbs_curusers = [];
        //显示在地球上
    lbs_clear_entites();
        var vlen = vjson.length;
    for (var i = 0; i < vlen; i++) {
        var vojbj = {
            id: vjson[i].USERID, text: vjson[i].CHINESENAME,
            attributes: {
                deviceid: vjson[i].DEVICEID,
                efenceid: vjson[i].EFENCEID,
                x:117.33,y:33.11
            }
        };
        __lbs_tree.push(vojbj);
        __lbs_curusers[vjson[i].USERID] = vojbj;

        var citizensBankPark = viewer.entities.add({
            id:vjson[i].USERID,
            name : vjson[i].CHINESENAME,
            position : Cesium.Cartesian3.fromDegrees( 117.33, 37.11),
            point : {
                pixelSize : 7,
                color : Cesium.Color.RED,
                outlineColor : Cesium.Color.WHITE,
                outlineWidth : 2
            },
            label : {
                text: vjson[i].CHINESENAME,
                font : '14pt monospace',
                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                outlineWidth : 2,
                verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
                pixelOffset : new Cesium.Cartesian2(0, -9)
            }
        });
        __gvperentites.push(citizensBankPark);
    }
	/*
	viewer.camera.flyTo({
    destination : Cesium.Cartesian3.fromDegrees(105.1158, 37.6655, 180000),
	duration:8
    });
	*/
    viewer.flyTo(viewer.entities,{maximumHeight:3000});
    
    //保存数据，以备后续使用
    //if (null == __lbs_tree) __lbs_tree = vjson;

    $('#lbstreedp').tree('loadData', __lbs_tree);

    $("#lbstreedlg").window('open');
}

function lbs_bklogin(vjson)
{
    if (isbad(vjson) || vjson.ERR) {
        alert("登陆失败:" + vjson.ERR);
        __lbs_curusers = null;
        __lbs_me = null;
        return;
    }

    if (isbad(vjson)) return;
    //记录当前用户的id以及对应的设备id
    //保存数据，以备后续使用
    if (null == __lbs_tree) __lbs_tree = vjson;

    //加载至树上显示并保存至变量__lbs_tree;
    $('#lbstreedp').tree('loadData', __lbs_tree);
    $("#lbstreedlg").window('open');
    //加载至查询对话框中的id选择组合框
    //由于数据不一致，需要进行转换：通过遍历树得到满足要求的数据
    var vlist = lbs_traverse_tree2_list();
    $('#lbsselidstat').combobox('loadData', vlist);
    //显示位置至球上默认位置，创建mark
    lbs_fill_tree_on_earth(vlist);
    //打开主工具栏
    $("#lbsmaintb").window('open');
    __lbs_me = __lbs_curusers[vlist[0].id];
}

function lbs_login_ok()
{
    $("#lbsdlglogin").dialog('close');
    __lbs_curuser = null;
    var vunm=$("#lbsnamelogin").textbox('getValue');
    var vpsw=$("#lbspswlogin").textbox('getValue');
    lbs_query_user(lbs_bklogin, "LOGIN",vunm,vpsw);
}

function lbs_login_cancel()
{
    $("#lbsdlglogin").dialog('close');
    __lbs_curuser = null;
}

function lbs_fill_latest_poss(vjson)
{
    if (isbad(vjson)) {
		var vinfo="查询数据失败";
	alert(vinfo);
        return;
    }
	if(vjson.ERR) {
		$.messager.show({
                title:'实时监控',
                msg:"查询数据失败: "+vjson.ERR,
                timeout:2000,
                showType:'slide'
        });
		//alert("查询数据失败: "+vjson.ERR);
		return;
	}

   //直接更新球上的数据
    var vtree = $("#lbstreedp");
    if ( isbad(vtree)) return;

    var vlen = vjson.length;
    for(var i=0;i<vlen;i++)
    {
        var vijk = vjson[i];
        var vcur = __lbs_curusers[vijk.USERID];
        if (isbad(vcur))
            continue;
        //修改位置属性及图形
        vcur.attributes.x = vijk.X;
        vcur.attributes.y = vijk.Y;
        //地图位置修改
        vent = viewer.entities.getById(vijk.USERID);
        vent.position = Cesium.Cartesian3.fromDegrees(
            parseFloat(vijk.X), parseFloat(vijk.Y));
    }
	//viewer.zoomTo(viewer.entities);
	viewer.flyTo(viewer.entities,{maximumHeight:3000});
}

function lbs_get_latest_poss()
{
    if (isbad(__lbs_tree)) {
        lbs_init_timer();
        alert('请先登录');       return;
    }

    //ids
    var vimeis = [];
    for (var ioj in __lbs_curusers)
        vimeis.push("'" + __lbs_curusers[ioj].attributes.deviceid + "'");

    //query
    var vnow = new Date();
    var vf = vnow.format("yyyy-MM-dd hh:mm:ss");
	
    lbs_query_pos(lbs_fill_latest_poss, 'PERRT', vf, '', vimeis.join(','));

}

// 非递归遍历树
function traverseTree2(node) {
    if (!node) {
        return ;
    }
    $('#lbsselidstat').combobox('clear');
    var vcbdata = [];

    var stack = [];
    //首先将根节点的所有子节点作为初始值传入
    var vlen = node.length;
    for (var i = 0; i < vlen; i++)
        stack.push(node);

    var tmpNode;
    while (stack.length > 0) {
        tmpNode = stack.pop();
        //存储当前节点的id，可能不存在于数据库中，但是不影响查询
        __lbs_tree_ids.push(tmpNode.id);
        vcbdata.push({ido:tmpNode.id,text:tmpNode.text});
        //将当前节点下的子节点作为新的节点传入，迭代
        if(tmpNode.children&& tmpNode.children.length > 0)
        {
            var vlen = tmpNode.children.length;
            for (var i = 0; i < vlen; i++)
                stack.push(tmpNode.children[i])
        }
    }

    $('#lbsselidstat').combobox('loadData', vcbdata);
}


//////////////////////////////////////////////////////////////////

//vcallbk 成功后的回调函数 其参数为json数据 
//vqtype:LOGIN MODIPSW NEWUSER
function lbs_query_user(vcallbk, vqtype, vusernm, vuserpws) {
    $.ajax({
        url: _lbs_gvaddbase +  'ghuser.ashx',
        type: 'GET', //GET POST
        async: true,    //或false,是否异步
        data: {
            QUERY: vqtype, USER: vusernm, PSW: vuserpws
        },
        timeout: 300000,    //超时时间
        dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
        beforeSend: function (xhr) {
            //console.log(xhr);
            //console.log('发送前');
        },
        success: function (data, textStatus, jqXHR) {
            if (vcallbk != null) vcallbk(data);
        },
        error: function (xhr, textStatus) {
            alert(textStatus);
        },
        complete: function () {
            //console.log('结束');
        }
    })
}

function lbs_query_pos(vcallbk, vqtype, vfrom, vto, vid) {
    $.ajax({
        url: _lbs_gvaddbase +  'lbsstatistic.aspx',
        type: 'GET', //GET POST
        async: true,    //或false,是否异步
        data: {
            QTYPE: vqtype, ID: vid, IMEI: vid,
            FROM: vfrom, TO: vto, TIME:vfrom
        },
        timeout: 300000,    //超时时间
        dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
        beforeSend: function (xhr) {
            //console.log(xhr);
            //console.log('发送前');
        },
        success: function (data, textStatus, jqXHR) {
            if (vcallbk != null) vcallbk(data);
        },
        error: function (xhr, textStatus) {
            alert(textStatus);
        },
        complete: function () {
            //console.log('结束');
        }
    })
}

//////////////////////////////////////////////////////////////////
//打开查询对话框
function open_stat_warn(vm, bopen) {
    if (vm < 200) {
        if (isbad(__lbs_tree) ) {
            $.messager.alert('error open_stat_warn()',
                '车辆列表为空，请单击“加载车辆、人员列表”', 'error');
            return;
        }
    }

    // 首先停止实时监控，转换状态为历史信息查询模式
    lbs_init_timer();
    lbs_clear_entites();
    //vmode_now = vmodes.MM_HIS;//进入历史信息查询模式

    //确定车辆列表存在
    if (bopen) {
        $("#lbsbtndetail").hide();

        if (vm < 200) {
            //prepare_list_car();
           // $("#lbsselidstat").combobox('select', '9091215557');
        }

        $("#lbsstate").combobox('setValue', vm);
        //初始化未查询之前的slider为不可用状态，避免错误
        $("#lbssliderhstat").slider('disable');
        //清空当前的标注，或者在查询成功后再删除标注亦可
        $("#lbsdlgstat").dialog('open');
    }
    else {
        //back2_realtime("CARRT");
    }  
}

function lbs_stat_track(msg,vqtp)
{
    var vvid = $("#lbsselidstat").combobox('getValue');
    var vquetype = parseInt($("#lbsstate").combobox('getValue'));

    //查询里程统计时，改变参数，其他都是获取轨迹数据，然后进行判断
    if (vquetype < 200)
    {
        update_track_line(msg, __lbs_curusers[vvid].text,
            "images/car32.png",'car');
    }

    vtrackresult = msg;
    var vlen = msg.length;
    //设置slider最大值
    var vsld = $("#lbssliderhstat").slider('options');
    vsld.min = 0;
    vsld.max = vlen - 1;
    $("#lbssliderhstat").slider('setValue', 1);
    $("#lbssliderhstat").slider('enable');
    //valueOnChange(1);//$("#loctimestat").textbox('setValue', 1);
}



function lbs_query_success(msg) {
    //$.messager.progress('close');	// hide progress bar while submit successfully
    if (isbad(msg)) {
        var vinfo = '没有相关数据';
        if (isvalid(msg.ERR)) vinfo += msg.ERR

        $.messager.alert('查询统计',vinfo , 'info');
        return;
    }
    lbs_stat_track(msg);// 查询的轨迹线存在map.graphics图层中
    $("#lbsbtndetail").hide();
	
	var vquetype = $("#lbsstate").combobox('getValue');
    switch (vquetype) {
        case 2://里程计算
        case 444://人员里程统计
            stat_dist();
            break;
        case 3://轨迹查询
            break;
        case 222://人员轨迹查询   
            $("#lbsbtndetail").show();
            break;
        case 4://统计指定日期的所有车辆的警报信息 待实现！！！！
            //stat_alarms_date();
            break;
        case 11://超速
            stat_alarms_speed();
            break;
        case 12://电子围栏
            stat_alarms_fence();
            break;
        case 1://当前车辆指定日期的全部警报
            stat_alarms();
            break;
        case 333://人员预警信息统计
            break;
        case 555://photos
            //toggle_photo(msg);//fotos name
            break;
        default:
            break;
    }
}

//里程统计
function stat_dist(msg)
{
    //stat_track(msg);// 查询的轨迹线存在map.graphics图层中
    if (!isinited(map2d.graphics.graphics)) {
        $.messager.alert("里程统计", "里程统计查询结果为空!", "error");
        return;
    }
    var vgeopl = map2d.graphics.graphics[0].geometry;
    vgeopl = esri.geometry.geographicToWebMercator(vgeopl);
    var vlen = calc_distance(vgeopl);
    $.messager.alert("里程统计", "共计行驶" + vlen.toFixed(4) + "公里", "info");
}

function calc_distance(vgeo)
{
    if (!isinited(vgeo))
        return;

    var ddist=0.0;
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
    return ddist / 1000;//km
}

//超速判断 更新相应位置图标
function stat_alarms_speed()
{
    var vgeo = vgcar.graphics;
    if (vgeo === null || vgeo.length < 1) {
        $.message.alert('预警统计', '没有查询到选中车辆的警报信息', 'error');
        return;
    }
    //创建模版
    var vtitle = "当前车辆超速！" ;
    var vcont = "车辆驾驶员:" + vjson_carlist[vsel_car_idx].DRIVER_NAME + " <br/>" +
        "当前车速：${SPEED}<br/>" + 
        "限速：最低"+ vspeed_min + " 最高" + vspeed_max;
    var vit = new esri.InfoTemplate(vtitle, vcont);

    var vlen = vgeo.length;
    for(var i=0;i<vlen;i++)
    {
        var vgi = vgeo[i];
        var vsped = parseFloat(vgi.attributes.SPEED);
        //判断是否超速|| vsped <= vspeed_min
        if (vsped >= vspeed_max ) {
            vgi.setSymbol(vsymbol_warn_speed);
            vgi.setInfoTemplate(vit);
        }
    }
}

//电子围栏越界判断 更新相应位置图标
function stat_alarms_fence() {
    if (isbad(vfence_car))
    {
        $.messager.alert("电子围栏统计", "电子围栏没有设置，请设置先~", "info");
        return;
    }
    var vgeo = vgcar.graphics;
    if (vgeo === null || vgeo.length < 1) {
        $.messager.alert('预警统计', '没有查询到选中车辆的警报信息', 'error');
        return;
    }
    // 显示电子围栏
    vgfences.setVisibility(true);
    //创建模版
    var vtitle = "当前车辆超出设定范围！";
    var vcont = "驾驶员:" + vjson_carlist[vsel_car_idx].DRIVER_NAME +
        "<br/>当前位置：${X},${Y}<br/>定位时间：${TIME}";
    var vit = new esri.InfoTemplate(vtitle, vcont);

    var vlen = vgeo.length;
    for (var i = 0; i < vlen; i++) {
        var vgi = vgeo[i];
        if (!vfence_car.contains(vgi.geometry))
        {
            vgi.setSymbol(vsymbol_warn_fence);
            vgi.setInfoTemplate(vit);
        }
    }
}

function lbs_query_ok() {
    //$('#ff').form('submit');
    var vvid = $("#lbsselidstat").combobox('getValue');
    if (isbad(__lbs_curusers) || isbad(__lbs_curusers[vvid])) {
        alert("用户不存在，请重新选择");
        return;
    }
    vvid = __lbs_curusers[vvid].attributes.deviceid;

    var vquetype = parseInt($("#lbsstate").combobox('getValue'));
    //查询里程统计时，改变参数，其他都是获取轨迹数据，然后进行判断
    var vqkey = "PERTRK";//(vquetype === 2) ? "DISTOIL" : 

    lbs_query_pos(lbs_query_success, vqkey,
        $("#lbstqbeginstat").textbox('getValue'),
        $("#lbstqendstat").textbox('getValue'),
        vvid);
}

function lbs_query_cancel() {
    $('#lbsffstat').form('clear');
}


    ///////////////////////////////////////////////////////////////////////////////
function supports_html5_storage() {
    try {
        return 'localStorage' in window && window.localStorage !== null;
    } catch (e) {
        return false;
    }
}

function get_cache(vkey)
{
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


    ///////////////////////////////////////////////////////////////////////////////
function open_speed_limit(bshow)
{
    var vdlg = (bshow) ? 'open' : 'close';
    $('#speed_limit_dlg').dialog(vdlg);
}

function set_speed_limit()
{
    var vspeedmax = $('#txtspeedmax').val();
    var vspeedmin = $('#txtspeedmin').val();
    if (!isNaN(vspeed_max))
        vspeed_max = parseFloat(vspeedmax);
    if (!isNaN(vspeed_min))
        vspeed_min = parseFloat(vspeedmin);

    $('#speed_limit_dlg').dialog('close');    
}


function update_track_line(linepts, vvname, vimg, vtp) {
    var vlen = linepts.length;
    if (linepts === null || vlen < 2)
        return;
    var vxxy = [];
   // var vpath = [];
    for (var i = 0; i < vlen; i++) {
        var vijklmn = linepts[i];
        var vx = parseFloat(vijklmn.X);
        var vy = parseFloat(vijklmn.Y);
        vxxy.push(vx);
        vxxy.push(vy);

        /*
        //增加marker标记所有点位置，为后续判断状态改变图标做准备
        var vpic = (i == 0 || i == (vlen - 1)) ? vimg : '';
        
        //将间隔太远时的线分为若干段,单独渲染
        var vlenttt = vpath.length;
        var vdis = (vlenttt < 1) ? 0.0 : getdist(vpath[vlenttt - 1], vpti);//最后一个数据
        if (vdis > 0.001)//110m
        {
            vgeoline.addPath(vpath);
            vpath = [];
        }
        vpath.push(vpti);
        */
    }
    var vgeoline = {
        polyline: {
            positions: Cesium.Cartesian3.fromDegreesArray(vxxy),
            width: 5,
            material: Cesium.Color.RED
        }
    };
    if (vgtrackline != null) viewer.entities.remove(vgeoline);
    vgtrackline = vgeoline;
	var entity = viewer.entities.add(vgeoline);
    viewer.flyTo(vgeoline);

    //最后一段path
    //vgeoline.addPath(vpath);
    /*var line = new esri.geometry.Polyline({
        "paths": [[[-122.68, 45.53], [-122.58, 45.55], [-122.57, 45.58], [-122.53, 45.6]]],
        "spatialReference": { "wkid": 4326 }
    });
    var lineSymbol = new esri.symbol.CartographicLineSymbol(
      esri.symbol.CartographicLineSymbol.STYLE_SOLID,
      new dojo.Color("#00FF00"), 5,
      esri.symbol.CartographicLineSymbol.CAP_ROUND,
      esri.symbol.CartographicLineSymbol.JOIN_MITER, 7
    );
    var polyline = new esri.Graphic(vgeoline, lineSymbol);
*/
}


function ontipForMatter(value) {
    var opts = $(this).slider('options');
    return (value + ' / ' + opts.max);
}

function valueOnChange(value) {
    //$("#loctime").textbox('setValue', value);
    if (vtrackresult !== null && value >= 0 && value < vtrackresult.length)
        $("#loctimestat").textbox('setValue', value + '  ' +
            vtrackresult[value].TIME);
    //更新位置 或者增加新的标记，显示轨迹
    var vg0 = vtrackresult[value];//vgcar.graphics[value];
	//创建一个临时entity用于zoomto
	var vtent = new Cesium.Entity({
            name : vg0.NAME,
            position : Cesium.Cartesian3.fromDegrees( vg0.X, vg0.Y),
            point : {
                pixelSize : 7,
                color : Cesium.Color.BLUE,
                outlineColor : Cesium.Color.WHITE,
                outlineWidth : 2
            },
            label : {
                text: vg0.NAME,
                font : '14pt monospace',
                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                outlineWidth : 2,
                verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
                pixelOffset : new Cesium.Cartesian2(0, -9)
            }
        });
		if(_gvtempentity != null)
			viewer.entities.remove(_gvtempentity)
		_gvtempentity=vtent;
		viewer.entities.add(_gvtempentity);
		viewer.zoomTo(_gvtempentity);
    /*
    if (isbad(vg0)) return;
    var vcp = car_or_per(vg0.PCID);
    if (vcp === 'car')
        vg0 = vgcar.graphics[value];
    else if (vcp === 'per')//人员只需要判断电子围栏即可以及是否出勤
    {
        vcur_pos_idx = vg0.ID;//记录人员记录id，用于详细信息查询
        vg0 = vgper.graphics[value];
    }
    //vg0.setTitle("第" + value + "/" + vgcar.graphics.length);
    map2d.centerAt(vg0.geometry);
    map2d.infoWindow.setFeatures([vg0]);
    map2d.infoWindow.show(vg0.geometry);
    */
}
