/*天津建筑面积扩张1975-2015年*/
function tjtd_Change(){
 $('#tjtdChangeWindow').window('open');
 $('#tjtdChangeWindow').window({left:300,top:50});	
 locateTO(117.3462305,39.3512083,280000);
};
function tjtd_Cancel(){
 $('#tjtdChangeWindow').window('close');
   for(var i=0;i<tjtdImgs.length;i++){
		viewer.scene.imageryLayers.remove(tjtdImgs[i]);
		} 
}; 

var tjtdImgs=[];
var tjtd_timer;
var image_other1,image_other2,image_other3,image_other4,image_other5,image_other6,image_other7,image_other8,image_other9;

	var tjtd_slider=document.getElementById("tjtd_slider");
        var tjtd_text=document.getElementById("tjtd_text");
        tjtd_slider.addEventListener("mouseup",function(){
           var slider_tjtd=tjtd_slider.value;
             switch(slider_tjtd){ 
        	  case "1975":
        		 viewer.scene.imageryLayers.remove(image_other2);
        		 viewer.scene.imageryLayers.remove(image_other3);
        		 viewer.scene.imageryLayers.remove(image_other4);
        		 viewer.scene.imageryLayers.remove(image_other5);
        		 viewer.scene.imageryLayers.remove(image_other6);
        		 viewer.scene.imageryLayers.remove(image_other7);
        		 viewer.scene.imageryLayers.remove(image_other8);
        		 viewer.scene.imageryLayers.remove(image_other9);
        		 image_other1=image_show(_gserveradd + 'ghTilesServer.ashx/tjtd!1975',1.0);
				 tjtd_text.value=slider_tjtd;
                 tjtdImgs.push(image_other1);				  
        		  break;
        	  case "1980":
        	    viewer.scene.imageryLayers.remove(image_other1);
        		 viewer.scene.imageryLayers.remove(image_other3);
        		 viewer.scene.imageryLayers.remove(image_other4);
        		 viewer.scene.imageryLayers.remove(image_other5);
        		 viewer.scene.imageryLayers.remove(image_other6);
        		 viewer.scene.imageryLayers.remove(image_other7);
        		 viewer.scene.imageryLayers.remove(image_other8);
        		 viewer.scene.imageryLayers.remove(image_other9);
        		 image_other2=image_show(_gserveradd + 'ghTilesServer.ashx/tjtd!1980',1.0);
				 tjtd_text.value=slider_tjtd;
                 tjtdImgs.push(image_other2);				 
        		 break;
        	  case "1985":
        	     viewer.scene.imageryLayers.remove(image_other1);
        		 viewer.scene.imageryLayers.remove(image_other2);
        		 viewer.scene.imageryLayers.remove(image_other4);
        		 viewer.scene.imageryLayers.remove(image_other5);
        		 viewer.scene.imageryLayers.remove(image_other6);
        		 viewer.scene.imageryLayers.remove(image_other7);
        		 viewer.scene.imageryLayers.remove(image_other8);
        		 viewer.scene.imageryLayers.remove(image_other9);
        		 image_other3=image_show(_gserveradd + 'ghTilesServer.ashx/tjtd!1985',1.0);
				 tjtd_text.value=slider_tjtd;
				 tjtdImgs.push(image_other3);
        		 break;
        	  case "1990": 
        	    viewer.scene.imageryLayers.remove(image_other1);
        		 viewer.scene.imageryLayers.remove(image_other2);
        		 viewer.scene.imageryLayers.remove(image_other3);
        		 viewer.scene.imageryLayers.remove(image_other5);
        		 viewer.scene.imageryLayers.remove(image_other6);
        		 viewer.scene.imageryLayers.remove(image_other7);
        		 viewer.scene.imageryLayers.remove(image_other8);
        		 viewer.scene.imageryLayers.remove(image_other9);
        		 image_other4=image_show(_gserveradd + 'ghTilesServer.ashx/tjtd!1990',1.0);
				 tjtd_text.value=slider_tjtd;
				 tjtdImgs.push(image_other4);
        		 break;
        	 case "1995":
        	     viewer.scene.imageryLayers.remove(image_other1);
        	     viewer.scene.imageryLayers.remove(image_other2);
        		 viewer.scene.imageryLayers.remove(image_other3);
        		 viewer.scene.imageryLayers.remove(image_other4);
        		 viewer.scene.imageryLayers.remove(image_other6);
        		 viewer.scene.imageryLayers.remove(image_other7);
        		 viewer.scene.imageryLayers.remove(image_other8);
        		 viewer.scene.imageryLayers.remove(image_other9);
        		 image_other5=image_show(_gserveradd + 'ghTilesServer.ashx/tjtd!1995',1.0);
				 tjtd_text.value=slider_tjtd;
				 tjtdImgs.push(image_other5);
        		 break;
        	 case "2000":
        	     viewer.scene.imageryLayers.remove(image_other1);
        	     viewer.scene.imageryLayers.remove(image_other2);
        		 viewer.scene.imageryLayers.remove(image_other3);
        		 viewer.scene.imageryLayers.remove(image_other4);
        		 viewer.scene.imageryLayers.remove(image_other5);
        		 viewer.scene.imageryLayers.remove(image_other7);
        		 viewer.scene.imageryLayers.remove(image_other8);
        		 viewer.scene.imageryLayers.remove(image_other9);
        		 image_other6=image_show(_gserveradd + 'ghTilesServer.ashx/tjtd!2000',1.0);
				 tjtd_text.value=slider_tjtd;
				 tjtdImgs.push(image_other6);
        		 break;
        	 case "2005":
        	     viewer.scene.imageryLayers.remove(image_other1);
        	     viewer.scene.imageryLayers.remove(image_other2);
        		 viewer.scene.imageryLayers.remove(image_other3);
        		 viewer.scene.imageryLayers.remove(image_other4);
        		 viewer.scene.imageryLayers.remove(image_other5);
        		 viewer.scene.imageryLayers.remove(image_other6);
        		 viewer.scene.imageryLayers.remove(image_other8);
        		 viewer.scene.imageryLayers.remove(image_other9);
        		 image_other7=image_show(_gserveradd + 'ghTilesServer.ashx/tjtd!2005',1.0);
				 tjtd_text.value=slider_tjtd;
				 tjtdImgs.push(image_other7);
        		 break;
        	 case "2010":
        	 	 viewer.scene.imageryLayers.remove(image_other1);
        	     viewer.scene.imageryLayers.remove(image_other2);
        		 viewer.scene.imageryLayers.remove(image_other3);
        		 viewer.scene.imageryLayers.remove(image_other4);
        		 viewer.scene.imageryLayers.remove(image_other5);
        		 viewer.scene.imageryLayers.remove(image_other6);
        		 viewer.scene.imageryLayers.remove(image_other7);
        		 viewer.scene.imageryLayers.remove(image_other9);
        		 image_other8=image_show(_gserveradd + 'ghTilesServer.ashx/tjtd!2010',1.0);
				 tjtd_text.value=slider_tjtd;
				 tjtdImgs.push(image_other8);
        		 break;
        	 case "2015":
        		 viewer.scene.imageryLayers.remove(image_other1);
        	     viewer.scene.imageryLayers.remove(image_other2);
        		 viewer.scene.imageryLayers.remove(image_other3);
        		 viewer.scene.imageryLayers.remove(image_other4);
        		 viewer.scene.imageryLayers.remove(image_other5);
        		 viewer.scene.imageryLayers.remove(image_other6);
        		 viewer.scene.imageryLayers.remove(image_other7);
        		 viewer.scene.imageryLayers.remove(image_other8);
                 image_other9=image_show(_gserveradd + 'ghTilesServer.ashx/tjtd!2015',1.0);
				 tjtd_text.value=slider_tjtd;
				 tjtdImgs.push(image_other9);
        		 break;
        	}
        });
        
        tjtd_text.addEventListener("change",function(){
           var text_tjtd=tjtd_text.value;
           //tjtd_slider.value=tjtd_text.value;
           switch(text_tjtd){ 
        	  case "1975":
        		 viewer.scene.imageryLayers.remove(image_other2);
        		 viewer.scene.imageryLayers.remove(image_other3);
        		 viewer.scene.imageryLayers.remove(image_other4);
        		 viewer.scene.imageryLayers.remove(image_other5);
        		 viewer.scene.imageryLayers.remove(image_other6);
        		 viewer.scene.imageryLayers.remove(image_other7);
        		 viewer.scene.imageryLayers.remove(image_other8);
        		 viewer.scene.imageryLayers.remove(image_other9);
        		 image_other1=image_show(_gserveradd + 'ghTilesServer.ashx/tjtd!1975',1.0); 
				 tjtd_slider.value=text_tjtd;
                 tjtdImgs.push(image_other1);				  
        		 break;
        	  case "1980":
        	     viewer.scene.imageryLayers.remove(image_other1);
        		 viewer.scene.imageryLayers.remove(image_other3);
        		 viewer.scene.imageryLayers.remove(image_other4);
        		 viewer.scene.imageryLayers.remove(image_other5);
        		 viewer.scene.imageryLayers.remove(image_other6);
        		 viewer.scene.imageryLayers.remove(image_other7);
        		 viewer.scene.imageryLayers.remove(image_other8);
        		 viewer.scene.imageryLayers.remove(image_other9);
        		 image_other2=image_show(_gserveradd + 'ghTilesServer.ashx/tjtd!1980',1.0);
				 tjtd_slider.value=text_tjtd;
                 tjtdImgs.push(image_other2);				 
        		 break;
        	  case "1985":
        	     viewer.scene.imageryLayers.remove(image_other1);
        		 viewer.scene.imageryLayers.remove(image_other2);
        		 viewer.scene.imageryLayers.remove(image_other4);
        		 viewer.scene.imageryLayers.remove(image_other5);
        		 viewer.scene.imageryLayers.remove(image_other6);
        		 viewer.scene.imageryLayers.remove(image_other7);
        		 viewer.scene.imageryLayers.remove(image_other8);
        		 viewer.scene.imageryLayers.remove(image_other9);
        		 image_other3=image_show(_gserveradd + 'ghTilesServer.ashx/tjtd!1985',1.0);
				 tjtd_slider.value=text_tjtd;
				 tjtdImgs.push(image_other3);
        		 break;
        	  case "1990": 
        	    viewer.scene.imageryLayers.remove(image_other1);
        		 viewer.scene.imageryLayers.remove(image_other2);
        		 viewer.scene.imageryLayers.remove(image_other3);
        		 viewer.scene.imageryLayers.remove(image_other5);
        		 viewer.scene.imageryLayers.remove(image_other6);
        		 viewer.scene.imageryLayers.remove(image_other7);
        		 viewer.scene.imageryLayers.remove(image_other8);
        		 viewer.scene.imageryLayers.remove(image_other9);
        		 image_other4=image_show(_gserveradd + 'ghTilesServer.ashx/tjtd!1990',1.0);
				 tjtd_slider.value=text_tjtd;
				 tjtdImgs.push(image_other4);
        		 break;
        	 case "1995":
        	     viewer.scene.imageryLayers.remove(image_other1);
        	     viewer.scene.imageryLayers.remove(image_other2);
        		 viewer.scene.imageryLayers.remove(image_other3);
        		 viewer.scene.imageryLayers.remove(image_other4);
        		 viewer.scene.imageryLayers.remove(image_other6);
        		 viewer.scene.imageryLayers.remove(image_other7);
        		 viewer.scene.imageryLayers.remove(image_other8);
        		 viewer.scene.imageryLayers.remove(image_other9);
        		 image_other5=image_show(_gserveradd + 'ghTilesServer.ashx/tjtd!1995',1.0);
				 tjtd_slider.value=text_tjtd;
				 tjtdImgs.push(image_other5);
        		 break;
        	 case "2000":
        	     viewer.scene.imageryLayers.remove(image_other1);
        	     viewer.scene.imageryLayers.remove(image_other2);
        		 viewer.scene.imageryLayers.remove(image_other3);
        		 viewer.scene.imageryLayers.remove(image_other4);
        		 viewer.scene.imageryLayers.remove(image_other5);
        		 viewer.scene.imageryLayers.remove(image_other7);
        		 viewer.scene.imageryLayers.remove(image_other8);
        		 viewer.scene.imageryLayers.remove(image_other9);
        		 image_other6=image_show(_gserveradd + 'ghTilesServer.ashx/tjtd!2000',1.0);
				 tjtd_slider.value=text_tjtd;
				 tjtdImgs.push(image_other6);
        		 break;
        	 case "2005":
        	     viewer.scene.imageryLayers.remove(image_other1);
        	     viewer.scene.imageryLayers.remove(image_other2);
        		 viewer.scene.imageryLayers.remove(image_other3);
        		 viewer.scene.imageryLayers.remove(image_other4);
        		 viewer.scene.imageryLayers.remove(image_other5);
        		 viewer.scene.imageryLayers.remove(image_other6);
        		 viewer.scene.imageryLayers.remove(image_other8);
        		 viewer.scene.imageryLayers.remove(image_other9);
        		 image_other7=image_show(_gserveradd + 'ghTilesServer.ashx/tjtd!2005',1.0);
				 tjtd_slider.value=text_tjtd;
				 tjtdImgs.push(image_other7);
        		 break;
        	 case "2010":
        	 	 viewer.scene.imageryLayers.remove(image_other1);
        	     viewer.scene.imageryLayers.remove(image_other2);
        		 viewer.scene.imageryLayers.remove(image_other3);
        		 viewer.scene.imageryLayers.remove(image_other4);
        		 viewer.scene.imageryLayers.remove(image_other5);
        		 viewer.scene.imageryLayers.remove(image_other6);
        		 viewer.scene.imageryLayers.remove(image_other7);
        		 viewer.scene.imageryLayers.remove(image_other9);
        		 image_other8=image_show(_gserveradd + 'ghTilesServer.ashx/tjtd!2010',1.0);
				 tjtd_slider.value=text_tjtd;
				 tjtdImgs.push(image_other8);
        		 break;
        	 case "2015":
        		 viewer.scene.imageryLayers.remove(image_other1);
        	     viewer.scene.imageryLayers.remove(image_other2);
        		 viewer.scene.imageryLayers.remove(image_other3);
        		 viewer.scene.imageryLayers.remove(image_other4);
        		 viewer.scene.imageryLayers.remove(image_other5);
        		 viewer.scene.imageryLayers.remove(image_other6);
        		 viewer.scene.imageryLayers.remove(image_other7);
        		 viewer.scene.imageryLayers.remove(image_other8);
                 image_other9=image_show(_gserveradd + 'ghTilesServer.ashx/tjtd!2015',1.0);
				 tjtd_slider.value=text_tjtd;
				 tjtdImgs.push(image_other9);
        		 break;
        	}
        });
        /* 动态按钮事件 */
		var tjtdstate=0;
		var tjtdPlay=document.getElementById("tjtd_play");
		var tjtdBP=document.getElementById("tjtdBP");
		tjtdPlay.onclick=function(){
		if(tjtdstate==0){
			tjtdBP.removeAttribute("class","fa fa-play fa-lg");
			tjtdBP.setAttribute("class","fa fa-pause fa-lg");
			
        viewer.camera.flyTo({
            destination : Cesium.Cartesian3.fromDegrees(117.3462305,39.3512083,280000),
        	duration:1
            });
				clearInterval(tjtd_timer);
				for(var i=0;i<tjtdImgs.length;i++){
					viewer.scene.imageryLayers.remove(tjtdImgs[i]);
				}
				
				 viewer.scene.imageryLayers.remove(image_other1);
        	     viewer.scene.imageryLayers.remove(image_other2);
        		 viewer.scene.imageryLayers.remove(image_other3);
        		 viewer.scene.imageryLayers.remove(image_other4);
        		 viewer.scene.imageryLayers.remove(image_other5);
        		 viewer.scene.imageryLayers.remove(image_other6);
        		 viewer.scene.imageryLayers.remove(image_other7);
        		 viewer.scene.imageryLayers.remove(image_other8);
				 viewer.scene.imageryLayers.remove(image_other9);
                tjtd_timer=setInterval(tjtd_change,2000);
        
			tjtdstate=1;
		}else if(tjtdstate==1){
			tjtdBP.removeAttribute("class","fa fa-pause fa-lg");
			tjtdBP.setAttribute("class","fa fa-play fa-lg");
			tjtdstate=0;
			
			clearInterval(tjtd_timer);
		    cc=0;
				 viewer.scene.imageryLayers.remove(image_other1);
        	     viewer.scene.imageryLayers.remove(image_other2);
        		 viewer.scene.imageryLayers.remove(image_other3);
        		 viewer.scene.imageryLayers.remove(image_other4);
        		 viewer.scene.imageryLayers.remove(image_other5);
        		 viewer.scene.imageryLayers.remove(image_other6);
        		 viewer.scene.imageryLayers.remove(image_other7);
        		 viewer.scene.imageryLayers.remove(image_other8);
				 viewer.scene.imageryLayers.remove(image_other9);
				for(var i=0;i<tjtdImgs.length;i++){
					viewer.scene.imageryLayers.remove(tjtdImgs[i]);
				}
        
		}
        }
       /* 动态函数 */
        var cc=0;
        
        function tjtd_change(){
             cc++;
            if(cc==1){
				 viewer.scene.imageryLayers.remove(image_other1);
        	     viewer.scene.imageryLayers.remove(image_other2);
        		 viewer.scene.imageryLayers.remove(image_other3);
        		 viewer.scene.imageryLayers.remove(image_other4);
        		 viewer.scene.imageryLayers.remove(image_other5);
        		 viewer.scene.imageryLayers.remove(image_other6);
        		 viewer.scene.imageryLayers.remove(image_other7);
        		 viewer.scene.imageryLayers.remove(image_other8);
				 viewer.scene.imageryLayers.remove(image_other9);
        	    image_other1=image_show(_gserveradd + 'ghTilesServer.ashx/tjtd!1975',1.0);
                tjtdImgs.push(image_other1);
                tjtd_slider.value=1975;
                tjtd_text.value=1975;				
        	}else if(cc==2){
        	   viewer.scene.imageryLayers.remove(image_other1);
                image_other2=image_show(_gserveradd + 'ghTilesServer.ashx/tjtd!1980',1.0);
                tjtdImgs.push(image_other2);
                tjtd_slider.value=1980;
                tjtd_text.value=1980;				
        	}else if(cc==3){
        	    viewer.scene.imageryLayers.remove(image_other2);
                 image_other3=image_show(_gserveradd + 'ghTilesServer.ashx/tjtd!1985',1.0);
				 tjtdImgs.push(image_other3);
                tjtd_slider.value=1985;
                tjtd_text.value=1985;
        	}else if(cc==4){
        	    viewer.scene.imageryLayers.remove(image_other3);
                 image_other4=image_show(_gserveradd + 'ghTilesServer.ashx/tjtd!1990',1.0);
				 tjtdImgs.push(image_other4);
                tjtd_slider.value=1990;
                tjtd_text.value=1990;
        	}else if(cc==5){
        	    viewer.scene.imageryLayers.remove(image_other4);
                 image_other5=image_show(_gserveradd + 'ghTilesServer.ashx/tjtd!1995',1.0);
				 tjtdImgs.push(image_other5);
                tjtd_slider.value=1995;
                tjtd_text.value=1995;
        	}else if(cc==6){
        	    viewer.scene.imageryLayers.remove(image_other5);
                 image_other6=image_show(_gserveradd + 'ghTilesServer.ashx/tjtd!2000',1.0);
				 tjtdImgs.push(image_other6);
                tjtd_slider.value=2000;
                tjtd_text.value=2000;
        	}else if(cc==7){
        	    viewer.scene.imageryLayers.remove(image_other6);
                 image_other7=image_show(_gserveradd + 'ghTilesServer.ashx/tjtd!2005',1.0);
				 tjtdImgs.push(image_other7);
                tjtd_slider.value=2005;
                tjtd_text.value=2005;
        	}else if(cc==8){
        	    viewer.scene.imageryLayers.remove(image_other7);
                 image_other8=image_show(_gserveradd + 'ghTilesServer.ashx/tjtd!2010',1.0);
				 tjtdImgs.push(image_other8);
                tjtd_slider.value=2010;
                tjtd_text.value=2010;
        	}else if(cc==9){
        	    viewer.scene.imageryLayers.remove(image_other8);
                 image_other9=image_show(_gserveradd + 'ghTilesServer.ashx/tjtd!2015',1.0);
				 tjtdImgs.push(image_other9);
                tjtd_slider.value=2015;
                tjtd_text.value=2015;
        	}
        }

$('#tjtdChangeWindow').window({
			 onClose:function(){
				 for(var i=0;i<tjtdImgs.length;i++){
					viewer.scene.imageryLayers.remove(tjtdImgs[i]);
				}
			 }
		 });