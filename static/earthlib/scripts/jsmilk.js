//goose 2018年8月16日


var _VGMILK_URL = "http://localhost:85/hmilk.ashx";
//vcallbk 成功后的回调函数 其参数为json数据
//vqtype:LOGIN MODIPSW NEWUSER
function milk_query_ajax(vcallbk, vurl, vpara) {

	$.ajax({
		url: vurl,
		type: 'GET', //GET POST
		async: true, //或false,是否异步
		data: vpara,//$.extend({QUERY: vqtype}, vpara),
		timeout: 300000, //超时时间
		dataType: 'json', //返回的数据格式：json/xml/html/script/jsonp/text
		beforeSend: function (xhr) {
			//console.log(xhr);
			//console.log('发送前');
		},
		success: function (data, textStatus, jqXHR) {
			if (vcallbk != null)
				vcallbk(data);
			//alert(data);
		},
		error: function (xhr, textStatus) {
			alert(textStatus);
		},
		complete: function () {
			//console.log('结束');
		}
	});
}

/*https://blog.csdn.net/qq_25615395/article/details/78900013 
//click 事件传参数
    var user = { name: 'CodePlayer', age: 18 };
    // 为所有button元素的click事件绑定处理函数
    $(":button").click( user, function(event){
        alert( event.data.name ); // CodePlayer
    } );
	https://blog.csdn.net/chenyao1994/article/details/79731898
*/
function milk_upxls_2() {
    $("#formmilk_upxls").form('submit', {
        url: _VGMILK_URL,
        data: $("#formmilk_upxls").serialize(),
        success: function (data) {
            if (data.status == "true") {
                alert("上传成功！");
            }
            if (data.status == "error") {
                alert(data.msg);
            }

        }
    });
}

function milk_upxls_ajax()
{
    var formData = new FormData();
    //var file = $("#milk_xlsfiles").prop("files")[0];document.getElementById("milk_xlsfiles").files[0]
    var file = $("#milk_xlsfiles").prop("files")[0];;//$('#milk_xlsfiles').filebox('files')[0];
    formData.append("xlsfiles", file);
    formData.append("datatype", $("#milk_sel_type").combobox('getValue'));

    $.ajax({
        url: _VGMILK_URL,
        type: "POST",
        data: formData,
        /*必须false才会自动加上正确的Content-Type  */
        contentType: false,
        /**
        * 必须false才会避开jQuery对 formdata 的默认处理
        * XMLHttpRequest会对 formdata 进行正确的处理
        */
        processData: false,
        success: function (data) {
            if (data.status == "true") {
                alert("上传成功！");
            }
            if (data.status == "error") {
                alert(data.msg);
            }
            //$("#imgWait").hide();
        },
        error: function () {
            alert("上传失败！");
            //$("#imgWait").hide();
        }
    });
}

function milk_upxls() {
	//alert('上传成功');
	//$("#dlgmilk_treemem").dialog('open');
	$("#dlgmilk_importxls").dialog('close');
	//$("#formmilk_upxls").submit();
	$('#formmilk_upxls').form('submit', {
		success: function (data) {
			alert("上传数据成功");
			var vtypeup = $("#milk_sel_dt").combobox('getValue');
			if ("0" == vtypeup) {
				//上帝视角登录
				lbs_query_user(lbs_bklogin, "LOGIN", 'root', 'root');
			}
			//指挥代码选择框数据赋值
			if ("1" == vtypeup) {
				milk_query_ajax(milk_cb_updcode,_VGMILK_URL, { "QUERY": "DCODE" }
				);
			}
		}
	});
}

var _vgdcodes = null;
function milk_cb_updcode(data) {
	if (data.ERR != null) {
		alert(data.ERR);
		return;
	}

	_vgdcodes = data;
	$('#milksm_dcode').combobox('loadData', data);
}

//当关闭树控件时，获取选中的人员
function milk_get_users(vsingle){
    //$("#dlgmilk_treemem").dialog('close');
    var vfunc = "getChecked";
    var vtreeid = "#milk_tree_users_sel";
    if (vsingle) {
        vtreeid = '#milk_tree_users';
        vfunc = "getSelected"
    }
	
	var nodes = $(vtreeid).tree(vfunc);
	var s = '';
	for(var i=0; i<nodes.length; i++){
		if (s != '') s += ',';
		s += nodes[i].text;
	}
	//显示至文本框中
	$('#milksm_tosbs').textbox('setValue',s);	// enable readonly mode
	//alert(s);
	if(_VGPOST2USER)
	{
		//$("#dlgmilk_treemem").dialog('close');
		//调用函数发送数据到用户
		alert("发送至用户：" + s);
	}
	return s;
}

function milk_prepare_coords(vdcode)
{
    if (!viewer.selectedEntity)       return '';
    
    var ventit = viewer.selectedEntity;
    switch (vdcode) {
        case "120":
            if (ventit.position) {//点{
                var vpt = ventit.position.getValue(new Cesium.JulianDate());
                vpt = ellipsoid.cartesianToCartographic(vpt);//xyz->rad
                var lat = Cesium.Math.toDegrees(vpt.latitude);
                var lng = Cesium.Math.toDegrees(vpt.longitude);
                vinfo = lng + "," + lat;
            }
        break;
        case "121"://线
        case "1210":
        case "1211":
        case "1212":
        case "1213":
            if (ventit.polyline && ventit.polyline.positions) {
                var vinfo="";
                var vpts = ventit.polyline.positions.getValue(new Cesium.JulianDate());
                var vlen = vpts.length;
                for (var i = 0; i < vlen; i++) {
                    var vpt = vpts[i];
                    vpt = ellipsoid.cartesianToCartographic(vpt);//xyz->rad
                    var lat = Cesium.Math.toDegrees(vpt.latitude);
                    var lng = Cesium.Math.toDegrees(vpt.longitude);
                    vinfo += (lng + "," + lat + ",");
                }
                //去除结尾逗号
                vinfo = vinfo.substring(0, vinfo.length - 1);
            }
            break;
        case "122"://面
            if (ventit.polygon && ventit.polygon.hierarchy.getValue(new Cesium.JulianDate())) {
                var vinfo = "";
                var vlen = ventit.polygon.hierarchy.length;
                for (var i = 0; i < vlen; i++) {
                    vinfo += (ventit.polygon.hierarchy[i].longitude + "," +
                        ventit.polygon.hierarchy[i].latitude + ",");
                }
                //去除结尾逗号
                vinfo = vinfo.substring(0, vinfo.length - 1);
            }
            break;
    }
    return vinfo;
}

//发送信息至用户
function milk_sendmsg() {
	var vdcode = $('#milksm_dcode').combobox('getValue');
	if (vdcode != "123" ) {
	    if (!viewer.selectedEntity) {
	        alert("请首先选择要发送的实体");
	        return;
	    }
	    else{ //修改代码为选择元素的代码
	        vdcode = viewer.selectedEntity.properties.DCODE;//.getValue();
			if(typeof vdcode != "string") vdcode = vdcode.getValue();
		}
	}
    //信息过长时提示
	var vxys = milk_prepare_coords(vdcode);
	if (vxys != "") {
	    if (vxys.length > 128) 
	        alert("待传的信息过长，可能需要多条信息传输，时间较长，请耐心等候...");
	}
    
    var vmsg = $('#milksm_msgcont').textbox('getValue');
	//从树上获取用户的deviceid，用于表示北斗卡号
	var nodes = $('#milk_tree_users_sel').tree('getChecked');
	var s = '';
	for(var i=0; i<nodes.length; i++){
		if (s != '') s += ',';
		
		var vni = nodes[i];
		if(vni.attributes != null && vni.attributes.deviceid != null)
			s += vni.attributes.deviceid;
	}
    //参数有效性检查
	if (s.length == 0) {
	    alert("选择的用户没有关联设备，请重新关联设备后重试。");
	    return;
	}

	var vtimen = new Date().Format("yyyyMMddhhmmssS") + '0';
	_VGSENTMSGS[vtimen] = 0;

	milk_query_ajax(milk_cb_sendmsg, _VGMILK_URL,
		{
		    QUERY: "SENDMSG",FROM:'456245', TO: s, DCODE: vdcode,
		    MSG: vmsg, TIME: vtimen,XYS:vxys
		});
}

var _VGTIMER_CHEKMSG = null;
function milk_cb_sendmsg(data) {//在data里返回
	$("#dlgmilk_sendmsg").dialog('close');

    if (!isvalid(data)) return;

	alert("信息发送中");
	//发送返回后，设置一个timer  用于检测是否发送成功。
    clearTimeout(_VGTIMER_CHEKMSG);
    _VGTIMER_CHEKMSG = setTimeout(milk_chk_msg, 30000,data.TIME);
}

function milk_chk_msg(vtime) {
    milk_query_ajax(milk_cb_chkmsg, _VGMILK_URL,
        { QUERY: "SENDOK", TIME: vtime });
}

function milk_cb_chkmsg(data) {
    if (!isvalid(data)) return;

	//发送返回后，设置一个timer  用于检测是否发送成功。
    clearTimeout(_VGTIMER_CHEKMSG);
	var vok =0, vinfo='';
	
	var vlen=data.USERS.length;
	for(var i=0;i<vlen;i++){
		if (data.USERS[i].STATUS=='1')
			vok++;
		else
			vinfo += "发送至用户：" + data.USERS[i].USERID +"的信息还没有收到成功回执。\r\n";
	}	
	_VGSENTMSGS[data.TIME] = (vlen == vok) ? 1 : 0;
	if (_VGSENTMSGS[data.TIME] == 0) {//如果没有发送成功，再次等待发出请求探测结果
	    //发送返回后，设置一个timer  用于检测是否发送成功。
	    clearTimeout(_VGTIMER_CHEKMSG);
	    _VGTIMER_CHEKMSG = setTimeout(milk_chk_msg, 30000, data.TIME);
	    alert(vinfo);
	}
	if(_VGSENTMSGS[data.TIME] == 1)
	{
		alert("发送成功");
	}
}

//选择用户
function milk_sel_user(bsingle) {

    $('#milk_tree_users').hide();
    $('#milk_tree_users_sel').hide();
    if (bsingle) $('#milk_tree_users').show();
    else $('#milk_tree_users_sel').show();
}

var _VGPOSAGGRE = false;
var _VGPOST2USER = false;
//发送的信息 dictionary<string,int>,用于存储发送的信息是否成功
var _VGSENTMSGS = [];
var _VGMYPOS = [];//我的位置用于存储获取自己位置的情况
var _VGENTITIES = [];//获取的位置以及信息中的几何实体
var _VGENTITYUNIIDS = 0;

//将坐标字符串转换为float   vsxys:x,y,x,y...
function milk_xy_from_string(vsxys) {
    var vcoords = (vsxys != '') ? vsxys.split(',') : null;
    if (null == vcoords ) return null;

    var vfxys = [];
    var vlen = vcoords.length;
    for (var i = 0; i < vlen; i++)
        vfxys[i] = parseFloat(vcoords[i]);

    return vfxys;
}

function milk_cb_receive_msg(data){
	if(data.ERR){ alert(data.ERR); return;}
	
	var ilen = data.length;
	alert('收到' + ilen + '条新消息');

	for(var i=0;i<ilen;i++){
		var vmsgi = data[i];

		var vtext = "消息来自：" + vmsgi.FROM;
		var vdesc = vtext + "\r\n</br>发送时间:" + vmsgi.TIME;
		vdesc += "\r\n</br>收到时间:" + vmsgi.ARRTIME;
		vdesc += "\r\n</br>数据编码:" + vmsgi.DCODE;
		vdesc += "\r\n</br>备注信息:" + vmsgi.MSG;

		var vcoords = milk_xy_from_string(vmsgi.XYS);
		//var vptlen = vcoords.length/2;
		var ventityi = null;
		switch (vmsgi.DCODE) {
			case '120'://标注点或者坐标function milk_newpt(vid, vtext, vimg, vx, vy)
			    ventityi = milk_newpt("RECPT" + _VGENTITYUNIIDS++, vtext,
                    'images/green.png', vcoords[0], vcoords[1],
					(vcoords.length > 2)? vcoords[2]:0);
			break;
			case '121'://标注线
			    ventityi = milk_newline("RECLINE" + _VGENTITYUNIIDS++, vtext, vcoords,
                    new Cesium.Color.CORAL.withAlpha(0.5));
			break;
			case '122'://标注面
			    ventityi = milk_newpolygon("RECPOLY" + _VGENTITYUNIIDS++, vtext, vcoords,
                    new Cesium.Color.CORAL.withAlpha(0.5));
			break;
			case '123'://仅仅有消息其他数据无效
				var vinfomsg = "收到来自" + vmsgi.FROM + "的消息。\r\n内容如下：" + vmsgi.MSG;
				alert(vinfomsg);
			break;
			case '1210'://导航线
			    ventityi = milk_newline("RECNAVI" + _VGENTITYUNIIDS++, vtext, vcoords,
                    _vgline_color[0]);			        
			break;
			case '1211'://控制线
			    ventityi = milk_newline("RECNAVI" + _VGENTITYUNIIDS++, vtext, vcoords,
                    _vgline_color[1]);			        
			break;
			case '1212'://分界线
			    ventityi = milk_newline("RECNAVI" + _VGENTITYUNIIDS++, vtext, vcoords,
                    _vgline_color[2]);			        
			break;
			case '1213'://区域线
			    ventityi = milk_newline("RECNAVI" + _VGENTITYUNIIDS++, vtext, vcoords,
                    _vgline_color[3]);			        
			break;
		}
		if (ventityi != null && vmsgi.DCODE != "123") {
		    //设置实体预留属性
		    ventityi.description = vdesc;
			ventityi.properties={TIME : vmsgi.TIME,
			    FROM: vmsgi.FROM, DCODE:vmsgi.DCODE
			};
			viewer.zoomTo(viewer.entities);
            //存储下来获取的消息实体
			_VGENTITIES.push( ventityi );
		}
	}
}

var _VGTIMER_CHEKMYPOS = null;

function milk_get_mypos() {
    var vtimen = new Date().Format("yyyyMMddhhmmssS") + '0';
    _VGMYPOS[vtimen] = 0;

    milk_query_ajax(milk_cb_getmypos, _VGMILK_URL,
        { "QUERY": "MYPOS", "TIME": vtimen });
    //修改背景图片
    $("#mypos").css("background-image", "url(images/mypos-ing.png)");
}

function milk_cb_getmypos(data) {
    if (data.ERR) { alert(data.ERR); return; }

    //30秒后检测一下发送状态。当状态还是0时，说明没有发送成功，
    //如果发送成功，则检测一下位置，并移动视图
    if(_VGTIMER_CHEKMYPOS != null)    clearTimeout(_VGTIMER_CHEKMYPOS);
    _VGTIMER_CHEKMYPOS = setTimeout(milk_cb_chkpos, 5000, data.TIME);
    alert("已发送获取我的位置请求，请稍候...");
}

function milk_cb_chkpos(vtime) {
    //30秒后检测一下发送状态。当状态还是0时，说明没有发送成功，
    //如果发送成功，则检测一下位置，并移动视图
    if (_VGTIMER_CHEKMYPOS != null) clearTimeout(_VGTIMER_CHEKMYPOS);

    milk_query_ajax(milk_cb_chkpos_sendstatus, _VGMILK_URL,
        { "QUERY": "SENDMYPOSOK", "TIME": vtime });
}

function milk_cb_chkpos_sendstatus(data) {
    if (data.ERR) { alert(data.ERR); return; }
    //如果发送失败，重新等待，然后再次检查是否发送成功
    var vstatus = parseInt(data.STATUS);
    if (vstatus == 0) {
        milk_cb_getmypos(data);//重新等待30s后检测发送状态
    }
    else if (vstatus == 1) {
        //发送成功，检测接收表里，有没有相关的位置
        milk_query_ajax(milk_cb_receive_mypos, _VGMILK_URL,
            { "QUERY": "RECMYPOS", "TIME": data.TIME });
        alert("获取我的位置请求发送已经成功，等待定位结果...");
    }
}

function milk_cb_receive_mypos(data) {
    // 获取收到的字节的位置
    if (data.ERR) {
        alert(data.ERR);
        //如果还没有收到位置，继续等待重新发送
        if (_VGTIMER_CHEKMYPOS != null) clearTimeout(_VGTIMER_CHEKMYPOS);
        _VGTIMER_CHEKMYPOS = setTimeout(milk_vb_getxy , 5000, data.TIME);
        alert("还没有获取我的位置，等待定位结果...");
        return;
    }

    var vtime = data.TIME;
    var vposs = data.MYPOS;//only 1
    if (vposs.length > 0) {
        var ventityi = null;
        var vxyzs = vposs.split(',');
        if (vxyzs == null || vxyzs.length < 2) {
            alert("获取自己位置失败");
            //修改背景图片
            $("#mypos").css("background-image", "url(images/mypos.png)");

        } else {
            var vhei = (vxyzs.length >= 3) ? vxyzs[2] : 0;
            var vhodd = (vxyzs.length >= 4) ? vxyzs[3] : 0;

            ventityi = milk_newpt("MYPOS" + _VGENTITYUNIIDS++, "我的位置",
                'images/blue_key.png', vxyzs[0], vxyzs[1],vhei);
            //设置实体预留属性
            ventityi.properties = {
                TIME: vtime, H: vhei, HODD: vhodd,
                FROM: '', DCODE: ''
            };

            _VGENTITIES.push(ventityi);
            _VGMYPOS[vtime] = 1;
            viewer.zoomTo(viewer.entities);
            alert("获取我的位置成功");
            //修改背景图片
			$("#mypos").css("background-image", "url(images/mypos-ok.png)");

        }
    }
    else {
        //修改背景图片
        $("#mypos").css("background-image", "url(images/mypos.png)");
        alert("获取自己位置失败");
    }
}

function milk_vb_getxy(vtime) {
    //发送成功，检测接收表里，有没有相关的位置
    milk_query_ajax(milk_cb_receive_mypos, _VGMILK_URL,
        { "QUERY": "RECMYPOS", "TIME": vtime });
}

//////////////////////////////////////////////////////////////////////
//https://blog.csdn.net/happyduoduo1/article/details/51865811
//创建点线面
function milk_newpt(vid, vtext, vimg, vx, vy,vh) {
    var vent  = viewer.entities.add({
        id: vid,
        properties: {},
        position: Cesium.Cartesian3.fromDegrees(
            parseFloat(vx), parseFloat(vy),parseFloat(vh)),
        //availability: new Cesium.TimeIntervalCollection(null, animationObj),
        billboard: {
            image: vimg,
            width: 32,
            height: 32,
            color: new Cesium.Color(1, 1, 0, 1)
        },
        label : { //文字标签
            text : vtext,
            font : '14pt monospace',
            style : Cesium.LabelStyle.FILL_AND_OUTLINE,
            outlineWidth : 2,
            verticalOrigin : Cesium.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置
            pixelOffset : new Cesium.Cartesian2( 0, -9 )   //偏移量
        }
        //, point : {
        //     show : true, // default
        //     color : new Cesium.Color(1, 0, 0, 0.01),//Cesium.Color.RED, // default: WHITE
        //     pixelSize : 20, // default: 1
        //     outlineColor :new Cesium.Color(0, 0, 0, 255),//Cesium.Color.RED, // default: BLACK
        //     outlineWidth : 3 // default: 0,                    
        // }
    });
    return vent;
}

function milk_newline(vid, vtext,vxyz,vcolr) {
    var vlt = vxyz.length / 2;
    //如果只有一个轨迹点，则创造一个最近的点作为终点
    // [-75, 35, -125, 35]
    if (vlt == 1) {
        vxyz.push(vxyz[0] + 0.0001);//x
        vxyz.push(vxyz[1] + 0.0001);//y
    }
    //entity
    var vplijk = viewer.entities.add({
        id:vid,
        name: vtext,
        properties:{},
        polyline: {
            positions: Cesium.Cartesian3.fromDegreesArray(vxyz),
            width: 3, followSurface: true,  //是否贴着地表
            material: vcolr,
			clampToGround:true,       
			followSurface : true  //是否贴着地表
        },
        positions: vxyz//自定义数据，保存原始经纬度
    });
    return vplijk;
}

function milk_newpolygon(vid,vtext,vxy,vclr)
{
        //添加一个实体，仅需要传递一个简单JSON对象，返回值是一个Entity对象
    var wyoming = viewer.entities.add({
        id:vid,
        name: vtext,
        properties: {},
        polygon: {
			clampToGround:true,        followSurface : true,  //是否贴着地表
            hierarchy: Cesium.Cartesian3.fromDegreesArray(vxy),
            material: vclr, //材质
            width: 3,
            outline: true, //是否显示轮廓
            outlineColor: Cesium.Color.BLACK //轮廓的颜色
        }
    });
    return wyoming;
}

//////////////////////////////////////////////////////////////////////
//当选择标识的对话框关闭后执行修改图标功能 
$("#dlgmilk_treemarklib").window({
    onClose: function () {

        if (viewer.selectedEntity) {//修改标识
            var vselent = viewer.selectedEntity;
            if (!vselent.position)//不是点标记，无法修改
            {
                alert('不是点标记，无法修改');
                return;
            }
            var vtreemarksel = $('#treemilk_mmarks').tree('getSelected');
            if (vtreemarksel && vtreemarksel.attributes)
                vselent.billboard.image = "http://localhost:82" + vtreemarksel.attributes.MURL;
        }
    }
});

//双击标识库树，完成选择
$('#treemilk_mmarks').tree({
    onClick: function (node) {
        //$('#treestas').tree('select', node.target);
    },
    onDblClick: function (node) {
        if (isvalid(node.attributes)) {
            var vleaf = $('#treemilk_mmarks').tree('isLeaf', node.target);
            if (!vleaf || !isvalid(node.attributes.MURL)) {
                alert("请选择有效的标识");
            }
            else $("#dlgmilk_treemarklib").window('close');
        }
        else alert("请选择有效的标识");
    }
});


//发送报文对话框中的选择用户按钮触发
$("#milksm_tosbs").textbox({
    onClickButton: function (e) {
        //打开多选的列表树
        milk_sel_user(false);
        //打开任意选择对话框
        $('#dlgmilk_treemem').dialog('open');
    }
});

$(document).ready(function(){
	//开启态势接收的timer
	
    //通讯录//https://max.book118.com/html/2017/0522/108401229.shtm

    //开始时的通讯录只可以单选，隐藏复选的控件
    milk_sel_user(true);//默认是单选

    //demo 测试 添加一个点标注线
    var vptdemo = milk_newpt("demo1", "测试点", 'images/red.png', 117.01243, 39.13453,0);
	vptdemo.properties.DCODE='120';
	//单击选择用户按钮
	/*
	    $("input",$("#TxtClientName").next("span")).click(function(){
        alert("ok");
    });
	*/
    $("#dlgmilk_treemarklib").window('close');
	
    $("#mcu_importxls").click(function (e) {
        $("#milk_sel_dt").combobox('setValue', '0');
        //$("#milk_sel_dt").combobox('disable');
		$('#dlgmilk_importxls').dialog('open');
	});
	
	$("#mcu_exportxls").click(function(e){
		//修改a标签的href链接：
		//$('#home_keleyi_com').attr('href','http://keleyi.com'); 
		//修改文字：
		//$("#home_keleyi_com").text('柯乐义首页');
		$("#milk_downxls").attr('href',
			'http://localhost:82/Upload/test.xls');
		$("#milk_downxls").click();
	});
	
	$("#mcu_winview").click(function(e){
		$('#dlgmilk_treemem').dialog('open');
	});	
	
	$("#mcu_group").click(function(e){
		//milk_tree_users
		
		$('#dlgmilk_treemem').dialog('open');
	});
	
	$("#mcu_groupaggre").click(function(e){
		_VGPOSAGGRE=!_VGPOSAGGRE;
	});
	
	//信息标绘
	$("#miu_control").click(function(e){
		lineMarker(0);
	});
	$("#miu_region").click(function(e){
		lineMarker(1);
	});
	$("#miu_navi").click(function(e){
		lineMarker(2);
	});
	$("#miu_border").click(function(e){
		lineMarker(3);
	});
	
	$("#miu_send").click(function(e){
		//选择用户，然后发送至指定用户
		_VGPOST2USER = true;
		if (viewer.selectedEntity) {
		    //修改代码为选择元素的代码
		    var vcd = viewer.selectedEntity.properties.DCODE;//.getValue();
			if(typeof vcd != "string") vcd = vcd.getValue();
			
		    $('#milksm_dcode').combobox('setValue', vcd);
		}
		$('#dlgmilk_sendmsg').dialog('open');
	});

	$("#mdg_rece").click(function(e){
		milk_query_ajax(milk_cb_receive_msg,
			_VGMILK_URL,
			{
				"QUERY":"RECEIVEMSG"
			});
	});
	
	$("#miu_clear").click(function(e){
	    viewer.entities.removeAll();
	});	
	
	//数据报文
	$("#mdu_free").click(function(e){

	});
	$("#mdu_fixed").click(function(e){
		
	});
	$("#mdg_custom").click(function(e){
		
	});

	//开始接收实时信息LBS
	$("#mdg_rt").click(function(e){
		
	});
	
	//代码指挥
	$("#mcu_codeimport").click(function (e) {
	    $("#milk_sel_dt").combobox('setValue', '1');
	    //$("#milk_sel_dt").combobox('disable');
	    $("#dlgmilk_importxls").dialog('open');
	});
	
	$("#mcu_marklib").click(function(e){
		$("#dlgmilk_treemarklib").window('open');
	});

    //修改标识
	$("#mcu_modimark").click(function (e) {
	    if (!viewer.selectedEntity) {
	        alert("请先选择需要修改的点标记");
	        return;
	    }
	    $("#dlgmilk_treemarklib").window('open');

	});


	$("#mcu_markcustom").click(function(e){
		
	});
	
	//历史查询
	$("#mhu_poss").click(function(e){
		
	});
	$("#mhu_track").click(function(e){
		
	});
	
});