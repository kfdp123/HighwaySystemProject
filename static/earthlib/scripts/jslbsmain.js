//LBS新的入口函数，goose 2018年4月15日20:54:13

var __lbs_timer = null;
var __lbs_timer_share = null;

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
var __vimgbase = "http://localhost:85/";




if (typeof FENCE_OP == "undefined") {
    var FENCE_OP = {
        FINIT: 0,
        FPOINT: 1,
        FPLINE: 2,
        FPOLYG: 3
    }
}

//var viewer = null;
var __vgcanvas = null;
var __vghandler = null;
var __vgfence_om = FENCE_OP.FINIT;//init 1 point 2 polyline 3 polygon
var __vgtemppts = [];//临时坐标数组，用于绘制折线以及多边形
var __vgtempptlast = null;//上一次鼠标位置，用于绘制折线及多边形
var _gvtempentity = null, _gvtempentity_pl = null;//鼠标移动时的临时entity以及鼠标右键的临时entity
var __vgfences = [];//待提交的电子围栏数据


function lbs_init_timer()
{
    if (__lbs_timer != null)
        //clearTimeout(__lbs_timer);
        clearInterval(__lbs_timer);
    __lbs_timer = null;
}

function lbs_init_timer_share()
{
    if (__lbs_timer_share != null)
        clearTimeout(__lbs_timer_share);
        //clearInterval(__lbs_timer_share);
    __lbs_timer_share = null;
}

//vcallbk 成功后的回调函数 其参数为json数据 
//vqtype:LOGIN MODIPSW NEWUSER
function lbs_query_user(vcallbk, vqtype, vusernm, vuserpws) {
    lbs_ajax( vcallbk,  {
            QUERY: vqtype, USER: vusernm, PSW: vuserpws
        }, 'GET', __vimgbase+ 'ghuser.ashx'
    );
}

function lbs_query_pos(vcallbk, vqtype, vfrom, vto, vid) {
    lbs_ajax(vcallbk, {
        QUERY: vqtype, ID: vid,
        FROM: vfrom, TO: vto
    }, 'GET', __vimgbase+'ghstatistic.ashx');
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
        $("#lbsdlgchginfo").dialog('close');
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
			lbs_init_timer_share();
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
            if (_gvtempentity_pl != null )
				viewer.entities.removeById("temp_pline000");

				_gvtempentity_pl = null;
				
				viewer.entities.removeAll();
        }
    });
    //启动隐藏所有对话框。关闭主窗体，自动关闭所有窗体
    $("#lbsmaintb").window('close');

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
        //__lbs_timer = setTimeout(vfun, 5000);
        __lbs_timer = setInterval(vfun, 5000);
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

	    //结束电子围栏
    $("#lbsfenceend,#lbsrmfenend").click(function () {
        lbs_init_fence();
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
		$("#lbstreedlg").window('open');
        //lbs_ajax(lbs_fill_tree, { QUERY: "PERLIST" }, 'GET', 
		//__vimgbase+'/ghuser.ashx');
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
        if (isbad(__lbs_me)) return;

        $("#lbschgpswname").textbox('setValue', __lbs_me.id);
        $("#lbschgpswold").textbox('setValue', '');
        $("#lbschgpswnew").textbox('setValue', '');
        $("#lbschgpswnew2").textbox('setValue', '');
        $("#lbsdlgchgpsw").dialog('open');
    });

	    //修改其他信息
    $("#lbsusrmgrchginfo").click(function () {
        if (isbad(__lbs_me)) return;

        $("#lbschginfoname").textbox('setValue', __lbs_me.id);
        $("#lbschginfophone").textbox('setValue', '');
        $("#lbschginfoimei").textbox('setValue', __lbs_me.attributes.deviceid);
        $("#lbschginforole").textbox('setValue', __lbs_me.attributes.roleid);
        $("#lbschginfoemail").textbox('setValue', '');
        $("#lbschginfofence").textbox('setValue', __lbs_me.attributes.efenceid);
        $("#lbsdlgchginfo").dialog('open');
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
                    },'GET',__vimgbase+'ghuser.ashx'
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
	    //////////////////////////////////////////////////////////////////////
    //测试功能
    //更新我的共享用户信息
    $("#lbsutiupdateshare").click(function () {
        //开启定时器，定期刷新最新的共享给我数据的用户
        lbs_init_timer_share();
        //获取当前用户管辖范围内所有子节点对应的新位置
        var vfun = "lbs_update_share()";
        __lbs_timer_share = setTimeout(vfun, 5000);
        //__lbs_timer_share = setInterval(vfun, 3000);
    });
    //////////////////////////////////////////////////////////////////////
    ///
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

function lbs_cb_update_share(vjson)
{
    if (isbad(vjson)) return;
    if (isvalid(vjson.ERR)) {
        $.messager.show({
            title: '更新共享用户',
            msg: '更新我的用户失败。' + vjson.MSG,
            timeout: 2000,
            showType: 'slide'
        });
        return;
    }
    if (isvalid(vjson.MSG)) {
        $.messager.show({
            title: '更新共享用户',
            msg: vjson.MSG,
            timeout: 2000,
            showType: 'slide'
        });
        return;
    }
    //[tree_node]
    //更新树控件 //root :userid或者root
    var vsharend = $('#lbstreedp').tree('find', 'share');
    var vlen = vjson.length;
    $.messager.show({
        title: '更新共享用户',
        msg: "检测到又有"+vlen+"个用户向你共享了他（们）的位置",
        timeout: 2000,
        showType: 'slide'
    });
    for(var i=0;i<vlen;i++)
    {
        var vijklmn=vjson[i];
        ///append
        var vnodee = {
            parent: vsharend.target,
            data: [vijklmn]
        };
        $('#lbstreedp').tree('append', vnodee);
        //更新树控件数据 新建或者修改
        __lbs_tree[vijklmn.id] = vijklmn;
        __lbs_curusers[vijklmn.id] = vijklmn;
        //更新! ids__lbs_tree_ids.includes(vijklmn.id)||
        if (!$.inArray(vijklmn.id, __lbs_tree_ids))
            __lbs_tree_ids.push(vijklmn.id);
    }
}

function lbs_update_share()
{
    if (null == __lbs_me) return;
    lbs_ajax(lbs_cb_update_share, {
        QUERY: 'UPDATESHARE', ME: __lbs_me.id || __lbs_me.userid
    }, "GET", __vimgbase + "ghuser.ashx");
}

//vjson:{userid:,chinesename:,deviceid:,efenceid:}
function lbs_bksharepos(vjson)
{
    if (isbad(vjson) || isbad(__lbs_tree)) {
        alerta('共享位置失败');
        return;
    }
    //因为是共享给别人的，所以不需要返回具体数据，仅仅返回是否成功即可
    //但是这样需要保持客户端和服务器端的同步，保证别人共享位置给我后可以及时发现
    $.messager.alert("位置共享", vjson.MSG, "info");
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
            vjson[i].text,"", 117.1226018, 39.0615819);
        viewer.entities.add(veni);
        __gvperentites.push(veni);
    }
    viewer.zoomTo(viewer.entities);
    //viewer.flyTo(viewer.entities, { maximumHeight: 3000 });
}

/*
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
	* /
    viewer.flyTo(viewer.entities,{maximumHeight:3000});
    
    //保存数据，以备后续使用
    //if (null == __lbs_tree) __lbs_tree = vjson;

    $('#lbstreedp').tree('loadData', __lbs_tree);

    $("#lbstreedlg").window('open');
}
*/

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
    if (isvalid(vlist)) {
        $('#lbsselidstat').combobox('loadData', vlist);
        //显示位置至球上默认位置，创建mark
        lbs_fill_tree_on_earth(vlist);
        //打开主工具栏
        $("#lbsmaintb").window('open');
        __lbs_me = __lbs_curusers[vlist[0].id];
    }
    /*
    //开启定时器，定期刷新最新的共享给我数据的用户
    lbs_init_timer_share();
    //获取当前用户管辖范围内所有子节点对应的新位置
    var vfun = "lbs_update_share()";
    //__lbs_timer = setTimeout(vfun, 5000);
    __lbs_timer_share = setInterval(vfun, 3000);
    */
}

function lbs_login_ok()
{
    $("#lbsdlglogin").dialog('close');
    __lbs_curuser = null;
     __lbs_me = null;
   var vunm=$("#lbsnamelogin").textbox('getValue');
    var vpsw=$("#lbspswlogin").textbox('getValue');
    lbs_query_user(lbs_bklogin, "LOGIN",vunm,vpsw);
}

function lbs_login_register()
{
    $("#lbsdlglogin").dialog('close');
    __lbs_curuser = null;
    __lbs_me = null;
	
	$("#lbsdlgnewuser").dialog('open');

}

function find_userid_by_imei(vimei)
{
    if (isbad(__lbs_curusers)) return -1;

    for(var i in __lbs_curusers)
    {
        var vume = __lbs_curusers[i];//key->value
        if (vume.attributes.deviceid == vimei)
            return i;
    }

    return -1;
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
     $.messager.show({
        title: '实时监控',
        msg: "查询到&nbsp" + vlen + "&nbsp个实时数据",
        timeout: 2000,
        showType: 'slide'
    });

	for(var i=0;i<vlen;i++)
    {
        var vijk = vjson[i];
        //根据imei 找到对应的用户userid
        var vimei = vijk.PCID;//IMEI
        var viuid = find_userid_by_imei(vimei);
        if (-1 == viuid) continue;

        var vcur = __lbs_curusers[viuid];
        if (isbad(vcur))
            continue;
        //修改位置属性及图形
        vcur.attributes.x = vijk.X;
        vcur.attributes.y = vijk.Y;
        //地图位置修改
        //vent = viewer.entities.getById(vcur.id);
		//if(isvalid(vent) ) 
			viewer.entities.removeById(vcur.id);
		
		var veni = lbs_make_label_pt(vcur.id,vcur.text,
            "",parseFloat(vijk.X), parseFloat(vijk.Y));
        viewer.entities.add(veni);

        //vent.position = Cesium.Cartesian3.fromDegrees(
        //    parseFloat(vijk.X), parseFloat(vijk.Y));
    }
	//viewer.zoomTo(viewer.entities);
	//viewer.flyTo(viewer.entities,{maximumHeight:3000});
}

function lbs_get_latest_poss()
{
    if (isbad(__lbs_tree)) {
        lbs_init_timer();
        alert('请先登录');       return;
    }

    //ids
    var vimeis = [];
    for (var ioj in __lbs_curusers) {
        var vmeime = __lbs_curusers[ioj].attributes.deviceid;
        if (isbad(vmeime) || '' == vmeime) continue;

        vimeis.push("'" + vmeime + "'");
    }

    //query
    var vnow = new Date();//= '2018-04-10 14:34:19';
    var vf = vnow.format("yyyy-MM-dd hh:mm:ss");
	
    lbs_query_pos(lbs_fill_latest_poss, 'PERRT', vf, '', vimeis.join(','));

}

//将树的数据转换为数组
function lbs_traverse_tree2_list()
{
    if (!isvalid(__lbs_tree)) return null;

    __lbs_tree_ids = [];
    __lbs_curusers = [];
    var vlist = [];
    var stack = [];
    //首先将根节点的所有子节点作为初始值传入
    var vnode = $("#lbstreedp").tree('getRoot');
    stack.push(vnode);

    var tmpNode;
    while (stack.length > 0) {
        tmpNode = stack.pop();
        //存储当前节点的id，可能不存在于数据库中，但是不影响查询
        __lbs_tree_ids.push(tmpNode.id);
        __lbs_curusers[tmpNode.id] = tmpNode;//保存下来，以字典形式存储，便于快速索引
        if(tmpNode.id=='share'||tmpNode.id=='mem0'||
		tmpNode.id=='root'||tmpNode.id=='super'){}
		else  vlist.push(tmpNode);
		
        //将当前节点下的子节点作为新的节点传入，迭代
        if (tmpNode.children && tmpNode.children.length > 0) {
            var vlen = tmpNode.children.length;
            for (var i = 0; i < vlen; i++)
                stack.push(tmpNode.children[i])
        }
    }
    return vlist;
}


/* 非递归遍历树
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
*/

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//打开查询对话框
function lbs_query_history(vm, bopen) {
    if (isbad(__lbs_tree) ) {
        $.messager.alert('错误提示', '人员列表为空', '错误');
        return;
    }
    // 首先停止实时监控，转换状态为历史信息查询模式
    lbs_init_timer();
    $("#lbsbtndetail").hide();

    //确定车辆列表存在
    if (bopen) {
        $("#lbsstate").combobox('setValue', vm);
        //初始化未查询之前的slider为不可用状态，避免错误
        $("#lbssliderhstat").slider('disable');
        //清空当前的标注，或者在查询成功后再删除标注亦可
        $("#lbsdlgstat").dialog('open');

        if (vm == "FOTO") {
            $("#lbsselidstat").combobox('disable');
        }
    }
    else { //back2_realtime("CARRT");
    }  
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

function lbs_toggle_photo(msg) {
    if (isbad(msg)) return;
    var vlen = msg.length;

    var vent = msg[0];
    prepare_info(msg, 0, __vimgbase);

    var vopts = {//goose 页数
        imgs: msg,
        baseadd: __vimgbase,
        callbkBrowse:valueOnChange
    };
    $('.ck-slide').ckSlide(vopts);
    //隐藏查询对话框
    $("#lbstreedlg").dialog("close");
    //显示对话框
    $("#lbsdlgdetail").window("open");
}
/*/vcallbk 成功后的回调函数 其参数为json数据 
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
*/
//////////////////////////////////////////////////////////////////
//打开查询对话框
/*
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
*/

function lbs_stat_track(msg,vqtp)
{
    __vtrackpts = msg;//临时存储
    var vlen = msg.length;
    //设置slider最大值
    var vsld = $("#lbssliderhstat").slider('options');
    vsld.min = 0;
    vsld.max = vlen - 1;
    $("#lbssliderhstat").slider('setValue', 1);
    $("#lbssliderhstat").slider('enable');
    //valueOnChange(1);//$("#loctimestat").textbox('setValue', 1);
}

function getdist(vprex,vprey, vx, vy) {
    var vdx = vprex - vx;
    var vdy = vprey - vy;
    var ddist = Math.sqrt(vdx * vdx + vdy * vdy);

    return ddist;
}

function lbs_update_track_line(linepts, vvname, vimg, vtp) {
    var vlen = linepts.length;
    if (linepts === null || vlen < 2)
        return;
    var vquetype = $("#lbsstate").combobox('getValue');
    var vbfoto = vquetype == 'FOTO';

    lbs_clear_track_lines();
    var vxyz = [];
    __vgtrackline = [];
    for (var i = 0; i < vlen; i++) {
        var vijklmn = linepts[i];
        var vx = parseFloat(vijklmn.X);
        var vy = parseFloat(vijklmn.Y);
        if (vbfoto)//
        {
            var vfoto = lbs_make_label_pt("Foto" + i, "照片" + i,
                "themes/icons/large_clipart.png", vx, vy);
            viewer.entities.add(vfoto);
            __vgtrackline.push(vfoto);
        }
        else {
            //将间隔太远时的线(~110m)分为若干段,单独渲染
            var vlt = vxyz.length  ;
            var vdis = (vlt >= 2) ? getdist(vxyz[vlt - 2], vxyz[vlt - 1], vx, vy): 0.0 ;
            if (vdis > 0.0005 )//~50m
            {
                var vplijk = lbs_make_newline(vxyz, __vgtrackline.length);
                __vgtrackline.push(vplijk);
                viewer.entities.add(vplijk);
                vxyz = [];
            }
            //距离不满足分段条件或者重新开始新的线段
            vxyz.push(vx);
            vxyz.push(vy);
        }
    }
    //最后没有处理完成的折线
    if (!vbfoto && vxyz.length >= 2)//至少一个点时
    {
        var vplijk = lbs_make_newline(vxyz, __vgtrackline.length);
        __vgtrackline.push(vplijk);
        viewer.entities.add(vplijk);
    }
    
    viewer.flyTo(viewer.entities);    
}


function lbs_query_success(msg) {
    //$.messager.progress('close');	// hide progress bar while submit successfully
    if (isbad(msg)) {
        $.messager.alert('查询统计', isvalid(msg.ERR) ?
            msg.ERR : '没有相关数据', 'info');
        return;
    }
	    //msg的提示信息为ERR
    if (!isbad(msg.ERR) )
    {
        $.messager.alert('查询统计', msg.ERR, 'info');
        return;
    }
    var vvid = $("#lbsselidstat").combobox('getValue');
    var vquetype = $("#lbsstate").combobox('getValue');
    //查询里程统计时，改变参数，其他都是获取轨迹数据，然后进行判断
    //lbs_stat_track(msg);// 查询的轨迹线存在map.graphics图层中
	    lbs_update_track_line(msg,
        vquetype == "FOTO" ? 'FOTO' : __lbs_curusers[vvid].text,
        "images/per32.png", 'per');

       lbs_stat_track(msg);// 查询的轨迹线存在map.graphics图层中
 $("#lbsbtndetail").hide();
	
	var vquetype = $("#lbsstate").combobox('getValue');
    switch (vquetype) {
        case "DIST"://里程计算
            lbs_stat_dist();
            break;
        case "TRAK"://轨迹查询
            //$("#lbsbtndetail").show();
            break;
        case 4://统计指定日期的所有车辆的警报信息 待实现！！！！
            //stat_alarms_date();
            break;
        case "OVSP"://超速
            stat_alarms_speed();
            break;
        case "FENC"://电子围栏
            stat_alarms_fence();
            break;
        case "WARN"://当前车辆指定日期的全部警报
            stat_alarms();
            break;
        case "FOTO"://photos
            //可以将其做成点图层，单击查询结果
            lbs_toggle_photo(msg);//fotos name
            break;
        default:
            break;
    }
}

//里程统计
function lbs_stat_dist(msg)
{
    // 查询的轨迹线存在__vgtrackline图层中
    if (isbad(__vgtrackline)) {
        $.messager.alert("里程统计", "里程统计查询结果为空!", "error");
        return 0.0;
    }

    var vtotaldis = 0.0;
    var vlen = __vgtrackline.length;
    for (var i = 0; i < vlen; i++)
    {
        var vlinepts = __vgtrackline[i].positions;
        var vjlen = vlinepts.length / 2;
        for (var j = 1; j < vjlen; j++)
        {
            var k = j - 1;
            //纬度,经度，纬度，经度
            var vdist = lbs_distance_HaversineDEG(
                vlinepts[k * 2 + 1], vlinepts[k * 2],
                vlinepts[j * 2 + 1], vlinepts[j * 2]);

            vtotaldis += vdist;
        }
    }

    $.messager.alert("里程统计", "共计行驶" + vtotaldis.toFixed(4) + "公里", "info");
}

function lbs_distance_HaversineDEG(lat1, lon1, lat2, lon2) {
    var vdx0 = lon1 * Math.PI / 180;// 3.1415926
    var vdy0 = lat1 * Math.PI / 180;// 3.1415926
    var vdx1 = lon2 * Math.PI / 180;// 3.1415926
    var vdy1 = lat2 * Math.PI / 180;// 3.1415926
    /*
    var distance = 6371004 * Math.acos((Math.sin(lat1) * Math.sin(lat2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1)));
    */
    var varccos = Math.sin(vdy0) * Math.sin(vdy1) +
        Math.cos(vdy0) * Math.cos(vdy1) * Math.cos(vdx1 - vdx0);
    if (Math.abs(varccos) >= 1.0) return 0.0;//超出定义域[-1,1]

    var distance = 6371.004 * Math.acos(varccos);
    return distance;
    //fail
    //lbs_distance_HaversineRAD(vdy0, vdx0, vdy1, vdx1);
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
	/*
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
	*/
}

//电子围栏越界判断 更新相应位置图标
function stat_alarms_fence() {
    if (isbad(vfence_car))
    {
        $.messager.alert("电子围栏统计", "电子围栏没有设置，请设置先~", "info");
        return;
    }
	/*
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
	*/
}

function lbs_query_ok() {
    var vquetype = $("#lbsstate").combobox('getValue');
    //相片查询不需要选择用户id
    if (vquetype == "FOTO") {
        lbs_query_pos(lbs_query_success, vquetype,
            $("#lbstqbeginstat").textbox('getValue'),
            $("#lbstqendstat").textbox('getValue'), null);
        return;
    }
    //其他查询需要选择用户id
    var vvid = $("#lbsselidstat").combobox('getValue');
    if (isbad(__lbs_curusers) || isbad(__lbs_curusers[vvid])) {
        alert("用户不存在，请重新选择");
        return;
    }
    vvid = __lbs_curusers[vvid].attributes.deviceid;
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
    var vspeedmax = $('#lbstxtspeedmax').val();
    var vspeedmin = $('#lbstxtspeedmin').val();
    if (!isNaN(vspeed_max)) {
        vspeed_max = parseFloat(vspeedmax);
        __vspeed_max = vspeed_max;
    }
    if (!isNaN(vspeed_min)) {
        vspeed_min = parseFloat(vspeedmin);
        __vspeed_min = vspeed_min;
    }

    $('#lbsspeed_limit_dlg').dialog('close');    
}

///////////////////////////////////////////////////////////////////////////////
//轨迹查询相关
function lbs_clear_track_lines()
{
    if (isvalid(__vgtrackline))
    {
        var vlen = __vgtrackline.length;
        for (var i = 0; i < vlen; i++)
            viewer.entities.remove(__vgtrackline[i]);
    }
    __vgtrackline = [];
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
		        if (vbfoto)//
        {
            var vfoto = lbs_make_label_pt("Foto" + i, "照片" + i,
                "themes/icons/large_clipart.png", vx, vy);
            viewer.entities.add(vfoto);
            __vgtrackline.push(vfoto);
        }
        else {
            //将间隔太远时的线(~110m)分为若干段,单独渲染
            var vlt = vxyz.length  ;
            var vdis = (vlt >= 2) ? getdist(vxyz[vlt - 2], vxyz[vlt - 1], vx, vy): 0.0 ;
            if (vdis > 0.001 )//110m
            {
                var vplijk = lbs_make_newline(vxyz, __vgtrackline.length);
                __vgtrackline.push(vplijk);
                viewer.entities.add(vplijk);
                vxyz = [];
            }
            //距离不满足分段条件或者重新开始新的线段
			vxxy.push(vx);
			vxxy.push(vy);
		}
	}/*
    var vgeoline = {
        polyline: {
            positions: Cesium.Cartesian3.fromDegreesArray(vxxy),
            width: 5,
            material: Cesium.Color.RED
        }
    };
    if (vgtrackline != null) viewer.entities.remove(vgeoline);
    vgtrackline = vgeoline;
	var entity = viewer.entities.add(vgeoline);*/
	
	    //最后没有处理完成的折线
    if (!vbfoto && vxyz.length >= 2)//至少一个点时
    {
        var vplijk = lbs_make_newline(vxyz, __vgtrackline.length);
        __vgtrackline.push(vplijk);
        viewer.entities.add(vplijk);
    }
    viewer.flyTo(viewer.entities);

}

function lbs_make_newline(vxyz,ilen)
{
    var vlt = vxyz.length / 2;
    //如果只有一个轨迹点，则创造一个最近的点作为终点
    if (vlt == 1) {
        vxyz.push(vxyz[0] + 0.0001);//x
        vxyz.push(vxyz[1] + 0.0001);//y
    }
    //entity
    var vplijk = new Cesium.Entity({
        name: '轨迹线' + (ilen + 1),
        polyline: {
            positions: Cesium.Cartesian3.fromDegreesArray(vxyz),
            width: 10,
            material: new Cesium.PolylineGlowMaterialProperty({
                glowPower: 0.2,
                color: Cesium.Color.BLUE
            })
        },
        positions:vxyz//自定义数据，保存原始经纬度
    });
    return vplijk;
}



function ontipForMatter(value) {
   // var opts = $(this).slider('options');
   // return (value + ' / ' + opts.max);
}

function valueOnChange(value) {
    //$("#loctime").textbox('setValue', value);
    if (__vtrackpts !== null && value >= 0 && 
        value < __vtrackpts.length && isvalid(__vtrackpts[value])&&
        isvalid(__vtrackpts[value].TIME)) {
        
        $("#lbsidxoflen").html((value + 1) + '/' + __vtrackpts.length);
        var vtime = __vtrackpts[value].TIME;
        $("#loctimestat").textbox('setValue', vtime.replace('T',' '));
    }

    //更新位置 或者增加新的标记，显示轨迹
    var vg0 = __vtrackpts[value];//vgcar.graphics[value];
	    if (isbad(vg0) || isbad(vg0.X) || isbad(vg0.Y)) return;

    var vx = parseFloat(vg0.X);
    var vy = parseFloat(vg0.Y);

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


///////////////////////////////////////////////////////////////////////////
//电子围栏
function lbs_init_fence()
{
    __vgfence_om=FENCE_OP.FINIT;
    //__vgfences=[];
    __vghandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
    __vghandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    __vghandler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
}

function lbs_prepare_fence(opvm)
{
    __vgtemppts = [];//init
    lbs_init_fence();
    __vgfence_om = opvm;
    __vghandler = new Cesium.ScreenSpaceEventHandler(__vgcanvas);
    // 添加监听事件
    
    //鼠标左键单击事件
    __vghandler.setInputAction(lbs_fence_lclick,
        Cesium.ScreenSpaceEventType.LEFT_CLICK);
    //鼠标移动事件
    __vghandler.setInputAction(lbs_fence_mmove,
        Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    //鼠标右键单击完成事件
    __vghandler.setInputAction(lbs_fence_rclick,
        Cesium.ScreenSpaceEventType.RIGHT_CLICK);
}

function lbs_get_position_degree(vpos)
{    
    var vdeg3 = new Cesium.Cartesian3();
    var ellipsoid = viewer.scene.globe.ellipsoid;
    var cartesian0 = viewer.camera.pickEllipsoid(vpos, ellipsoid);
    if (cartesian0) {
        //将笛卡尔三维坐标转为地图坐标（弧度）
        var vptdeg = new Cesium.Cartographic();
        vptdeg = viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian0);
        //将地图坐标（弧度）转为十进制的度数
        vdeg3.y = Cesium.Math.toDegrees(vptdeg.latitude);
        vdeg3.x = Cesium.Math.toDegrees(vptdeg.longitude);
        //panelId.style.display="block";
    } 
    return vdeg3;
}

//鼠标单击事件-添加点
function lbs_fence_point(vptdegree)
{
    if (vptdegree.x == 0.0 || vptdegree.y == 0.0) return;
    //保持屏幕跟随
    /*
    var scratch = new Cesium.Cartesian2();	
    viewer.scene.preRender.addEventListener(function() {
        var position = Cesium.Cartesian3.fromDegrees(vlon, vlat);
        var canvasPosition = viewer.scene.cartesianToCanvasCoordinates(position, scratch);
        if (Cesium.defined(canvasPosition)) {
            //panelId.style.display="block";
            panelId.style.top = canvasPosition.y + 'px';
            panelId.style.left = canvasPosition.x + 'px';
        }
    })
    */
    var pinBuilder = new Cesium.PinBuilder();
    _gvtempentity_pl = viewer.entities.add({
        id: "fence_point" + __vgfences.length,
        position: Cesium.Cartesian3.fromDegrees(vptdegree.x, vptdegree.y),
        billboard: {
            image: pinBuilder.fromColor(Cesium.Color.ROYALBLUE, 48).toDataURL(),
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM
        },
        properties: {
            type: "POINT", distance: 100, info: '',
            xy: {x:vptdegree.x,y:vptdegree.y}
        }
    });
	__vgfences.push(_gvtempentity_pl);
    $("#lbsdlgfenceinfo").dialog('open');

}

//鼠标单击事件-添加线、面
function lbs_fence_pline(vptdeg)
{    
    if (vptdeg.x == 0.0 || vptdeg.y == 0.0) return;
    __vgtemppts.push(vptdeg);
    //多于两个点时绘制临时线段
	if(__vgtemppts.length==1){
		//为后面mousemove做准备
		__vgtemppts.push(vptdeg);// 再添加一次，但是记得清除。
	}
    if (__vgtemppts.length >= 2)
    {
        if( _gvtempentity_pl !=null  )
            viewer.entities.removeById("temp_pline000");
		
        var vpttemp = lbs_pts2arrayxy(__vgtemppts);
		
		//Cesium.Cartesian3.packArray(__vgtemppts);//[(x,y),(x,y)]->[x,y,x,y]
        _gvtempentity_pl = {
			id:"temp_pline000",
            name: "fence_pline",
            polyline: {
                positions: Cesium.Cartesian3.fromDegreesArray(vpttemp),
                width: 10,
                material: new Cesium.PolylineGlowMaterialProperty({
                    glowPower: 0.2,
                    color: Cesium.Color.BLUE
                })
            },
            properties: {
                type: 'pline', distance: 100, info: '',
                xy:__vgtemppts
            }
        };

        viewer.entities.add(_gvtempentity_pl);
    }
}

//橡皮筋绘图
function lbs_rubber_line_poly()
{
    // 鼠标的最后一次点和折线的上一个顶点组成旧的线段
    if (_gvtempentity != null)
        viewer.entities.removeById("fence_ll_rubber");

	var vxyz = __vgtemppts.slice(0);//深拷贝arr.concat();
	vxyz.push(__vgtempptlast);	
    var vpttemp = lbs_pts2arrayxy(vxyz);

    _gvtempentity =
    {
		id:'fence_ll_rubber',
        //name:'fence_pline_poly_temp',
        polyline:    {
            positions: Cesium.Cartesian3.fromDegreesArray(vpttemp),
            width: 10,
            material: new Cesium.PolylineGlowMaterialProperty({
                glowPower: 0.2,
                color: Cesium.Color.GREEN
            })
        }
    };

    viewer.entities.add(_gvtempentity);
}

//左键单击事件
function lbs_fence_lclick(movement) {
    //选择已添加的标记时
    var pick = viewer.scene.pick(movement.position);
    if (Cesium.defined(pick) && pick.id === 'instance' &&
        viewer.selectedEntity) {
        //获取已有的数据赋值给对话框相关控件
        //$("#lbsdlgfenceinfo").dialog('open');
        //console.log('单击了实例');//显示已有数据
        //return;
    }
    else {
        //new新添加的
        // var cloNode=document.getElementById( "div-" + ii);
        //viewer.container.appendChild(panelId);
        var vdegpt = lbs_get_position_degree(movement.position);
        if (vdegpt.x == 0.0 || vdegpt.y == 0.0) return;

        switch (__vgfence_om) {
            case FENCE_OP.FPOINT://point
                lbs_fence_point(vdegpt);
                break;
            case FENCE_OP.FPOLYG://polygon
            case FENCE_OP.FPLINE://polyline
                //记录鼠标上一次位置,用于绘制折线及多边形
                __vgtempptlast = vdegpt;
                lbs_fence_pline(vdegpt);
                break;
        }
    }
}

//鼠标移动事件
function lbs_fence_mmove(movement) {
    if (__vgfence_om < 2 || isbad(movement.endPosition)) return;

    var vdegpt = lbs_get_position_degree(movement.endPosition);
    if (vdegpt.x == 0.0 || vdegpt.y == 0.0) return;

    switch (__vgfence_om) {
    case FENCE_OP.FPOINT://point
        break;
    case FENCE_OP.FPLINE://polyline
    case FENCE_OP.FPOLYG://polygon
        {
            var vlen=__vgtemppts.length;
            if (vlen < 1) return;//没有点时，退出            
            //这里的思路是，鼠标移动时，首先删除之前基于鼠标的上一次位置创建的_vgtempentity，
            lbs_rubber_line_poly();
            //{x,y}更新坐标
            __vgtempptlast = vdegpt;
			//Cesium.Cartesian3.fromDegrees(
            //cartographicBegin.longitude,cartographicBegin.latitude);            
            //然后基于鼠标的最新位置创建polyline于_vgtempentity,
            //lbs_rubber_line_poly();
        }
        break;
    }
}

function lbs_pts2arrayxy(vpts)
{
	if(isbad(vpts)) return null;
	var vtemparr = [];
	var vlen = vpts.length;
	for(var i=0;i<vlen;i++)
	{
		vtemparr.push(vpts[i].x);
		vtemparr.push(vpts[i].y);
	}
	return vtemparr;
}

//鼠标右键
function lbs_fence_rclick(movement) {
    if (__vgfence_om != FENCE_OP.FPLINE && 
	__vgfence_om != FENCE_OP.FPOLYG)
        return;
    //最后一个坐标
    var vdegpt = lbs_get_position_degree(movement.position);
    if (vdegpt.x == 0.0 || vdegpt.y == 0.0) return;
    __vgtemppts.push(vdegpt);

    var vpttemp = lbs_pts2arrayxy(__vgtemppts);
    
    if (_gvtempentity_pl != null )
        viewer.entities.removeById("temp_pline000");
	if (_gvtempentity != null)
        viewer.entities.removeById("fence_ll_rubber");

	var ventiy=null;
    switch(__vgfence_om)
    {
        case FENCE_OP.FPLINE://pline
            ventiy = {
				//id:"temp_pline000",
                name:"fence_pline",
                polyline: {
					positions: Cesium.Cartesian3.fromDegreesArray(vpttemp),
					width: 10,
					material: new Cesium.PolylineGlowMaterialProperty({
						glowPower: 0.2,
						color: Cesium.Color.BLUE
					})
				},
                properties: {
                    type: 'polyline', distance: 100, info: '',
                    xy: __vgtemppts
                }
            };
            break;
        case FENCE_OP.FPOLYG://polygon
			 ventiy = {
				name : 'fence_polygon',
				polygon : {
					hierarchy : Cesium.Cartesian3.fromDegreesArray(vpttemp),
					material : Cesium.Color.BLUE
				},
                properties: {
                    type: 'polygon', distance: 100, info: '',
                    xy: __vgtemppts
                }
			}

            break;
    }
    viewer.entities.add(ventiy);
	    __vgfences.push(ventiy);
    //清理工作
    __vgtempptlast = null;
    __vgtemppts = [];
    if (_gvtempentity != null &&
        viewer.entities.contains(_gvtempentity))
        viewer.entities.remove(_gvtempentity)
    _gvtempentity = null;
    /* 不能去除，它指向了viewer里面的实体
    if (_gvtempentity_pl != null &&
        viewer.entities.contains(_gvtempentity_pl))
        viewer.entities.remove(_gvtempentity_pl);
        */
    _gvtempentity_pl = null;

    //打开属性对话框，设置当前实体对应的缓冲区距离以及其他信息，然后保存指标入库
	$("#lbsfencedist").textbox('setValue',''),
    $("#lbsfencedescription").textbox('setValue','');
	$("#lbsspanhideidx").html(__vgfences.length);
    $("#lbsdlgfenceinfo").dialog('open');
}

//单击电子围栏设置窗口时的ok消息
function lbs_ok_fence_info(bok)
{
    $('#lbsdlgfenceinfo').dialog('close');
    if (!bok) return;

	var venti = __vgfences[ __vgfences.length-1];
    venti.properties.distance = $("#lbsfencedist").textbox('getValue'),
    venti.properties.info = $("#lbsfencedescription").textbox('getValue');
    //保存以准备提交后台入库
    //__vgfences.push(_gvtempentity_pl);
}

function lbs_submit_fences()
{

    if (isbad(__vgfences) || __vgfences.length < 1) {
        $.messager.alert("没有电子围栏相关数据，无需提交");
        return;
    }
    //准备数据:个数|wkt,info,dist||||...
    var vfeatures = [];
    var vlen = __vgfences.length;
    for (var i = 0; i < vlen; i++) {
        var ventijk = __vgfences[i];
        var vprops = ventijk.properties;
		if(vprops.type == "POINT" || vprops.type == "point")
		{
			/*
			vfeatures.push(
			{
				"type": "Feature",
				"geometry": {
					"type": "Point",
					"coordinates": [vprops.xy.x,vprops.xy.y]
				},
				"properties": {
					"distance": vprops.distance,
					"description": vprops.info
				}
			});
			*/
		}
			
        switch(vprops.type)
        {
            case "polyline": {
                var vposs = vprops.xy;
                var vxysz = [];
                for (var jpos in vposs) {
                    var vik = [vposs[jpos].x, vposs[jpos].y];
                    vxysz.push(vik);
                }

                vfeatures.push({
                    "type": "Feature",
                    "geometry": {
                        "type": "LineString",
                        "coordinates": vxysz
                    },
                    "properties": {
                        "distance": vprops.distance,
                        "description": vprops.info
                    }
                });
            }
                break;
            case "polygon":
                {
                    //首先保证首尾点闭合
                    var vposs = vprops.xy;
                var vxysz = [];
                for (var jpos in vposs) {
                    var vik = [vposs[jpos].x, vposs[jpos].y];
                    vxysz.push(vik);
                }
				vxysz.push([vposs[0].x, vposs[0].y]);//收尾闭合

                vfeatures.push({
                    "type": "Feature",
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [vxysz]
                    },
                    "properties": {
                        "distance": vprops.distance,
                        "description": vprops.info
                    }
                });

                }
                break;
        }

    }
    //保存之，以备提交
    var vgeojson = {
        "type": "FeatureCollection",
        "features": vfeatures
    };
	var vjsons = JSON.stringify(vgeojson);

    //以geojson格式提交，在后台直接解析然后转为wkt入库即可
    lbs_ajax(lbsbk_submit_fences,
        { QUERY: 'UPFENCES', FENCES: vjsons },
        'POST', __vimgbase+'ghuser.ashx');
}

function lbsbk_submit_fences(vjson)
{
    if (isbad(vjson) || isvalid(vjson.ERR)) {

        $.messager.alert("提交电子围栏","提交失败" + vjson.ERR || '','warning');
        return;
    }

    $.messager.alert("提交电子围栏","提交成功",'info');
}

/*
function lbs_fence_pline_right_click() {

    if (flagNum == 2) {
        viewer.container.appendChild(panelId);
        panelId.style.display = "block";
        calculateDis5(polylinePath3[0], polylinePath3[polylinePath3.length - 1], '总长度', gg);
        publicArray = [].concat(polylinePath3);
        publicValue = (calculateDis(publicArray[0], publicArray[publicArray.length - 1]) / 1000).toFixed(2);
        var scratch = new Cesium.Cartesian2();
        var cartographicF = ellipsoid.cartesianToCartographic(polylinePath3[polylinePath3.length - 1]);
        viewer.scene.preRender.addEventListener(function () {
            var position = Cesium.Cartesian3.fromDegrees(Cesium.Math.toDegrees(cartographicF.longitude), Cesium.Math.toDegrees(cartographicF.latitude));
            var canvasPosition = viewer.scene.cartesianToCanvasCoordinates(position, scratch);
            if (Cesium.defined(canvasPosition)) {
                panelId.style.top = canvasPosition.y + 'px';
                panelId.style.left = canvasPosition.x + 'px';
            }
        })

        //flagNum=0;
        polylinePath3 = [];
        polyline3 = undefined;
    } else {
        return;
    }
    //flagNum=0;
    //hander3.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
    //hander4.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
}*/
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
//用户管理
function lbs_bk_simple(vjson) {
    alert(vjson.MSG);
}

//用户是否已注册回调函数
function lbs_bk_userexits(vjson) {
    if (isbad(vjson)) return;
    if (isvalid(vjson.MSG) && vjson.MSG == "registered" ) {
        alert("已注册，请重新输入用户名");
        $("#lbsdlgnewuser").dialog('open');

        return;
    }

    var vnm = $("#lbsregname").textbox('getValue');
    var vzhnm = $("#lbsregchinesename").textbox('getValue');
    var vpsw = $("#lbsregpsw").textbox('getValue');
    //var vpsw2 = $("#lbsergegpswconfirm").textbox('getValue');
    var vsex = $("#lbsregsex").combobox('getValue');
    var vfone = $("#lbsregphone").textbox('getValue');
    var vimei = $("#lbsregimei").textbox('getValue');
    var vroleid = $("#lbsregrole").textbox('getValue');
    var vfencid = $("#lbsregfence").textbox('getValue');
    var vemail = $("#lbsregemail").textbox('getValue');

    var vdata = {
        QUERY: "REGISTER", NAME: vnm, PSW: vpsw,
        ZHNM: vzhnm, SEX: vsex, PHONE: vfone, IMEI: vimei,
        ROLEID: vroleid, FENCEID: vfencid, EMAIL: vemail
    };
    lbs_ajax(lbs_bk_simple, vdata, 'GET', __vimgbase + 'ghuser.ashx');
}

//用户注册
function lbs_register() {
    var vpsw = $("#lbsregpsw").textbox('getValue');
    var vpsw2 = $("#lbsergegpswconfirm").textbox('getValue');
    if (vpsw != vpsw2) {
        alert("两次输入的密码不一致");
        return;
    }

    var vnm = $("#lbsregname").textbox('getValue');
    if (isbad(vnm)) {
        alert("用户名无效，请重新输入");
        return;
    }
    $("#lbsdlgnewuser").dialog('close');
    //判断用户名是否已经存在
    lbs_ajax(lbs_bk_userexits, { QUERY: "USEREXITS", USERID: vnm }, 'GET',__vimgbase +  'ghuser.ashx');
}

//修改密码
function lbs_modify_psw() {
    var vnm = $("#lbschgpswname").textbox('getValue');
    var pswold = $("#lbschgpswold").textbox('getValue');
    var pswnew = $("#lbschgpswnew").textbox('getValue');
    var pswnew2 = $("#lbschgpswnew2").textbox('getValue');
    if (pswnew != pswnew2) {
        alert("两次输入的新密码不一致，请重新输入");
        return;
    }
    if (pswnew == pswold) {
        alert("新旧密码一致，请重新输入或者退出");
        return;
    }

    $("#lbsdlgchgpsw").dialog('close');
    lbs_ajax(lbs_bk_simple,
        {
            QUERY: 'MODIPSW', USERID: vnm,
            OLDPSW: pswold, NEWPSW: pswnew
        },
        'GET', __vimgbase + 'ghuser.ashx');
}

//修改信息
function lbs_modify_info() {
    
    var vnm = $("#lbschginfoname").textbox('getValue');
    var vfone = $("#lbschginfophone").textbox('getValue');
    var vimei = $("#lbschginfoimei").textbox('getValue');
    var vroleid = $("#lbschginforole").textbox('getValue');
    var vfencid = $("#lbschginfofence").textbox('getValue');
    var vemail = $("#lbschginfoemail").textbox('getValue');

    var vdata = {
        QUERY: "MODIINFO", NAME: vnm,
        PHONE: vfone, IMEI: vimei,
        ROLEID: vroleid, FENCEID: vfencid, EMAIL: vemail
    };
    lbs_ajax(lbs_bk_simple, vdata, 'GET', __vimgbase + 'ghuser.ashx');

    $("#lbsdlgchginfo").dialog('close');
}
    

///////////////////////////////////////////////////////////////////////////
