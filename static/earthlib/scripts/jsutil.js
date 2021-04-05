	//goose
	var ssdw_gjcx_num;//初始化为0，实时定位为1，3月1日轨迹查询为3，实时定位加轨迹2

	var getTimer=document.getElementById('getTimer');
	var radar_div =document.getElementById('radar_div');
	var radarPanels=document.getElementById('radarPanels');
	var drawpicture2=document.getElementById('drawpicture2');
	var hangpai_div=document.getElementById('hangpai_div');
	var time_rotate = setInterval('earth_rotate()', 33); //显示时间 
	
	//显示某一个id的菜单ul，其他都消失
	function milk_menu_show(vidshow){		
		//$(vidshow).toggle(500);
		//如果已经显示，则隐藏之。此时说明其他已经隐藏，因此直接返回即可
		var node=$(vidshow);
		//如果node是隐藏的则显示node元素，否则隐藏
		if(node.is(':visible')){
			node.hide(); return;
		}
		//否则说明是第一次单击该按钮
		$('#milk_contacts_ul').hide(500);
		$('#milk_infomark_ul').hide(500);
		$('#milk_datagram_ul').hide(500);
		$('#milk_codeconduct_ul').hide(500);
		$('#milk_history_ul').hide(500);	
		$(vidshow).show(500);		
	}
	
	//显示某一个id的菜单ul，其他都消失
	function menu_show(vidshow)
	{
		$(vidshow).toggle(500);
		$('#liangceALL').hide(500);
		$('#fenxiALL').hide(500);
		$('#chaxunALL').hide(500);
		$('#biaozhuALL').hide(500);
		$('#LocchaxunALL').hide(500);
	}

	$(document).ready(function(){
		var options = {
				camera : viewer.scene.camera,
				canvas : viewer.scene.canvas
		};
		//goose 2018年8月16日
		$('#milk_contacts').click(function(){
			milk_menu_show('#milk_contacts_ul');
		});
		$('#milk_infomark').click(function(){
			milk_menu_show('#milk_infomark_ul');
		});		
		$('#milk_datagram').click(function(){
			milk_menu_show('#milk_datagram_ul');
		});		
		$('#milk_codeconduct').click(function(){
			milk_menu_show('#milk_codeconduct_ul');
		});		
		$('#milk_history').click(function(){
			milk_menu_show('#milk_history_ul');
		});

		//////////////////////////
		
		//viewer.dataSources.add(Cesium.KmlDataSource.load('practice.kml', options));
		$('#liangcefinal').click(function(){
			menu_show('#liangceALL');
		});
		$('#fenxifinal').click(function(){
			menu_show('#fenxiALL');
		});
		$('#chaxunfinal').click(function(){
			menu_show('#chaxunALL');
			$('#chaxunALL').toggle(500);
		});
		$('#biaozhufinal').click(function(){
			menu_show('#biaozhuALL');
		});
		$('#finalsearch').click(function(){
			menu_show('#LocchaxunALL');
		});
	   
		/* 鼠标小手 document.body */
		$(document).mousedown(function(e){
			if(e.which==0){//button
			$(this).css({cursor:"url(../../Build/Cesium/Widgets/Images/cursor/Hold.cur),auto"});
			//this.style.cursor="url(../../Build/Cesium/Widgets/Images/cursor/Hold.cur),auto";
			}
		});

		$(document).mouseup(function(e){
			if(e.button==0){//which
			$(this).css({cursor:"url(../../Build/Cesium/Widgets/Images/cursor/Pan.cur),auto"});
			//this.style.cursor="url(../../Build/Cesium/Widgets/Images/cursor/Pan.cur),auto";
			}
		});
		   
	   //goose 2018-04-14
		$('#extfoos').click(function(){
			$('.ulstyle').hide(500);
			$('#ulextfoos').toggle(500);
		});  
	   
		$('#left_toc').hide();
		$('#navi').click(function(){
			$('#left_toc').toggle(500);
		});
	 
		//$(".cesium-infoBox-visible").css("display","none");
		$(".cesium-viewer-animationContainer").css("display","none");
		$(".cesium-viewer-timelineContainer").css("display","none");
		//goose 2018年5月6日
		$(".easyui-window").window('close');
		$(".easyui-dialog").dialog('close');
		$("#SearchAll2").dialog('close');
		$("#SearchAll").dialog('close');
		$("#fireChangeWindow").dialog('close');
		$("#bxsChangeWindow").dialog('close');
		//var iframe = document.getElementsByClassName('cesium-infoBox-iframe')[0];
		//iframe.setAttribute('data-bind', 'style : { maxHeight : maxHeightOffset(40) ,height:100%}'); 
	});

	
	function santai_search(){
		viewer.scene.imageryLayers.remove(img_556); 
		document.getElementById('santaiSear_div').style.display='none';
		 __vhandler_santai.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
	}
	function measure_clear()
	{
		viewer.entities.remove(glowingLine);
		viewer.entities.remove(glowingPoint);
		viewer.entities.remove(glowingSurface);
		viewer.entities.remove(glowingLabel);
	}

	function earth_rotate() {
		//viewer.camera.rotateRight(0.001);//goose 2018年5月6日
	}
	var menu = document.querySelector('.menu-right');
	function showMenu(x, y){
	    menu.style.left = x + 'px';
	    menu.style.top = y + 'px';
	    menu.classList.add('show-menu');
	}

	function f_login()
	{
        var user_name=document.getElementById("login");
        var user_pass=document.getElementById("password");
        if (user_name.value=="GITR" && user_pass.value=="123456")
        {
        $("#select").hide();
            clearInterval(time_rotate);
        }
	}

	/*function onContextMenu(e){
	    e.preventDefault();
		if (measure_right==0){
		showMenu(e.pageX, e.pageY);
	    document.addEventListener('mousedown', onMouseDown, false);
        }else{measure_right=0;}
		}*/

	function onMouseDown(e){
	   
	}

   // document.addEventListener('contextmenu', onContextMenu, false);