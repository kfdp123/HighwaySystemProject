/*
*大兴安岭火灾预警动态变化
*
*/
var dxal_timer;
var dxalImgs=[];


                                                                 
		var fire_slider=document.getElementById("fire_slider");
        var fire_text=document.getElementById("fire_text");
        fire_slider.addEventListener("mouseup",function(){
           var slider_fire=fire_slider.value;
           fire_text.value=slider_fire; 
             switch(slider_fire){ 
               case "1":
        	     img_1005=image_show1(_gserveradd + 'ghTilesServer.ashx/fire!21',0.3);
				 dxalImgs.push(img_1005);
        		viewer.scene.imageryLayers.remove(img_1006);
				viewer.scene.imageryLayers.remove(img_1007);
				viewer.scene.imageryLayers.remove(img_1008);
				viewer.scene.imageryLayers.remove(img_1009);
				viewer.scene.imageryLayers.remove(img_1010);
				viewer.scene.imageryLayers.remove(img_1011);
				viewer.scene.imageryLayers.remove(img_1012);
				viewer.scene.imageryLayers.remove(img_1013);
				viewer.scene.imageryLayers.remove(img_1014);
				viewer.scene.imageryLayers.remove(img_1015);
				viewer.scene.imageryLayers.remove(img_1016);
				viewer.scene.imageryLayers.remove(img_1017);
				viewer.scene.imageryLayers.remove(img_1018);				 
        		 break;
        	  case "2":
			     img_1006=image_show1(_gserveradd + 'ghTilesServer.ashx/fire!22',0.3);
				 dxalImgs.push(img_1006);
        		 viewer.scene.imageryLayers.remove(img_1005);
				viewer.scene.imageryLayers.remove(img_1007);
				viewer.scene.imageryLayers.remove(img_1008);
				viewer.scene.imageryLayers.remove(img_1009);
				viewer.scene.imageryLayers.remove(img_1010);
				viewer.scene.imageryLayers.remove(img_1011);
				viewer.scene.imageryLayers.remove(img_1012);
				viewer.scene.imageryLayers.remove(img_1013);
				viewer.scene.imageryLayers.remove(img_1014);
				viewer.scene.imageryLayers.remove(img_1015);
				viewer.scene.imageryLayers.remove(img_1016);
				viewer.scene.imageryLayers.remove(img_1017);
				viewer.scene.imageryLayers.remove(img_1018);
        		  break;
        	  case "3":
        	     img_1007=image_show1(_gserveradd + 'ghTilesServer.ashx/fire!23',0.3);
				 dxalImgs.push(img_1007);
        		 viewer.scene.imageryLayers.remove(img_1006);
				viewer.scene.imageryLayers.remove(img_1005);
				viewer.scene.imageryLayers.remove(img_1008);
				viewer.scene.imageryLayers.remove(img_1009);
				viewer.scene.imageryLayers.remove(img_1010);
				viewer.scene.imageryLayers.remove(img_1011);
				viewer.scene.imageryLayers.remove(img_1012);
				viewer.scene.imageryLayers.remove(img_1013);
				viewer.scene.imageryLayers.remove(img_1014);
				viewer.scene.imageryLayers.remove(img_1015);
				viewer.scene.imageryLayers.remove(img_1016);
				viewer.scene.imageryLayers.remove(img_1017);
				viewer.scene.imageryLayers.remove(img_1018);
        		 break;
        	  case "4":
        	     img_1008=image_show1(_gserveradd + 'ghTilesServer.ashx/fire!24',0.3);
				 dxalImgs.push(img_1008);
        		 viewer.scene.imageryLayers.remove(img_1006);
				viewer.scene.imageryLayers.remove(img_1007);
				viewer.scene.imageryLayers.remove(img_1005);
				viewer.scene.imageryLayers.remove(img_1009);
				viewer.scene.imageryLayers.remove(img_1010);
				viewer.scene.imageryLayers.remove(img_1011);
				viewer.scene.imageryLayers.remove(img_1012);
				viewer.scene.imageryLayers.remove(img_1013);
				viewer.scene.imageryLayers.remove(img_1014);
				viewer.scene.imageryLayers.remove(img_1015);
				viewer.scene.imageryLayers.remove(img_1016);
				viewer.scene.imageryLayers.remove(img_1017);
				viewer.scene.imageryLayers.remove(img_1018);				 
        		 break;
        	  case "5":
			     img_1009=image_show1(_gserveradd + 'ghTilesServer.ashx/fire!25',0.3);
				 dxalImgs.push(img_1009);
        		 viewer.scene.imageryLayers.remove(img_1006);
				viewer.scene.imageryLayers.remove(img_1007);
				viewer.scene.imageryLayers.remove(img_1008);
				viewer.scene.imageryLayers.remove(img_1005);
				viewer.scene.imageryLayers.remove(img_1010);
				viewer.scene.imageryLayers.remove(img_1011);
				viewer.scene.imageryLayers.remove(img_1012);
				viewer.scene.imageryLayers.remove(img_1013);
				viewer.scene.imageryLayers.remove(img_1014);
				viewer.scene.imageryLayers.remove(img_1015);
				viewer.scene.imageryLayers.remove(img_1016);
				viewer.scene.imageryLayers.remove(img_1017);
				viewer.scene.imageryLayers.remove(img_1018);
        		  break;
        	  case "6":
        	     img_1010=image_show1(_gserveradd + 'ghTilesServer.ashx/fire!26',0.3);
				 dxalImgs.push(img_1010);
        		 viewer.scene.imageryLayers.remove(img_1006);
				viewer.scene.imageryLayers.remove(img_1007);
				viewer.scene.imageryLayers.remove(img_1008);
				viewer.scene.imageryLayers.remove(img_1009);
				viewer.scene.imageryLayers.remove(img_1005);
				viewer.scene.imageryLayers.remove(img_1011);
				viewer.scene.imageryLayers.remove(img_1012);
				viewer.scene.imageryLayers.remove(img_1013);
				viewer.scene.imageryLayers.remove(img_1014);
				viewer.scene.imageryLayers.remove(img_1015);
				viewer.scene.imageryLayers.remove(img_1016);
				viewer.scene.imageryLayers.remove(img_1017);
				viewer.scene.imageryLayers.remove(img_1018);
        		 break;
			  case "7":
        	     img_1011=image_show1(_gserveradd + 'ghTilesServer.ashx/fire!27',0.3);
				 dxalImgs.push(img_1011);
        		 viewer.scene.imageryLayers.remove(img_1006);
				viewer.scene.imageryLayers.remove(img_1007);
				viewer.scene.imageryLayers.remove(img_1008);
				viewer.scene.imageryLayers.remove(img_1009);
				viewer.scene.imageryLayers.remove(img_1010);
				viewer.scene.imageryLayers.remove(img_1005);
				viewer.scene.imageryLayers.remove(img_1012);
				viewer.scene.imageryLayers.remove(img_1013);
				viewer.scene.imageryLayers.remove(img_1014);
				viewer.scene.imageryLayers.remove(img_1015);
				viewer.scene.imageryLayers.remove(img_1016);
				viewer.scene.imageryLayers.remove(img_1017);
				viewer.scene.imageryLayers.remove(img_1018);				 
        		 break;
        	  case "8":
			     img_1012=image_show1(_gserveradd + 'ghTilesServer.ashx/fire!28',0.3);
				 dxalImgs.push(img_1012);
        		 viewer.scene.imageryLayers.remove(img_1006);
				viewer.scene.imageryLayers.remove(img_1007);
				viewer.scene.imageryLayers.remove(img_1008);
				viewer.scene.imageryLayers.remove(img_1009);
				viewer.scene.imageryLayers.remove(img_1010);
				viewer.scene.imageryLayers.remove(img_1011);
				viewer.scene.imageryLayers.remove(img_1005);
				viewer.scene.imageryLayers.remove(img_1013);
				viewer.scene.imageryLayers.remove(img_1014);
				viewer.scene.imageryLayers.remove(img_1015);
				viewer.scene.imageryLayers.remove(img_1016);
				viewer.scene.imageryLayers.remove(img_1017);
				viewer.scene.imageryLayers.remove(img_1018);
        		  break;
        	  case "9":
        	     img_1013=image_show1(_gserveradd + 'ghTilesServer.ashx/fire!29',0.3);
				 dxalImgs.push(img_1013);
        		 viewer.scene.imageryLayers.remove(img_1006);
				viewer.scene.imageryLayers.remove(img_1007);
				viewer.scene.imageryLayers.remove(img_1008);
				viewer.scene.imageryLayers.remove(img_1009);
				viewer.scene.imageryLayers.remove(img_1010);
				viewer.scene.imageryLayers.remove(img_1011);
				viewer.scene.imageryLayers.remove(img_1012);
				viewer.scene.imageryLayers.remove(img_1005);
				viewer.scene.imageryLayers.remove(img_1014);
				viewer.scene.imageryLayers.remove(img_1015);
				viewer.scene.imageryLayers.remove(img_1016);
				viewer.scene.imageryLayers.remove(img_1017);
				viewer.scene.imageryLayers.remove(img_1018);
        		 break;
			  case "10":
        	     img_1014=image_show1(_gserveradd + 'ghTilesServer.ashx/fire!30',0.3);
				 dxalImgs.push(img_1014);
        		 viewer.scene.imageryLayers.remove(img_1006);
				viewer.scene.imageryLayers.remove(img_1007);
				viewer.scene.imageryLayers.remove(img_1008);
				viewer.scene.imageryLayers.remove(img_1009);
				viewer.scene.imageryLayers.remove(img_1010);
				viewer.scene.imageryLayers.remove(img_1011);
				viewer.scene.imageryLayers.remove(img_1012);
				viewer.scene.imageryLayers.remove(img_1013);
				viewer.scene.imageryLayers.remove(img_1005);
				viewer.scene.imageryLayers.remove(img_1015);
				viewer.scene.imageryLayers.remove(img_1016);
				viewer.scene.imageryLayers.remove(img_1017);
				viewer.scene.imageryLayers.remove(img_1018);				 
        		 break;
        	  case "11":
			     img_1015=image_show1(_gserveradd + 'ghTilesServer.ashx/fire!31',0.3);
				 dxalImgs.push(img_1015);
        		 viewer.scene.imageryLayers.remove(img_1006);
				viewer.scene.imageryLayers.remove(img_1007);
				viewer.scene.imageryLayers.remove(img_1008);
				viewer.scene.imageryLayers.remove(img_1009);
				viewer.scene.imageryLayers.remove(img_1010);
				viewer.scene.imageryLayers.remove(img_1011);
				viewer.scene.imageryLayers.remove(img_1012);
				viewer.scene.imageryLayers.remove(img_1013);
				viewer.scene.imageryLayers.remove(img_1014);
				viewer.scene.imageryLayers.remove(img_1005);
				viewer.scene.imageryLayers.remove(img_1016);
				viewer.scene.imageryLayers.remove(img_1017);
				viewer.scene.imageryLayers.remove(img_1018);
        		  break;
        	  case "12":
        	     img_1016=image_show1(_gserveradd + 'ghTilesServer.ashx/fire!32',0.3);
				 dxalImgs.push(img_1016);
        		 viewer.scene.imageryLayers.remove(img_1006);
				viewer.scene.imageryLayers.remove(img_1007);
				viewer.scene.imageryLayers.remove(img_1008);
				viewer.scene.imageryLayers.remove(img_1009);
				viewer.scene.imageryLayers.remove(img_1010);
				viewer.scene.imageryLayers.remove(img_1011);
				viewer.scene.imageryLayers.remove(img_1012);
				viewer.scene.imageryLayers.remove(img_1013);
				viewer.scene.imageryLayers.remove(img_1014);
				viewer.scene.imageryLayers.remove(img_1015);
				viewer.scene.imageryLayers.remove(img_1005);
				viewer.scene.imageryLayers.remove(img_1017);
				viewer.scene.imageryLayers.remove(img_1018);
        		 break;
			  case "13":
			     img_1017=image_show1(_gserveradd + 'ghTilesServer.ashx/fire!33',0.3);
				 dxalImgs.push(img_1017);
        		 viewer.scene.imageryLayers.remove(img_1006);
				viewer.scene.imageryLayers.remove(img_1007);
				viewer.scene.imageryLayers.remove(img_1008);
				viewer.scene.imageryLayers.remove(img_1009);
				viewer.scene.imageryLayers.remove(img_1010);
				viewer.scene.imageryLayers.remove(img_1011);
				viewer.scene.imageryLayers.remove(img_1012);
				viewer.scene.imageryLayers.remove(img_1013);
				viewer.scene.imageryLayers.remove(img_1014);
				viewer.scene.imageryLayers.remove(img_1015);
				viewer.scene.imageryLayers.remove(img_1016);
				viewer.scene.imageryLayers.remove(img_1005);
				viewer.scene.imageryLayers.remove(img_1018);
        		  break;
        	  case "14":
        	     img_1018=image_show1(_gserveradd + 'ghTilesServer.ashx/fire!34',0.3);
				 dxalImgs.push(img_1018);
        		 viewer.scene.imageryLayers.remove(img_1006);
				viewer.scene.imageryLayers.remove(img_1007);
				viewer.scene.imageryLayers.remove(img_1008);
				viewer.scene.imageryLayers.remove(img_1009);
				viewer.scene.imageryLayers.remove(img_1010);
				viewer.scene.imageryLayers.remove(img_1011);
				viewer.scene.imageryLayers.remove(img_1012);
				viewer.scene.imageryLayers.remove(img_1013);
				viewer.scene.imageryLayers.remove(img_1014);
				viewer.scene.imageryLayers.remove(img_1015);
				viewer.scene.imageryLayers.remove(img_1016);
				viewer.scene.imageryLayers.remove(img_1017);
				viewer.scene.imageryLayers.remove(img_1005);
        		 break;
        	}
        });
        
        fire_text.addEventListener("change",function(){
           var text_fire=fire_text.value;
           fire_slider.value=fire_text.value;
           switch(text_fire){ 
               case "1":
        	     img_1005=image_show1(_gserveradd + 'ghTilesServer.ashx/fire!21',0.3);
				 dxalImgs.push(img_1005);
        		viewer.scene.imageryLayers.remove(img_1006);
				viewer.scene.imageryLayers.remove(img_1007);
				viewer.scene.imageryLayers.remove(img_1008);
				viewer.scene.imageryLayers.remove(img_1009);
				viewer.scene.imageryLayers.remove(img_1010);
				viewer.scene.imageryLayers.remove(img_1011);
				viewer.scene.imageryLayers.remove(img_1012);
				viewer.scene.imageryLayers.remove(img_1013);
				viewer.scene.imageryLayers.remove(img_1014);
				viewer.scene.imageryLayers.remove(img_1015);
				viewer.scene.imageryLayers.remove(img_1016);
				viewer.scene.imageryLayers.remove(img_1017);
				viewer.scene.imageryLayers.remove(img_1018);				 
        		 break;
        	  case "2":
			     img_1006=image_show1(_gserveradd + 'ghTilesServer.ashx/fire!22',0.3);
				 dxalImgs.push(img_1006);
        		 viewer.scene.imageryLayers.remove(img_1005);
				viewer.scene.imageryLayers.remove(img_1007);
				viewer.scene.imageryLayers.remove(img_1008);
				viewer.scene.imageryLayers.remove(img_1009);
				viewer.scene.imageryLayers.remove(img_1010);
				viewer.scene.imageryLayers.remove(img_1011);
				viewer.scene.imageryLayers.remove(img_1012);
				viewer.scene.imageryLayers.remove(img_1013);
				viewer.scene.imageryLayers.remove(img_1014);
				viewer.scene.imageryLayers.remove(img_1015);
				viewer.scene.imageryLayers.remove(img_1016);
				viewer.scene.imageryLayers.remove(img_1017);
				viewer.scene.imageryLayers.remove(img_1018);
        		  break;
        	  case "3":
        	     img_1007=image_show1(_gserveradd + 'ghTilesServer.ashx/fire!23',0.3);
				 dxalImgs.push(img_1007);
        		 viewer.scene.imageryLayers.remove(img_1006);
				viewer.scene.imageryLayers.remove(img_1005);
				viewer.scene.imageryLayers.remove(img_1008);
				viewer.scene.imageryLayers.remove(img_1009);
				viewer.scene.imageryLayers.remove(img_1010);
				viewer.scene.imageryLayers.remove(img_1011);
				viewer.scene.imageryLayers.remove(img_1012);
				viewer.scene.imageryLayers.remove(img_1013);
				viewer.scene.imageryLayers.remove(img_1014);
				viewer.scene.imageryLayers.remove(img_1015);
				viewer.scene.imageryLayers.remove(img_1016);
				viewer.scene.imageryLayers.remove(img_1017);
				viewer.scene.imageryLayers.remove(img_1018);
        		 break;
        	  case "4":
        	     img_1008=image_show1(_gserveradd + 'ghTilesServer.ashx/fire!24',0.3);
				 dxalImgs.push(img_1008);
        		 viewer.scene.imageryLayers.remove(img_1006);
				viewer.scene.imageryLayers.remove(img_1007);
				viewer.scene.imageryLayers.remove(img_1005);
				viewer.scene.imageryLayers.remove(img_1009);
				viewer.scene.imageryLayers.remove(img_1010);
				viewer.scene.imageryLayers.remove(img_1011);
				viewer.scene.imageryLayers.remove(img_1012);
				viewer.scene.imageryLayers.remove(img_1013);
				viewer.scene.imageryLayers.remove(img_1014);
				viewer.scene.imageryLayers.remove(img_1015);
				viewer.scene.imageryLayers.remove(img_1016);
				viewer.scene.imageryLayers.remove(img_1017);
				viewer.scene.imageryLayers.remove(img_1018);				 
        		 break;
        	  case "5":
			     img_1009=image_show1(_gserveradd + 'ghTilesServer.ashx/fire!25',0.3);
				 dxalImgs.push(img_1009);
        		 viewer.scene.imageryLayers.remove(img_1006);
				viewer.scene.imageryLayers.remove(img_1007);
				viewer.scene.imageryLayers.remove(img_1008);
				viewer.scene.imageryLayers.remove(img_1005);
				viewer.scene.imageryLayers.remove(img_1010);
				viewer.scene.imageryLayers.remove(img_1011);
				viewer.scene.imageryLayers.remove(img_1012);
				viewer.scene.imageryLayers.remove(img_1013);
				viewer.scene.imageryLayers.remove(img_1014);
				viewer.scene.imageryLayers.remove(img_1015);
				viewer.scene.imageryLayers.remove(img_1016);
				viewer.scene.imageryLayers.remove(img_1017);
				viewer.scene.imageryLayers.remove(img_1018);
        		  break;
        	  case "6":
        	     img_1010=image_show1(_gserveradd + 'ghTilesServer.ashx/fire!26',0.3);
				 dxalImgs.push(img_1010);
        		 viewer.scene.imageryLayers.remove(img_1006);
				viewer.scene.imageryLayers.remove(img_1007);
				viewer.scene.imageryLayers.remove(img_1008);
				viewer.scene.imageryLayers.remove(img_1009);
				viewer.scene.imageryLayers.remove(img_1005);
				viewer.scene.imageryLayers.remove(img_1011);
				viewer.scene.imageryLayers.remove(img_1012);
				viewer.scene.imageryLayers.remove(img_1013);
				viewer.scene.imageryLayers.remove(img_1014);
				viewer.scene.imageryLayers.remove(img_1015);
				viewer.scene.imageryLayers.remove(img_1016);
				viewer.scene.imageryLayers.remove(img_1017);
				viewer.scene.imageryLayers.remove(img_1018);
        		 break;
			  case "7":
        	     img_1011=image_show1(_gserveradd + 'ghTilesServer.ashx/fire!27',0.3);
				 dxalImgs.push(img_1011);
        		 viewer.scene.imageryLayers.remove(img_1006);
				viewer.scene.imageryLayers.remove(img_1007);
				viewer.scene.imageryLayers.remove(img_1008);
				viewer.scene.imageryLayers.remove(img_1009);
				viewer.scene.imageryLayers.remove(img_1010);
				viewer.scene.imageryLayers.remove(img_1005);
				viewer.scene.imageryLayers.remove(img_1012);
				viewer.scene.imageryLayers.remove(img_1013);
				viewer.scene.imageryLayers.remove(img_1014);
				viewer.scene.imageryLayers.remove(img_1015);
				viewer.scene.imageryLayers.remove(img_1016);
				viewer.scene.imageryLayers.remove(img_1017);
				viewer.scene.imageryLayers.remove(img_1018);				 
        		 break;
        	  case "8":
			     img_1012=image_show1(_gserveradd + 'ghTilesServer.ashx/fire!28',0.3);
				 dxalImgs.push(img_1012);
        		 viewer.scene.imageryLayers.remove(img_1006);
				viewer.scene.imageryLayers.remove(img_1007);
				viewer.scene.imageryLayers.remove(img_1008);
				viewer.scene.imageryLayers.remove(img_1009);
				viewer.scene.imageryLayers.remove(img_1010);
				viewer.scene.imageryLayers.remove(img_1011);
				viewer.scene.imageryLayers.remove(img_1005);
				viewer.scene.imageryLayers.remove(img_1013);
				viewer.scene.imageryLayers.remove(img_1014);
				viewer.scene.imageryLayers.remove(img_1015);
				viewer.scene.imageryLayers.remove(img_1016);
				viewer.scene.imageryLayers.remove(img_1017);
				viewer.scene.imageryLayers.remove(img_1018);
        		  break;
        	  case "9":
        	     img_1013=image_show1(_gserveradd + 'ghTilesServer.ashx/fire!29',0.3);
				 dxalImgs.push(img_1013);
        		 viewer.scene.imageryLayers.remove(img_1006);
				viewer.scene.imageryLayers.remove(img_1007);
				viewer.scene.imageryLayers.remove(img_1008);
				viewer.scene.imageryLayers.remove(img_1009);
				viewer.scene.imageryLayers.remove(img_1010);
				viewer.scene.imageryLayers.remove(img_1011);
				viewer.scene.imageryLayers.remove(img_1012);
				viewer.scene.imageryLayers.remove(img_1005);
				viewer.scene.imageryLayers.remove(img_1014);
				viewer.scene.imageryLayers.remove(img_1015);
				viewer.scene.imageryLayers.remove(img_1016);
				viewer.scene.imageryLayers.remove(img_1017);
				viewer.scene.imageryLayers.remove(img_1018);
        		 break;
			  case "10":
        	     img_1014=image_show1(_gserveradd + 'ghTilesServer.ashx/fire!30',0.3);
				 dxalImgs.push(img_1014);
        		 viewer.scene.imageryLayers.remove(img_1006);
				viewer.scene.imageryLayers.remove(img_1007);
				viewer.scene.imageryLayers.remove(img_1008);
				viewer.scene.imageryLayers.remove(img_1009);
				viewer.scene.imageryLayers.remove(img_1010);
				viewer.scene.imageryLayers.remove(img_1011);
				viewer.scene.imageryLayers.remove(img_1012);
				viewer.scene.imageryLayers.remove(img_1013);
				viewer.scene.imageryLayers.remove(img_1005);
				viewer.scene.imageryLayers.remove(img_1015);
				viewer.scene.imageryLayers.remove(img_1016);
				viewer.scene.imageryLayers.remove(img_1017);
				viewer.scene.imageryLayers.remove(img_1018);				 
        		 break;
        	  case "11":
			     img_1015=image_show1(_gserveradd + 'ghTilesServer.ashx/fire!31',0.3);
				 dxalImgs.push(img_1015);
        		 viewer.scene.imageryLayers.remove(img_1006);
				viewer.scene.imageryLayers.remove(img_1007);
				viewer.scene.imageryLayers.remove(img_1008);
				viewer.scene.imageryLayers.remove(img_1009);
				viewer.scene.imageryLayers.remove(img_1010);
				viewer.scene.imageryLayers.remove(img_1011);
				viewer.scene.imageryLayers.remove(img_1012);
				viewer.scene.imageryLayers.remove(img_1013);
				viewer.scene.imageryLayers.remove(img_1014);
				viewer.scene.imageryLayers.remove(img_1005);
				viewer.scene.imageryLayers.remove(img_1016);
				viewer.scene.imageryLayers.remove(img_1017);
				viewer.scene.imageryLayers.remove(img_1018);
        		  break;
        	  case "12":
        	     img_1016=image_show1(_gserveradd + 'ghTilesServer.ashx/fire!32',0.3);
				 dxalImgs.push(img_1016);
        		 viewer.scene.imageryLayers.remove(img_1006);
				viewer.scene.imageryLayers.remove(img_1007);
				viewer.scene.imageryLayers.remove(img_1008);
				viewer.scene.imageryLayers.remove(img_1009);
				viewer.scene.imageryLayers.remove(img_1010);
				viewer.scene.imageryLayers.remove(img_1011);
				viewer.scene.imageryLayers.remove(img_1012);
				viewer.scene.imageryLayers.remove(img_1013);
				viewer.scene.imageryLayers.remove(img_1014);
				viewer.scene.imageryLayers.remove(img_1015);
				viewer.scene.imageryLayers.remove(img_1005);
				viewer.scene.imageryLayers.remove(img_1017);
				viewer.scene.imageryLayers.remove(img_1018);
        		 break;
			  case "13":
			     img_1017=image_show1(_gserveradd + 'ghTilesServer.ashx/fire!33',0.3);
				 dxalImgs.push(img_1017);
        		 viewer.scene.imageryLayers.remove(img_1006);
				viewer.scene.imageryLayers.remove(img_1007);
				viewer.scene.imageryLayers.remove(img_1008);
				viewer.scene.imageryLayers.remove(img_1009);
				viewer.scene.imageryLayers.remove(img_1010);
				viewer.scene.imageryLayers.remove(img_1011);
				viewer.scene.imageryLayers.remove(img_1012);
				viewer.scene.imageryLayers.remove(img_1013);
				viewer.scene.imageryLayers.remove(img_1014);
				viewer.scene.imageryLayers.remove(img_1015);
				viewer.scene.imageryLayers.remove(img_1016);
				viewer.scene.imageryLayers.remove(img_1005);
				viewer.scene.imageryLayers.remove(img_1018);
        		  break;
        	  case "14":
        	     img_1018=image_show1(_gserveradd + 'ghTilesServer.ashx/fire!34',0.3);
				 dxalImgs.push(img_1018);
        		 viewer.scene.imageryLayers.remove(img_1006);
				viewer.scene.imageryLayers.remove(img_1007);
				viewer.scene.imageryLayers.remove(img_1008);
				viewer.scene.imageryLayers.remove(img_1009);
				viewer.scene.imageryLayers.remove(img_1010);
				viewer.scene.imageryLayers.remove(img_1011);
				viewer.scene.imageryLayers.remove(img_1012);
				viewer.scene.imageryLayers.remove(img_1013);
				viewer.scene.imageryLayers.remove(img_1014);
				viewer.scene.imageryLayers.remove(img_1015);
				viewer.scene.imageryLayers.remove(img_1016);
				viewer.scene.imageryLayers.remove(img_1017);
				viewer.scene.imageryLayers.remove(img_1005);
        		 break;
        	}
        });
        
        
        
       
        var firestate=0;
		var firePlay=document.getElementById("fire_play");
		var fireBP=document.getElementById("fireBP");
		firePlay.onclick=function(){
		if(firestate==0){
			fireBP.removeAttribute("class","fa fa-play fa-lg");
			fireBP.setAttribute("class","fa fa-pause fa-lg");
			
        viewer.camera.flyTo({
            destination : Cesium.Cartesian3.fromDegrees(122.314,50.055754,1200000),
        	duration:1
            });
				clearInterval(bxs_timer);
				for(var i=0;i<dxalImgs.length;i++){
					viewer.scene.imageryLayers.remove(dxalImgs[i]);
				}
				
				viewer.scene.imageryLayers.remove(img_1005);
				viewer.scene.imageryLayers.remove(img_1006);
				viewer.scene.imageryLayers.remove(img_1007);
				viewer.scene.imageryLayers.remove(img_1008);
				viewer.scene.imageryLayers.remove(img_1009);
				viewer.scene.imageryLayers.remove(img_1010);
				viewer.scene.imageryLayers.remove(img_1011);
				viewer.scene.imageryLayers.remove(img_1012);
				viewer.scene.imageryLayers.remove(img_1013);
				viewer.scene.imageryLayers.remove(img_1014);
				viewer.scene.imageryLayers.remove(img_1015);
				viewer.scene.imageryLayers.remove(img_1016);
				viewer.scene.imageryLayers.remove(img_1017);
				viewer.scene.imageryLayers.remove(img_1018);
                dxal_timer=setInterval(dxalDT_start,2000);
        
			firestate=1;
		}else if(firestate==1){
			fireBP.removeAttribute("class","fa fa-pause fa-lg");
			fireBP.setAttribute("class","fa fa-play fa-lg");
			firestate=0;
			
			flagNumdx=0;
          clearInterval(dxal_timer);
				viewer.scene.imageryLayers.remove(img_1005);
				viewer.scene.imageryLayers.remove(img_1006);
				viewer.scene.imageryLayers.remove(img_1007);
				viewer.scene.imageryLayers.remove(img_1008);
				viewer.scene.imageryLayers.remove(img_1009);
				viewer.scene.imageryLayers.remove(img_1010);
				viewer.scene.imageryLayers.remove(img_1011);
				viewer.scene.imageryLayers.remove(img_1012);
				viewer.scene.imageryLayers.remove(img_1013);
				viewer.scene.imageryLayers.remove(img_1014);
				viewer.scene.imageryLayers.remove(img_1015);
				viewer.scene.imageryLayers.remove(img_1016);
				viewer.scene.imageryLayers.remove(img_1017);
				viewer.scene.imageryLayers.remove(img_1018);
				for(var i=0;i<dxalImgs.length;i++){
					viewer.scene.imageryLayers.remove(dxalImgs[i]);
				}
        
		}
        }
       
        
        var flagNumdx=0;
		function dxalDT_start(){
			flagNumdx++;
			if(flagNumdx==1){
				viewer.scene.imageryLayers.remove(img_1005);
				viewer.scene.imageryLayers.remove(img_1006);
				viewer.scene.imageryLayers.remove(img_1007);
				viewer.scene.imageryLayers.remove(img_1008);
				viewer.scene.imageryLayers.remove(img_1009);
				viewer.scene.imageryLayers.remove(img_1010);
				viewer.scene.imageryLayers.remove(img_1011);
				viewer.scene.imageryLayers.remove(img_1012);
				viewer.scene.imageryLayers.remove(img_1013);
				viewer.scene.imageryLayers.remove(img_1014);
				viewer.scene.imageryLayers.remove(img_1015);
				viewer.scene.imageryLayers.remove(img_1016);
				viewer.scene.imageryLayers.remove(img_1017);
				viewer.scene.imageryLayers.remove(img_1018);
				img_1005=image_show1(_gserveradd + 'ghTilesServer.ashx/fire!21',0.3);
				dxalImgs.push(img_1005);
				fire_slider.value=1;
				fire_text.value=1;
			}else if(flagNumdx==2){
				img_1006=image_show1(_gserveradd + 'ghTilesServer.ashx/fire!22',0.3);
				dxalImgs.push(img_1006);
				viewer.scene.imageryLayers.remove(img_1005);
				viewer.scene.imageryLayers.remove(img_1007);
				viewer.scene.imageryLayers.remove(img_1008);
				viewer.scene.imageryLayers.remove(img_1009);
				viewer.scene.imageryLayers.remove(img_1010);
				viewer.scene.imageryLayers.remove(img_1011);
				viewer.scene.imageryLayers.remove(img_1012);
				viewer.scene.imageryLayers.remove(img_1013);
				viewer.scene.imageryLayers.remove(img_1014);
				viewer.scene.imageryLayers.remove(img_1015);
				viewer.scene.imageryLayers.remove(img_1016);
				viewer.scene.imageryLayers.remove(img_1017);
				viewer.scene.imageryLayers.remove(img_1018);
				fire_slider.value=2;
				fire_text.value=2;
			}else if(flagNumdx==3){
				img_1007=image_show1(_gserveradd + 'ghTilesServer.ashx/fire!23',0.3);
				dxalImgs.push(img_1007);
				viewer.scene.imageryLayers.remove(img_1005);
				viewer.scene.imageryLayers.remove(img_1006);
				viewer.scene.imageryLayers.remove(img_1008);
				viewer.scene.imageryLayers.remove(img_1009);
				viewer.scene.imageryLayers.remove(img_1010);
				viewer.scene.imageryLayers.remove(img_1011);
				viewer.scene.imageryLayers.remove(img_1012);
				viewer.scene.imageryLayers.remove(img_1013);
				viewer.scene.imageryLayers.remove(img_1014);
				viewer.scene.imageryLayers.remove(img_1015);
				viewer.scene.imageryLayers.remove(img_1016);
				viewer.scene.imageryLayers.remove(img_1017);
				viewer.scene.imageryLayers.remove(img_1018);
				fire_slider.value=3;
				fire_text.value=3;
			}else if(flagNumdx==4){
				img_1008=image_show1(_gserveradd + 'ghTilesServer.ashx/fire!24',0.3);
				dxalImgs.push(img_1008);
				viewer.scene.imageryLayers.remove(img_1005);
				viewer.scene.imageryLayers.remove(img_1006);
				viewer.scene.imageryLayers.remove(img_1007);
				viewer.scene.imageryLayers.remove(img_1009);
				viewer.scene.imageryLayers.remove(img_1010);
				viewer.scene.imageryLayers.remove(img_1011);
				viewer.scene.imageryLayers.remove(img_1012);
				viewer.scene.imageryLayers.remove(img_1013);
				viewer.scene.imageryLayers.remove(img_1014);
				viewer.scene.imageryLayers.remove(img_1015);
				viewer.scene.imageryLayers.remove(img_1016);
				viewer.scene.imageryLayers.remove(img_1017);
				viewer.scene.imageryLayers.remove(img_1018);
				fire_slider.value=4;
				fire_text.value=4;
			}else if(flagNumdx==5){
				img_1009=image_show1(_gserveradd + 'ghTilesServer.ashx/fire!25',0.3);
				dxalImgs.push(img_1009);
				viewer.scene.imageryLayers.remove(img_1005);
				viewer.scene.imageryLayers.remove(img_1006);
				viewer.scene.imageryLayers.remove(img_1007);
				viewer.scene.imageryLayers.remove(img_1008);
				viewer.scene.imageryLayers.remove(img_1010);
				viewer.scene.imageryLayers.remove(img_1011);
				viewer.scene.imageryLayers.remove(img_1012);
				viewer.scene.imageryLayers.remove(img_1013);
				viewer.scene.imageryLayers.remove(img_1014);
				viewer.scene.imageryLayers.remove(img_1015);
				viewer.scene.imageryLayers.remove(img_1016);
				viewer.scene.imageryLayers.remove(img_1017);
				viewer.scene.imageryLayers.remove(img_1018);
				fire_slider.value=5;
				fire_text.value=5;
			}else if(flagNumdx==6){
				img_1010=image_show1(_gserveradd + 'ghTilesServer.ashx/fire!26',0.3);
				dxalImgs.push(img_1010);
				viewer.scene.imageryLayers.remove(img_1005);
				viewer.scene.imageryLayers.remove(img_1006);
				viewer.scene.imageryLayers.remove(img_1007);
				viewer.scene.imageryLayers.remove(img_1008);
				viewer.scene.imageryLayers.remove(img_1009);
				viewer.scene.imageryLayers.remove(img_1011);
				viewer.scene.imageryLayers.remove(img_1012);
				viewer.scene.imageryLayers.remove(img_1013);
				viewer.scene.imageryLayers.remove(img_1014);
				viewer.scene.imageryLayers.remove(img_1015);
				viewer.scene.imageryLayers.remove(img_1016);
				viewer.scene.imageryLayers.remove(img_1017);
				viewer.scene.imageryLayers.remove(img_1018);
				fire_slider.value=6;
				fire_text.value=6;
			}else if(flagNumdx==7){
				img_1011=image_show1(_gserveradd + 'ghTilesServer.ashx/fire!27',0.3);
				dxalImgs.push(img_1011);
				viewer.scene.imageryLayers.remove(img_1005);
				viewer.scene.imageryLayers.remove(img_1006);
				viewer.scene.imageryLayers.remove(img_1007);
				viewer.scene.imageryLayers.remove(img_1008);
				viewer.scene.imageryLayers.remove(img_1009);
				viewer.scene.imageryLayers.remove(img_1010);
				viewer.scene.imageryLayers.remove(img_1012);
				viewer.scene.imageryLayers.remove(img_1013);
				viewer.scene.imageryLayers.remove(img_1014);
				viewer.scene.imageryLayers.remove(img_1015);
				viewer.scene.imageryLayers.remove(img_1016);
				viewer.scene.imageryLayers.remove(img_1017);
				viewer.scene.imageryLayers.remove(img_1018);
				fire_slider.value=7;
				fire_text.value=7;
			}else if(flagNumdx==8){
				img_1012=image_show1(_gserveradd + 'ghTilesServer.ashx/fire!28',0.3);
				dxalImgs.push(img_1012);
				viewer.scene.imageryLayers.remove(img_1005);
				viewer.scene.imageryLayers.remove(img_1006);
				viewer.scene.imageryLayers.remove(img_1007);
				viewer.scene.imageryLayers.remove(img_1008);
				viewer.scene.imageryLayers.remove(img_1009);
				viewer.scene.imageryLayers.remove(img_1010);
				viewer.scene.imageryLayers.remove(img_1011);
				viewer.scene.imageryLayers.remove(img_1013);
				viewer.scene.imageryLayers.remove(img_1014);
				viewer.scene.imageryLayers.remove(img_1015);
				viewer.scene.imageryLayers.remove(img_1016);
				viewer.scene.imageryLayers.remove(img_1017);
				viewer.scene.imageryLayers.remove(img_1018);
				fire_slider.value=8;
				fire_text.value=8;
			}else if(flagNumdx==9){
				img_1013=image_show1(_gserveradd + 'ghTilesServer.ashx/fire!29',0.3);
				dxalImgs.push(img_1013);
				viewer.scene.imageryLayers.remove(img_1005);
				viewer.scene.imageryLayers.remove(img_1006);
				viewer.scene.imageryLayers.remove(img_1007);
				viewer.scene.imageryLayers.remove(img_1008);
				viewer.scene.imageryLayers.remove(img_1009);
				viewer.scene.imageryLayers.remove(img_1010);
				viewer.scene.imageryLayers.remove(img_1012);
				viewer.scene.imageryLayers.remove(img_1011);
				viewer.scene.imageryLayers.remove(img_1014);
				viewer.scene.imageryLayers.remove(img_1015);
				viewer.scene.imageryLayers.remove(img_1016);
				viewer.scene.imageryLayers.remove(img_1017);
				viewer.scene.imageryLayers.remove(img_1018);
				fire_slider.value=9;
				fire_text.value=9;
			}else if(flagNumdx==10){
				img_1014=image_show1(_gserveradd + 'ghTilesServer.ashx/fire!30',0.3);
				dxalImgs.push(img_1014);
				viewer.scene.imageryLayers.remove(img_1005);
				viewer.scene.imageryLayers.remove(img_1006);
				viewer.scene.imageryLayers.remove(img_1007);
				viewer.scene.imageryLayers.remove(img_1008);
				viewer.scene.imageryLayers.remove(img_1009);
				viewer.scene.imageryLayers.remove(img_1010);
				viewer.scene.imageryLayers.remove(img_1012);
				viewer.scene.imageryLayers.remove(img_1013);
				viewer.scene.imageryLayers.remove(img_1011);
				viewer.scene.imageryLayers.remove(img_1015);
				viewer.scene.imageryLayers.remove(img_1016);
				viewer.scene.imageryLayers.remove(img_1017);
				viewer.scene.imageryLayers.remove(img_1018);
				fire_slider.value=10;
				fire_text.value=10;
			}else if(flagNumdx==11){
				img_1015=image_show1(_gserveradd + 'ghTilesServer.ashx/fire!31',0.3);
				dxalImgs.push(img_1015);
				viewer.scene.imageryLayers.remove(img_1005);
				viewer.scene.imageryLayers.remove(img_1006);
				viewer.scene.imageryLayers.remove(img_1007);
				viewer.scene.imageryLayers.remove(img_1008);
				viewer.scene.imageryLayers.remove(img_1009);
				viewer.scene.imageryLayers.remove(img_1010);
				viewer.scene.imageryLayers.remove(img_1012);
				viewer.scene.imageryLayers.remove(img_1013);
				viewer.scene.imageryLayers.remove(img_1014);
				viewer.scene.imageryLayers.remove(img_1011);
				viewer.scene.imageryLayers.remove(img_1016);
				viewer.scene.imageryLayers.remove(img_1017);
				viewer.scene.imageryLayers.remove(img_1018);
				fire_slider.value=11;
				fire_text.value=11;
			}else if(flagNumdx==12){
				img_1016=image_show1(_gserveradd + 'ghTilesServer.ashx/fire!32',0.3);
				dxalImgs.push(img_1016);
				viewer.scene.imageryLayers.remove(img_1005);
				viewer.scene.imageryLayers.remove(img_1006);
				viewer.scene.imageryLayers.remove(img_1007);
				viewer.scene.imageryLayers.remove(img_1008);
				viewer.scene.imageryLayers.remove(img_1009);
				viewer.scene.imageryLayers.remove(img_1010);
				viewer.scene.imageryLayers.remove(img_1012);
				viewer.scene.imageryLayers.remove(img_1013);
				viewer.scene.imageryLayers.remove(img_1014);
				viewer.scene.imageryLayers.remove(img_1015);
				viewer.scene.imageryLayers.remove(img_1011);
				viewer.scene.imageryLayers.remove(img_1017);
				viewer.scene.imageryLayers.remove(img_1018);
				fire_slider.value=12;
				fire_text.value=12;
			}else if(flagNumdx==13){
				img_1017=image_show1(_gserveradd + 'ghTilesServer.ashx/fire!33',0.3);
				dxalImgs.push(img_1017);
				viewer.scene.imageryLayers.remove(img_1005);
				viewer.scene.imageryLayers.remove(img_1006);
				viewer.scene.imageryLayers.remove(img_1007);
				viewer.scene.imageryLayers.remove(img_1008);
				viewer.scene.imageryLayers.remove(img_1009);
				viewer.scene.imageryLayers.remove(img_1010);
				viewer.scene.imageryLayers.remove(img_1012);
				viewer.scene.imageryLayers.remove(img_1013);
				viewer.scene.imageryLayers.remove(img_1014);
				viewer.scene.imageryLayers.remove(img_1015);
				viewer.scene.imageryLayers.remove(img_1016);
				viewer.scene.imageryLayers.remove(img_1011);
				viewer.scene.imageryLayers.remove(img_1018);
				fire_slider.value=13;
				fire_text.value=13;
			}else if(flagNumdx==14){
				img_1018=image_show1(_gserveradd + 'ghTilesServer.ashx/fire!34',0.3);
				dxalImgs.push(img_1018);
				viewer.scene.imageryLayers.remove(img_1005);
				viewer.scene.imageryLayers.remove(img_1006);
				viewer.scene.imageryLayers.remove(img_1007);
				viewer.scene.imageryLayers.remove(img_1008);
				viewer.scene.imageryLayers.remove(img_1009);
				viewer.scene.imageryLayers.remove(img_1010);
				viewer.scene.imageryLayers.remove(img_1012);
				viewer.scene.imageryLayers.remove(img_1013);
				viewer.scene.imageryLayers.remove(img_1014);
				viewer.scene.imageryLayers.remove(img_1015);
				viewer.scene.imageryLayers.remove(img_1016);
				viewer.scene.imageryLayers.remove(img_1017);
				viewer.scene.imageryLayers.remove(img_1011);
				fire_slider.value=14;
				fire_text.value=14;
			}	
		}

         $('#fireChangeWindow').window({
			 onClose:function(){
				 for(var i=0;i<dxalImgs.length;i++){
					viewer.scene.imageryLayers.remove(dxalImgs[i]);
				}
			 }
		 });