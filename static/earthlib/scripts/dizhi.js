var showId_xzhd=0,showId_lszhd=0,showId_lszhmd=0,showId_gaocheng=0,showId_podu=0,showId_poxiang=0,showId_dizhi=0,showId_yanxing=0,showId_duanlie=0,showId_yaoganyingxiang=0,showId_NDVI=0,showId_jiangyu=0,showId_hygl_point=0,showId_hygl=0;
var img_lszhd,img_lszhmd,img_gaocheng,img_podu,img_poxiang,img_dizhi,img_dizhi1,img_dizhi2,img_dizhi3,img_yanxing,img_duanlie,img_yaoganyingxiang,img_NDVI,img_jiangyu,img_hygl_point,img_hygl,img_xzhd;

$("#dizhiTree").tree({
	onCheck:function(node){
		var dz_id=node.id;
		switch(dz_id){
			case "xzhd":
			if (showId_xzhd==0)
			{
				img_xzhd=add_tiles_4326(_gserveradd + "ghTilesServer.ashx/"+dz_id,1);
				showId_xzhd=1;
			}else{
				showId_xzhd=0;
				viewer.scene.imageryLayers.remove(img_xzhd);
			}
			break;
			case "lszhd":
			if (showId_lszhd==0)
			{
				img_lszhd=add_tiles_4326(_gserveradd + "ghTilesServer.ashx/"+dz_id,1);
				showId_lszhd=1;
			}else{
				showId_lszhd=0;
				viewer.scene.imageryLayers.remove(img_lszhd);
			}
			break;
			case "lszhmd":
			if (showId_lszhmd==0)
			{
				img_lszhmd=add_tiles_4326(_gserveradd + "ghTilesServer.ashx/"+dz_id,1);
				showId_lszhmd=1;
			}else{
				showId_lszhmd=0;
				viewer.scene.imageryLayers.remove(img_lszhmd);
			}
			break;
			case "gaocheng":
			if (showId_gaocheng==0)
			{
				img_gaocheng=add_tiles_4326(_gserveradd + "ghTilesServer.ashx/"+dz_id,1);
				showId_gaocheng=1;
			}else{
				showId_gaocheng=0;
				viewer.scene.imageryLayers.remove(img_gaocheng);
			}
			break;
			case "podu":
			if (showId_podu==0)
			{
				img_podu=add_tiles_4326(_gserveradd + "ghTilesServer.ashx/"+dz_id,1);
				showId_podu=1;
			}else{
				showId_podu=0;
				viewer.scene.imageryLayers.remove(img_podu);
			}
			break;
			case "poxiang":
			if (showId_poxiang==0)
			{
				img_poxiang=add_tiles_4326(_gserveradd + "ghTilesServer.ashx/"+dz_id,1);
				showId_poxiang=1;
			}else{
				showId_poxiang=0;
				viewer.scene.imageryLayers.remove(img_poxiang);
			}
			break;
			case "dizhi":
			if (showId_dizhi==0)
			{
				img_dizhi1=add_tiles_4326(_gserveradd + "ghTilesServer.ashx/"+dz_id+"1",1);
				img_dizhi2=add_tiles_4326(_gserveradd + "ghTilesServer.ashx/"+dz_id+"2",1);
				img_dizhi3=add_tiles_4326(_gserveradd + "ghTilesServer.ashx/"+dz_id+"3",1);
				showId_dizhi=1;
			}else{
				showId_dizhi=0;
				viewer.scene.imageryLayers.remove(img_dizhi1);
				viewer.scene.imageryLayers.remove(img_dizhi2);
				viewer.scene.imageryLayers.remove(img_dizhi3);
			}
			break;
			case "yanxing":
			if (showId_yanxing==0)
			{
				img_yanxing=add_tiles_4326(_gserveradd + "ghTilesServer.ashx/"+dz_id,1);
				showId_yanxing=1;
			}else{
				showId_yanxing=0;
				viewer.scene.imageryLayers.remove(img_yanxing);
			}
			break;
			case "duanlie":
			if (showId_duanlie==0)
			{
				img_duanlie=add_tiles_4326(_gserveradd + "ghTilesServer.ashx/"+dz_id,1);
				showId_duanlie=1;
			}else{
				showId_duanlie=0;
				viewer.scene.imageryLayers.remove(img_duanlie);
			}
			break;
			case "yaoganyingxiang":
			if (showId_yaoganyingxiang==0)
			{
				img_yaoganyingxiang=add_tiles_4326(_gserveradd + "ghTilesServer.ashx/"+dz_id,1);
				showId_yaoganyingxiang=1;
			}else{
				showId_yaoganyingxiang=0;
				viewer.scene.imageryLayers.remove(img_yaoganyingxiang);
			}
			break;
			case "NDVI":
			if (showId_NDVI==0)
			{
				img_NDVI=add_tiles_4326(_gserveradd + "ghTilesServer.ashx/"+dz_id,1);
				showId_NDVI=1;
			}else{
				showId_NDVI=0;
				viewer.scene.imageryLayers.remove(img_NDVI);
			}
			break;
			case "jiangyu":
			if (showId_jiangyu==0)
			{
				img_jiangyu=add_tiles_4326(_gserveradd + "ghTilesServer.ashx/"+dz_id,1);
				showId_jiangyu=1;
			}else{
				showId_jiangyu=0;
				viewer.scene.imageryLayers.remove(img_jiangyu);
			}
			break;
			case "hygl_point":
			if (showId_hygl_point==0)
			{
				img_hygl_point=add_tiles_4326(_gserveradd + "ghTilesServer.ashx/"+dz_id,1);
				showId_hygl_point=1;
			}else{
				showId_hygl_point=0;
				viewer.scene.imageryLayers.remove(img_hygl_point);
			}
			break;
			case "hygl":
			if (showId_hygl==0)
			{
				img_hygl=add_tiles_4326(_gserveradd + "ghTilesServer.ashx/"+dz_id,1);
				showId_hygl=1;
				changeImag("../../tuli/"+dz_id+".png");
			}else{
				showId_hygl=0;
				viewer.scene.imageryLayers.remove(img_hygl);
				dispear_img();
			}
			break;
		}
	}
});