/**
 * Created by Administrator on 2018/4/23.
 */
var tempArray=[];
//var arrayLoca=[{name:'师大博理楼', lng:117.3 ,lat:34.5},{name:'博理楼', lng:117.4 ,lat:34.2},{name:'师大博理楼', lng:117.3 ,lat:34.5}];
/* var arrayLoca=[{name:'师大博理楼1', lng:117.3 ,lat:34.5},{name:'博理楼', lng:117.4 ,lat:34.2},{name:'师大博理楼', lng:117.3 ,lat:34.5},{name:'师大博理钥匙湖',lng: 117.3 ,lat:34.5},
    {name:'师大博理楼', lng:117.2 ,lat:34.2},{name:'师大博理馆',lng:117.4 ,lat:34.1},{name:'师大博理雅意楼', lng:114.3 ,lat:34.2},{name:'师大博理一餐', lng:114.3 ,lat:35.5}
    ,{name:'师大博理',lng: 115.3 ,lat:34.5},{name:'师大博理楼D区10', lng:118.3 ,lat:32.5},{name:'师大博理楼C区11',lng: 118.3 ,lat:32.5},{name:'师大博理楼', lng:117.3 ,lat:34.5},
    {name:'师大博理行文楼', lng:117.4 ,lat:34.2},{name:'师大博理明理楼', lng:117.3 ,lat:34.5},{name:'师大博理钥匙湖',lng: 117.3 ,lat:34.5}, {name:'师大博理全血楼', lng:117.2 ,lat:34.2},
    {name:'师大博理图书馆',lng:117.4 ,lat:34.1},{name:'师大博理雅意楼', lng:114.3 ,lat:34.2},{name:'师大博理博一餐', lng:114.3 ,lat:35.5},{name:'师大博理二餐20',lng: 115.3 ,lat:34.5},
    {name:'师大博理楼D区21', lng:118.3 ,lat:32.5},{name:'师大博理楼C区',lng: 118.3 ,lat:32.5}, {name:'师大博理楼', lng:117.3 ,lat:34.5},{name:'师大博理行文楼', lng:117.4 ,lat:34.2},
    {name:'师大博理楼', lng:117.3 ,lat:34.5},{name:'师大博理钥匙湖',lng: 117.3 ,lat:34.5}, {name:'师大博理全血楼', lng:117.2 ,lat:34.2},{name:'师大博理图书馆',lng:117.4 ,lat:34.1},
    {name:'师大博理楼', lng:114.3 ,lat:34.2},{name:'师大博理博一餐30', lng:114.3 ,lat:35.5},{name:'师大博理二餐31',lng: 115.3 ,lat:34.5},{name:'师大博理楼D区32', lng:118.3 ,lat:32.5}]; */
$(function(){
    $('#bottomPanel').hide();
    /*$('#fenye').pagination({
        total: 100,
        pageSize: 10,
        PageList:[10,10,10]
    });*/
});
//搜索函数

function doSearch(value) {
	viewer.entities.removeAll();
	 $.ajax({
                type: "GET",
                url: "http://localhost:2222/POI.aspx",
                //我们用text格式接收
                dataType: "text",
                contentType: "application/x-www-form-urlencoded;charset=gb2312",
				//traditional:true,
				beforeSend:function(){
					document.getElementById('all-in-center').style.display='';
				},
                data: {
                    TYPE: '00', WORD:value 
                },
                success: function (data) {
					document.getElementById('all-in-center').style.display='none';
                    value_json(data);
					doSearch3(arrayLoca);
                },
                error: function () {
                    alert('error testup()');
                }
            });
	
}

var arrayLoca=[];

function value_json(value)
{
	
	var poi=value.split(",");
	arrayLoca=[];
	
	
	
    for (var i=0;i<poi.length/6;i++)
	{
	var point= {
                name:poi[i*6],
                lng:poi[i*6+2],
				lat:poi[i*6+3]

            }

	arrayLoca[i]=(point);
	}
}


function doSearch3(value){
    if(arrayLoca.length>0){
        $('#bottomPanel').show();
        if(arrayLoca.length<=10){
            $('#fenye').pagination({
                total: arrayLoca.length,
                pageSize: 10,
                PageList:[10,10,10]
            })
            var html='';
            for(var i=0;i<arrayLoca.length;i++){
                html+=setTable(arrayLoca[i],i+1);
                addGITRpoint(arrayLoca[i].lng*1,arrayLoca[i].lat*1,i+1,arrayLoca[i].name);
            }
            document.getElementById('locaPanel').innerHTML=html;
			viewer.camera.flyTo({
				destination : Cesium.Cartesian3.fromDegrees(arrayLoca[0].lng*1, arrayLoca[0].lat*1, 500000),
				duration:2
			});
        }else{
            var html='';
            for(var i=0;i<10;i++){
                html+=setTable(arrayLoca[i],i+1);
				addGITRpoint(arrayLoca[i].lng*1,arrayLoca[i].lat*1,i+1,arrayLoca[i].name);
            }
            document.getElementById('locaPanel').innerHTML=html;
			viewer.camera.flyTo({
				destination : Cesium.Cartesian3.fromDegrees(arrayLoca[0].lng*1, arrayLoca[0].lat*1, 500000),
				duration:2
			});
            $('#fenye').pagination({
                total: arrayLoca.length,
                pageSize: 10,
                PageList:[10,10,10],
                onSelectPage: function(pageNumber, pageSize) {
					viewer.entities.removeAll();
                    if(pageNumber==parseInt(arrayLoca.length/10+1)){
                        var html='';
                        var partArray=arrayLoca.slice(pageNumber*10-10);
                        for(var i=0;i<Math.abs(arrayLoca.length%10);i++){
                            html+=setTable(partArray[i],i+1);
							addGITRpoint(partArray[i].lng*1,partArray[i].lat*1,i+1,partArray[i].name);
                        }
                        document.getElementById('locaPanel').innerHTML=html;
						viewer.camera.flyTo({
								destination : Cesium.Cartesian3.fromDegrees(partArray[0].lng*1, partArray[0].lat*1, 500000),
								duration:2
							});
                    }else{
                        var html='';
                        var partArray=arrayLoca.slice(pageNumber*10-10,pageNumber*10);
                        for(var i=0;i<10;i++){
                            html+=setTable(partArray[i],i+1);
							addGITRpoint(partArray[i].lng*1,partArray[i].lat*1,i+1,partArray[i].name);
                        }
                        document.getElementById('locaPanel').innerHTML=html;
						viewer.camera.flyTo({
								destination : Cesium.Cartesian3.fromDegrees(partArray[0].lng*1, partArray[0].lat*1, 500000),
								duration:2
							});
                    }
                }
            });

        }
    }else{
        $('#bottomPanel').hide();
        alert('没有获取数据');
    }
}
//绘制单个table
function setTable(item,arg){
    var Table = '<table  class="smallTable" style="border-bottom: 1px solid #ddd;" width="100%" onclick="getName(this)"><tr>'
        +'<td>ID：</td><td>'+arg+'</td><td>名称：</td><td>'+item.name+'</td></tr><tr>'
        +'<td>经度:</td><td>'+item.lng+'</td><td>纬度:</td><td>'+item.lat+'</td></tr></table>'
    return Table;
}

//同时将满足条件的条目tempArray数组，以此输出经纬度坐标在球上显示
function addGITRpoint(arg1,arg2,arc3,arc4){
    var pinBuilder = new Cesium.PinBuilder();
    viewer.entities.add({
		id:'poi'+arc3,
        position : Cesium.Cartesian3.fromDegrees(arg1, arg2),
        billboard : {
            image : pinBuilder.fromText(arc3, Cesium.Color.ROYALBLUE, 40),
            verticalOrigin : Cesium.VerticalOrigin.BOTTOM
        },
		description:'<table class="cesium-infoBox-defaultTable"><tbody>' +
								'<tr><th>名称</th><td>' + arc4 + '</td></tr>' +
								'<tr><th>经度</th><td>' + arg1 + '</td></tr>' +
								'<tr><th>纬度</th><td>' + arg2 + '</td></tr>' +
								'</tbody></table>'
		
    });}

//获取选中table，并获得对应的name将其显示在搜索框内
function getName(e){
    var value=e.firstChild.firstChild.firstChild.nextSibling.nextSibling.nextSibling.textContent;
	var orderNum=e.firstChild.firstChild.firstChild.nextSibling.textContent;
	var selectLng=e.firstChild.firstChild.nextSibling.firstChild.nextSibling.textContent;
	var selectLat=e.firstChild.firstChild.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.textContent;
	//alert(orderNum+selectLng+selectLat);
	for(var i=1;i<=arrayLoca.length;i++){
		if(i==orderNum*1)   continue;  
		viewer.entities.removeById('poi'+i);
	}
	viewer.camera.flyTo({
		destination : Cesium.Cartesian3.fromDegrees(selectLng*1, selectLat*1, 5000),
	    duration:1
	});
    $('#bottomPanel').hide();
    document.getElementById('locaPanel').innerHTML='';
    $('#ss').searchbox('setValue',value);
}

//对话框关闭事件
$('#SearchAll').dialog({
	onClose:function(){
		 viewer.entities.removeAll();
		 document.getElementById('locaPanel').innerHTML='';
		 $('#bottomPanel').hide();
	}
});