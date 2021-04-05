/*	
<script>
*/
	////
	function obliqueLoad(){
		titleset_show('../../danjiangkou_3dtiles');
		titleset_show('../../taocha_3dtiles');
	}


	var heilongjiang;

	function verticalImg(){
		image_show("../../0_24",1.0); //
		image_show("../../xuefu_15cm/xuefu_0-24",1.0);//
		image_show("../../shilongshan",1.0);//
		image_show("../../FuJian_fuqingshi", 1.0);//
		image_show("../../SC_SanTai",1.0);//
		image_show("../../tj",1.0); //
		heilongjiang=image_show("../../DaXingAnLing",1.0); //
	}


	function trafficMove_cancel(){
		MAX_3DMODEL_remove();
		document.getElementById("zzmx_my").style.display="none";
	}

	

	function tuceng_cancel(){
		clearInterval(bxsChange);
		viewer.scene.imageryLayers.remove(bxs_Summer);
		viewer.scene.imageryLayers.remove(bxs_Autum);
		viewer.scene.imageryLayers.remove(bxs_Winter);
		viewer.scene.imageryLayers.remove(bxsDenggao_img);
		bxsSummer();
		hnxyImg();
		//hideMenu();
		dongtai_cancel();
		viewer.entities.remove(glowingPoint);
		viewer.entities.remove(glowingLine);
		viewer.scene.imageryLayers.remove(poDu_image);
		viewer.scene.imageryLayers.remove(radar_image);
		viewer.scene.imageryLayers.remove(bxs_Autum);
		viewer.scene.imageryLayers.remove(bxs_Winter);
		viewer.scene.imageryLayers.remove(bxsDenggao_img);
		viewer.scene.imageryLayers.remove(heilongjiang);

		radar_line_cancel();
		bxs_div.style.display='none';
		dxal_div.style.display='none';
		hnxy_div.style.display='none';
		radar_div.style.display='none';
		drawpicture.style.display='none';
	}
	
	function search_owner(){
		image004=image_show('../../SC_SanTai_LandOwnership',1.0);
		locateTO(105.02094,30.99968,2000);
	}

	function hnxyPanel(){
		hnxy_div.style.display='none';
	}
	
	function hnxyImg(){
		viewer.scene.imageryLayers.remove(hnxyDgp);
		viewer.scene.imageryLayers.remove(hnxySlope);
	}
	
	function hnxyDgp(){
		viewer.scene.imageryLayers.remove(hnxySlope);
		hnxyDgp=image_show('../../shilongshan_duoguangpu',1.0);
	}
	
	function hnxySlope(){
		viewer.scene.imageryLayers.remove(hnxyDgp);
		hnxySlope=image_show('../../shilongshan_podu',1.0);
	}

	/*function searchCancel(){
	santai_search();
	Searchtext.innerHTML='';
	searchOut.style.display='none';
	}*/

	
	function guijiCan(){
		var lohe = document.getElementById("form_id");
		lohe.style.display='none';
	}
	
	document.getElementById('measure_cancel').onclick=function(){
		drawFlag1 = false;
		polylinePath = [];
		polyline = undefined;
		drawFlag2 = false;
		polygonPath = [];
		polygon = undefined;
		viewer.entities.removeAll();
	//$(".cesium-infoBox-visible").css("display","");
	//$(".cesium-selection-wrapper-visible").css("visibility","visible");
	}

	 //
	function button_china()
	{	
		Cesium.Math.setRandomNumberSeed(0);
		var promise = Cesium.GeoJsonDataSource.load('./SampleData/China_pop.json');
		promise.then(function(dataSource) {
			viewer.dataSources.add(dataSource);
			var entities = dataSource.entities.values; 
			var colorHash = {};
			for (var i = 0; i < entities.length; i++) {
				var entity = entities[i];
				var name = entity.properties.PROVINCE; 
				var color = colorHash[name];
				if (!color) {
					color = Cesium.Color.fromRandom({
					alpha : 1.0
					});
					colorHash[name] = color;
				} 
				entity.polygon.material = color;
				entity.polygon.outline = false;
				entity.polygon.extrudedHeight = entity.properties.POPULATION /300;
			}
		})
	}
	
	/*  */
	var mm=document.getElementById("tuli");
	var nn=document.getElementById("tuliImag");
	
	function changeImag(url)	
	{	    
		mm.style.display="block";
		nn.src=url;		
	}
	
	function dispear_img(){	
		nn.style.display="";
		nn.src="";	
	}
	
	//
	function load_shp(url,color,alpha,bold){
		var datavalue=new Cesium.GeoJsonDataSource();
		viewer.dataSources.add(datavalue.load(url, {
				stroke: color,
				//markerSymbol:'./images/green.png',
				fill: Cesium.Color.GREEN.withAlpha(0.5),
				strokeWidth: bold
		}));
		return datavalue;
	}
	
	//
		 //
	function tjxq(){
		$.getJSON("TJSHP/tjxq.json",function(data){
			for(var i=0;i<data.length;i++){
			   viewer.entities.add({
				id:data[i].lng,
				position : Cesium.Cartesian3.fromDegrees(data[i].lng*1, data[i].lat*1,80),
				label : {
					outlineColor:Cesium.Color.WHITE,
					outlineWidth:0,
					//fillColor:Cesium.Color.MAGENTA,
					font:'17px sans-serif',
					text : data[i].name,
					translucencyByDistance : new Cesium.NearFarScalar(1.5e3, 1.0, 1.5e6, 0.0),
					 style : Cesium.LabelStyle.FILL_AND_OUTLINE
				}});
			}
		})
	};
				 //
	function tjxz(){
		$.getJSON("TJSHP/TJTOWN.json",function(data){
		   for(var i=0;i<data.length;i++){
			   viewer.entities.add({
				id:data[i].lng,
				position : Cesium.Cartesian3.fromDegrees(data[i].lng*1, data[i].lat*1,50),
				label : {
					outlineColor:Cesium.Color.WHITE,
					outlineWidth:2,
					fillColor:Cesium.Color.WHITE,
					font:'20px sans-serif',
					text : data[i].name,
					translucencyByDistance : new Cesium.NearFarScalar(1.5e3, 1.5, 1.5e5, 0.0),
					style : Cesium.LabelStyle.FILL_AND_OUTLINE
				}});
			}
		})
	};
	
	function looptjxq_cancel(){
		$.getJSON('TJSHP/tjxq.json',function(data){
			for(var i=0;i<data.length;i++){
			  var id_value=data[i].lng;
			  viewer.entities.removeById(id_value);
			}
		} );
	}
	
	function looptjxz_cancel(){
		$.getJSON('TJSHP/TJTOWN.json',function(data){
			for(var i=0;i<data.length;i++){
				var id_value=data[i].lng;
				viewer.entities.removeById(id_value);
			}
		});
	}			 
	
/*	 
</script>
*/
	
