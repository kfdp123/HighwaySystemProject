/*
*
*飞行路径控制(路径一)
*/
$(document).ready(function(){
   $(".cesium-viewer-animationContainer").css("display","none");
   $(".cesium-viewer-timelineContainer").css("display","none");
});
function zzmx_play(){
viewer.camera.flyTo({
         destination : Cesium.Cartesian3.fromDegrees(113.6168,34.7423,200),
		 orientation:{
        heading : Cesium.Math.toRadians(-45.0),
        pitch : Cesium.Math.toRadians(-45.0),
        roll : 0.0
                     },
     	 duration:2
         });
var start_new = Cesium.JulianDate.fromDate(new Date(2015, 2, 25, 16));
var stop_new = Cesium.JulianDate.addSeconds(start_new, 360, new Cesium.JulianDate());
//定义时间
viewer.clock.startTime = start_new.clone();
viewer.clock.stopTime = stop_new.clone();
viewer.clock.currentTime = start_new.clone();
viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP; 
viewer.clock.multiplier = 10;
//设置时间轴
viewer.timeline.zoomTo(start_new, stop_new);
//采集不同时间对应的位置坐标（注：时间点数和坐标点数应保持相等）,暂且设定8个点位
var posi_arr=[113.6151,34.7439,113.6155,34.7439,113.6167,34.7439,113.6179,34.7439,113.6201,34.7439,113.6222,34.7439,113.6222,34.7453,113.6222,34.7462];
var posi_arr2=[113.6151,34.7438,113.6164,34.7438,113.6170,34.7438,113.6190,34.7438,113.6199,34.7438,113.6210,34.7438,113.6220,34.7438,113.6220,34.7448];
function CirclularFlight() {
    var property_position = new Cesium.SampledPositionProperty();
    for (var i = 0; i < 360; i += 45) {
        var time = Cesium.JulianDate.addSeconds(start_new, i, new Cesium.JulianDate());
        var position = Cesium.Cartesian3.fromDegrees(posi_arr[2*i/45], posi_arr[2*i/45+1], 0);
        property_position.addSample(time, position);
        
    }
    return property_position;
}
function CirclularFlight2() {
    var property_position = new Cesium.SampledPositionProperty();
    for (var i = 0; i < 360; i += 45) {
        var time = Cesium.JulianDate.addSeconds(start_new, i, new Cesium.JulianDate());
        var position = Cesium.Cartesian3.fromDegrees(posi_arr2[2*i/45], posi_arr2[2*i/45+1], 0);
        property_position.addSample(time, position);
        
    }
    return property_position;
}

//保存了所有点的坐标
var position_flight = CirclularFlight();
var position_flight2 = CirclularFlight2();
//添加模型
var entity_flight1 = viewer.entities.add({
     id:"sd_mx",
    availability : new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({
        start : start_new,
        stop : stop_new
    })]),
    position : position_flight,
    orientation : new Cesium.VelocityOrientationProperty(position_flight),
    model : {
		// uri : 'SampleData/models/GroundVehiclePBR/GroundVehiclePBR.gltf',
        uri : 'SampleData/models/CesiumMilkTruck/CesiumMilkTruck-kmc.gltf',
       minimumPixelSize : 64
    },
	point:{
	  pixelSize:1,
	  color:Cesium.Color.AQUA
	},
    path : {
        resolution : 1,
        material : new Cesium.PolylineGlowMaterialProperty({
            glowPower : 0.1,
            color : Cesium.Color.YELLOW
        }),
        width : 0
    }
});
var entity_flight2 = viewer.entities.add({
     id:"sd_mx2",
    availability : new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({
        start : start_new,
        stop : stop_new
    })]),
    position : position_flight2,
    orientation : new Cesium.VelocityOrientationProperty(position_flight2),
    model : {
        //uri : 'SampleData/models/GroundVehiclePBR/GroundVehiclePBR.gltf',
		uri : 'SampleData/models/CesiumMilkTruck/CesiumMilkTruck.gltf',
       minimumPixelSize : 64
    },
	point:{
	  pixelSize:1,
	  color:Cesium.Color.AQUA
	},
    path : {
        resolution : 1,
        material : new Cesium.PolylineGlowMaterialProperty({
            glowPower : 0.1,
            color : Cesium.Color.YELLOW
        }),
        width : 0
    }
});

viewer.trackedEntity = entity_flight1;
//viewer.trackedEntity = entity_flight2;
}

function zzmx_cancel(){
    viewer.entities.removeById('sd_mx');
	viewer.entities.removeById('sd_mx2');
}
<!-- 飞行路径控制(路径二) -->
var camera=viewer.scene.camera;
var onePoint={
      destination:Cesium.Cartesian3.fromDegrees(117.1120352380801,39.06044482753843,200),    //起始点坐标
	  orientation:{
	      heading:Cesium.Math.toRadians(90),
		  pitch:Cesium.Math.toRadians(-20),
		  roll:Cesium.Math.toRadians(0)
		  }
};
var twoPoint={
      destination:Cesium.Cartesian3.fromDegrees(117.1164076286551,39.06044528194779,200),  //第二点坐标
	  orientation:{
	 	 heading:Cesium.Math.toRadians(90),
	 	 pitch:Cesium.Math.toRadians(-20),
	 	 roll:Cesium.Math.toRadians(0)
	  },
	  duration:10,
	  easingFunction:Cesium.EasingFunction.LINEAR_NONE
};
var two_Point={
      destination:Cesium.Cartesian3.fromDegrees(117.1164076286551,39.06024528194779,200),  //第二点辅助坐标
	  orientation:{
	 	 heading:Cesium.Math.toRadians(180),
	 	 pitch:Cesium.Math.toRadians(-20),
	 	 roll:Cesium.Math.toRadians(0)
	  },
	  duration:2,
	  easingFunction:Cesium.EasingFunction.LINEAR_NONE
};
var threePoint={
      destination:Cesium.Cartesian3.fromDegrees(117.1163640192554,39.05694395542302,200),  //第三点坐标
	  orientation:{
	 	 heading:Cesium.Math.toRadians(180),
	 	 pitch:Cesium.Math.toRadians(-20),
	 	 roll:Cesium.Math.toRadians(0)
	  },
	  duration:10,
	  easingFunction:Cesium.EasingFunction.LINEAR_NONE
};
var three_Point={
      destination:Cesium.Cartesian3.fromDegrees(117.1165640192554,39.05694395542302,200),  //第三点辅助坐标
	  orientation:{
	 	 heading:Cesium.Math.toRadians(90),
	 	 pitch:Cesium.Math.toRadians(-20),
	 	 roll:Cesium.Math.toRadians(0)
	  },
	  duration:2,
	  easingFunction:Cesium.EasingFunction.LINEAR_NONE
};
var fourPoint={
      destination:Cesium.Cartesian3.fromDegrees(117.120995636406,39.05690540644226,200),  //第四点坐标
	  orientation:{
	 	 heading:Cesium.Math.toRadians(90),
	 	 pitch:Cesium.Math.toRadians(-20),
	 	 roll:Cesium.Math.toRadians(0)
	  },
	  duration:7,
	  easingFunction:Cesium.EasingFunction.LINEAR_NONE
};
var four_Point={
      destination:Cesium.Cartesian3.fromDegrees(117.120995636406,39.05670540644226,200),  //第四点辅助坐标
	  orientation:{
	 	 heading:Cesium.Math.toRadians(180),
	 	 pitch:Cesium.Math.toRadians(-20),
	 	 roll:Cesium.Math.toRadians(0)
	  },
	  duration:2,
	  easingFunction:Cesium.EasingFunction.LINEAR_NONE
};
var fivePoint={
      destination:Cesium.Cartesian3.fromDegrees(117.1209896156309,39.05488086919814,200),  //第五点坐标
	  orientation:{
	 	 heading:Cesium.Math.toRadians(180),
	 	 pitch:Cesium.Math.toRadians(-20),
	 	 roll:Cesium.Math.toRadians(0)
	  },
	  duration:7,
	  easingFunction:Cesium.EasingFunction.LINEAR_NONE
};
var five_Point={
      destination:Cesium.Cartesian3.fromDegrees(117.1211896156309,39.05488086919814,200),  //第五点辅助坐标
	  orientation:{
	 	 heading:Cesium.Math.toRadians(90),
	 	 pitch:Cesium.Math.toRadians(-20),
	 	 roll:Cesium.Math.toRadians(0)
	  },
	  duration:2,
	  easingFunction:Cesium.EasingFunction.LINEAR_NONE
};
var sixPoint={
      destination:Cesium.Cartesian3.fromDegrees(117.1235549101039,39.0548432382262,200),  //第六点坐标
	  orientation:{
	 	 heading:Cesium.Math.toRadians(90),
	 	 pitch:Cesium.Math.toRadians(-20),
	 	 roll:Cesium.Math.toRadians(0)
	  },
	  duration:7,
	  easingFunction:Cesium.EasingFunction.LINEAR_NONE
};
var six_Point={
      destination:Cesium.Cartesian3.fromDegrees(117.1235549101039,39.0550432382262,200),  //第六点辅助坐标
	  orientation:{
	 	 heading:Cesium.Math.toRadians(0),
	 	 pitch:Cesium.Math.toRadians(-20),
	 	 roll:Cesium.Math.toRadians(0)
	  },
	  duration:2,
	  easingFunction:Cesium.EasingFunction.LINEAR_NONE
};
var sevenPoint={
      destination:Cesium.Cartesian3.fromDegrees(117.1235668911009,39.058,200),  //第七点坐标
	  orientation:{
	 	 heading:Cesium.Math.toRadians(0),
	 	 pitch:Cesium.Math.toRadians(-20),
	 	 roll:Cesium.Math.toRadians(0)
	  },
	  duration:18,
	  easingFunction:Cesium.EasingFunction.LINEAR_NONE
};

function tjsd_play(){
camera.flyTo(onePoint);
onePoint.complete=function(){
      setTimeout(function(){
	        camera.flyTo(twoPoint);
	  },1000);
}
twoPoint.complete=function(){
	        camera.flyTo(two_Point);
}
var sd_gbj=document.getElementById('sd_gbj');
var name_instead=document.getElementById('name_instead');
var img_instead=document.getElementById('img_instead');
two_Point.complete=function(){		
		sd_gbj.style.display="block";
		name_instead.innerHTML="天津师大钢笔尖";
		img_instead.setAttribute("src","images/gbj.jpg");
      setTimeout(function(){
	        sd_gbj.style.display="none";
		    name_instead.innerHTML="";
		    img_instead.setAttribute("src","");
	        camera.flyTo(threePoint);
	  },2000);
}
threePoint.complete=function(){
	        camera.flyTo(three_Point);
}
three_Point.complete=function(){
        sd_gbj.style.display="block";
		name_instead.innerHTML="天津师大体育场";
		img_instead.setAttribute("src","images/tyc.jpg");
        setTimeout(function(){
		    sd_gbj.style.display="none";
		    name_instead.innerHTML="";
		    img_instead.setAttribute("src","");
	        camera.flyTo(fourPoint);
	  },2000);
}
fourPoint.complete=function(){
	        camera.flyTo(four_Point);
}
four_Point.complete=function(){
       sd_gbj.style.display="block";
		name_instead.innerHTML="天津师大体育馆";
		img_instead.setAttribute("src","images/tyg.jpg");
      setTimeout(function(){
	        sd_gbj.style.display="none";
		    name_instead.innerHTML="";
		    img_instead.setAttribute("src","");
	        camera.flyTo(fivePoint);
	  },2000);
}
fivePoint.complete=function(){
	        camera.flyTo(five_Point);
}
five_Point.complete=function(){
      setTimeout(function(){
	        camera.flyTo(sixPoint);
	  },1000);
}
sixPoint.complete=function(){
	        camera.flyTo(six_Point);
}
six_Point.complete=function(){
      setTimeout(function(){
	        camera.flyTo(sevenPoint);
	  },1000);
}
}