/*<!-- 左侧菜单 -->
<script  type="text/javascript">	*/

	var img_111,img_112,img_113,img_114,img_221,img_222,img_223,img_224,img_225,img_226,img_227,img_228,img_229,img_230,img_231;
	var img_331,img_332,img_333,img_334,img_441,img_442,img_4421,img_4422,img_4423,img_4424,img_4425,img_4426,img_4427,img_4428;
	var img_4429,img_4430,img_4431,img_4432,img_4443,img_4444,img_4433,img_4434,img_4435,img_4436,img_4437,img_4438,img_4439,img_4440;
	var img_4441,img_4442,img_551,img_552,img_553,img_554,img_555,img_556,img_557,img_558,img_559,img_560,img_561,img_562;
	var img_563,img_564,img_565,img_566,img_567,img_568,img_569,img_661,img_662,img_663,img_771,img_881,img_991,img_992,img_993,img_994,img_995,img_1000,img_1001,img_1002,img_1003,img_1004,img_1005,img_1006,img_1007,img_1008,img_1009,img_1010,img_1011,img_8811,img_10000,img_1111;
	var img_1012,img_1013,img_1014,img_1015,img_1016,img_1017,img_1018,img_1019;
	var titlesetSD1,titlesetSD2,titlesetSD3,titlesetSD4,titlesetSD5,titlesetSD6;
	var showId_111=0,showId_112=0,showId_113=0,showId_114=0,showId_221=0,showId_222=0,showId_223=0,showId_224=0,showId_225=0,showId_226=0,showId_227=0,showId_228=0;
	var showId_229=0,showId_230=0,showId_231=0,showId_331=0,showId_332=0,showId_333=0,showId_334=0,showId_441=0,showId_442=0,showId_443=0,showId_4421=0,showId_4422=0,showId_4423=0;
	var showId_4424=0,showId_4425=0,showId_4426=0,showId_4427=0,showId_4428=0,showId_4429=0,showId_4430=0,showId_4431=0,showId_4432=0,showId_4443=0,showId_4444=0;
	var showId_4433=0,showId_4434=0,showId_4435=0,showId_4436=0,showId_4437=0,showId_4438=0,showId_4439=0,showId_4440=0,showId_4441=0,showId_4442=0,showId_551=0;
	var showId_552=0,showId_553=0,showId_554=0,showId_555=0,showId_556=0,showId_557=0,showId_558=0,showId_559=0,showId_560=0,showId_561=0,showId_562=0;
	var showId_563=0,showId_564=0,showId_565=0,showId_566=0,showId_567=0,showId_568=0,showId_569=0,showId_661=0,showId_662=0,showId_663=0,showId_771=0,showId_881=0,showId_1111=0;
	var showId_991=0,showId_992=0,showId_993=0,showId_994=0,showId_995=0,showId_1000=0,showId_1001=0,showId_1002=0,showId_1003=0,showId_1019=0,showId_1004=0,showId_9941=0,showId_8811=0,showId_10000=0;

	$(document).ready(function(){

	$("#leftTree").tree({
		onCheck:function(node){
			var id=node.id;
			switch(id){
			case 111:                                   <!-- 遥感地图 -->
			if (showId_111==0)
			{
			img_111=image_show2("../../localOtherData/googleImg",1);
			showId_111=1; 
			}else {
			showId_111=0;
			viewer.scene.imageryLayers.remove(img_111); 
			}  
			break;
			case 112:                                   <!-- 交通地图 -->
			if (showId_112==0)
			{
			img_112=image_show1("../../localOtherData/worldlabel",1);
			showId_112=1; 
			}else {
			showId_112=0;
			viewer.scene.imageryLayers.remove(img_112); 
			}  
			break;
			case 113:                                   <!-- 地图图像 -->
			if (showId_113==0)
			{
			img_113=image_show1(_gserveradd + 'ghTilesServer.ashx/google_map',1);
			showId_113=1; 
			}else {
			showId_113=0;
			viewer.scene.imageryLayers.remove(img_113); 
			}  
			break;
			case 114:                                   <!-- 地形晕渲 -->
			if (showId_114==0)
			{
			img_114=image_show2(_gserveradd + 'ghTilesServer.ashx/google_render',1);
			showId_114=1; 
			}else {
			showId_114=0;
			viewer.scene.imageryLayers.remove(img_114); 
			}  
			break;
			case 1111:                                   <!-- 格网 -->
			if (showId_1111==0)
			{
			img_1111=image_show('../gewang/1km/',1);
			showId_1111=1; 
			}else {
			showId_1111=0;
			viewer.scene.imageryLayers.remove(img_1111); 
			}  
			break;
			case 221:                                   <!-- 地质图 -->
			if (showId_221==0)
			{
			img_221=image_show("../../otherData/dizhi",1);
			showId_221=1; 
			}else {
			showId_221=0;
			viewer.scene.imageryLayers.remove(img_221); 
			}  
			break;
			case 222:                                   <!-- 全球土地覆盖 -->
			if (showId_222==0)
			{
			img_222=image_show1("../../otherData/lpf-landcover-globalmapper",1);
			showId_222=1; 
			}else {
			showId_222=0;
			viewer.scene.imageryLayers.remove(img_222); 
			}  
			break;
			case 223:                                   <!-- 三台土地覆盖 -->
			if (showId_223==0)
			{
			img_223=image_show("../../localOtherData/SC_SanTai_Landuse_201112_3W",1);
			locateTO(105.02094,30.99968,2000);
			showId_223=1; 
			}else {
			showId_223=0;
			viewer.scene.imageryLayers.remove(img_223); 
			}  
			break;
			case 224:                                   <!-- 土壤类型 -->
			if (showId_224==0)
			{
			img_224=image_show("../../otherData/turang/type",0.3);
			showId_224=1; 
			}else {
			showId_224=0;
			viewer.scene.imageryLayers.remove(img_224); 
			}  
			break;
			case 225:                                   <!-- 土壤侵蚀 -->
			if (showId_225==0)
			{
			img_225=image_show("../../otherData/turang/qinshi",0.3);
			showId_225=1; 
			}else {
			showId_225=0;
			viewer.scene.imageryLayers.remove(img_225); 
			}  
			break;
			case 226:                                   <!-- 表层土壤机构 -->
			if (showId_226==0)
			{
			img_226=image_show("../../otherData/turang/biaoceng",0.3);
			showId_226=1; 
			}else {
			showId_226=0;
			viewer.scene.imageryLayers.remove(img_226); 
			}  
			break;
			case 227:                                   <!-- 土壤总氮结构 -->
			if (showId_227==0)
			{
			img_227=image_show("../../otherData/turang/TN_layer1RGB",0.3);
			showId_227=1; 
			}else {
			showId_227=0;
			viewer.scene.imageryLayers.remove(img_227); 
			}  
			break;
			case 228:                                   <!-- 土壤质地粘土 -->
			if (showId_228==0)
			{
			img_228=image_show("../../otherData/turang/niantu",0.3);
			showId_228=1; 
			}else {
			showId_228=0;
			viewer.scene.imageryLayers.remove(img_228); 
			}  
			break;
			case 229:                                   <!-- 土壤质地粉砂土 -->
			if (showId_229==0)
			{
			img_229=image_show("../../otherData/turang/fenshatu",0.3);
			showId_229=1; 
			}else {
			showId_229=0;
			viewer.scene.imageryLayers.remove(img_229); 
			}  
			break;
			case 230:                                   <!-- 土壤有机碳结构 -->
			if (showId_230==0)
			{
			img_230=image_show("../../otherData/turang/OC_layer1RGB",0.3);
			showId_230=1; 
			}else {
			showId_230=0;
			viewer.scene.imageryLayers.remove(img_230); 
			}  
			break;
			case 231:                                   <!-- 植被覆盖面积 -->
			if (showId_231==0)
			{
			img_231=image_show("../../otherData/turang/zhibei_type",0.3);
			showId_231=1; 
			}else {
			showId_231=0;
			viewer.scene.imageryLayers.remove(img_231); 
			}  
			break;
			case 331:                                   <!-- 各国土地面积 -->
			if (showId_331==0)
			{
			img_331=image_show("../../otherData/worldData/world_area",0.3);
			changeImag("../../otherData/worldData/world_area/world_area.png");
			showId_331=1; 
			}else {
			showId_331=0;
			dispear_img();
			viewer.scene.imageryLayers.remove(img_331); 
			}  
			break;
			case 332:                                   <!-- 国家人口分布 -->
			if (showId_332==0)
			{
			img_332=image_show("../../otherData/worldData/world_pop",0.3);
			changeImag("../../otherData/worldData/world_pop/world_pop.png");
			showId_332=1; 
			}else {
			showId_332=0;
			dispear_img();
			viewer.scene.imageryLayers.remove(img_332); 
			}  
			break;
			case 333:                                   <!-- 中国省级人口 -->
			if (showId_333==0)
			{
			img_333=button_china();
			showId_333=1; 
			}else {
			showId_333=0;
			viewer.dataSources.removeAll();
			viewer.scene.imageryLayers.remove(img_333); 
			}  
			break;
			case 334:                                   <!-- 中国市级人口 -->
			if (showId_334==0)
			{
			img_334=image_show("../../otherData/population_Province",0.3);
			changeImag("../../otherData/population_Province/Renkou_Shi.png");
			showId_334=1; 
			}else {
			showId_334=0;
			dispear_img();
			viewer.scene.imageryLayers.remove(img_334); 
			}  
			break;
			case 441:                                   <!-- 风向风力 -->
			if (showId_441==0)
			{
			viewer.terrainProvider = defaultTerrain;
			valueOnChange_before();
			showId_441=1; 
			}else {
			showId_441=0;
			add_dem("../../30mDem");
			closeWind();
			}  
			break;
			case 442:                                   <!-- 降水动态模拟 -->
			if (showId_442==0)
			{
			cnjs_Change();
			changeImag("../../otherData/jiangshui_change/jiangshui.png");
			cnjs_image_other1=image_show("../../otherData/jiangshui_change/"+(cnjs_i+1)+"/",0);
			showId_442=1; 
			}else {
			dispear_img();
			showId_442=0;
			cnjs_Cancel();
			}  
			break;
			case 443:                                   <!-- 气温动态模拟 -->
			if (showId_443==0)
			{
			cnqw_Change();
			changeImag("../../otherData/qiwen_change/qiwen.png");
			cnqw_image_other1=image_show("../../otherData/qiwen_change/"+(cnqw_i+1)+"/",0);
			showId_443=1; 
			}else {
			showId_443=0;
			dispear_img();
			cnqw_Cancel();
			}  
			break;
			case 1001:                                   <!-- 气象控制面板 -->
			if (showId_1001==0)
			{
			$('#qixiangWindow').window('open');
			showId_1001=1; 
			}else {
			showId_1001=0;
			$('#qixiangWindow').window('close'); 
			}  
			break; 
			case 551:                                   <!-- 天津地形 -->
			if (showId_551==0)
			{
			locateTO(117.551513,40.189091,30000);
			viewer.terrainProvider = defaultTerrain;
			add_dem("../../localOtherData/qyk");
			img_562=image_show("../../localOtherData/baxianshan_xia",1.0);
			showId_551=1; 
			}else {
			showId_551=0;
			add_dem("../../30mDem");
			//viewer.terrainProvider = defaultTerrain;
			viewer.scene.imageryLayers.remove(img_562); 
			}  
			break;
			case 552:                                   <!-- 天津晕渲图 -->
			if (showId_552==0)
			{
			img_552=image_show("../../otherData/TJ_TITLES",1);
			showId_552=1; 
			}else {
			showId_552=0;
			viewer.scene.imageryLayers.remove(img_552); 
			}  
			break;
			case 553:                                   <!-- 天津区县界线 -->
			if (showId_553==0)
			{
			img_553=load_shp("TJSHP/xian_boundary.json",Cesium.Color.YELLOW,0.1,20);
			tjxq();
			showId_553=1; 
			}else {
			showId_553=0;
			//viewer.entities.removeById('tjxq_cancel');
			viewer.dataSources.remove(img_553);
			looptjxq_cancel(); 
			}  
			break;
			case 554:                                   <!-- 天津乡镇界限 -->
			if (showId_554==0)
			{
			img_554=load_shp("TJSHP/TJTOWN_NEW.json",Cesium.Color.WHITE,0.1,10);
			tjxz();
			showId_554=1; 
			}else {
			showId_554=0;
			//viewer.entities.removeById('tjxz_cancel');
			viewer.dataSources.remove(img_554);
			looptjxz_cancel(); 
			}  
			break;
			case 555:                                   <!-- 四川航拍影像 -->
			if (showId_555==0)
			{
			img_555=image_show("../../localOtherData/SC_SanTai",1);
			locateTO(105.02094,30.99968,2000);
			showId_555=1; 
			}else {
			showId_555=0;
			viewer.scene.imageryLayers.remove(img_555); 
			}  
			break;
			case 556:                                   <!-- 四川土地确权 -->
			if (showId_556==0)
			{
			img_556=image_show("../../localOtherData/SC_SanTai_LandOwnership",1);
			locateTO(105.02094,30.99968,2000);
			showId_556=1; 
			}else {
			showId_556=0;
			viewer.scene.imageryLayers.remove(img_556); 
			}  
			break;
			case 557:                                   <!-- 河南正射影像 -->
			if (showId_557==0)
			{
			img_557=image_show("../../otherData/shilongshan_img",1);
			locateTO(113.57277,32.623888,900);
			showId_557=1; 
			}else {
			showId_557=0;
			viewer.scene.imageryLayers.remove(img_557); 
			}  
			break;
			case 558:                                   <!-- 河南多光谱影像 -->
			if (showId_558==0)
			{
			img_558=image_show("../../otherData/shilongshan_duoguangpu",1);
			showId_558=1; 
			}else {
			showId_558=0;
			viewer.scene.imageryLayers.remove(img_558); 
			}  
			break;
			case 559:                                   <!-- 河南坡度等级图 -->
			if (showId_559==0)
			{
			img_559=image_show("../../otherData/shilongshan_slope",1);
			showId_559=1; 
			}else {
			showId_559=0;
			viewer.scene.imageryLayers.remove(img_559); 
			}  
			break;
			case 560:                                   <!-- 福建正射影像 -->
			if (showId_560==0)
			{ 
			viewer.terrainProvider = defaultTerrain;
			img_560=image_show("../../otherData/FJ_FQ",1);
			locateTO(119.5525,25.700833,2000);
			showId_560=1; 
			}else {
			showId_560=0;
			add_dem("../../30mDem");
			viewer.scene.imageryLayers.remove(img_560); 
			}  
			break;
			case 561:                                   <!-- 黑龙江火险等级图 -->
			if (showId_561==0)
			{
			img_561=image_show("../../otherData/HTZ",0.5);
			locateTO(122.314,50.055754,1200000);
			showId_561=1; 
			}else {
			showId_561=0;
			viewer.scene.imageryLayers.remove(img_561); 
			}  
			break;
			case 562:                                   <!-- 八仙山夏季DOM数据 -->
			if (showId_562==0)
			{
			locateTO(117.551513,40.189091,30000);
			img_562=image_show("../../localOtherData/baxianshan_xia",1.0);
			showId_562=1; 
			}else {
			showId_562=0;
			viewer.scene.imageryLayers.remove(img_562); 
			}  
			break;
			case 563:                                   <!-- 八仙山秋季DOM数据 -->
			if (showId_563==0)
			{
			img_563=image_show("../../localOtherData/baxianshan_qiu/0-22",1.0);
			showId_563=1; 
			}else {
			showId_563=0;
			viewer.scene.imageryLayers.remove(img_563); 
			}  
			break;
			case 564:                                   <!-- 八仙山冬季DOM数据 -->
			if (showId_564==0)
			{
			img_564=image_show("../../localOtherData/baxianshan_dong/0-20",1.0);
			showId_564=1; 
			}else {
			showId_564=0;
			viewer.scene.imageryLayers.remove(img_564); 
			}  
			break;
			case 565:                                   <!-- 八仙山DRG数据 -->
			if (showId_565==0)
			{
			img_565=image_show("../../localOtherData/baxianshan_denggao/12-20",1.0);
			showId_565=1; 
			}else {
			showId_565=0;
			viewer.scene.imageryLayers.remove(img_565); 
			}  
			break;
			case 566:                                   <!-- 丹霞山正射数据 -->
			if (showId_566==0)
			{ 
			locateTO(113.7016,24.9703,2000);
			img_566=image_show("../../localOtherData/DXS",1);
			showId_566=1; 
			}else {
			showId_566=0;
			viewer.scene.imageryLayers.remove(img_566); 
			}  
			break;
			case 569:                                   <!-- 柳江盆地地形数据 -->
			if (showId_569==0)
			{ 
			locateTO(119.6,40.124,2000);
			viewer.terrainProvider = defaultTerrain;
			add_dem("../../localOtherData/84-LJPD-DEM-int");
			img_569=image_show("../../localOtherData/84-LJPD",1);
			showId_569=1; 
			}else {
			showId_569=0;
			add_dem("../../30mDem");
			viewer.scene.imageryLayers.remove(img_569); 
			}  
			break;
			case 10000:                                   <!-- 四川广元地形数据 -->
			if (showId_10000==0)
			{ 
			locateTO(105.6513,32.3530,2000);
			viewer.terrainProvider = defaultTerrain;
			add_dem("../../localOtherData/guangyuanTerrain/guangyuanTerrain");
			img_10000=image_show("../../localOtherData/GY-DOM",1);
			showId_10000=1; 
			}else {
			showId_10000=0;
			add_dem("../../30mDem");
			viewer.scene.imageryLayers.remove(img_10000); 
			}  
			break;
			case 567:                                   <!-- 精武镇航拍 -->
			if (showId_567==0)
			{
			img_567=image_show("../../otherData/xuefu_15cm/xuefu_0-24",1);
			locateTO(117.095802,39.055754,2000);
			showId_567=1; 
			}else {
			showId_567=0;
			viewer.scene.imageryLayers.remove(img_567); 
			}  
			break;
			case 568:                                   <!-- 东寨村航拍 -->
			if (showId_568==0)
			{
			img_568=image_show("../../otherData/dongzhaivillage",1);
			locateTO(117.040574,38.955552,900);
			showId_568=1; 
			}else {
			showId_568=0;
			viewer.scene.imageryLayers.remove(img_568); 
			}  
			break;
			case 661:                                   <!-- 天津师范大学倾斜摄影 -->
			if (showId_661==0)
			{
			locateTO(117.12, 39.06, 500);
			titlesetSD1=titleset_show1('../../localOtherData/Tjsd_b3dm/shida1/');
			titlesetSD2=titleset_show1('../../localOtherData/Tjsd_b3dm/shida2/');
			titlesetSD3=titleset_show1('../../localOtherData/Tjsd_b3dm/shida3/');
			titlesetSD4=titleset_show1('../../localOtherData/Tjsd_b3dm/shida4/');
			titlesetSD5=titleset_show1('../../localOtherData/Tjsd_b3dm/shida5/');
			titlesetSD6=titleset_show1('../../localOtherData/Tjsd_b3dm/shida6/');
			showId_661=1; 
			}else {
			showId_661=0;
			viewer.scene.primitives.remove(titlesetSD1);
			viewer.scene.primitives.remove(titlesetSD2);
			viewer.scene.primitives.remove(titlesetSD3);
			viewer.scene.primitives.remove(titlesetSD4);
			viewer.scene.primitives.remove(titlesetSD5);
			viewer.scene.primitives.remove(titlesetSD6);
			}  
			break;
			case 662:                                   <!-- 湖北丹江口倾斜摄影 -->
			if (showId_662==0)
			{
			img_662=titleset_show('../../otherData/osgb_daba_b3dm');
			locateTO(111.49472, 32.55388, 500);
			showId_662=1; 
			}else {
			showId_662=0;
			viewer.scene.primitives.remove(img_662); 
			}  
			break;
			case 663:                                   <!-- 湖北陶岔倾斜摄影 -->
			if (showId_663==0)
			{
			img_663=titleset_show('../../otherData/taocha_3dtiles');
			locateTO(111.71472, 32.671944, 500);
			showId_663=1; 
			}else {
			showId_663=0;
			viewer.scene.primitives.remove(img_663); 
			}  
			break;
			case 771:                                   <!-- 郑州市政府三维模型 -->
			if (showId_771==0)
			{ 
			locateTO(113.618,34.747,3000);
			viewer.terrainProvider = defaultTerrain;
			MAX_3DMODEL_add(); 
			showId_771=1; 
			}else {
			showId_771=0;
			MAX_3DMODEL_remove(); 
			add_dem("../../30mDem");
			}  
			break;
			case 881:                                   <!-- 郑州市政府Lidar点云数据 -->
			if (showId_881==0)
			{
			locateTO(113.616542, 34.747869,3000);
			viewer.terrainProvider = defaultTerrain;
			img_881=titleset_show3("./SampleData/pointCloud3");
			showId_881=1; 
			}else {
			showId_881=0;
			viewer.scene.primitives.remove(img_881);
			add_dem("../../30mDem");					 
			}  
			break;
			case 8811:                                   <!-- 天津师大Lidar点云数据 -->
			if (showId_8811==0)
			{
			locateTO(117.123433, 39.0617,300);
			viewer.terrainProvider = defaultTerrain;
			img_8811=titleset_show4("./SampleData/sdgbj");
			showId_8811=1; 
			}else {
			showId_8811=0;
			viewer.scene.primitives.remove(img_8811);
			add_dem("../../30mDem");					 
			}  
			break;
			case 991:                                   <!-- 三维交通模拟 -->
			if (showId_991==0)
			{
			$('#zzmx_my').window('open');
			$('#zzmx_my').window({left:300,top:50});
			locateTO(113.618,34.747,3000);
			viewer.terrainProvider = defaultTerrain;
			MAX_3DMODEL_add(); 
			showId_991=1; 
			}else {
			showId_991=0;
			MAX_3DMODEL_remove();
			$('#zzmx_my').window('close'); 
			add_dem("../../30mDem");
			}  
			break;
			case 992:                                   <!-- 无人机航拍模拟 -->
			if (showId_992==0)
			{
			locateTO(117.551513, 40.189091, 30000);
			move();
			showId_992=1; 
			}else {
			showId_992=0;
			var move_div = document.getElementById("move");
			move_div.style.display = "none"
			var myVideo = document.getElementById("media");
			myVideo.pause();
			viewer.entities.removeById('airplane');
			}  
			break;
			case 993:                                   <!-- 师大三维漫游 -->
			if (showId_993==0)
			{
			document.getElementById('tjsd_my').style.display='';
			locateTO(117.12, 39.06, 500);
			titlesetSD1=titleset_show1('../../localOtherData/Tjsd_b3dm/shida1/');
			titlesetSD2=titleset_show1('../../localOtherData/Tjsd_b3dm/shida2/');
			titlesetSD3=titleset_show1('../../localOtherData/Tjsd_b3dm/shida3/');
			titlesetSD4=titleset_show1('../../localOtherData/Tjsd_b3dm/shida4/');
			titlesetSD5=titleset_show1('../../localOtherData/Tjsd_b3dm/shida5/');
			titlesetSD6=titleset_show1('../../localOtherData/Tjsd_b3dm/shida6/');
			showId_993=1; 
			}else {
			showId_993=0;
			viewer.scene.primitives.remove(titlesetSD1);
			viewer.scene.primitives.remove(titlesetSD2);
			viewer.scene.primitives.remove(titlesetSD3);
			viewer.scene.primitives.remove(titlesetSD4);
			viewer.scene.primitives.remove(titlesetSD5);
			viewer.scene.primitives.remove(titlesetSD6); 
			document.getElementById('tjsd_my').style.display='none';
			}  
			break;
			case 994:                                   <!-- 天津城市扩张 -->
			if (showId_994==0)
			{
			tjtd_Change();
			showId_994=1; 
			}else {
			showId_994=0;
			tjtd_Cancel(); 
			}  
			break;
			case 9941:                                   <!-- 天津水域缩减 -->
			if (showId_9941==0)
			{
			tjsy_Change();
			showId_9941=1; 
			}else {
			showId_9941=0;
			tjsy_Cancel();
			}  
			break;
			case 995:                                   <!-- 八仙山季节变化 -->
			if (showId_995==0)
			{
			locateTO(117.551513,40.189091,30000);
			$('#bxsChangeWindow').window('open');
			$('#bxsChangeWindow').window({left:300,top:50});
			showId_995=1; 
			}else {
			showId_995=0;
			$('#bxsChangeWindow').window('close'); 
			clearInterval(bxs_timer);
			for(var i=0;i<bxsImgs.length;i++){
			viewer.scene.imageryLayers.remove(bxsImgs[i]);
			}
			 
			}  
			break;
			case 1000:                                   <!-- 标注加载 -->
			if (showId_1000==0)
			{
			showId_1000=1; 
			markmark();
			}else {
			showId_1000=0;
			viewer.entities.removeAll(); 
			}  
			break;
			/*case 1001:                                   <!--气温气压 -->
			if (showId_1001==0)
			{
			showId_1001=1;
			document.getElementById("qixiang_dupeng").style.display = "";
			}else {
			showId_1001=0;
			clearInterval(timer);
			document.getElementById("qixiang_dupeng").style.display = "none";
			while (imageryLayers._layers.length >=3) {
				imageryLayers.remove(imageryLayers._layers[2]);
			}
			dispear_img();
			}  
			break;
			case 1019:                                   <!--气温气压2 -->
			if (showId_1019==0){
			let chazhi_attr=null;let chazhi_time=null;
			let chazhi_index = null; var temp =null;
			showId_1019=1;
			document.getElementById("qixiang_chazhi").style.display = "";

			//选择哪种类型的数据
			const attrJson={"气温":"TMP","气压":"PRES","降水量":"PWAT","湿度":"RH","比湿":"SPFH"};
			$(".dropdown-menu>li").click(function () {
				chazhi_attr = null;
				temp = $(this)[0].innerText;
				temp = temp.replace(/[\n]/g, "");
				chazhi_attr = attrJson[temp];							
				if(chazhi_attr=="TMP"){
					dispear_img();
					changeImag("../../localOtherData/qixiangImg/TMP.png");
				}else if(chazhi_attr=="PRES"){
					dispear_img();
					changeImag("../../localOtherData/qixiangImg/PRES.png");
				}else if(chazhi_attr=="PWAT"){
					dispear_img();
					changeImag("../../localOtherData/qixiangImg/PWAT.png");
				}else if(chazhi_attr=="RH"){
					dispear_img();
					changeImag("../../localOtherData/qixiangImg/RH.png");
				}else if(chazhi_attr=="SPFH"){
					dispear_img();
					changeImag("../../localOtherData/qixiangImg/SFPH.png");
				}
				$("#chazhi_attrBtn")[0].innerHTML = temp;
				if(chazhi_time!=null&&chazhi_index!=null&&chazhi_attr!=null){
					qixiang_chazhi(chazhi_time,chazhi_attr,chazhi_index)
				}
			});

			//日历
			(function Datetime() {
				$('#datetimepicker2').datetimepicker({
					language: 'zh-CN',//显示中文
					format: 'yyyy-mm-dd',//显示格式
					minView: "month",//设置只显示到月份
					initialDate: new Date(),
					autoclose: true,//选中自动关闭
					todayBtn: true,//显示今日按钮
					locale: moment.locale('zh-cn')
				})
			})();
				//默认获取当前日期
				/*var today = new Date();
				var nowdate = (today.getFullYear()) + "-" + (today.getMonth() + 1) + "-" + today.getDate();
				//对日期格式进行处理
				var date = new Date(nowdate);
				var mon = date.getMonth() + 1;
				var day = date.getDate();
				var mydate = date.getFullYear() + "-" + (mon < 10 ? "0" + mon : mon) + "-" + (day < 10 ? "0" + day : day);
				document.getElementById("chazhi_nowdate").value = mydate;
			})();*/

			/*$("#chazhi_nowdate")[0].onchange=function () {
				var dateInput = $("#chazhi_nowdate")[0].value;
				if(dateInput!=null){
					chazhi_time= getTime(dateInput)[0];
					chazhi_index = getTime(dateInput)[1];
					if(chazhi_time!=null&&chazhi_index!=null&&chazhi_attr!=null){
						qixiang_chazhi(chazhi_time,chazhi_attr,chazhi_index)
					}
				}
			};
			//
			}else {
			 //chazhi_index = null;chazhi_time = null;chazhi_attr=null;
			 showId_1019=0;
			 $("#chazhi_nowdate")[0].value="";
			 $("#chazhi_attrBtn")[0].innerHTML = "请选择类型"
			 qixiang_handler.destroy();
			 /*qixiang_handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOWN);
			 qixiang_handler.removeInputAction(Cesium.ScreenSpaceEventType.WHEEL);
			 qixiang_handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_UP);*/
			 /*document.getElementById("qixiang_chazhi").style.display = "none";
			  qixiang_ctx.clearRect(0, 0, can.width, can.height);
			 scene.screenSpaceCameraController.enableTilt = true;
			 dispear_img();
			}  
			break;*/
			case 1002:                                   <!-- 森林火灾预警 -->
			if (showId_1002==0)
			{
			locateTO(122.314,50.055754,1200000);
			$('#fireChangeWindow').window('open');
			$('#fireChangeWindow').window({left:300,top:50});
			showId_1002=1; 
			}else {
			showId_1002=0;
			clearInterval(dxal_timer);
			$('#fireChangeWindow').window('close'); 
			for(let i=0;i<dxalImgs.length;i++){
			viewer.scene.imageryLayers.remove(dxalImgs[i]);
			}
			}  
			break;
			}
			}
	})


	});
/*
</script>	
*/
