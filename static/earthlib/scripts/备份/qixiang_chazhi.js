var qxHandlerCollection =[];
function chazhi(qxJsonTime,qxType,qxIndex){
    var scene = viewer.scene;
    //得到当前三维场景的椭球体
    var ellipsoid = scene.globe.ellipsoid;
    //var canvas = scene.canvas;
    var can =document.getElementById("qixiang_canvas");
    can.width = scene.canvas.width;
    can.height = scene.canvas.height;
    var ctx = can.getContext("2d");
    // 定义当前场景的画布元素的事件处理
    
    // 定义canvas图像的宽高
    var imgData=ctx.createImageData(canvas.width,canvas.height);
    let qxJsonTmp = qxType+'_'+qxIndex;
    /**
     * 定义二维数组dataArr
     * 用于存放原始数据
     * */
    var dataArr = [];
    for(var i =0;i<360;i++){
        dataArr [i]= [];
    }
    /**
     * 获取原始数据json文件并对dataArr赋值
     * */
    
    $.getJSON('../../localOtherData/qixiangJson/'+qxJsonTime+'/'+qxJsonTmp+'.json',function(data){
			var k=0;
			for(var j =0;j<180;j++){
				for(var i=0;i<360;i++){
					dataArr[i][j] = data[k].v;
					k=k+1;
				}
			}
	if(dataArr)
			/**
			 * 监听鼠标左键清空canvas
			 * */
			var qxHandler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
			
			qxHandler.setInputAction(function(movement) {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
			}, Cesium.ScreenSpaceEventType.LEFT_DOWN);

			qxHandler.setInputAction(function(wheelment) {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
			}, Cesium.ScreenSpaceEventType.WHEEL);
			/**
			 * 监听鼠标移动事件计算插值并渲染
			 * */
			qxHandler.setInputAction(function (movement) {
			/* 当相机高度在4702700以下，871816以上时才插值*/
				var count = 0;var result = [];
				var camera_height = Math.ceil(viewer.camera.positionCartographic.height);

			//一定高度下才开始插值
				if(camera_height<4702700){
					for(let j=0;j<canvas.height;j++){
						for(let i=0;i<canvas.width;i++){
							var car3_lt = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(i,j), ellipsoid);
							if(car3_lt){
								var carto_lt = ellipsoid.cartesianToCartographic(car3_lt);
								result.push(Cesium.Math.toDegrees(carto_lt.longitude));
								result.push(Cesium.Math.toDegrees(carto_lt.latitude));
							}
						}
					}
					let canvasHeight = canvas.height-1;
					let canvasWidth = Math.floor(canvas.width);

					for(let j=1;j<canvasHeight;j++) {
							for(let i=1;i<canvasWidth;i++){
							var u=(result[count/2]+360)%1;
							var v=(90-result[count/2+1])%1;
							var Xs=(result[count/2]+360)%360;
							var Ys=(90-result[count/2+1]);
							if (Xs>359) {Xs=358.9}
							if (Ys>179) {Ys=178.9}
							try {
								var value  = ((1 - u) * (1 - v) * dataArr[Math.floor(Xs)][Math.floor(Ys)] + (1 - u) * v * dataArr[Math.floor(Xs)][Math.ceil(Ys)] + u * (1 - v) * dataArr[Math.ceil(Xs)][Math.floor(Ys)] + u * v * dataArr[Math.ceil(Xs)][Math.ceil(Ys)]);
							}catch(err){
								alert(err)
							}
							var cal_table = null;
							switch(qxType){
								case "TMP":cal_table = TMPColorTable(value)
											break;
								case "PRES":cal_table = PRESColorTable(value)
											break;
								case "PWAT":cal_table = PWATColorTable(value)
											break;
								case "RH":cal_table = RHColorTable(value)
											break;
								case "SPFH":cal_table = SPFHColorTable(value)
											break;
								default : alert("err")
							}
							imgData.data[count]= cal_table.R;
							imgData.data[count+1]=cal_table.G;
							imgData.data[count+2]=cal_table.B;
							imgData.data[count+3]=150;
							count+=4;
						}
					}

					ctx.putImageData(imgData,0,0);
				}
			},Cesium.ScreenSpaceEventType.LEFT_UP);
			qxHandlerCollection.push(qxHandler);
    }).error(errorHandler=function(jqXHR, textStatus, errorThrown){
			alert("该日期没有数据，请重新选择日期和数据类型");
			if(qxHandlerCollection.length>0){
				for(let i=0;i<qxHandlerCollection.length;i++){
					qxHandlerCollection[i].destroy();
				}
			};
			$('#qxjtControl')[0].checked=false; 
			return;
		}) ;
}