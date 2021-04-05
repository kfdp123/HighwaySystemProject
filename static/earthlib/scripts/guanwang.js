viewer.extend(Cesium.viewerCesiumNavigationMixin, {});
var image_tjnu=null;
var put3Dtiles=[];
function guanwangAdd() 
{
	image_tjnu=image_show("../2015/",1.0); //png底图
	viewer.scene.camera.flyTo({
	  destination:Cesium.Cartesian3.fromDegrees(117.119968,39.055743,2000)
	});	
	$('#tree').treeview('checkAll', { silent: true });

	for(var i=0;i<50;i++){
		put3Dtiles.push(add3Dtiles1('../dic3/projectData/'+i+'/tileset.json'));
		//put3Dtiles.push(add3Dtiles1('../dic3/projectData/'+i));
	}

	doSearch_guanwang();
}

function guanwangRemove()
{
    for (var i=0;i<50;i++)
	{
		console.log(i);
		viewer.scene.primitives.remove(put3Dtiles[i]);
	}		
}

//3dtiles数据加载函数
function add3Dtiles1(URL){
    var tiles=new Cesium.Cesium3DTileset({ url:URL});
    var tileset =viewer.scene.primitives.add(tiles);
	tileset.readyPromise.then(function() {
		var boundingSphere = tileset.boundingSphere;
		var cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
		var heightOffset;
		var pathString=URL.split('/');
		var vidxxx=(pathString[pathString.length-2]);
		if(vidxxx=='0'){
			heightOffset=29;
		}else if(vidxxx=='2'){
			heightOffset=17.2725;
		}else if(vidxxx=='4'){
			heightOffset=2.52222;
		}else if(vidxxx=='6'){
			heightOffset=7.54756;
		}else if(vidxxx=='7'){
			heightOffset=12.6978;
		}else if(vidxxx=='8'){
			heightOffset=5.05;
		}else if(vidxxx=='9'){
			heightOffset=5.01528;
		}else if(vidxxx=='10'){
			heightOffset=7.70068;
		}else if(vidxxx=='11'){
			heightOffset=10.1361;
		}else if(vidxxx=='12'){
			heightOffset=5.7725;
		}else if(vidxxx=='13'){
			heightOffset=5.08765;
		}else if(vidxxx=='16'){
			heightOffset=8.00947;
		}else if(vidxxx=='17'){
			heightOffset=7.23925;
		}else if(vidxxx=='19'){
			heightOffset=0.000001;
		}else if(vidxxx=='20'){
			heightOffset=3.3;
		}else if(vidxxx=='21'){
			heightOffset=9.50211;
		}else if(vidxxx=='22'){
			heightOffset=2.99211;
		}else if(vidxxx=='23'){
			heightOffset=6.14307;
		}else if(vidxxx=='24'){
			heightOffset=12.51;
		}else if(vidxxx=='27'){
			heightOffset=5.584297;
		}else if(vidxxx=='28'){
			heightOffset=3.019795;
		}else if(vidxxx=='29'){
			heightOffset=1.877529;
		}else if(vidxxx=='30'){
			heightOffset=7.20544;
		}else if(vidxxx=='32'){
			heightOffset=4.7285;
		}else if(vidxxx=='33'){
			heightOffset=4.7285;
		}else if(vidxxx=='35'){
			heightOffset=4.675315;
		}else if(vidxxx=='36'){
			heightOffset=3.50231;
		}else if(vidxxx=='37'){
			heightOffset=-1.318345;
		}else if(vidxxx=='38'){
			heightOffset=-1.100276;
		}else if(vidxxx=='39'){
			heightOffset=0.0148;
		}else if(vidxxx=='40'){
			heightOffset=7.07286;
		}else if(vidxxx=='42'){
			heightOffset=8.382;
		}else if(vidxxx=='43'){
			heightOffset=4.082;
		}else if(vidxxx=='44'){
			heightOffset=2.629;
		}else if(vidxxx=='45'){
			heightOffset=2.629;
		}else if(vidxxx=='46'){
			heightOffset=2.629;
		}else if(vidxxx=='48'){
			heightOffset=-6.530155;// -6.530155
		}else if(vidxxx=='49'){
			heightOffset=7.112257;
		}else{
		   heightOffset =-cartographic.height;
		}
		
		var vdegx=Cesium.Math.toDegrees(cartographic.longitude) ;
		var vdegy=Cesium.Math.toDegrees(cartographic.latitude)  ;
		
		var vlon=Cesium.Math.toRadians(vdegx);
		var vlat=Cesium.Math.toRadians(vdegy);
		var vlonll=Cesium.Math.toRadians(vdegx + 0.0064);//左侧坐标
		var vlatll=Cesium.Math.toRadians(vdegy + 0.0005);//左侧坐标
		
		console.log(vdegx);
		console.log(vdegy);
		
		var offset = Cesium.Cartesian3.fromRadians(vlonll, vlatll, heightOffset+150);
		var surface = Cesium.Cartesian3.fromRadians(vlon, vlat,0);
		var translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
		tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
		//viewer.camera.flyToBoundingSphere(tileset.boundingSphere)
	});
	return tileset;										
}


function radians2degree(rad)
{
	 Cesium.CesiumMath.toDegrees(radians) 
}


function degree2radians(deg)
{
}
												
$('#tree').treeview({
             data: getTree(),
			 expandIcon : "glyphicon glyphicon-chevron-right",//图案可以自己选择
             collapseIcon : "glyphicon glyphicon-chevron-down",
             emptyIcon:"glyphicon glyphicon-th-large",//设置没有子节点的菜单前的图标
             levels:1,
             checkedIcon: "glyphicon glyphicon-check",
		     showCheckbox: true,//是否在节点上显示复选框
             onNodeChecked: function(event, data) {         //节点被选中时的事件
                         doFunction(data,true);
                     },
			 onNodeUnchecked:function(event, data) {        //节点不被选中时的事件
                         doFunction(data,false);
                     }
			 });
			 
function doFunction(data,boole){
   if(data.nodes==undefined){                                                
		if(boole){
			console.log('获取id加载数据');
			put3Dtiles[data.nodeId]=add3Dtiles1('../dic3/projectData/'+data.nodeId);
		}else{ 
			console.log('获取id删除数据');
			viewer.scene.primitives.remove(put3Dtiles[data.nodeId]);
			cancelParent(data,boole);
		}
		return;
   }else{                                                                  
         arrJust(data,boole)
   }
};

//如果此节点下有子节点，则将下边所有的节点设置为同样可选或不可选
function arrJust(data,boole){
   var arrLength=data.nodes.length;
     if(boole){
	       for(var i=0;i<arrLength;i++){
		        if(data.nodes[i].nodes==undefined){
				    $('#tree').treeview('checkNode', [ data.nodes[i].nodeId, { silent: true } ]);
				    console.log('获取id加载数据');
					viewer.scene.primitives.remove(put3Dtiles[data.nodes[i].nodeId]);
					put3Dtiles[data.nodes[i].nodeId]=add3Dtiles1('../dic3/projectData/'+data.nodes[i].nodeId); 
				}else{
				    $('#tree').treeview('checkNode', [ data.nodes[i].nodeId, { silent: true } ]);
				    arrJust(data.nodes[i],boole);
				}
		   }
		}else{
			for(var i=0;i<arrLength;i++){
		        if(data.nodes[i].nodes==undefined){
				    $('#tree').treeview('uncheckNode', [ data.nodes[i].nodeId, { silent: true } ]); 
				    console.log('获取id删除数据');
					viewer.scene.primitives.remove(put3Dtiles[data.nodes[i].nodeId]);
					cancelParent(data,boole);
				}else{
				    $('#tree').treeview('uncheckNode', [ data.nodes[i].nodeId, { silent: true } ]); 
				    arrJust(data.nodes[i],boole);
				}
		   }
		}
   }
//如果子节点有一个没有被选中，其所有的父节点都不被选中（主要是为了显示效果）
function cancelParent(data,boole){
    if(data.parentId==undefined){
	   return;
	}else{
		if(boole==false){
			$('#tree').treeview('uncheckNode', [ data.parentId, { silent: true } ]); 
			if((data.parentId==3)||(data.parentId==18)){
			     $('#tree').treeview('uncheckNode', [ 1, { silent: true } ]);   
			}else if((data.parentId==26)||(data.parentId==31)||(data.parentId==34)||(data.parentId==41)||(data.parentId==47)){
			     $('#tree').treeview('uncheckNode', [ 25, { silent: true } ]); 
			}else{
			    return;
			}
		}else{
			return;
		}
	}	
}
//只要这个子节点有父节点，只有这个节点的所有兄弟节点都被选中，其父节点才被选中；如果这个节点没有被选中，则其父节点都不会被选中
function getTree() {
    //节点上的数据遵循如下的格式：
    var tree = [{
        text: "校园基础图层"           // 0
                },{
        text: "体育馆建筑模型",          // 1
            nodes:[{
                     text: "屋顶"       // 2
                          },{
                     text: "主馆",      // 3
					 nodes: [{
                     text: "一层室内"  //4                 
                          },{
                     text: "一层室内B102"  //5                
                          },{
                     text: "二层室内"  //6
                          },{
                     text: "三层室内"   //7
                          },{
                     text: "主副馆连接"  //8
                          },{
                     text: "楼梯"        //9
                          },{
                     text: "室内"       //10
                          },{
                     text: "室内立柱"       //11
                          },{
                     text: "吊顶"       //12
                          },{
                     text: "二层地面"    //13
                          },{
                     text: "过道吊顶"     //14
                          },{
                     text: "过道墙"      //15
                          },{
                     text: "外墙"        //16
                          },{
                     text: "座椅"        //17
                          }]
                          },{
                     text: "副馆",           // 18
					 nodes: [{
                     text: "一层地面"        //19
                          },{
                     text: "一层吊顶"       //20
                          },{
                     text: "外墙"           //21
                          },{
                     text: "一层室内"       //22
                          },{
                     text: "二层地面"       //23
                          },{
                     text: "室内墙"         //24
                          }]
                          }]
              },{
        text: "体育馆管网模型",               // 25
            nodes: [{
                  text: "电力",               // 26
                  nodes: [{
                     text: "电工"            // 27
                          },{
                     text: "电力"            // 28
                          },{
                     text: "应急照明"        // 29
                          },{
                     text: "照明全1-2"       // 30
                          }]
                    },{
                  text: "电信",                // 31
                  nodes: [{
                     text: "公共广播"             // 32
                          },{ 
                     text: "综合布线"             // 33
                          }]
                   },{
                  text: "给水",               // 34
                  nodes: [{
                     text: "喷淋给水"          // 35
                          },{
                     text: "中水给水"          // 36
                          },{
                     text: "消火栓给水"        // 37
                          },{
                     text: "变频增压给水"      // 38
                          },{
                     text: "市政压力给水"      // 39
                          },{
                     text: "自动消防炮给水"     // 40
                          }]
                    },{
                  text: "暖通",                     // 41
                  nodes: [{
                     text: "冷供"               // 42
                          },{
                     text: "冷回"               // 43
                          },{
                     text: "凝结"               // 44
                          },{
                     text: "热供"                // 45
                          },{
                     text: "热回"               // 46
                          }]
                   },{
                  text: "排水",                 // 47
                  nodes: [{
                     text: "污水"               // 48
                          },{
                     text: "虹吸雨水"           // 49
                          }]
                   }]
              }];
        return tree;
 }
 
dataArray2=[];
hander_guanwang=new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
//单击查询
function doSearch_guanwang(){	
	hander_guanwang.setInputAction(function(movement){
   var pickedFeature=viewer.scene.pick(movement.position);
     if(pickedFeature==undefined){
		 alert('请选择管线');
		 return;
	 }else{
		var getName=pickedFeature.getProperty('name');
       // alert(getName);
		$.ajax({    
              type: "post",
			  contentType: "application/x-www-form-urlencoded; charset=utf-8",
              url: "http://localhost:16916/objectSearch.ashx",   //后台发送的请求路径
              dataType: "json",
			  data:{"pipeName":getName},
              success: function (data) {
			      var tableString="<table class='bootstrap-table'>"+
                   "<thead>"+
				      "<tr>"+
					     "<th scope='col' style='border:1px solid #ddd;'>属性</th>"+
						 "<th scope='col' style='border:1px solid #ddd;'>值</th>"+
					  "</tr>"+
					"</thead>"+
				   "<tbody>"
			    //for(var i=0;i<data.length;i++){
				  //for(var j=0;j<data[i].length;j++){
				  for(var key in data[0]){
				     tableString+="<tr>"+
					                 "<th scope='row' style='border:1px solid #ddd;'>"+key+"</th>"+
									 "<td style='border:1px solid #ddd;'>"+data[0][key]+"</td>"+
								   "</tr>"
									 
				  }
				  tableString=tableString+"</tbody></table>";
				  document.getElementById('objectContent').innerHTML=tableString;
				//}
			  $('#myModal').modal('show');	
              },
			  error:function(){
			    alert('报错');
			  }
          });
	 }
  
	hander2.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);   
   },Cesium.ScreenSpaceEventType.LEFT_CLICK);
};

