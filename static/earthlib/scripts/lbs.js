
function armydiv_show(){
	document.getElementById('army_div').style.display='';
}
function army_divCancel(){
	document.getElementById('army_div').style.display='none';
}
var setting = {
			check: {
				enable: true,
				chkDisabledInherit: true
			},
			data: {
				simpleData: {
					enable: true
				}
			},
			callback: {
				//beforeCheck: beforeCheck,
				onCheck: onCheck,
				onRightClick: zTreeOnRightClick
			}
		};

		var zNodes =[
			{ id:1, pId:0, name:"GITR",open:true},
			{ id:11, pId:1, name:"地信老师",open:true},
			   { id:111, pId:11, name:"毛健"},
			   { id:112, pId:11, name:"陈磊"},
			   { id:113, pId:11, name:"何龙"},
			{ id:12, pId:1, name:"人文老师",open:true},
			   { id:121, pId:12, name:"李老师"},
			   { id:122, pId:12, name:"黄老师"},
			   { id:123, pId:12, name:"何老师"},
			{ id:13, pId:1, name:"自然老师",open:true},
			   { id:131, pId:13, name:"张老师"},
			   { id:132, pId:13, name:"牛老师"},
			   { id:133, pId:13, name:"崔老师"}
		];
		
		
		function setCheck() {
			var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
			type={"Y": "s", "N": "s"};
			zTree.setting.check.chkboxType = type;
		}
		function disabledCheck2(arcg1,arcg2){
		    var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
			 node1 =  zTree.getNodeByParam("id", arcg1, null);
			 node2 =  zTree.getNodeByParam("id", arcg2, null);
			 zTree.setChkDisabled(node1,true,false,true);
			 zTree.setChkDisabled(node2,true,false,true);
		}
		function disabledCheck(arcg1){
		    var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
			 node1 =  zTree.getNodeByParam("id", arcg1, null);
			 zTree.setChkDisabled(node1,true,false,true);
		}
		function checked(arcg1){
			var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
			node1 =  zTree.getNodeByParam("id", arcg1, null);
			node1.checked='true';
			zTree.updateNode(node1);
		}
		
		var nodes=[];
		var shuId111=0,shuId112=0,checkAttri;
		var maoGuiji1,maoGuiji2,chenGuiji;
		function onCheck(e, treeId, treeNode){
			if (ssdw_gjcx_num==1){
				var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
		    ///nodes = zTree.getCheckedNodes(true);
			 selectTreeid=treeNode.id;
			checkAttri=treeNode.checked;
			if (checkAttri==false){
					  for (var i = 0; i < pos_list.length; i++) {
						  if (pcidtotreeid(pos_list[i].id)==selectTreeid){
							  pos_entity[i].show=false;
							  
						  }
					  }
				
			}else{
					  for (var i = 0; i < pos_list.length; i++) {
						  if (pcidtotreeid(pos_list[i].id)==selectTreeid){
							  pos_entity[i].show=true;
						  }
					  }
				
			}
			}
			
			if (ssdw_gjcx_num==2){
				var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
		    ///nodes = zTree.getCheckedNodes(true);
			 selectTreeid=treeNode.id;
			checkAttri=treeNode.checked;
			if (checkAttri==false){
					  for (var i = 0; i < pos_list.length; i++) {
						  if (pcidtotreeid(pos_list[i].id)==selectTreeid){
							  pos_entity[i].show=false;
							  pos_line[i].show=false;
						  }
					  }
				
			}else{
					  for (var i = 0; i < pos_list.length; i++) {
						  if (pcidtotreeid(pos_list[i].id)==selectTreeid){
							  pos_entity[i].show=true;
							  pos_line[i].show=true;
						  }
					  }
				
			}
			}
			
			if (ssdw_gjcx_num==3){		
		var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
		    ///nodes = zTree.getCheckedNodes(true);
			 selectTreeid=treeNode.id;
			checkAttri=treeNode.checked;
			switch(selectTreeid){
				case 111:
				if(checkAttri==false){
					viewer.entities.removeById('maojian1');
					viewer.entities.removeById('maojian2');
					return;
				}else if(checkAttri==true){
					 oldGuijiMao1();
					oldGuijiMao2();
					return;
				}
				if(shuId111==0){
					 oldGuijiMao1();
					oldGuijiMao2();
					shuId111=1;
				}else if(shuId111==1){
					viewer.entities.removeById('maojian1');
					viewer.entities.removeById('maojian2');
					shuId111=0;
				}
				break;
				case 112:
				if(checkAttri==false){
					viewer.entities.removeById('chenlei');
					return;
				}else if(checkAttri==true){
					 oldGuijiChen();
					 return;
				}
				if(shuId112==0){
					 oldGuijiChen();
					shuId112=1;
				}else if(shuId112==1){
					viewer.entities.remove(chenGuiji);
					shuId112=0;
				}
				break;
			}
		   //for(var i=0;i<nodes.length;i++){
             //  alert(nodes[i].id); //获取每个节点的id
             //}
			//alert(treeNode.id);
			
		}
		}
		function zTreeOnRightClick(event, treeId, treeNode) {
           alert(treeNode.pId);
       };
		
		 $(document).ready(function(){
			$.fn.zTree.init($("#treeDemo"), setting, zNodes);
			setCheck();
		}); 

		  
	var account,content_wrap;
	
	function pastLocation(){
        var a = document.getElementById("form_id");
		a.style.display='';
        var Height=document.documentElement.clientHeight;
        var Width=document.documentElement.clientWidth;
        var gao1 = a.offsetHeight;
        var gao2 = a.offsetWidth;
        var Sgao1= (Height - gao1)/2+"px";
        var Sgao2= (Width - gao2)/2+"px";
        a.style.top=Sgao1;
        a.style.left=Sgao2;
    }
	

	
	function nowLocation(){
	   			disabledCheck(113);
				disabledCheck2(12,13);
				checked(111);
				checked(112);
		content_wrap=document.getElementById("content_wrap");
	    content_wrap.style.display='';
		pos_start();
		
	}

	function cancelLocation(){
	    content_wrap.style.display='none';
		viewer.entities.removeAll();
	}
	function guijiSure(){
		
		if(getTimer.value=='2018-03-01'){
			content_wrap=document.getElementById("content_wrap");
	        content_wrap.style.display='';
			var a = document.getElementById("form_id");
			a.style.display='none';
			oldGuijiChen();
            oldGuijiMao1();	
			oldGuijiMao2();
			viewer.camera.setView({
                destination : Cesium.Cartesian3.fromDegrees(117.12, 39.06, 4000),
                orientation: {
				heading : Cesium.Math.toRadians(0),
				pitch : Cesium.Math.toRadians(-90),    
				roll : 0.0                             
                             }
                                 });	
			    disabledCheck(113);
				disabledCheck2(12,13);
				checked(111);
				checked(112);
				
		}else{
			alert(false);
		}		
	}
	
	function oldGuijiChen(){
		var measure_1=[117.13031060632333, 39.06147834098492, 117.12912180204256, 39.06312233651911, 117.12711407510562, 39.06357709177653, 117.12358089689737, 39.063612080576, 117.12281822492739, 39.06233538530526, 117.12279584040454, 39.060936292209284, 117.12158455363549, 39.060131790367464, 117.12057521614712, 39.05849656878365]
	var  glowingLine_1 = viewer.entities.add({
    name:'陈磊',
	id:'chenlei',
 description:'<table class="cesium-infoBox-defaultTable"><tbody>' +
                                 '<tr><th>人员</th><td>' + '陈磊'+ '</td></tr>' +
                                 '<tr><th>单位</th><td>' + "天津师范大学" + '</td></tr>' +
                                 '<tr><th>起始时间</th><td>'+'2018-03-01 12:30:20'+ '</td></tr>' +
								 '<tr><th>结束时间</th><td>'+'2018-03-01 12:38:12'+ '</td></tr>' +
                                 
                                 '</tbody></table>',
    polyline : {
        positions : Cesium.Cartesian3.fromDegreesArray(measure_1),
        width : 10,
        material : new Cesium.PolylineGlowMaterialProperty({
            glowPower : 0.2,
            color : Cesium.Color.BLUE
        })
    }
});
     return glowingLine_1;
	}
	function oldGuijiMao1(){
	var measure_2=[117.12994969880472, 39.061526357306924, 117.1300785382873, 39.06062626022493, 117.13007737601376, 39.0596111391833, 117.13007432694543, 39.05837463395843, 117.12989806406563, 39.05935778440597, 117.12989806708532, 39.06001321332923, 117.12993874893145, 39.06074263949233];
	//var glowingLine_2=new Array();
	 var glowingLine_20= viewer.entities.add({
    name:'毛健',
	id:'maojian1',
 description:'<table class="cesium-infoBox-defaultTable"><tbody>' +
                                 '<tr><th>人员</th><td>' + '毛健'+ '</td></tr>' +
                                 '<tr><th>单位</th><td>' + "天津师范大学" + '</td></tr>' +
                                 '<tr><th>起始时间</th><td>'+'2018-03-01 2:31:20'+ '</td></tr>' +
								 '<tr><th>结束时间</th><td>'+'2018-03-01 2:39:15'+ '</td></tr>' +
                                 
                                 '</tbody></table>',
    polyline : {
        positions : Cesium.Cartesian3.fromDegreesArray(measure_2),
        width : 10,
        material : new Cesium.PolylineGlowMaterialProperty({
            glowPower : 0.2,
            color : Cesium.Color.GREEN
        })
    }
});
return glowingLine_20;
	}
	function oldGuijiMao2(){
	var measure_3=[117.12764356952061, 39.061261412859636, 117.1258363575471, 39.061562032592896, 117.12420985811448, 39.06164658281741, 117.1228002208982, 39.06174050394385, 117.1220050282763, 39.06198470852677]
	
	 var glowingLine_21 = viewer.entities.add({
    name:'毛健',
	id:'maojian2',
 description:'<table class="cesium-infoBox-defaultTable"><tbody>' +
                                 '<tr><th>人员</th><td>' + '毛健'+ '</td></tr>' +
                                 '<tr><th>单位</th><td>' + "天津师范大学" + '</td></tr>' +
                                 '<tr><th>起始时间</th><td>'+'2018-03-01 11:00:17'+ '</td></tr>' +
								 '<tr><th>结束时间</th><td>'+'2018-03-01 11:10:12'+ '</td></tr>' +
                                 
                                 '</tbody></table>',
    polyline : {
        positions : Cesium.Cartesian3.fromDegreesArray(measure_3),
        width : 10,
        material : new Cesium.PolylineGlowMaterialProperty({
            glowPower : 0.2,
            color : Cesium.Color.GREEN
        })
    }
});
	return glowingLine_21;
	}
	/////
	////
	////
	//连老师实时定位和当天轨迹查询
	var myDate=new Date();
myDate=myDate.toLocaleDateString()+" 0:00:00";
var pos_entity=new Array();
var pos_list=new Array();
var pos_line=new Array();

function pos_start()
{
 $.ajax({
        type: "GET",//POST
      //  url: vaddbase + "bxsstatistic.aspx",       //ly修改--
	    url: 'http://192.168.10.36:11935/Handler3.ashx',   //ly修改++
        dataType: "json",
        data: { 'QTYPE': 'CARTB' },
        success: function (msg) {
           // pos_list = msg; // 存储下来   
     //     //增加id text属性，用于历史记录查询时的显示
         var ilen = msg.length;
		 k=0;
		 
		 //点赋值
        for (var i = 0; i < ilen; i++) 
		{
		if (msg[i].X!=""&&msg[i].Y!=""&&msg[i].TIME>myDate)
		{
		var obj = new Object();
            
			 obj.time=msg[i].TIME;
              obj.x=msg[i].X;
			  obj.y=msg[i].Y;
			  obj.id=msg[i].PCID;
			  //是否添加新的数据
			  var add_num=1;
			  for (var j=0;j<pos_list.length;j++)
			  {
			  if (pos_list[j].id==obj.id){add_num=0;}
			  
			  }
			  if (add_num==1){pos_list.push(obj)}
        }			  
		}
		
		//轨迹加载 
		for (var j=0;j<pos_list.length;j++)
		 {var pos_line_1=[];
		  for (var i = 0; i < ilen; i++) 
		  {
		  if (msg[i].PCID==pos_list[j].id&&msg[i].X!=""&&msg[i].Y!=""&&msg[i].TIME>myDate)
		  {
		   pos_line_1=pos_line_1.concat([msg[i].X,msg[i].Y]);
		   }
		    pos_line[j]=pos_line_1;
		 }
		 }
		 
	  //点数据加载
	  for (var i = 0; i < pos_list.length; i++) {
	  if ((pos_list.length!=pos_entity.length)||(pos_list[i].x!= pos_entity[i].x && pos_list[i].y!= pos_entity[i].y && pos_list[i].name!= pos_entity[i].name ))
	 {pos_entity[i]=viewer.entities.add(
	 {name:idtoname(pos_list[i].id),
	 time:pos_list[i].time,
	 pos_id:pos_list[i].id,
	  description:'<table class="cesium-infoBox-defaultTable"><tbody>' +
                                 '<tr><th>定位时间</th><td>' + pos_list[i].time + '</td></tr>' +
                                 '<tr><th>人员</th><td>' + idtoname(pos_list[i].id) + '</td></tr>' +
                                 '<tr><th>单位</th><td>' + "天津师范大学" + '</td></tr>' +
                                 '</tbody></table>',
      
        position : Cesium.Cartesian3.fromDegrees(pos_list[i].x, pos_list[i].y),
        point : {
            show : true, // default
            color : Cesium.Color.SKYBLUE, // default: WHITE
            pixelSize : 10, // default: 1
            outlineColor : Cesium.Color.YELLOW, // default: BLACK
            outlineWidth : 3 // default: 0
        }
    });
	}}
	
	//树状表打勾
	if (ssdw_gjcx_num==1){
			for (var i = 0; i < pos_list.length; i++) {
						  
							checked(pcidtotreeid(pos_list[i].id));
						  }
					  }
				
      //   set_cache('carlist', msg);
      //    // init_sellist();
      //    //添加标记到地图
      //    fill_markers_car();
      //    stop_watch();
            // 启动定时器，每隔5s取一次位置数据，以及速度。(test, 5000);setTimeout 
            //vtimer = setInterval("timer_rt_pos('CARRT')", 5000);
        }, error: function () {
           // $.messager.alert('init_carlist()', '查不到数据', 'info');
        }
    });
	}
	
	function pos_refresh()
{
 $.ajax({
        type: "POST",
      //  url: vaddbase + "bxsstatistic.aspx",       //ly修改--
	    url: 'http://192.168.10.36:11935/Handler3.ashx',   //ly修改++
        dataType: "json",
        data: { 'QTYPE': 'CARTB' },
        success: function (msg) {
           // pos_list = msg; // 存储下来   
     //     //增加id text属性，用于历史记录查询时的显示
         var ilen = msg.length;
		 k=0;
		 
		 //点赋值
        for (var i = 0; i < ilen; i++) 
		{
		if (msg[i].X!=""&&msg[i].Y!=""&&msg[i].TIME>myDate)
		{
		var obj = new Object();
            
			 obj.time=msg[i].TIME;
              obj.x=msg[i].X;
			  obj.y=msg[i].Y;
			  obj.id=msg[i].PCID;
			  //是否添加新的数据
			  var add_num=1;
			  for (var j=0;j<pos_list.length;j++)
			  {
			  if (pos_list[j].id==obj.id){add_num=0;}
			  
			  }
			  if (add_num==1){pos_list.push(obj)}
        }			  
		}
		
		//轨迹加载 
		for (var j=0;j<pos_list.length;j++)
		 {var pos_line_1=[];
		  for (var i = 0; i < ilen; i++) 
		  {
		  if (msg[i].PCID==pos_list[j].id&&msg[i].X!=""&&msg[i].Y!=""&&msg[i].TIME>myDate)
		  {
		   pos_line_1=pos_line_1.concat([msg[i].X,msg[i].Y]);
		   }
		    pos_line[j]=pos_line_1;
		 }
		 }
		 
	  //点数据加载
	  for (var i = 0; i < pos_list.length; i++) {
	  if ((pos_list.length!=pos_entity.length)||(pos_list[i].x!= pos_entity[i].x && pos_list[i].y!= pos_entity[i].y && pos_list[i].id!= pos_entity[i].pos_id ))
	 {pos_entity[i]=viewer.entities.add(
	 {name:idtoname(pos_list[i].id),
	 time:pos_list[i].time,
	 pos_id:pos_list[i].id,
	  description:'<table class="cesium-infoBox-defaultTable"><tbody>' +
                                 '<tr><th>定位时间</th><td>' + pos_list[i].time + '</td></tr>' +
                                 '<tr><th>人员</th><td>' + idtoname(pos_list[i].id) + '</td></tr>' +
                                 '<tr><th>单位</th><td>' + "天津师范大学" + '</td></tr>' +
                                 '</tbody></table>',
      
        position : Cesium.Cartesian3.fromDegrees(pos_list[i].x, pos_list[i].y),
        point : {
            show : true, // default
            color : Cesium.Color.SKYBLUE, // default: WHITE
            pixelSize : 10, // default: 1
            outlineColor : Cesium.Color.YELLOW, // default: BLACK
            outlineWidth : 3 // default: 0
        }
    });
	}else{pos_entity[i].position=[pos_list[i].x,pos_list[i].y]}
	
	

	}
      //   set_cache('carlist', msg);
      //    // init_sellist();
      //    //添加标记到地图
      //    fill_markers_car();
      //    stop_watch();
            // 启动定时器，每隔5s取一次位置数据，以及速度。(test, 5000);setTimeout 
            //vtimer = setInterval("timer_rt_pos('CARRT')", 5000);
        }, error: function () {
           // $.messager.alert('init_carlist()', '查不到数据', 'info');
        }
    });
	}
	
	var guiji_Line=new Array();
	function guiji()
	{
	guiji_Line=new Array();
	//添加轨迹
	  for (var i = 0; i < pos_line.length; i++)
	  {
	 guiji_Line[i] = viewer.entities.add({
                      
    polyline : {
        positions : Cesium.Cartesian3.fromDegreesArray(pos_line[i]),
        width : 10,
        material : new Cesium.PolylineGlowMaterialProperty({
            glowPower : 0.2,
            color : Cesium.Color.BLUE
        })
    }
});
}
	}
	
	
	
	//guiji();
	

	function pcidtotreeid(id)
	{var name;
	switch (id)
	{case "867439030374302":name="112"; break;
	case "867439034663916":name="111";break;
	default :name="崔"
	}
	return name;
	}
	
	function idtoname(id)
	{var name;
	switch (id)
	{case "867439030374302":name="陈磊"; break;
	case "867439034663916":name="毛健";break;
	default :name="崔"
	}
	
	return name;}
	var sureTimer;
	function updatePosi(){
		sureTimer=setInterval('pos_refresh()',5000);
		ssdw_gjcx_num=1;
	}
	function upGuiji(){
		guiji();
	}