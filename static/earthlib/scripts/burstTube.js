//爆管分析
$('#burstTubeAnalyst').click(function(){
	dataArray=[];
   var hander100=new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);	
   hander100.setInputAction(function(movement){
   var pickedFeature=viewer.scene.pick(movement.position);
     if(pickedFeature==undefined){
		 alert('请选择管线');
		 return;
	 }else{
		var getName=pickedFeature.getProperty('name');
		if(getName.split('-')[1]=='zsgspoint'){
			alert('请选择管线');
		    return;
		}
		dataArray.push(getName);
		requestFun('burstTube.ashx',dataArray);
	 }
  
	hander100.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);   
   },Cesium.ScreenSpaceEventType.LEFT_CLICK);	
}  
);
//单击查询
$('#objectSearch').click(function(){
	dataArray2=[];
	var hander2=new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
	hander2.setInputAction(function(movement){
   var pickedFeature=viewer.scene.pick(movement.position);
     if(pickedFeature==undefined){
		 alert('请选择管线');
		 return;
	 }else{
		var getName=pickedFeature.getProperty('name');
        alert(getName);
		dataArray2.push(getName);
		//requestFunObj('objectSearch.ashx',dataArray2);
	 }
  
	hander2.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);   
   },Cesium.ScreenSpaceEventType.LEFT_CLICK);
});
//统计查询
$('#countSearch').click(function(){     
	$('#firstPanel').modal('show');
});
$('#searchAtt').click(function(){
	$('#firstPanel').modal('hide');
	var pipeType=$('#pipeType').val();
	var pipeAttri=$('#pipeAttri').val();
	var pipeTypeCon=pipeType+'-'+pipeAttri;
	if((pipeType=='管线')&&(pipeAttri=='管径')){
		//alert('成功');
		dataArray3.push(pipeTypeCon);
		requestRadiusLife('typeLife.ashx',dataArray3);
	}else if((pipeType=='管线')&&(pipeAttri=='生命周期')){
		dataArray3.push(pipeTypeCon);
		requestRadiusLife2('typeLife.ashx',dataArray3);
	}else{
		alert('请重新选择');
	}
});
//折线
$('#lineDraw').click(function(){     
			     option = {
						xAxis: {
							type: 'category',
							data: [0.03,0.05,0.07,0.08]
						},
						yAxis: {
							type: 'value'
						},
						series: [{
						    name: '数量',
							data: [tempDraw[0.03], tempDraw[0.05], tempDraw[0.07], tempDraw[0.08]],
							type: 'line'
						}]
					};
				myChart.setOption(option);
});
//柱状
$('#pillarDraw').click(function(){     
					var option = {
					title: {
						text: '管径统计柱状图'
					},
					tooltip: {},
					legend: {
						data:['管径']
					},
					xAxis: {
						data: [0.03,0.05,0.07,0.08]
					},
					yAxis: {},
					series: [{
						name: '数量',
						type: 'bar',
						data: [tempDraw[0.03], tempDraw[0.05], tempDraw[0.07], tempDraw[0.08]]
					}]
				};
				myChart.setOption(option);
});
//扇形
$('#sectorDraw').click(function(){     
	option = {
    title : {
        text: '不同管径管线数量统计',
        subtext: '单位(根)',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: [0.03,0.05,0.07,0.08]
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:tempDraw[0.03], name:0.03},
                {value:tempDraw[0.05], name:0.05},
                {value:tempDraw[0.07], name:0.07},
                {value:tempDraw[0.08], name:0.08}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
myChart.setOption(option);
});
//绘图关闭
$('#closeDraw').click(function(){     
	$('#drawModal').modal('hide');
});