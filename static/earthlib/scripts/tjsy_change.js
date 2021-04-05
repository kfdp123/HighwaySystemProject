/*天津水域面积缩减1980-2015年*/
/*天津建筑面积扩张1975-2015年*/
function tjsy_Change(){
 $('#tjsyChangeWindow').window('open');
 $('#tjsyChangeWindow').window({left:300,top:50});	
 locateTO(117.3462305,39.3512083,280000);
};
function tjsy_Cancel(){
 $('#tjsyChangeWindow').window('close');
   for(var i=0;i<tjsyImgs.length;i++){
		viewer.scene.imageryLayers.remove(tjsyImgs[i]);
		} 
}; 

var tjsyImgs=[];
var tjsy_timer;
var image_other10,image_other11,image_other12,image_other13,image_other14,image_other15,image_other16,image_other17;

	var tjsy_slider=document.getElementById("tjsy_slider");
        var tjsy_text=document.getElementById("tjsy_text");
        tjsy_slider.addEventListener("mouseup",function(){
           var slider_tjsy=tjsy_slider.value;
             switch(slider_tjsy){ 
        	  case "1980":
        		 viewer.scene.imageryLayers.remove(image_other11);
        		 viewer.scene.imageryLayers.remove(image_other12);
        		 viewer.scene.imageryLayers.remove(image_other13);
        		 viewer.scene.imageryLayers.remove(image_other14);
        		 viewer.scene.imageryLayers.remove(image_other15);
        		 viewer.scene.imageryLayers.remove(image_other16);
        		 viewer.scene.imageryLayers.remove(image_other17);
        		 image_other10=image_show(_gserveradd + 'ghTilesServer.ashx/tjsy!1980',1.0);
				 tjsy_text.value=slider_tjsy;
                 tjsyImgs.push(image_other10);				 
        		 break;
        	  case "1985":
        		 viewer.scene.imageryLayers.remove(image_other10);
        		 viewer.scene.imageryLayers.remove(image_other12);
        		 viewer.scene.imageryLayers.remove(image_other13);
        		 viewer.scene.imageryLayers.remove(image_other14);
        		 viewer.scene.imageryLayers.remove(image_other15);
        		 viewer.scene.imageryLayers.remove(image_other16);
        		 viewer.scene.imageryLayers.remove(image_other17);
        		 image_other11=image_show(_gserveradd + 'ghTilesServer.ashx/tjsy!1985',1.0);
				 tjsy_text.value=slider_tjsy;
				 tjsyImgs.push(image_other11);
        		 break;
        	  case "1990": 
        		 viewer.scene.imageryLayers.remove(image_other10);
        		 viewer.scene.imageryLayers.remove(image_other11);
        		 viewer.scene.imageryLayers.remove(image_other13);
        		 viewer.scene.imageryLayers.remove(image_other14);
        		 viewer.scene.imageryLayers.remove(image_other15);
        		 viewer.scene.imageryLayers.remove(image_other16);
        		 viewer.scene.imageryLayers.remove(image_other17);
        		 image_other12=image_show(_gserveradd + 'ghTilesServer.ashx/tjsy!1990',1.0);
				 tjsy_text.value=slider_tjsy;
				 tjsyImgs.push(image_other12);
        		 break;
        	 case "1995":
        	     viewer.scene.imageryLayers.remove(image_other10);
        		 viewer.scene.imageryLayers.remove(image_other11);
        		 viewer.scene.imageryLayers.remove(image_other12);
        		 viewer.scene.imageryLayers.remove(image_other14);
        		 viewer.scene.imageryLayers.remove(image_other15);
        		 viewer.scene.imageryLayers.remove(image_other16);
        		 viewer.scene.imageryLayers.remove(image_other17);
        		 image_other13=image_show(_gserveradd + 'ghTilesServer.ashx/tjsy!1995',1.0);
				 tjsy_text.value=slider_tjsy;
				 tjsyImgs.push(image_other13);
        		 break;
        	 case "2000":
        	     viewer.scene.imageryLayers.remove(image_other10);
        		 viewer.scene.imageryLayers.remove(image_other11);
        		 viewer.scene.imageryLayers.remove(image_other12);
        		 viewer.scene.imageryLayers.remove(image_other13);
        		 viewer.scene.imageryLayers.remove(image_other15);
        		 viewer.scene.imageryLayers.remove(image_other16);
        		 viewer.scene.imageryLayers.remove(image_other17);
        		 image_other14=image_show(_gserveradd + 'ghTilesServer.ashx/tjsy!2000',1.0);
				 tjsy_text.value=slider_tjsy;
				 tjsyImgs.push(image_other14);
        		 break;
        	 case "2005":
        	     viewer.scene.imageryLayers.remove(image_other10);
        		 viewer.scene.imageryLayers.remove(image_other11);
        		 viewer.scene.imageryLayers.remove(image_other12);
        		 viewer.scene.imageryLayers.remove(image_other13);
        		 viewer.scene.imageryLayers.remove(image_other14);
        		 viewer.scene.imageryLayers.remove(image_other16);
        		 viewer.scene.imageryLayers.remove(image_other17);
        		 image_other15=image_show(_gserveradd + 'ghTilesServer.ashx/tjsy!2005',1.0);
				 tjsy_text.value=slider_tjsy;
				 tjsyImgs.push(image_other15);
        		 break;
        	 case "2010":
        	     viewer.scene.imageryLayers.remove(image_other10);
        		 viewer.scene.imageryLayers.remove(image_other11);
        		 viewer.scene.imageryLayers.remove(image_other12);
        		 viewer.scene.imageryLayers.remove(image_other13);
        		 viewer.scene.imageryLayers.remove(image_other14);
        		 viewer.scene.imageryLayers.remove(image_other15);
        		 viewer.scene.imageryLayers.remove(image_other17);
        		 image_other16=image_show(_gserveradd + 'ghTilesServer.ashx/tjsy!2010',1.0);
				 tjsy_text.value=slider_tjsy;
				 tjsyImgs.push(image_other16);
        		 break;
        	 case "2015":
        	     viewer.scene.imageryLayers.remove(image_other10);
        		 viewer.scene.imageryLayers.remove(image_other11);
        		 viewer.scene.imageryLayers.remove(image_other12);
        		 viewer.scene.imageryLayers.remove(image_other13);
        		 viewer.scene.imageryLayers.remove(image_other14);
        		 viewer.scene.imageryLayers.remove(image_other15);
        		 viewer.scene.imageryLayers.remove(image_other16);
                 image_other17=image_show(_gserveradd + 'ghTilesServer.ashx/tjsy!2015',1.0);
				 tjsy_text.value=slider_tjsy;
				 tjsyImgs.push(image_other17);
        		 break;
        	}
        });
        
        tjsy_text.addEventListener("change",function(){
           var text_tjsy=tjsy_text.value;
           //tjsy_slider.value=tjsy_text.value;
           switch(text_tjsy){ 
        	  case "1980":
        		 viewer.scene.imageryLayers.remove(image_other11);
        		 viewer.scene.imageryLayers.remove(image_other12);
        		 viewer.scene.imageryLayers.remove(image_other13);
        		 viewer.scene.imageryLayers.remove(image_other14);
        		 viewer.scene.imageryLayers.remove(image_other15);
        		 viewer.scene.imageryLayers.remove(image_other16);
        		 viewer.scene.imageryLayers.remove(image_other17);
        		 image_other10=image_show(_gserveradd + 'ghTilesServer.ashx/tjsy!1980',1.0);
				 tjsy_slider.value=text_tjsy;
                 tjsyImgs.push(image_other10);				 
        		 break;
        	  case "1985":
        		 viewer.scene.imageryLayers.remove(image_other10);
        		 viewer.scene.imageryLayers.remove(image_other12);
        		 viewer.scene.imageryLayers.remove(image_other13);
        		 viewer.scene.imageryLayers.remove(image_other14);
        		 viewer.scene.imageryLayers.remove(image_other15);
        		 viewer.scene.imageryLayers.remove(image_other16);
        		 viewer.scene.imageryLayers.remove(image_other17);
        		 image_other11=image_show(_gserveradd + 'ghTilesServer.ashx/tjsy!1985',1.0);
				 tjsy_slider.value=text_tjsy;
				 tjsyImgs.push(image_other11);
        		 break;
        	  case "1990": 
        		 viewer.scene.imageryLayers.remove(image_other10);
        		 viewer.scene.imageryLayers.remove(image_other11);
        		 viewer.scene.imageryLayers.remove(image_other13);
        		 viewer.scene.imageryLayers.remove(image_other14);
        		 viewer.scene.imageryLayers.remove(image_other15);
        		 viewer.scene.imageryLayers.remove(image_other16);
        		 viewer.scene.imageryLayers.remove(image_other17);
        		 image_other12=image_show(_gserveradd + 'ghTilesServer.ashx/tjsy!1990',1.0);
				 tjsy_slider.value=text_tjsy;
				 tjsyImgs.push(image_other12);
        		 break;
        	 case "1995":
        	     viewer.scene.imageryLayers.remove(image_other10);
        		 viewer.scene.imageryLayers.remove(image_other11);
        		 viewer.scene.imageryLayers.remove(image_other12);
        		 viewer.scene.imageryLayers.remove(image_other14);
        		 viewer.scene.imageryLayers.remove(image_other15);
        		 viewer.scene.imageryLayers.remove(image_other16);
        		 viewer.scene.imageryLayers.remove(image_other17);
        		 image_other13=image_show(_gserveradd + 'ghTilesServer.ashx/tjsy!1995',1.0);
				 tjsy_slider.value=text_tjsy;
				 tjsyImgs.push(image_other13);
        		 break;
        	 case "2000":
        	     viewer.scene.imageryLayers.remove(image_other10);
        		 viewer.scene.imageryLayers.remove(image_other11);
        		 viewer.scene.imageryLayers.remove(image_other12);
        		 viewer.scene.imageryLayers.remove(image_other13);
        		 viewer.scene.imageryLayers.remove(image_other15);
        		 viewer.scene.imageryLayers.remove(image_other16);
        		 viewer.scene.imageryLayers.remove(image_other17);
        		 image_other14=image_show(_gserveradd + 'ghTilesServer.ashx/tjsy!2000',1.0);
				 tjsy_slider.value=text_tjsy;
				 tjsyImgs.push(image_other14);
        		 break;
        	 case "2005":
        	     viewer.scene.imageryLayers.remove(image_other10);
        		 viewer.scene.imageryLayers.remove(image_other11);
        		 viewer.scene.imageryLayers.remove(image_other12);
        		 viewer.scene.imageryLayers.remove(image_other13);
        		 viewer.scene.imageryLayers.remove(image_other14);
        		 viewer.scene.imageryLayers.remove(image_other16);
        		 viewer.scene.imageryLayers.remove(image_other17);
        		 image_other15=image_show(_gserveradd + 'ghTilesServer.ashx/tjsy!2005',1.0);
				 tjsy_slider.value=text_tjsy;
				 tjsyImgs.push(image_other15);
        		 break;
        	 case "2010":
        	     viewer.scene.imageryLayers.remove(image_other10);
        		 viewer.scene.imageryLayers.remove(image_other11);
        		 viewer.scene.imageryLayers.remove(image_other12);
        		 viewer.scene.imageryLayers.remove(image_other13);
        		 viewer.scene.imageryLayers.remove(image_other14);
        		 viewer.scene.imageryLayers.remove(image_other15);
        		 viewer.scene.imageryLayers.remove(image_other17);
        		 image_other16=image_show(_gserveradd + 'ghTilesServer.ashx/tjsy!2010',1.0);
				 tjsy_slider.value=text_tjsy;
				 tjsyImgs.push(image_other16);
        		 break;
        	 case "2015":
        	     viewer.scene.imageryLayers.remove(image_other10);
        		 viewer.scene.imageryLayers.remove(image_other11);
        		 viewer.scene.imageryLayers.remove(image_other12);
        		 viewer.scene.imageryLayers.remove(image_other13);
        		 viewer.scene.imageryLayers.remove(image_other14);
        		 viewer.scene.imageryLayers.remove(image_other15);
        		 viewer.scene.imageryLayers.remove(image_other16);
                 image_other17=image_show(_gserveradd + 'ghTilesServer.ashx/tjsy!2015',1.0);
				 tjsy_slider.value=text_tjsy;
				 tjsyImgs.push(image_other17);
        		 break;
        	}
        });
        /* 动态按钮事件 */
		var tjsystate=0;
		var tjsyPlay=document.getElementById("tjsy_play");
		var tjsyBP=document.getElementById("tjsyBP");
		tjsyPlay.onclick=function(){
		if(tjsystate==0){
			tjsyBP.removeAttribute("class","fa fa-play fa-lg");
			tjsyBP.setAttribute("class","fa fa-pause fa-lg");
			
        viewer.camera.flyTo({
            destination : Cesium.Cartesian3.fromDegrees(117.3462305,39.3512083,280000),
        	duration:1
            });
				clearInterval(tjsy_timer);
				for(var i=0;i<tjsyImgs.length;i++){
					viewer.scene.imageryLayers.remove(tjsyImgs[i]);
				}
				
        	     viewer.scene.imageryLayers.remove(image_other10);
        		 viewer.scene.imageryLayers.remove(image_other11);
        		 viewer.scene.imageryLayers.remove(image_other12);
        		 viewer.scene.imageryLayers.remove(image_other13);
        		 viewer.scene.imageryLayers.remove(image_other14);
        		 viewer.scene.imageryLayers.remove(image_other15);
        		 viewer.scene.imageryLayers.remove(image_other16);
				 viewer.scene.imageryLayers.remove(image_other17);
                tjsy_timer=setInterval(tjsy_change,2000);
        
			tjsystate=1;
		}else if(tjsystate==1){
			tjsyBP.removeAttribute("class","fa fa-pause fa-lg");
			tjsyBP.setAttribute("class","fa fa-play fa-lg");
			tjsystate=0;
			
			clearInterval(tjsy_timer);
		    dd=0;
        	     viewer.scene.imageryLayers.remove(image_other10);
        		 viewer.scene.imageryLayers.remove(image_other11);
        		 viewer.scene.imageryLayers.remove(image_other12);
        		 viewer.scene.imageryLayers.remove(image_other13);
        		 viewer.scene.imageryLayers.remove(image_other14);
        		 viewer.scene.imageryLayers.remove(image_other15);
        		 viewer.scene.imageryLayers.remove(image_other16);
				 viewer.scene.imageryLayers.remove(image_other17);
				for(var i=0;i<tjsyImgs.length;i++){
					viewer.scene.imageryLayers.remove(tjsyImgs[i]);
				}
        
		}
        }
       /* 动态函数 */
        var dd=0;
        
        function tjsy_change(){
             dd++;
            if(dd==1){
        	   viewer.scene.imageryLayers.remove(image_other1);
                image_other10=image_show(_gserveradd + 'ghTilesServer.ashx/tjsy!1980_1',1.0);
                tjsyImgs.push(image_other10);
                tjsy_slider.value=1980;
                tjsy_text.value=1980;				
        	}else if(dd==2){
        	    viewer.scene.imageryLayers.remove(image_other10);
                 image_other11=image_show(_gserveradd + 'ghTilesServer.ashx/tjsy!1985',1.0);
				 tjsyImgs.push(image_other11);
                tjsy_slider.value=1985;
                tjsy_text.value=1985;
        	}else if(dd==3){
        	    viewer.scene.imageryLayers.remove(image_other11);
                 image_other12=image_show(_gserveradd + 'ghTilesServer.ashx/tjsy!1990',1.0);
				 tjsyImgs.push(image_other12);
                tjsy_slider.value=1990;
                tjsy_text.value=1990;
        	}else if(dd==4){
        	    viewer.scene.imageryLayers.remove(image_other12);
                 image_other13=image_show(_gserveradd + 'ghTilesServer.ashx/tjsy!1995',1.0);
				 tjsyImgs.push(image_other13);
                tjsy_slider.value=1995;
                tjsy_text.value=1995;
        	}else if(dd==5){
        	    viewer.scene.imageryLayers.remove(image_other13);
                 image_other14=image_show(_gserveradd + 'ghTilesServer.ashx/tjsy!2000',1.0);
				 tjsyImgs.push(image_other14);
                tjsy_slider.value=2000;
                tjsy_text.value=2000;
        	}else if(dd==6){
        	    viewer.scene.imageryLayers.remove(image_other14);
                 image_other15=image_show(_gserveradd + 'ghTilesServer.ashx/tjsy!2005',1.0);
				 tjsyImgs.push(image_other15);
                tjsy_slider.value=2005;
                tjsy_text.value=2005;
        	}else if(dd==7){
        	    viewer.scene.imageryLayers.remove(image_other15);
                 image_other16=image_show(_gserveradd + 'ghTilesServer.ashx/tjsy!2010',1.0);
				 tjsyImgs.push(image_other16);
                tjsy_slider.value=2010;
                tjsy_text.value=2010;
        	}else if(dd==8){
        	    viewer.scene.imageryLayers.remove(image_other16);
                 image_other17=image_show(_gserveradd + 'ghTilesServer.ashx/tjsy!2015',1.0);
				 tjsyImgs.push(image_other17);
                tjsy_slider.value=2015;
                tjsy_text.value=2015;
        	}
        }

$('#tjsyChangeWindow').window({
			 onClose:function(){
				 for(var i=0;i<tjsyImgs.length;i++){
					viewer.scene.imageryLayers.remove(tjsyImgs[i]);
				}
			 }
		 });