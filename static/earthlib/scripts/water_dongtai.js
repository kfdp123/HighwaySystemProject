//型心降水
var promise;
var promise_new;
 function xingxinjiangshui(){
  Cesium.Math.setRandomNumberSeed(0);
  promise = Cesium.GeoJsonDataSource.load('./WATA2(1).json');
  promise_new = Cesium.GeoJsonDataSource.load('./RIVL2.json');
  viewer.dataSources.add(promise_new);
  viewer.flyTo(promise);
  
  lastData=selects();
  promise.then(function(dataSource) {
  viewer.dataSources.add(dataSource);
	        var entities = dataSource.entities.values;       
	        var colorHash = {};
	for (var i = 0; i < entities.length; i++) {
	            var entity = entities[i];
	            var name = entity.name;         
				var color ;
				for (var j=0;j<regionData[0].length;j++){
			       if (entity.properties.WSCD==regionData[k][j]){
				       var hight=regionData[k][j+1];
					   if (hight>=0&&hight<5){
					       color=Cesium.Color.BLUE;
					   } else if (hight>=5&&hight<30){
					       color=Cesium.Color.GREEN;
					   } else if (hight>=30&&hight<50){
					       color=Cesium.Color.YELLOW;
					   } else{
					       color=Cesium.Color.RED;
					   }
					   entity.polygon.material = color;
					   entity.polygon.outlineColor=Cesium.Color.BLACK;
                       entity.polygon.outline = true;
				       break;
			        }			   
			    } 
	            }
  }); 
 }

var water_timer;
var first_time="2010/7/1 0:00";
var water_slider=document.getElementById("water_slider");
var water_text=document.getElementById("water_text");

water_slider.addEventListener("mouseup",function(){
    var slider_water=water_slider.value;
	
	var day=parseInt(slider_water/24)+1;
	var hour=slider_water%24;
	var finaldata="2010/7/"+day+" "+hour+",00"
	
	water_text.value=finaldata;
		for (var k=0;k<regionData.length;k++){
	    if (regionData[k][0]==finaldata){
		    promise.then(function(dataSource) {
            var entities = dataSource.entities.values;
            var colorHash = {};
            for (var i = 0; i < entities.length; i++) {
                var entity = entities[i];
                var name = entity.name;
                var color;

                for (var j=0;j<regionData[0].length;j++){
			       if (entity.properties.WSCD==regionData[k][j]){
				       var hight=regionData[k][j+1];
					   if (hight>=0&&hight<1){
					       color=Cesium.Color.BLUE;
					   } else if (hight>=1&&hight<30){
					       color=Cesium.Color.GREEN;
					   } else if (hight>=30&&hight<50){
					       color=Cesium.Color.YELLOW;
					   } else{
					       color=Cesium.Color.RED;
					   }
					   entity.polygon.material = color;
					   entity.polygon.outlineColor=Cesium.Color.BLACK;
                       entity.polygon.outline = true;
				       break;
			        }			   
			    }            
            }
			
        }).otherwise(function(error){
        window.alert(error);
    });
		}
		
	}
});

var water_timer2;
var first_time2="2010/7/1 0:00";
var water_slider2=document.getElementById("water_slider2");
var water_text2=document.getElementById("water_text2");

water_slider2.addEventListener("mouseup",function(){
	var slider2_water=water_slider2.value;
	
	var day=parseInt(slider2_water/24)+1;
	var hour=slider2_water%24;
	var finaldata1="2010/7/"+day+" "+hour+",00";
	var finaldata="2010/7/15 18,00";
	water_text2.value=finaldata;
	for (var k=0;k<regionData2.length;k++){
		if (regionData2[k][0]==finaldata){
			promise.then(function(dataSource) {
		    var entities = dataSource.entities.values;
            var colorHash = {};
			 for (var i = 0; i < entities.length; i++) {
				var entity = entities[i];
                var name = entity.name;
                var color; 
				for (var j=0;j<regionData2[0].length;j++){
					if (entity.properties.WSCD==regionData2[k][j]){
						var hight=regionData2[k][j+1];
						if (hight>=0&&hight<1){
					       color=Cesium.Color.BLUE;
					   } else if (hight>=1&&hight<30){
					       color=Cesium.Color.GREEN;
					   } else if (hight>=30&&hight<50){
					       color=Cesium.Color.YELLOW;
					   } else{
					       color=Cesium.Color.RED;
					   }
					   entity.polygon.material = color;
					   entity.polygon.outlineColor=Cesium.Color.BLACK;
                       entity.polygon.outline = true;
					   break;
					}
				}
			 }
			}).otherwise(function(error){
        window.alert(error);
    });
		}
	}
});
var water_timer3;
var first_time3="2010/7/1 0:00";
var water_slider3=document.getElementById("water_slider3");
var water_text3=document.getElementById("water_text3");

water_slider3.addEventListener("mouseup",function(){
	var slider3_water=water_slider3.value;
	
	var day=parseInt(slider3_water/24)+1;
	var hour=slider3_water%24;
	var finaldata="2010/7/"+day+" "+hour+",00"
	water_text3.value=finaldata;
	for (var k=0;k<regionData3.length;k++){
		if (regionData3[k][0]==finaldata){
			promise.then(function(dataSource) {
		    var entities = dataSource.entities.values;
            var colorHash = {};
			 for (var i = 0; i < entities.length; i++) {
				var entity = entities[i];
                var name = entity.name;
                var color; 
				for (var j=0;j<regionData3[0].length;j++){
					if (entity.properties.WSCD==regionData3[k][j]){
						var hight=regionData3[k][j+1];
						if (hight>=0&&hight<1){
					       color=Cesium.Color.BLUE;
					   } else if (hight>=1&&hight<30){
					       color=Cesium.Color.GREEN;
					   } else if (hight>=30&&hight<50){
					       color=Cesium.Color.YELLOW;
					   } else{
					       color=Cesium.Color.RED;
					   }
					   entity.polygon.material = color;
					   entity.polygon.outlineColor=Cesium.Color.BLACK;
                       entity.polygon.outline = true;
					   break;
					}
				}
			 }
			}).otherwise(function(error){
        window.alert(error);
    });
		}
	}
});

var water_state=0;
var water_play=document.getElementById("water_play");
var water_BP=document.getElementById("waterBP");
var water_state2=0;
var water_play2=document.getElementById("water_play2");
var water_BP2=document.getElementById("waterBP2");
var water_state3=0;
var water_play3=document.getElementById("water_play3");
var water_BP3=document.getElementById("waterBP3");
  water_play.onclick=function(){
    if (water_state==0){
    water_BP.removeAttribute("class","fa fa-play fa-lg");
	water_BP.setAttribute("class","fa fa-pause fa-lg");
	
	clearInterval(water_timer);

	water_timer=setInterval(water_DT_start,500);
	water_state=1;
  } else if (water_state==1){
        clearInterval(water_timer);
        water_BP.removeAttribute("class","fa fa-pause fa-lg");
	    water_BP.setAttribute("class","fa fa-play fa-lg");
		water_state=0;
  }
  }
  
  water_play2.onclick=function(){
    if (water_state2==0){
    water_BP2.removeAttribute("class","fa fa-play fa-lg");
	water_BP2.setAttribute("class","fa fa-pause fa-lg");
	
	clearInterval(water_timer2);

	water_timer2=setInterval(water_DT_start2,500);
	water_state2=1;
  } else if (water_state2==1){
        clearInterval(water_timer2);
        water_BP2.removeAttribute("class","fa fa-pause fa-lg");
	    water_BP2.setAttribute("class","fa fa-play fa-lg");
		water_state2=0;
  }
  }
  
    water_play3.onclick=function(){
    if (water_state3==0){
    water_BP3.removeAttribute("class","fa fa-play fa-lg");
	water_BP3.setAttribute("class","fa fa-pause fa-lg");
	
	clearInterval(water_timer3);

	water_timer3=setInterval(water_DT_start3,500);
	water_state3=1;
  } else if (water_state3==1){
        clearInterval(water_timer3);
        water_BP3.removeAttribute("class","fa fa-pause fa-lg");
	    water_BP3.setAttribute("class","fa fa-play fa-lg");
		water_state3=0;
  }
  }

var water_flagNumdx=0;
function water_DT_start(){
	water_flagNumdx++;
	
	var day=parseInt(water_flagNumdx/24)+1;
	var hour=water_flagNumdx%24;
	var finaldata="2010/7/"+day+" "+hour+",00"
	if(water_flagNumdx!=0)
	{
	for (var k=0;k<regionData.length;k++){
	    if (regionData[k][0]==finaldata){
		    promise.then(function(dataSource) {
            var entities = dataSource.entities.values;
            var colorHash = {};
            for (var i = 0; i < entities.length; i++) {
                var entity = entities[i];
                var name = entity.name;
                var color;

                for (var j=0;j<regionData[0].length;j++){
			       if (entity.properties.WSCD==regionData[k][j]){
				       var hight=regionData[k][j+1];
					   if (hight>=0&&hight<1){
					       color=Cesium.Color.BLUE;
					   } else if (hight>=1&&hight<30){
					       color=Cesium.Color.GREEN;
					   } else if (hight>=30&&hight<50){
					       color=Cesium.Color.YELLOW;
					   } else{
					       color=Cesium.Color.RED;
					   }
					   entity.polygon.material = color;
					   entity.polygon.outlineColor=Cesium.Color.BLACK;
                       entity.polygon.outline = true;
				       break;
			        }			   
			    }            
            }
			
        }).otherwise(function(error){
        window.alert(error);
    });
		}
		
	}
		water_slider.value=water_flagNumdx;
		
		water_text.value=finaldata;
	}
}

var water_flagNumdx2=0;
function water_DT_start2(){
	water_flagNumdx2++;
	var day=parseInt(water_flagNumdx2/24)+1;
	var hour=water_flagNumdx2%24;
	var finaldata="2010/7/"+day+" "+hour+",00"

	if(water_flagNumdx2!=0)
	{
		for (var k=0;k<regionData2.length;k++){
		
		if (regionData2[k][0]==finaldata){
			promise.then(function(dataSource) {
			var entities = dataSource.entities.values;
            var colorHash = {};
			 for (var i = 0; i < entities.length; i++) {
				var entity = entities[i];
                var name = entity.name;
                var color;
				 for (var j=0;j<regionData2[0].length;j++){
					if (entity.properties.WSCD==regionData2[k][j]){
						var hight=regionData2[k][j+1];
					   if (hight>=0&&hight<1){
					       color=Cesium.Color.BLUE;
					   } else if (hight>=1&&hight<30){
					       color=Cesium.Color.GREEN;
					   } else if (hight>=30&&hight<50){
					       color=Cesium.Color.YELLOW;
					   } else{
					       color=Cesium.Color.RED;
					   }
					   entity.polygon.material = color;
					   entity.polygon.outlineColor=Cesium.Color.BLACK;
                       entity.polygon.outline = true;
					   break;
					}						
				 }
			 }
			}).otherwise(function(error){
        window.alert(error);
    });
		}
	}
	water_slider2.value=water_flagNumdx2;
		
		water_text2.value=finaldata;
}
}
var water_flagNumdx3=0;
function water_DT_start3(){
	water_flagNumdx3++;
	var day=parseInt(water_flagNumdx3/24)+1;
	var hour=water_flagNumdx3%24;
	var finaldata="2010/7/"+day+" "+hour+",00"
	if(water_flagNumdx3!=0)
	{
		for (var k=0;k<regionData3.length;k++){
		if (regionData3[k][0]==finaldata){
			promise.then(function(dataSource) {
			var entities = dataSource.entities.values;
            var colorHash = {};
			 for (var i = 0; i < entities.length; i++) {
				var entity = entities[i];
                var name = entity.name;
                var color;
				 for (var j=0;j<regionData3[0].length;j++){
					if (entity.properties.WSCD==regionData3[k][j]){
						var hight=regionData3[k][j+1];
					   if (hight>0&&hight<1){
					       color=Cesium.Color.BLUE;
					   } else if (hight==1){
					       color=Cesium.Color.GREEN;
					   } else if (hight==2){
					       color=Cesium.Color.RED;
					   } else if (hight==3){
					       color=Cesium.Color.YELLOW;
					   }
					   entity.polygon.material = color;
					   entity.polygon.outlineColor=Cesium.Color.BLACK;
                       entity.polygon.outline = true;
					   break;
					}						
				 }
			 }
			}).otherwise(function(error){
        window.alert(error);
    });
		}
	}
	water_slider3.value=water_flagNumdx3;
		
		water_text3.value=finaldata;
	}
}


function selects(){
	
	var lastdata=[];
	var j=0;
	
	for(var i=0;i<regionData2.length;i++)
	{
		for (var k=2;k<=regionData2[i].length;k+=2)
		{
			if (regionData2[i][k]!='0')
			{
				lastdata[j++]=regionData2[i];
				//j++;
				break;
			}
		}
	}
	return lastdata;
}