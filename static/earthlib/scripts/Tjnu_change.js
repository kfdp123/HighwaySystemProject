/*
师大变化监测
*/

var Tjnu_change_timer;
var Tjnu_Imgs=[]
var Tjnu_change_img_1,Tjnu_change_img_2,Tjnu_change_img_3;

var Tjnu_change_slider=document.getElementById("Tjnu_slider");
var Tjnu_change_text=document.getElementById("Tjnu_text");

Tjnu_change_slider.addEventListener("mouseup",function(){
	var change_slider=Tjnu_change_slider.value;
	Tjnu_change_text.value=change_slider;
	switch(change_slider){
		case "2012":
		 Tjnu_change_img_1=image_show(_gserveradd + "ghTilesServer.ashx/tjnu_2012",1.0);
		 Tjnu_Imgs.push(Tjnu_change_img_1);
		 viewer.scene.imageryLayers.remove(Tjnu_change_img_2);
		 viewer.scene.imageryLayers.remove(Tjnu_change_img_3);
		 break;
		case "2015":
		 Tjnu_change_img_2=image_show(_gserveradd + "ghTilesServer.ashx/tjnu_2015",1.0);
		 Tjnu_Imgs.push(Tjnu_change_img_2);
		 viewer.scene.imageryLayers.remove(Tjnu_change_img_1);
		 viewer.scene.imageryLayers.remove(Tjnu_change_img_3);
		 break;
		case "2018":
		 Tjnu_change_img_3=image_show(_gserveradd + "ghTilesServer.ashx/tjnu_diff",1.0);
		 Tjnu_Imgs.push(Tjnu_change_img_3);
		 viewer.scene.imageryLayers.remove(Tjnu_change_img_1);
		 viewer.scene.imageryLayers.remove(Tjnu_change_img_2);
		 break;
	}
});

Tjnu_change_text.addEventListener("change",function(){
	var change_text=Tjnu_change_text.value;
	Tjnu_change_slider.value=Tjnu_change_text.value;
	switch(change_text){
		case "2012":
		 Tjnu_change_img_1=image_show(_gserveradd + "ghTilesServer.ashx/tjnu_2012",1.0);
		 Tjnu_Imgs.push(Tjnu_change_img_1);
		 viewer.scene.imageryLayers.remove(Tjnu_change_img_2);
		 viewer.scene.imageryLayers.remove(Tjnu_change_img_3);
		 break;
		case "2015":
		 Tjnu_change_img_2=image_show(_gserveradd + "ghTilesServer.ashx/tjnu_2015",1.0);
		 Tjnu_Imgs.push(Tjnu_change_img_2);
		 viewer.scene.imageryLayers.remove(Tjnu_change_img_1);
		 viewer.scene.imageryLayers.remove(Tjnu_change_img_3);
		 break;
		case "2018":
		 Tjnu_change_img_3=image_show(_gserveradd + "ghTilesServer.ashx/tjnu_diff",1.0);
		 Tjnu_Imgs.push(Tjnu_change_img_3);
		 viewer.scene.imageryLayers.remove(Tjnu_change_img_1);
		 viewer.scene.imageryLayers.remove(Tjnu_change_img_2);
		 break;
	}
});

var change_state=0;
var Tjnu_play=document.getElementById("Tjnu_play");
var Tjnu_BP=document.getElementById("Tjnu_BP");
Tjnu_play.onclick=function(){
	if (change_state==0){
		Tjnu_BP.removeAttribute("class","fa fa-play fa-lg");
		Tjnu_BP.setAttribute("class","fa fa-pause fa-lg");
		
	    viewer.camera.flyTo({
            destination : Cesium.Cartesian3.fromDegrees(117.12, 39.06, 2000),
        	duration:1
            });
			
	    clearInterval(Tjnu_change_timer);
				for(var i=0;i<Tjnu_Imgs.length;i++){
					viewer.scene.imageryLayers.remove(Tjnu_Imgs[i]);
				}
				
		viewer.scene.imageryLayers.remove(Tjnu_change_img_1);
		viewer.scene.imageryLayers.remove(Tjnu_change_img_2);
		viewer.scene.imageryLayers.remove(Tjnu_change_img_3);
		
		Tjnu_change_timer=setInterval(Tjnu_changeDT_start,4000);
		change_state=1;
	}else if(change_state==1){
			Tjnu_BP.removeAttribute("class","fa fa-pause fa-lg");
			Tjnu_BP.setAttribute("class","fa fa-play fa-lg");
			change_state=0;
			
			Tjnu_Numdx=0;
          clearInterval(Tjnu_change_timer);
				viewer.scene.imageryLayers.remove(Tjnu_change_img_1);
				viewer.scene.imageryLayers.remove(Tjnu_change_img_2);
				viewer.scene.imageryLayers.remove(Tjnu_change_img_3);
				for(var i=0;i<Tjnu_Imgs.length;i++){
					viewer.scene.imageryLayers.remove(Tjnu_Imgs[i]);
				}
        
		}
}

var Tjnu_Numdx=0;
function Tjnu_changeDT_start(){
	Tjnu_Numdx++;
	if (Tjnu_Numdx==1){
		viewer.scene.imageryLayers.remove(Tjnu_change_img_1);
		viewer.scene.imageryLayers.remove(Tjnu_change_img_2);
		viewer.scene.imageryLayers.remove(Tjnu_change_img_3);
		Tjnu_change_img_1=image_show(_gserveradd + "ghTilesServer.ashx/tjnu_2012",1.0);
		Tjnu_Imgs.push(Tjnu_change_img_1);
		Tjnu_change_slider.value=2012;
		Tjnu_change_text.value=2012;
	}else if (Tjnu_Numdx==2){
		viewer.scene.imageryLayers.remove(Tjnu_change_img_1);
		viewer.scene.imageryLayers.remove(Tjnu_change_img_3);
		Tjnu_change_img_2=image_show(_gserveradd + "ghTilesServer.ashx/tjnu_2015",1.0);
		Tjnu_Imgs.push(Tjnu_change_img_2);
		Tjnu_change_slider.value=2015;
		Tjnu_change_text.value=2015;
	}else if (Tjnu_Numdx==3){
		viewer.scene.imageryLayers.remove(Tjnu_change_img_1);
		viewer.scene.imageryLayers.remove(Tjnu_change_img_2);
		Tjnu_change_img_3=image_show(_gserveradd + "ghTilesServer.ashx/tjnu_diff",1.0);
		Tjnu_Imgs.push(Tjnu_change_img_3);
		Tjnu_change_slider.value=2018;
		Tjnu_change_text.value="变化监测";
	}
}


var img_diff;

//变化检测 2019-3-29
/*function diff_change()
{
	$.ajax({
		        contentType: "application/x-www-form-urlencoded; charset=utf-8",
                url: "http://localhost:52644/Handler1.ashx",
				type: "POST",
				dataType: "json",
                success: function (msg) {
                    //alert("Data Saved: " + msg);
					img_diff=image_show("../../sample_data/change/diff",1.0);
					locateTO(117.12, 39.06, 2000);
					$('#diff_div').style.display='';
                }
            });
}


function diff_Cancel()
{
	viewer.scene.imageryLayers.remove(img_diff);
	$('#diff_div').style.display='none';
}
*/