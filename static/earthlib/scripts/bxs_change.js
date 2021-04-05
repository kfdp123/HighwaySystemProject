//八仙山改变
var bxsChange;
function bxsDT(){	
	bxsChange=setInterval(bxsDT_start,1000);
}
var flagNum=0;
function bxsDT_start(){
	flagNum++;
	if(flagNum==1){
		viewer.scene.imageryLayers.remove(img_562);
		viewer.scene.imageryLayers.remove(img_563);
		viewer.scene.imageryLayers.remove(img_564);
		img_562=image_show("../../localOtherData/baxianshan_xia",1.0);
	}else if(flagNum==2){
		img_563=image_show("../../localOtherData/baxianshan_qiu/0-22",1.0);		
	}else if(flagNum==3){
		img_564=image_show("../../localOtherData/baxianshan_dong/0-20",1.0);
		flagNum=0;
	}	
}
