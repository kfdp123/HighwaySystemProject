//八仙山改变
var dxalChange;
function dxalDT(){	
	dxalChange=setInterval(dxalDT_start,1000);
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
		img_1005=image_show("../../otherData/fire_change/21",1.0);
	}else if(flagNumdx==2){
		img_1006=image_show("../../otherData/fire_change/22",1.0);		
	}else if(flagNumdx==3){
		img_1007=image_show("../../otherData/fire_change/23",1.0);
	}else if(flagNumdx==4){
		img_1008=image_show("../../otherData/fire_change/24",1.0);
	}else if(flagNumdx==5){
		img_1009=image_show("../../otherData/fire_change/25",1.0);
	}else if(flagNumdx==6){
		img_1010=image_show("../../otherData/fire_change/26",1.0);
	}else if(flagNumdx==7){
		img_1011=image_show("../../otherData/fire_change/27",1.0);
		flagNumdx=0;
	}	
}
