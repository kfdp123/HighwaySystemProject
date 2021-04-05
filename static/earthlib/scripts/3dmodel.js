 ////////////////
 ///3D建模加载
 ////////////////
 
function create_zzmodel(lng,lat,opcy,url,range){
	

    var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame( 
		Cesium.Cartesian3.fromDegrees(lng+0.006,lat -  0.0012, opcy+130));
var model = viewer.scene.primitives.add(Cesium.Model.fromGltf({
    url : url,
    modelMatrix : modelMatrix,
    scale : range	
}));
   return model;
}
////////////////
<!-- 郑州 -->
function MAX_3DMODEL_remove()
{
for(var i=0;i<67;i++){
   scene.primitives.remove(models[i]);
   
}
models.splice(0,models.length);
//applyWaterMaterial(worldRectangle, scene);
}

var models=[];
function MAX_3DMODEL_add()
{
var scene = viewer.scene;

//经纬度数组%透明度&范围数组&地址数组&模型primitives数组
var lng_lat=[113.616772,34.748331,113.618372,34.746181,113.62149,34.746515,113.617682,34.747301,113.621012,34.747081,113.621322,34.744628,113.621622,34.745608,113.621248,34.7457518,113.6176194,34.74595384,113.6176793,34.74650477,113.6180993,34.74681277,113.61547993,34.74595277,113.61577993,34.74595277,113.61619993,34.74592277,113.61878614,34.74528025,113.61878614,34.74508025,113.61882614,34.74422025,113.61822614,34.74472025,113.61818614,34.74425025,113.6189614,34.74445025,113.6196031,34.7457542,113.6157386,34.7455508,113.6176397,34.7440237,113.61882,34.74474973,113.615252,34.746631,113.615252,34.746431,113.615252,34.746231,113.6158858,34.74823868,
 113.6159972,34.74795999,113.615115,34.7470444,113.6150551,34.74775012,113.6154087,34.744550571,113.6154627,34.74436074,113.6202614,34.74405025,113.6202614,34.74425025,113.6198614,34.74425025,113.6198614,34.74405025,113.6203614,34.74445025,113.6200614,34.74445025,113.6194614,34.74445025,113.6192614,34.74475025, 113.6193934,34.74475025,113.6195334,34.74475025,113.6198334,34.74475025,113.6203334,34.74475025,113.6198334,34.74556025,113.621248,34.7454018,113.6196834,34.74516025,113.6203034,34.74516025,113.619412,34.747841,113.618582,34.745681,113.61542993,34.74730277,113.61542993,34.74710277,113.61597993,34.74700277,113.61602993,34.74686277, 
 113.61682993,34.74706277,113.61682993,34.74686277,113.61649993,34.74622277,113.61649993,34.74642277,113.61649993,34.74662277,113.61569993,34.74644277,113.61549993,34.74684277,113.61511993,34.74735277,113.61532993,
 34.74755277,113.61602993,34.74730277,113.61602993,34.74750277,113.615412,34.747881];
var opcity_scale=[0.0,0.8,-0.1,1.0,0.0,1.0,0.0,1.0, 0.0,1.0, 0.0, 1.0 ,0.0,1.0,0.0,1.0,0.0,1.0,0.0,1.0,0.0,1.0,0.0,1.0,0.0,1.0,0.0,1.0,0.0,1.0,0.0,1.0,0.0,1.0,0.0,1.0,0.0,1.0,0.0,1.0,0.0,1.0,0.0,1.0,10,1.0,10,1.0,0.0,1.0,0.0,1.0,0.0,1.0,0.0,1.0,15,1.0,0.0,1.0,25,1.0,0.0,1.0,0.0,1.0,5.0,1.0,5.0,1.0,5.0,1.0,5.0,1.0,5.0,1.0,5.0,1.0,5.0,1.0,5.0,1.0,5.0,1.0,5.0,1.0,5.0,1.0,5.0,1.0,5,1.0,5,1.0,5,1.0,5,1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0];
var hrefs=['./SampleData/models/ZZ/YD/272.gltf','./SampleData/models/ZZ/LM/LM.gltf','./SampleData/models/ZZ/BWG/274.gltf','./SampleData/models/ZZ/DAG/DAG.gltf','./SampleData/models/ZZ/KJG/KJG.gltf','./SampleData/models/ZZ/TSG/TSG.gltf','./SampleData/models/ZZ/YSG/YSG.gltf','./SampleData/models/ZZ/QZYS/QZYS.gltf','./SampleData/models/ZZ/19zhong/19.gltf','./SampleData/models/ZZ/BHL/BHL1.gltf', './SampleData/models/ZZ/BHL/BHL2.gltf','./SampleData/models/ZZ/BHLJSY/BHLJSY1.gltf','./SampleData/models/ZZ/BHLJSY/BHLJSY2.gltf','./SampleData/models/ZZ/BHLJSY/BHLJSY3.gltf','./SampleData/models/ZZ/BHLJSY/BHLJSY4.gltf','./SampleData/models/ZZ/BHLJSY/BHLJSY5.gltf','./SampleData/models/ZZ/BHLJSY/BHLJSY6.gltf','./SampleData/models/ZZ/BHLJSY/BHLJSY7.gltf','./SampleData/models/ZZ/BHLJSY/BHLJSY8.gltf', './SampleData/models/ZZ/GLJS/GLJS.gltf','./SampleData/models/ZZ/HT/HT.gltf','./SampleData/models/ZZ/LGBHDZX/LGBHDZX.gltf', './SampleData/models/ZZ/JZYHL23/JZYHL23.gltf','./SampleData/models/ZZ/ZXJD/ZXJD.gltf', './SampleData/models/ZZ/ZZMTS43HY/ZZMTS43HY1.gltf','./SampleData/models/ZZ/ZZMTS43HY/ZZMTS43HY2.gltf','./SampleData/models/ZZ/ZZMTS43HY/ZZMTS43HY3.gltf', './SampleData/models/ZZ/DLKC/DLKC1.gltf','./SampleData/models/ZZ/DLKC/DLKC2.gltf', './SampleData/models/ZZ/JZMTKCSJY43/JZMTKCSJY43.gltf', './SampleData/models/ZZ/MTGY/MTGY1.gltf','./SampleData/models/ZZ/YHLXX/YHLXX1.gltf','./SampleData/models/ZZ/YHLXX/YHLXX2.gltf','./SampleData/models/ZZ/SWJSY/SWJSY2.gltf','./SampleData/models/ZZ/SWJSY/SWJSY3.gltf','./SampleData/models/ZZ/SWJSY/SWJSY4.gltf', './SampleData/models/ZZ/SWJSY/SWJSY5.gltf', './SampleData/models/ZZ/SWJSY/SWJSY6.gltf','./SampleData/models/ZZ/SWJSY/SWJSY7.gltf', './SampleData/models/ZZ/SWJSY/SWJSY8.gltf','./SampleData/models/ZZ/SWJSY/SWJSY9.gltf', './SampleData/models/ZZ/SWJSY/SWJSY10.gltf','./SampleData/models/ZZ/SWJSY/SWJSY11.gltf', './SampleData/models/ZZ/SWJSY/SWJSY12.gltf','./SampleData/models/ZZ/SWJSY/SWJSY13.gltf','./SampleData/models/ZZ/SWJSY/SWJSY14.gltf','./SampleData/models/ZZ/SWJSY/SWJSY15.gltf','./SampleData/models/ZZ/SWJSY/SWJSY16.gltf', './SampleData/models/ZZ/SW/SW.gltf','./SampleData/models/ZZ/JZYHLLJJZ/JZYHLLJJZ.gltf','./SampleData/models/ZZ/LSZC/LSZC1.gltf', './SampleData/models/ZZ/LSZC/LSZC2.gltf', './SampleData/models/ZZ/LSZC/LSZC3.gltf','./SampleData/models/ZZ/LSZC/LSZC5.gltf', './SampleData/models/ZZ/LSZC/LSZC6.gltf', './SampleData/models/ZZ/LSZC/LSZC7.gltf', './SampleData/models/ZZ/LSZC/LSZC8.gltf', './SampleData/models/ZZ/LSZC/LSZC9.gltf','./SampleData/models/ZZ/LSZC/LSZC10.gltf','./SampleData/models/ZZ/LSZC/LSZC11.gltf','./SampleData/models/ZZ/LSZC/LSZC12.gltf','./SampleData/models/ZZ/LSZC/LSZC13.gltf','./SampleData/models/ZZ/LSZC/LSZC14.gltf','./SampleData/models/ZZ/LD/LD.gltf','./SampleData/models/ZZ/LSZC/LSZC15.gltf','./SampleData/models/ZZ/LSZC/LSZC16.gltf','./SampleData/models/ZZ/XJBG/XJBG.gltf']; 


for(var i=1;i<68;i++){
   models.push(create_zzmodel(lng_lat[2*i-1-1],lng_lat[2*i-1],opcity_scale[2*i-1-1],hrefs[i-1],opcity_scale[2*i-1]));
}
	
}
/*

var modelMatrixLG = Cesium.Transforms.eastNorthUpToFixedFrame(
    Cesium.Cartesian3.fromDegrees(113.6181316,34.74959734, 0.0));
var modelMatrixLG = scene.primitives.add(Cesium.Model.fromGltf({
    url : './SampleData/models/ZZ/LG/LG.gltf',
    modelMatrix : modelMatrixLG,
    scale : 1.0
	//YSG 113.621622,34.745608
}));

var modelMatrixZZ = Cesium.Transforms.eastNorthUpToFixedFrame(
    Cesium.Cartesian3.fromDegrees(113.6147121,34.74938288, 0.0));
var modelMatrixZZ = scene.primitives.add(Cesium.Model.fromGltf({
    url : './SampleData/models/ZZ/ZZ/ZZ.gltf',
    modelMatrix : modelMatrixZZ,
    scale : 1.0
	//YSG 113.621622,34.745608
}));
var modelMatrixMTGY2 = Cesium.Transforms.eastNorthUpToFixedFrame(
    Cesium.Cartesian3.fromDegrees(113.6156583,34.648331, 0.0));
var modelMatrixMTGY2 = scene.primitives.add(Cesium.Model.fromGltf({
    url : './SampleData/models/ZZ/MTGY/MTGY2.gltf',
    modelMatrix : modelMatrixMTGY2,
    scale : 1.0
	//YSG 113.621622,34.745608
}));*/

/*

var modelMatrixXJBG = Cesium.Transforms.eastNorthUpToFixedFrame(
    Cesium.Cartesian3.fromDegrees(113.615412,34.747881, 0.0));
var modelMatrixXJBG = scene.primitives.add(Cesium.Model.fromGltf({
    url : './SampleData/models/ZZ/XJBG/XJBG.gltf',
    modelMatrix : modelMatrixXJBG,
    scale : 1.0
	//YSG 113.621622,34.745608
}));*/
<!-- 天津师范大学 -->
function tjsd_3dmodel_remove()
{
for(var i=0;i<22;i++){
   scene.primitives.remove(models2[i]);
   
}
models2.splice(0,models2.length);
applyWaterMaterial(worldRectangle, scene);
}

var models2=[];
function tjsd_3d_model()
{
var scene = viewer.scene;

//经纬度数组%透明度&范围数组&地址数组&模型primitives数组
var lng_lat=[117.12635,39.06030,117.12351,39.06162,117.12903,39.06055,117.13107,39.06245,117.126607,39.056923,117.129057,39.062373,117.120707,39.061123,117.12937,39.058923,117.125957,39.062523,117.125007,39.060523,117.122157,39.060723,117.121697,39.062553,117.127897,39.064083,117.124897,39.054883,117.122697,39.055853,117.126387,39.062573,117.126387,39.062573,117.126387,39.063173,117.150627,39.062323,117.150627,39.062323,117.150597,39.062323,117.127817,39.055183];
var opcity_scale=[10.0,1.0,10.0,1.0,10.0,1.0,10.0,1.0,10.0,1.0,10.0,1.0,10.0,1.0,10.0,1.0,10.0,1.0,10.0,1.0,10.0,1.0,10.0,1.0,10.0,1.0,10.0,1.0,10.0,1.0,10.0,1.0,10.0,1.0,10.0,1.0,10.0,1.0,10.0,1.0,10.0,1.0,10.0,1.0];
var hrefs=['./SampleData/tjsd_3d/TJSD-PS/bgl.gltf','./SampleData/tjsd_3d/TJSD-PS/gbj.gltf','./SampleData/tjsd_3d/TJSD-PS/bll.gltf', './SampleData/tjsd_3d/TJSD-PS/yyl.gltf','./SampleData/tjsd_3d/TJSD-PS/tyg.gltf','./SampleData/tjsd_3d/TJSD-PS/ljl.gltf','./SampleData/tjsd_3d/TJSD-PS/shgc.gltf','./SampleData/tjsd_3d/TJSD-PS/mll.gltf','./SampleData/tjsd_3d/weiqiang-ps/weiqiang.gltf', './SampleData/tjsd_3d/XWL-PS/xwl.gltf','./SampleData/tjsd_3d/YST-PS/yst.gltf','./SampleData/tjsd_3d/SHQ-PS/shq.gltf','./SampleData/tjsd_3d/TJSD-PS/tsg.gltf','./SampleData/tjsd_3d/TJSD-PS/jgxy.gltf','./SampleData/tjsd_3d/TJSD-PS/xyy.gltf','./SampleData/tjsd_3d/QXL-ps/qxl.gltf','./SampleData/tjsd_3d/TREE-PS/dm01.gltf','./SampleData/tjsd_3d/TREE-PS/dm02.gltf','./SampleData/tjsd_3d/TREE-PS/dm03.gltf','./SampleData/tjsd_3d/TREE-PS/dm04.gltf','./SampleData/tjsd_3d/TREE-PS/dm05.gltf','./SampleData/tjsd_3d/TREE-PS/dm05-2.gltf']; 


for(var i=1;i<23;i++){
   models2.push(create_zzmodel(lng_lat[2*i-1-1],lng_lat[2*i-1],opcity_scale[2*i-1-1],hrefs[i-1],opcity_scale[2*i-1]));
}

}

function createModel(url, height) {
    viewer.entities.removeAll();

    var position = Cesium.Cartesian3.fromDegrees(113.618,34.747, height);  
    
    //var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);

    var entity = viewer.entities.add({
        name : url,
        position : position,
        //orientation : orientation,
        model : {
            uri : url,
            minimumPixelSize : 128,
            maximumScale : 20000
        }
    });
    viewer.trackedEntity = entity;
}
function zzszf3dmodel(){
	var scene = viewer.scene;
	var hrefs='./SampleData/models/ZZ/LLCS1/images/JS_55_01_L3_BUI_0002.gltf';
	create_zzmodel(113.618,34.747,1.0,hrefs,1);
}
