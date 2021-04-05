/*
*八仙山季节动态变化
*
*/



var bxs_timer;
var bxsImgs=[];

                                                                 
		var bxs_slider=document.getElementById("bxs_slider");
        var bxs_text=document.getElementById("bxs_text");
        bxs_slider.addEventListener("mouseup",function(){
           var slider_bxs=bxs_slider.value;
           //bxs_text.value=slider_bxs; 
             switch(slider_bxs){ 
               case "1":
        	     img_562=image_show(_gserveradd + "ghTilesServer.ashx/GOOGLE_BXSSUMMER",1);
				 bxs_text.value='夏季';
				 bxsImgs.push(img_562);
        		 viewer.scene.imageryLayers.remove(img_563);
		         viewer.scene.imageryLayers.remove(img_564);				 
        		 break;
        	  case "2":
			     img_563=image_show(_gserveradd + "ghTilesServer.ashx/GOOGLE_BXSAUTUMN",1);
				 bxs_text.value='秋季';
				 bxsImgs.push(img_563);
        		 viewer.scene.imageryLayers.remove(img_562);
        		 viewer.scene.imageryLayers.remove(img_564);
        		  break;
        	  case "3":
        	     img_564=image_show(_gserveradd + "ghTilesServer.ashx/GOOGLE_BXSWINTER",1);
				 bxs_text.value='冬季';
				 bxsImgs.push(img_564);
        		 viewer.scene.imageryLayers.remove(img_562);
        		 viewer.scene.imageryLayers.remove(img_563);
        		 break;
        	  
        	}
        });
        
        bxs_text.addEventListener("change",function(){
           var text_bxs=bxs_text.value;
           bxs_slider.value=bxs_text.value;
           switch(text_bxs){ 
               case "1":
        	     img_562=image_show(_gserveradd + "ghTilesServer.ashx/GOOGLE_BXSSUMMER",1);
				 bxsImgs.push(img_562);
        		 viewer.scene.imageryLayers.remove(img_563);
		         viewer.scene.imageryLayers.remove(img_564);				 
        		 break;
        	  case "2":
        		 img_563=image_show(_gserveradd + "ghTilesServer.ashx/GOOGLE_BXSAUTUMN",1);
				 bxsImgs.push(img_563);
        		 viewer.scene.imageryLayers.remove(img_562);
        		 viewer.scene.imageryLayers.remove(img_564); 
        		  break;
        	  case "3":
        	    img_564=image_show(_gserveradd + "ghTilesServer.ashx/GOOGLE_BXSWINTER",1);
				bxsImgs.push(img_564);
        		 viewer.scene.imageryLayers.remove(img_562);
        		 viewer.scene.imageryLayers.remove(img_563); 
        		 break;
        	}
        });
        
        
  
		var bxsstate=0;
		var firePlay=document.getElementById("bxs_play");
		var fireBP=document.getElementById("bxsBP");
		firePlay.onclick=function(){
		if(bxsstate==0){
			bxsBP.removeAttribute("class","fa fa-play fa-lg");
			bxsBP.setAttribute("class","fa fa-pause fa-lg");
			
        viewer.camera.flyTo({
            destination : Cesium.Cartesian3.fromDegrees(117.551513,40.189091,30000),
        	duration:1
            });
				clearInterval(bxs_timer);
				for(var i=0;i<bxsImgs.length;i++){
					viewer.scene.imageryLayers.remove(bxsImgs[i]);
				}
				
				viewer.scene.imageryLayers.remove(img_562);
				viewer.scene.imageryLayers.remove(img_563);
		        viewer.scene.imageryLayers.remove(img_564);
                bxs_timer=setInterval(bxsDT_start,2000);
        
			bxsstate=1;
		}else if(bxsstate==1){
			bxsBP.removeAttribute("class","fa fa-pause fa-lg");
			bxsBP.setAttribute("class","fa fa-play fa-lg");
			bxsstate=0;
			
			clearInterval(bxs_timer);
		  flagNum=0;
				viewer.scene.imageryLayers.remove(img_562);
				viewer.scene.imageryLayers.remove(img_563);
		        viewer.scene.imageryLayers.remove(img_564);
				for(var i=0;i<bxsImgs.length;i++){
					viewer.scene.imageryLayers.remove(bxsImgs[i]);
				}
        
		}
        }
        
        var flagNum=0;
		function bxsDT_start(){
			flagNum++;
			if(flagNum==1){
				viewer.scene.imageryLayers.remove(img_562);
				viewer.scene.imageryLayers.remove(img_563);
				viewer.scene.imageryLayers.remove(img_564);
				img_562=image_show(_gserveradd + "ghTilesServer.ashx/GOOGLE_BXSSUMMER",1);
				bxsImgs.push(img_562);
				bxs_text.value='夏季';
				bxs_slider.value=1;
			}else if(flagNum==2){
				img_563=image_show(_gserveradd + "ghTilesServer.ashx/GOOGLE_BXSAUTUMN",1);	
                 bxsImgs.push(img_563);	
                 bxs_text.value='秋季';
				 bxs_slider.value=2;				 
			}else if(flagNum==3){
				img_564=image_show(_gserveradd + "ghTilesServer.ashx/GOOGLE_BXSWINTER",1);
				bxsImgs.push(img_564);
				bxs_text.value='冬季';
				bxs_slider.value=3;
				
			}	
		}
         $('#bxsChangeWindow').window({
			 onClose:function(){
				 for(var i=0;i<bxsImgs.length;i++){
					viewer.scene.imageryLayers.remove(bxsImgs[i]);
				}
			 }
		 });
