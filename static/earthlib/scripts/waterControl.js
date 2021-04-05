Cesium.Math.setRandomNumberSeed(0);

var imageryLayers = viewer.scene.imageryLayers;
var scene = viewer.scene;
var ellipsoid = scene.globe.ellipsoid;

var water_state=0;

var waterTime=null; var waterType = null; var waterIndex = null;
var waterTimer = null;
const waterTypeJson={"流域形心降雨":"liuyu","洪水过程":"hongshui","显示阈值":"yuzhi"};

//获取时间参数
$('#waterdatePick').datetimebox({
	onSelect: function(date){
		waterIndex = date.getDate();
		//time=$('#waterdatePick').datetimebox('spinner').spinner('getValue');
		waterTime=date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
	}
})

//获取数据类型
$('#waterSelect').combobox({
	onSelect: function(param){
		if(param.text!=null){
			waterType=waterTypeJson[param.text];
		}
	}
})

//加载数据
function addWaterDate(){
	var promise=Cesium.GeoJsonDataSource.load('../WATA2(1).json');
	//viewer.flyTo(promise);
    	
	if (waterType=='liuyu'){
		var time=$('#waterdatePick').datetimebox('spinner').spinner('getValue');
		var hour=parseInt(time.substring(0,time.indexOf(":")));
		waterTime+=" "+hour+",00";
		for (var k=0;k<regionData.length;k++){
			if (regionData[k][0]==waterTime){
				promise.then(function(dataSource){
				viewer.dataSources.add(dataSource);
                var entities = dataSource.entities.values;
                var colorHash = {};
                for (var i = 0; i < entities.length; i++){
					var entity = entities[i];
                     var name = entity.name;
                     var color = colorHash[name];
                     if (!color) {
                         color = Cesium.Color.fromRandom({
                         alpha : 1
                     });
                     colorHash[name] = color;
                     }
                     entity.polygon.material = color;
                     entity.polygon.outline = true;
					 
					 for (var j=0;j<regionData.length;j++){
						 if (entity.properties.WSCD==regionData[k][j]){
			                entity.polygon.extrudedHeight = regionData[k][j+1] * 1000;
			            }
					 }
				}
			}).otherwise(function(error){
				//Display any errrors encountered while loading.
                window.alert(error);
			});
			break;
			}
		}
	}
}




$('#swAdd').on('click',function(){
	$('#waterChangeWindow').window('open');
	if (water_state==0){
		addWaterDate();
		water_state=1;
	}else if (water_state==1){
		viewer.dataSources.remove(viewer.dataSources.get(0));
	    addWaterDate();
	}
})

$('#swRemove').on('click',function(){
	viewer.dataSources.remove(viewer.dataSources.get(0));
	water_state=0;
})
