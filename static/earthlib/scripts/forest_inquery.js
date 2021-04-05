// JavaScript source code
/*
* goose 2017年4月26日 for forest information inquery!~
*/
var __vbegin_forest_inquery = false;
var __vhandler = null;


//onclick to query forest information进入和结束查询状态
function search_data(vbegin) {
    __vbegin_forest_inquery = vbegin;
    $('#divforestinfo').dialog('close');
    //理论上，通过更新树控件即可完成打开和关闭图层操作
    //更新树控件状态
    var vop = (vbegin == true) ? 'check' : 'uncheck';
    var node = $('#leftTree').tree('find', 219);
    $('#leftTree').tree(vop, node.target);

	$("#divforest_query").hide();
    //添加和移除事件
    /*
    if (vbegin == true)
        handler.setInputAction(forest_inquery, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    else handler.setInputAction(function () { }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    */
}

function forest_inquery(clk) {
    //console.log(clk);
	if(__vbegin_forest_inquery == false) return;
	
    // to wgs84
    var vwgs = screen2wgs(clk.position.x, clk.position.y);
    if (!isvalid(vwgs)) return;
    $('#divforestinfo').dialog('close');

		var vxy=vwgs[0]+','+vwgs[1];
    //ajax to get info
    $.ajax({
        type: "post",
        url: "http://localhost:777/forest.ashx",
		//url: "http://203.93.127.134:777/forest.ashx",
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
            $('#divforestinfo').dialog('close');

            if (!isvalid(data) || !isvalid(data.features))
            {
            $.messager.alert('查询结果','数据无效');
            return;
            }
            
            var vmsg="<p style='whiteSpace:pre;'>";
            var vlen = data.features.length;
            
            for (var i = 0; i < vlen; i++) {
                var vfi = data.features[i];
                vmsg += ( "第" + (i + 1) + " / " + vlen + " 个结果</br>" );
                vmsg += (" ID:" + vfi.properties['fid'] + "</br>");
                vmsg += (" 面积: " + vfi.properties['area'] + " 平方公里</br>");
                vmsg += (" 长度: " + vfi.properties['len'] + " 公里</br>");
                vmsg += (" 一级分类: " + vfi.properties['1class'] + "</br>");
                vmsg += (" 二级分类: " + vfi.properties['2class'] + "</br>");
                vmsg += (" 三级分类: " + vfi.properties['3class'] + "</br>");
                vmsg += (" 四级分类: " + vfi.properties['4class'] + "</br>");
            }
            if(vlen < 1) vmsg += "没有查到数据";
            
            vmsg += "</p>";
            
            $.messager.alert('共'+vlen+'个结果',vmsg);
        },
        error: function (datas) {
            //请求出错处理
            alert("ERROR");
            //$("#restopojson").val('ERROR: ' + datas);
        }
    });

}

