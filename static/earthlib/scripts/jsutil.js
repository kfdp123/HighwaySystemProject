	//goose
	var ssdw_gjcx_num;//��ʼ��Ϊ0��ʵʱ��λΪ1��3��1�չ켣��ѯΪ3��ʵʱ��λ�ӹ켣2

	var getTimer=document.getElementById('getTimer');
	var radar_div =document.getElementById('radar_div');
	var radarPanels=document.getElementById('radarPanels');
	var drawpicture2=document.getElementById('drawpicture2');
	var hangpai_div=document.getElementById('hangpai_div');
	var time_rotate = setInterval('earth_rotate()', 33); //��ʾʱ�� 
	
	//��ʾĳһ��id�Ĳ˵�ul����������ʧ
	function milk_menu_show(vidshow){		
		//$(vidshow).toggle(500);
		//����Ѿ���ʾ��������֮����ʱ˵�������Ѿ����أ����ֱ�ӷ��ؼ���
		var node=$(vidshow);
		//���node�����ص�����ʾnodeԪ�أ���������
		if(node.is(':visible')){
			node.hide(); return;
		}
		//����˵���ǵ�һ�ε����ð�ť
		$('#milk_contacts_ul').hide(500);
		$('#milk_infomark_ul').hide(500);
		$('#milk_datagram_ul').hide(500);
		$('#milk_codeconduct_ul').hide(500);
		$('#milk_history_ul').hide(500);	
		$(vidshow).show(500);		
	}
	
	//��ʾĳһ��id�Ĳ˵�ul����������ʧ
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
		//goose 2018��8��16��
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
	   
		/* ���С�� document.body */
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
		//goose 2018��5��6��
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
		//viewer.camera.rotateRight(0.001);//goose 2018��5��6��
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