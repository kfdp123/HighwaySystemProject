var defaultTerrain=viewer.terrainProvider;
var W = window.innerWidth;
var H = window.innerHeight;
  
var particles = [];	
var particles_side = [];
var canvas_wind = document.getElementById("canvas_wind");
var ctx = canvas_wind.getContext("2d");
var VYEARBEGIN = 2001;
var VMONTH;
var VDAY;

var PI = 3.1415926;

//风向设置
canvas_wind.width = W;
canvas_wind.height = H;

var wind_move_id=1;
var time_temperature;

var windview_degree=new Array();
var windview_color=new Array();
var scene_scale=10;
for (i=0;i<Math.round(W/scene_scale);i++){
	windview_degree[i]=new Array();
	windview_color[i]=new Array();
}

for (i=0;i<Math.round(W/scene_scale);i++){
	for (j=0;j<Math.round(H/scene_scale);j++){
	windview_degree[i][j]=0;
	windview_color[i][j]=0;
	}
}


var wind_interval=2.5;
var wind_degree=new Array();
var wind_color=new Array();
var angle = 0;
for (i=0;i<(360/wind_interval);i++){
	wind_degree[i]=new Array();
	wind_color[i]=new Array();
}

for (i=0;i<(360/wind_interval);i++){
	for (j=0;j<(180/wind_interval);j++){
		wind_degree[i][j]=0;
		wind_color[i][j]=0;
	}
} 

var scene = viewer.scene;
var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
var wind_change_id=0;
var wind_show=0;


handler.setInputAction(function(movement)
{
if (wind_show==1)
{
wind_move_id=0;
ctx.clearRect(0, 0, W, H);
		wind_change_id=1;
}		
}, Cesium.ScreenSpaceEventType.LEFT_DOWN);


handler.setInputAction(function(movement) {
if (wind_show==1)
{
wind_move_id=1
}
}, Cesium.ScreenSpaceEventType.LEFT_UP);

handler.setInputAction(function(wheelment) {

if (wind_show==1)
{
wind_move_id=0;
ctx.clearRect(0, 0, W, H);
		wind_change_id=1;
}		
}, Cesium.ScreenSpaceEventType.WHEEL);



function valueOnChange_before() {
	
    wind_show=1;
	var qx_feng_timer=setInterval(draw, 33);	
	$.getJSON("wind_25/200119.json",function(data){
		var vlen = data.length;
		for (var j = 0; j < vlen; j = j + 1) {
			
			
				var wind_x=(data[j].x+180)/2.5;
				var wind_y=(data[j].y+90)/2.5;
				wind_degree[wind_x][wind_y]=data[j].degree;
				wind_color[wind_x][wind_y]=data[j].color;
			
		}

		wind_change_id=1;	
		
	});
	sli.style.opacity=0.6;
}


function changeDegree(centerX, centerY, oDegree, scale) {
	var arry = [];
	var vedgelen =  scale;
	var dxoff = scale * 0.866025404;
	var vhedge =scale/4;
	var defautlArry = [0, 0, dxoff / 1.5, -vhedge, 0, vedgelen, -dxoff / 1.5, -vhedge];
	for (var i = 0; i < defautlArry.length; i += 2) {
		var x = centerX + defautlArry[i] * (Math.cos(oDegree)) + defautlArry[i + 1] * (Math.sin(oDegree));
		var y = centerY + defautlArry[i + 1] * (Math.cos(oDegree)) - defautlArry[i] * (Math.sin(oDegree));
		arry.push(x, y);
	}
	return arry;
}

function draw(){
if (wind_move_id==1)
{
    if (wind_change_id==1){wind_change();wind_change_id=0};
	ctx.clearRect(0, 0, W, H);
	for(var k=0;k<particles.length;k++){
		var p=particles[k];
	

		var pointx= Math.round(p.x/scene_scale);
		var pointy= Math.round(p.y/scene_scale);
		var pointx_real= p.x/scene_scale;
		var pointy_real= p.y/scene_scale;
		
		if ((pointx<(windview_degree.length-1))&&(pointy<(windview_degree[0].length-1))&&(windview_degree[pointx][pointy]))//需要修改不能让数组溢出
		{
		
			var w_degree=windview_degree[pointx][pointy];
				var w_color=Math.round(windview_color[pointx][pointy]);
						
		w_degree=0.02*w_degree+0.98*p.p_degree;
		ctx.lineWidth=1;
		ctx.beginPath(); 
		ctx.fillStyle ="rgba("+w_color*3+",150,0,"+2*(0.5-Math.abs(0.5-p.path_time))+")";	
	
		
		var _arry = changeDegree(p.x , p.y ,w_degree,8);
		ctx.lineWidth=0.3;
		ctx.moveTo(_arry[0],_arry[1]);
		ctx.lineTo(_arry[2],_arry[3]);
		ctx.lineTo(_arry[4],_arry[5]);
		ctx.lineTo(_arry[6],_arry[7]);
		ctx.closePath(); 
		ctx.fill();
		ctx.stroke();	

		if (particles[k].path_time<1){
			particles[k].x = particles[k].x+Math.sin(w_degree)*0.5;
			particles[k].y = particles[k].y+Math.cos(w_degree)*0.5;
			particles[k].path_time=particles[k].path_time+Math.random()*0.01;
			particles[k].p_degree=w_degree;}
		else{particles[k].path_time= Math.random();
			particles[k].x=particles[k].wind_x*scene_scale+Math.random()*(scene_scale*5)-(scene_scale*2.5);//x-coordinate
			particles[k].y=particles[k].wind_y*scene_scale+Math.random()*(scene_scale*5)-(scene_scale*2.5);
			particles[k].p_degree=windview_degree[particles[k].wind_x][particles[k].wind_y];
			}

		}else
		{particles[k].path_time= Math.random();
		particles[k].x=particles[k].wind_x*scene_scale+Math.random()*(scene_scale*5)-(scene_scale*2.5);//x-coordinate
		particles[k].y=particles[k].wind_y*scene_scale+Math.random()*(scene_scale*5)-(scene_scale*2.5);
		particles[k].p_degree=windview_degree[particles[k].wind_x][particles[k].wind_y];}
		
			
	}	

	
	for(var k=0;k<particles_side.length;k++){
		var p=particles_side[k];


		var pointx= Math.round(p.x/scene_scale);
		var pointy= Math.round(p.y/scene_scale);
		var pointx_real= p.x/scene_scale;
		var pointy_real= p.y/scene_scale;
		
		if ((pointx<(windview_degree.length-1))&&(pointy<(windview_degree[0].length-1))&&(windview_degree[pointx][pointy]))//需要修改不能让数组溢出
		{
		
			var w_degree=windview_degree[pointx][pointy];
				var w_color=Math.round(windview_color[pointx][pointy]);
							
		w_degree=0.02*w_degree+0.98*p.p_degree;
		ctx.lineWidth=1;
		ctx.beginPath(); 
		ctx.fillStyle ="rgba("+w_color*3+",150,0,"+(Math.abs(p.path_time))+")";	
		
		var _arry = changeDegree(p.x , p.y ,w_degree,8);
		ctx.lineWidth=0.3;
		ctx.moveTo(_arry[0],_arry[1]);
		ctx.lineTo(_arry[2],_arry[3]);
		ctx.lineTo(_arry[4],_arry[5]);
		ctx.lineTo(_arry[6],_arry[7]);
		ctx.closePath(); 
		ctx.fill();

		if (particles_side[k].path_time<1){
			particles_side[k].x = particles_side[k].x+Math.sin(w_degree)*0.5;
			particles_side[k].y = particles_side[k].y+Math.cos(w_degree)*0.5;
			particles_side[k].path_time=particles_side[k].path_time+Math.random()*0.01;
			particles_side[k].p_degree=w_degree;}
		else{particles_side[k].path_time= Math.random();
			particles_side[k].x=particles_side[k].wind_x*scene_scale+Math.random()*(scene_scale)-(scene_scale);
			particles_side[k].y=particles_side[k].wind_y*scene_scale+Math.random()*(scene_scale)-(scene_scale);
			particles_side[k].p_degree=windview_degree[particles_side[k].wind_x][particles_side[k].wind_y];
			}
		
		}else
		{particles_side[k].path_time= Math.random();
		particles_side[k].x=particles_side[k].wind_x*scene_scale+Math.random()*(scene_scale)-(scene_scale);
		particles_side[k].y=particles_side[k].wind_y*scene_scale+Math.random()*(scene_scale)-(scene_scale);
		particles_side[k].p_degree=windview_degree[particles_side[k].wind_x][particles_side[k].wind_y];}
		
			
	}	
	}
	
}
function wind_change(){

	ctx.clearRect(0, 0, W, H);
	particles = [];	

	for (i=3;i<Math.floor((W-3)/scene_scale);i++){
		for (j=3;j<Math.floor((H-3)/scene_scale);j++){
			var pt1 = new Cesium.Cartesian2(i*scene_scale,j*scene_scale);
			var ray1=viewer.camera.getPickRay(pt1);
			var pick1= viewer.scene.globe.pick(ray1, viewer.scene);
			if (pick1){
				var cartographic1 = Cesium.Cartographic.fromCartesian(pick1);
				var windview_x= Math.floor((parseFloat(Cesium.Math.toDegrees(cartographic1.longitude).toFixed(1))+180)/2.5);
				var windview_y= Math.floor((parseFloat(Cesium.Math.toDegrees(cartographic1.latitude).toFixed(1))+90)/2.5);
				if ((windview_x<144)&&(windview_y<72))
				{
					windview_degree[i][j]= wind_degree[windview_x][windview_y];
					windview_color[i][j]= wind_color[windview_x][windview_y];
					if ((i%5==0)&&(j%5==0))
					{
						var mp =Math.round(windview_color[i][j]/20)+1; //max particles
						for(var k = 0; k < mp; k++){
							ran_x=i*scene_scale+Math.random()*(scene_scale*5)-(scene_scale*2.5)
							ran_y=j*scene_scale+Math.random()*(scene_scale*5)-(scene_scale*2.5)
							
							particles.push({
								wind_x:i,
								wind_y:j,
								x: ran_x, 
								y: ran_y, 
								p_degree: windview_degree[i][j],
								path_time:Math.random()
							})
						}
					}
				}
			}
			else{windview_degree[i][j]=0;windview_color[i][j]=0;}
		}
	}		
	

	particles_side = [];	
	for (i=1;i<Math.floor((W-1)/scene_scale);i++){
		for (j=1;j<3;j++){
			var pt1 = new Cesium.Cartesian2(i*scene_scale,j*scene_scale);
			var ray1=viewer.camera.getPickRay(pt1);
			var pick1= viewer.scene.globe.pick(ray1, viewer.scene);
			if (pick1){
				var cartographic1 = Cesium.Cartographic.fromCartesian(pick1);
				var windview_x= Math.floor((parseFloat(Cesium.Math.toDegrees(cartographic1.longitude).toFixed(1))+180)/2.5);
				var windview_y= Math.floor((parseFloat(Cesium.Math.toDegrees(cartographic1.latitude).toFixed(1))+90)/2.5);
				if ((windview_x<144)&&(windview_y<72))
				{
				windview_degree[i][j]= wind_degree[windview_x][windview_y];
				windview_color[i][j]= wind_color[windview_x][windview_y];
				if ((i%5==0)&&(j%5==0))
				{
				var mp =Math.round(windview_color[i][j]/20)+1;
				for(var k = 0; k < mp; k++){
				ran_x=i*scene_scale+Math.random()*(scene_scale)-(scene_scale)
				ran_y=j*scene_scale+Math.random()*(scene_scale)-(scene_scale)

					particles_side.push({
						wind_x:i,
						wind_y:j,
						x: ran_x,
						y: ran_y, 
						p_degree: windview_degree[i][j],
						path_time: Math.random()
					})
					
				}
				}
				}
			}
			else{windview_degree[i][j]=0;windview_color[i][j]=0;}
		}
			
	}
	
		for (j=3;j<Math.floor((H-5)/scene_scale);j++){
			for (i=1;i<3;i++){
				var pt1 = new Cesium.Cartesian2(i*scene_scale,j*scene_scale);
				var ray1=viewer.camera.getPickRay(pt1);
				var pick1= viewer.scene.globe.pick(ray1, viewer.scene);
				if (pick1){
					var cartographic1 = Cesium.Cartographic.fromCartesian(pick1);
					var windview_x= Math.floor((parseFloat(Cesium.Math.toDegrees(cartographic1.longitude).toFixed(1))+180)/2.5);
					var windview_y= Math.floor((parseFloat(Cesium.Math.toDegrees(cartographic1.latitude).toFixed(1))+90)/2.5);
					if ((windview_x<144)&&(windview_y<72))
					{
						windview_degree[i][j]= wind_degree[windview_x][windview_y];
						windview_color[i][j]= wind_color[windview_x][windview_y];
						if ((i%5==0)&&(j%5==0))
						{
							var mp =Math.round(windview_color[i][j]/20)+1;
							for(var k = 0; k < mp; k++){
								ran_x=i*scene_scale+Math.random()*(scene_scale)-(scene_scale)
								ran_y=j*scene_scale+Math.random()*(scene_scale)-(scene_scale)

								particles_side.push({
									wind_x:i,
									wind_y:j,
									x: ran_x, 
									y: ran_y,
									p_degree: windview_degree[i][j],
									path_time: Math.random()
								})
							}
						}
					}
				}
				else{windview_degree[i][j]=0;windview_color[i][j]=0;}
			}
		}
}
function closeWind()
{ 
	sli.style.display="none";
	wind_move_id=0;
	ctx.clearRect(0, 0, W, H);
	wind_change_id=1;
	wind_show=0;
}