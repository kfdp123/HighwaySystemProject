

function isvalid(vvv) {
    return (vvv !== null && vvv !== 'undefined' && vvv !== undefined);
}

function isbad(vvv) {
    return (vvv === null || vvv === 'undefined'||vvv === undefined);
}

var _lbs_gvaddbase = "http://localhost:6666/";
//vcallbk 成功后的回调函数 其参数为json数据 
function lbs_query_info(vcallbk, vqtype, vfrom, vto,
    vid, vrainsnow, vspan  ) {
    $.ajax({
        url: _lbs_gvaddbase + 'gHDBserver.ashx',
        type: 'GET', //GET POST
        async: true,    //或false,是否异步
        data: {
            QUERY: vqtype, ID: vid,
            FROM: vfrom, TO: vto,
            RAINSNOW: vrainsnow,
            TIMESPAN: vspan//isoband时间间隔
        },
        timeout: 300000,    //超时时间
        dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
        beforeSend: function (xhr) {
            //console.log(xhr);
            //console.log('发送前');
        },
        success: function (data, textStatus, jqXHR) {
            if (vcallbk !== null) vcallbk(data);
        },
        error: function (xhr, textStatus) {
            alert(textStatus);
        },
        complete: function () {
            //console.log('结束');
        }
    })
}



function tree_formatno(node) {
    var s = node.text;
    if (node.children&& node.children.length > 0) {
        s += ('&nbsp;<span style=\' color:blue\'>(' +
        node.children.length + ')</span>');
    }
    return s;
}

function tree_collapse(vidtree) {
    var vtree = $(vidtree);
    if (null === vtree || 'undefined' === vtree) return;

    //折叠所有级别
    var vroot0 = vtree.tree('getRoot');
    if (null === vroot0) return;

    var vchilds = vtree.tree('getChildren');
    if (null === vchilds) return;
    for (var ii = 0; ii < vchilds.length; ii++)
        var vnode1 = vtree.tree('collapse', vchilds[ii].target);

    vtree.tree('collapse', vroot0.target);
}

/*
比如我们可以这样调用下：
var time1 = new Date().format("yyyy-MM-dd hh:mm:ss");
console.log(time1);

也可以转换成 ”年月日”的格式 
var time2 = new Date().format("yyyy-MM-dd");
console.log(time2);

2. 将指定的日期转换为"年月日"的格式，代码如下：
    var oldTime = (new Date("2012/12/25 20:11:11")).getTime();
    var curTime = new Date(oldTime).format("yyyy-MM-dd");
    console.log(curTime);

3. 将 "时间戳" 转换为 "年月日" 的格式.
    var da = 1402233166999;
    da = new Date(da);
    var year = da.getFullYear()+'年';
    var month = da.getMonth()+1+'月';
    var date = da.getDate()+'日';
    console.log([year,month,date].join('-'));
*/
Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,                 //月份 
        "d+": this.getDate(),                    //日 
        "h+": this.getHours(),                   //小时 
        "m+": this.getMinutes(),                 //分 
        "s+": this.getSeconds(),                 //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds()             //毫秒 
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) :
                (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}
