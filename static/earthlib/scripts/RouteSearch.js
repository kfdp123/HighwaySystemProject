/**
 * Created by Administrator on 2018/4/23.
 */
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
    $('#bottomPanel2').hide();
    $('#fenye2').pagination({
        total: 0,
        pageSize: 0,
        PageList:[10,10,10]
    });
});
var tempsArray=[];
var start_p={lat:"",lng:""};
var end_p={lat:"",lng:""};

var recoDiv;

function doSearch1(value) {
		start_num=1;
      recoDiv='startPoint';
	   $('#locaPanel2').panel({
		   title:'请选择起点'
	   });
	 $.ajax({
                type: "GET",
                url: "http://localhost:2222/POI.aspx",
                //我们用text格式接收
                dataType: "text",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
				beforeSend:function(){
					document.getElementById('all-in-center').style.display='';
				},
                data: {
                    TYPE: '00', WORD:value 
                },
                success: function (data) {
					document.getElementById('all-in-center').style.display='none';
                    value_json(data);
					doSearch4(arrayLoca);
                },
                error: function () {
                    alert('error testup()');
                }
            });
	
}

function doSearch2(value) {
	start_num=0;
	 recoDiv='endPoint';
	 $('#locaPanel2').panel({
		   title:'请选择终点'
	   });
	  $('#fenye2').pagination('refresh',{		  
		  pageSize:1
	  });
	 $.ajax({
                type: "GET",
                url: "http://localhost:2222/POI.aspx",
                //我们用text格式接收
                dataType: "text",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
				beforeSend:function(){
					document.getElementById('all-in-center').style.display='';
				},
                data: {
                    TYPE: '00', WORD:value 
                },
                success: function (data) {
					document.getElementById('all-in-center').style.display='none';
                    value_json(data);
					
					doSearch4(arrayLoca);
                },
                error: function () {
                    alert('error testup()');
                }
            });
	
}

//搜索函数（起点）
function doSearch4(value){
   
    if(arrayLoca.length>0){
        $('#bottomPanel2').show();
        if(arrayLoca.length<=10){
            $('#fenye2').pagination({
                total: arrayLoca.length,
                pageSize: 10,
                PageList:[10,10,10]
            })
            var html='';
            for(var i=0;i<arrayLoca.length;i++){
                html+=setTable1(arrayLoca[i],i+1);
                addGITRpoint1(arrayLoca[i].lng*1,arrayLoca[i].lat*1,i+1,arrayLoca[i].name,recoDiv);
            }
            document.getElementById('locaPanel2').innerHTML=html;
			
        }else{
            var html='';
            for(var i=0;i<10;i++){
                html+=setTable1(arrayLoca[i],i+1);
				if(recoDiv=='startPoint'){
					addGITRpoint1(arrayLoca[i].lng*1,arrayLoca[i].lat*1,i+1,arrayLoca[i].name,recoDiv);
				}else{
					tempsArray.push(addGITRpoint1(arrayLoca[i].lng*1,arrayLoca[i].lat*1,i+1,arrayLoca[i].name,recoDiv));
				}
				
            }
            document.getElementById('locaPanel2').innerHTML=html;
			
            $('#fenye2').pagination({
                total: arrayLoca.length,
                pageSize: 10,
                PageList:[10,10,10],
                onSelectPage: function(pageNumber, pageSize) {
					if(recoDiv=='startPoint'){
						viewer.entities.removeAll();
					}else{
						for(var i=0;i<tempsArray.length;i++){    
						viewer.entities.remove(tempsArray[i]);
					}
					}
					
                    if(pageNumber==parseInt(arrayLoca.length/10+1)){
						if(recoDiv=='startPoint'){
							viewer.entities.removeAll();
						}
						tempsArray=[];
                        var html='';
                        var partArray=arrayLoca.slice(pageNumber*10-10);
                        for(var i=0;i<Math.abs(arrayLoca.length%10);i++){
                            html+=setTable1(partArray[i],i+1);
							if(recoDiv=='startPoint'){
									addGITRpoint1(partArray[i].lng*1,partArray[i].lat*1,i+1,partArray[i].name,recoDiv)
								}else{
									tempsArray.push(addGITRpoint1(partArray[i].lng*1,partArray[i].lat*1,i+1,partArray[i].name,recoDiv));
								}
                        }
                        document.getElementById('locaPanel2').innerHTML=html;
						
                    }else{
						tempsArray=[];
                        var html='';
                        var partArray=arrayLoca.slice(pageNumber*10-10,pageNumber*10);
                        for(var i=0;i<10;i++){
                            html+=setTable1(partArray[i],i+1);
							if(recoDiv=='startPoint'){
									addGITRpoint1(partArray[i].lng*1,partArray[i].lat*1,i+1,partArray[i].name,recoDiv)
								}else{
									tempsArray.push(addGITRpoint1(partArray[i].lng*1,partArray[i].lat*1,i+1,partArray[i].name,recoDiv));
								}
                        }
                        document.getElementById('locaPanel2').innerHTML=html;
						
                    }
                }
            });

        }
    }else{
        $('#bottomPanel2').hide();
        alert('没有获取数据');
    }
}
//添加标记点
function addGITRpoint1(arg1,arg2,arc3,arc4,arc5){
    var pinBuilder = new Cesium.PinBuilder();
	if(arc5=='startPoint'){
		var tempEntity=viewer.entities.add({
		id:'poi'+arc5+arc3,
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
		
    });
	}else{
		var tempEntity=viewer.entities.add({
		id:'poi'+arc5+arc3,
        position : Cesium.Cartesian3.fromDegrees(arg1, arg2),
        billboard : {
            image : pinBuilder.fromText(arc3, Cesium.Color.CHARTREUSE, 40),
            verticalOrigin : Cesium.VerticalOrigin.BOTTOM
        },
		description:'<table class="cesium-infoBox-defaultTable"><tbody>' +
								'<tr><th>名称</th><td>' + arc4 + '</td></tr>' +
								'<tr><th>经度</th><td>' + arg1 + '</td></tr>' +
								'<tr><th>纬度</th><td>' + arg2 + '</td></tr>' +
								'</tbody></table>'
		
    });
	}
    
	     return tempEntity;
	}
var start_num=0;
//绘制单个table
function setTable1(item,arg){
    var Table = '<table  class="smallTable" style="border-bottom: 1px solid #ddd;" width="100%" onclick="getName1(this)"><tr>'
        +'<td></td><td>'+arg+'</td><td>名称：</td><td>'+item.name+'</td></tr><tr>'
        +'<td>经度:</td><td>'+item.lng+'</td><td>纬度:</td><td>'+item.lat+'</td></tr></table>'
    return Table;
}

//同时将满足条件的条目tempArray数组，以此输出经纬度坐标在球上显示
/*function addGITRpoint(arg1,arg2){
    var pinBuilder = new Cesium.PinBuilder();
    viewer.entities.add({
        position : Cesium.Cartesian3.fromDegrees(arg1, arg2),
        billboard : {
            image : pinBuilder.fromColor(Cesium.Color.ROYALBLUE, 48).toDataURL(),
            verticalOrigin : Cesium.VerticalOrigin.BOTTOM
        }
    });}*/
//获取选中table，并获得对应的name将其显示在搜索框内(搜索框1)
function getName1(e){
	var value=e.firstChild.firstChild.firstChild.nextSibling.nextSibling.nextSibling.textContent;
	var orderNum=e.firstChild.firstChild.firstChild.nextSibling.textContent;
	if (start_num==1){start_p.lng=e.firstChild.firstChild.nextSibling.firstChild.nextSibling.textContent;
	start_p.lat=e.firstChild.firstChild.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.textContent;
	     var pinBuilder = new Cesium.PinBuilder();
         viewer.entities.add({
			    id:'起点',
				position : Cesium.Cartesian3.fromDegrees(start_p.lng*1, start_p.lat*1),
				billboard : {
					image : pinBuilder.fromText('起点', Cesium.Color.ROYALBLUE, 60),
					verticalOrigin : Cesium.VerticalOrigin.BOTTOM
				},
				description:'<table class="cesium-infoBox-defaultTable"><tbody>' +
										'<tr><th>名称</th><td>' + value + '</td></tr>' +
										'<tr><th>经度</th><td>' + start_p.lng + '</td></tr>' +
										'<tr><th>纬度</th><td>' + start_p.lat + '</td></tr>' +
										'</tbody></table>'
				
    });
	}else{end_p.lng=e.firstChild.firstChild.nextSibling.firstChild.nextSibling.textContent;
	end_p.lat=e.firstChild.firstChild.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.textContent;
	       var pinBuilder = new Cesium.PinBuilder();
         viewer.entities.add({
			    id:'终点',
				position : Cesium.Cartesian3.fromDegrees(end_p.lng*1, end_p.lat*1),
				billboard : {
					image : pinBuilder.fromText('终点', Cesium.Color.CHARTREUSE, 60),
					verticalOrigin : Cesium.VerticalOrigin.BOTTOM
				},
				description:'<table class="cesium-infoBox-defaultTable"><tbody>' +
										'<tr><th>名称</th><td>' + value + '</td></tr>' +
										'<tr><th>经度</th><td>' + end_p.lng + '</td></tr>' +
										'<tr><th>纬度</th><td>' + end_p.lat + '</td></tr>' +
										'</tbody></table>'
				
    });
	}
	
	
   
	//alert(orderNum+selectLng+selectLat);
	for(var i=1;i<=arrayLoca.length;i++){
		//if(i==orderNum*1)   continue;  
		viewer.entities.removeById('poi'+recoDiv+i);
	}
    
    if(recoDiv=='startPoint'){
        $('#startPoint').textbox('setValue',value);
		$('#bottomPanel2').hide();
		 //$('#fenye2').pagination('refresh');
        document.getElementById('locaPanel2').innerHTML='';
	    arrayLoca=[];
		var endText=$('#endPoint').textbox('getValue');
		
		doSearch2(endText);
        recoDiv='endPoint';
    }else{
        $('#endPoint').textbox('setValue',value);
        //recoDiv=null;
		$('#bottomPanel2').hide();
        document.getElementById('locaPanel2').innerHTML='';
		
		var value='2|'+start_p.lng+','+start_p.lat+'|'+end_p.lng+','+end_p.lat+'|10|';
		 $.ajax({
                type: "GET",
                url: "http://localhost:2222/car.aspx",
                //我们用text格式接收
                dataType: "text",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
				beforeSend:function(){
					document.getElementById('all-in-center').style.display='';
				},
                data: {
                    CAR: value
                },
                success: function (data) {
					document.getElementById('all-in-center').style.display='none';
                   var path=data.split(":");
	var path=path[1].split("|");
	for (var j=1;j<path.length-1;j++)
	{
		var arr=new Array()
	var p=path[j].split(",");
		for (var i=p.length-1;i>3;i=i-2)
	  {arr.push(p[i-1]/1000000);
	 arr.push(p[i]/1000000);
	  }
		
		var GPS_path = viewer.entities.add({
    name : p[1],
    polyline : {
        positions : Cesium.Cartesian3.fromDegreesArray(arr),
        width : 10,
        material : new Cesium.PolylineGlowMaterialProperty({
            glowPower : 0.2,
            color : Cesium.Color.BLUE
        })
    }
}); 
	}
	
	

                },
                error: function () {
                    alert('error testup()');
                }
            });
    }
	
	
	/*if(recoDiv=='startPoint'){
		doSearch2(endText);
		}else{
		return;
		} */
		//初始化
		/*arrayLoca=[];
		start_p={lat:"",lng:""};
        end_p={lat:"",lng:""};
		start_num=0;*/
}

function exchPosition(){
	var startValue=$('#startPoint').textbox('getValue');
	var endValue=$('#endPoint').textbox('getValue');
	 $('#startPoint').textbox('setValue',endValue);
	  $('#endPoint').textbox('setValue',startValue);
}
//对话框关闭事件
$('#SearchAll2').dialog({
	onClose:function(){
		 viewer.entities.removeAll();
		 document.getElementById('locaPanel2').innerHTML='';
		 $('#bottomPanel2').hide();
	}
});
