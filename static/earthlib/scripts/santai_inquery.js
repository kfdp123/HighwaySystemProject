// JavaScript source code
/*
* goose 2017年4月26日 for forest information inquery!~
*/
var __vbegin_santai_inquery = false;
var __vhandler_santai = null;


//onclick to query forest information进入和结束查询状态
/*function search_data_santai(vbegin) {
    __vbegin_santai_inquery = vbegin;
    $('#divforestinfo').dialog('close');
    //理论上，通过更新树控件即可完成打开和关闭图层操作
    //更新树控件状态
    var vop = (vbegin == true) ? 'check' : 'uncheck';
    var node = $('#leftTree').tree('find', 5584);
    $('#leftTree').tree(vop, node.target);

	$("#divforest_query").hide();
    //添加和移除事件
    /*
    if (vbegin == true)
        handler.setInputAction(forest_inquery, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    else handler.setInputAction(function () { }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    
}*/
//__vhandler_santai = handler_santai = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
//__vhandler_santai.setInputAction(santai_inquery, Cesium.ScreenSpaceEventType.LEFT_CLICK);
 

function santai_inquery(clk) {
    //console.log(clk);
	//if(__vbegin_santai_inquery == false) return;
	
    // to wgs84
    var vwgs = screen2wgs(clk.position.x, clk.position.y);
    if (!isvalid(vwgs)) return;
    //$('#divforestinfo').dialog('close');

		var vxy=vwgs[0]+','+vwgs[1];
    //ajax to get info
    $.ajax({
        type: "post",
        //url: "http://192.168.10.108:777/forest.ashx",
		url: "http://localhost:888/SanTai.ashx",
        data: { xy: vxy },
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        beforeSend: function (XMLHttpRequest) {
            //ShowLoading();
        },
        complete: function (XMLHttpRequest, textStatus) {
            //HideLoading();
        },
        success: function (data, textStatus) {
            //$('#divforestinfo').dialog('close');

            if (!isvalid(data) || !isvalid(data.features))
            {
            //$.messager.alert('查询结果','数据无效');
			alert('查询结果','数据无效');
            return;
            }
            
            var vmsg="<p style='whiteSpace:pre;'>";
            var vlen = data.features.length;
            
            for (var i = 0; i < vlen; i++) {
                var vfi = data.features[i];
                vmsg += ( "第" + (i + 1) + " / " + vlen + " 个结果</br>" );
                vmsg += (" FID:" + vfi.properties['FID'] + "</br>");
               vmsg += (" 实测面积: " + vfi.properties['实测面积'] + "</br>");
                vmsg += (" 地块编码: " + vfi.properties['地块编码'] + "</br>");
              vmsg += (" 地块类别: " + vfi.properties['地块类别'] + "</br>");
             vmsg += (" 地块名称: " + vfi.properties['地块名称'] + "</br>");
            vmsg += (" 所有权性质: " + vfi.properties['所有权性质'] + "</br>");
           vmsg += (" 土地利用类型: " + vfi.properties['土地利用类型'] + "</br>");
		   vmsg += (" 地力等级: " + vfi.properties['地力等级'] + "</br>");
		   vmsg += (" 土地用途: " + vfi.properties['土地用途'] + "</br>");
		   vmsg += (" 地块东至: " + vfi.properties['地块东至'] + "</br>");
		   vmsg += (" 地块西至: " + vfi.properties['地块西至'] + "</br>");
		   vmsg += (" 地块南至: " + vfi.properties['地块南至'] + "</br>");
		   vmsg += (" 地块北至: " + vfi.properties['地块北至'] + "</br>");
		   vmsg += (" 指界人姓名: " + vfi.properties['指界人姓名'] + "</br>");
            }
            if(vlen < 1) vmsg += "没有查到数据";

		  
            vmsg += "</p>";
            
           // $.messager.alert('共'+vlen+'个结果',vmsg);
		   //var searchOut=document.getElementById('searchOut');
		   //var Searchtext=document.getElementById('Searchtext');
		   
		   //Searchtext.innerHTML=vmsg;
		   //searchOut.style.display='';
		       // alert('共'+vlen+'个结果',vmsg);
			   $.messager.show({
					title:'查询结果',
					height:300,
					msg:vmsg,
					showType:'show',
					style:{
					},
                    timeout:0
				});
        },
        error: function (datas) {
            //请求出错处理
            alert("ERROR");
            //$("#restopojson").val('ERROR: ' + datas);
        }
    });

}

