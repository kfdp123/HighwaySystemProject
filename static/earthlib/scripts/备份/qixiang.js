var imageryLayers = viewer.imageryLayers;
var scene =viewer.scene;
var ellipsoid = scene.globe.ellipsoid;

var qxTime=null;var qxType = null;var qxIndex =null;
var qxTimer = null;
const qxTypeJson={"气温":"TMP","气压":"PRES","降水量":"PWAT","湿度":"RH","比湿":"SPFH"};
//动态展示面板显示隐藏
$('#dongtaiQX').window({
	onClose:function(){
		$('#qixiangWindow').window('open');
		$('#qxdtControl')[0].checked=false; 
		while (imageryLayers._layers.length >=3) {
			imageryLayers.remove(imageryLayers._layers[2]);
		}
		$('#play').css('display','');
		$('#pause').css('display','none');
		//消除动态展示的定时器
		for(let i=0;i<timerCollection.length;i++){
			clearInterval(timerCollection[i]);
		}
		$("#play").off('click');
		$("#pause").off('click');
		$("#last").off('click');
		$("#next").off('click');
		clearInterval(qxTimer);
	}
	
});

//获取时间参数
$('#qxdatePick').datebox({
	onSelect: function(date){
		qxIndex = date.getDate();
		if(date.getMonth()+1<10){
			qxTime = date.getFullYear()+'0' +(date.getMonth()+1);
		}else{
			qxTime = date.getFullYear()+''+(date.getMonth()+1);
		}
		//console.log(qxTime);	201805
		//alert(date.getFullYear()+":"+(date.getMonth()+1)+":"+date.getDate());	2018：5：8
	}
});

//获取数据类型
$('#qixiangSelect').combobox({
	onSelect: function(param){
		if(param.text!=null){
			qxType = qxTypeJson[param.text];
		}
	}
});

//加载数据

$('#qxAdd').on('click',function(){
	//消除静态展示的监听函数
	if(qxHandlerCollection.length>0){
		for(let i=0;i<qxHandlerCollection.length;i++){
			if(!qxHandlerCollection[i].isDestroyed()){
				qxHandlerCollection[i].destroy();		
			}

		}
	}
	//静态数据
	if($('#qxjtControl')[0].checked){
		if(qxTime&&qxType&&qxIndex){
			//清楚动态加载的数据
			while (imageryLayers._layers.length >=3) {
                imageryLayers.remove(imageryLayers._layers[2]);
			}
			
			//插值
			chazhi(qxTime,qxType,qxIndex);
		}else{
			alert("请选择日期，数据类型以及查看的方式")
		}
	}
	//动态数据
	if($('#qxjtControl')[0].checked==false&&$('#qxdtControl')[0].checked){
		if(qxTime&&qxType&&qxIndex){
			//打开播放窗体
			$('#dongtaiQX').window('open');
			$('#dongtaiQX').window({left:1000,top:500});
			$('#qixiangWindow').window('close');

			
			//动态变化
			dongtai(qxTime,qxType,qxIndex)
		}else{
			alert("请选择日期，数据类型以及查看的方式")
		}
	}
})

//取消动态监听函数
$('#qxRemove').on('click',function(){
	//消除静态展示的监听函数
	var scene = viewer.scene;
    //得到当前三维场景的椭球体
    var ellipsoid = scene.globe.ellipsoid;
	var can =document.getElementById("qixiang_canvas");
    can.width = scene.canvas.width;
    can.height = scene.canvas.height;
    var ctx = can.getContext("2d");
	ctx.clearRect(0, 0, can.width, can.height);
	if(qxHandlerCollection.length>0){
		for(let i=0;i<qxHandlerCollection.length;i++){
			if(!qxHandlerCollection[i].isDestroyed()){
				qxHandlerCollection[i].destroy();		
			}

		}
	}
	//ctx.clearRect(0, 0, canvas.width, canvas.height);
	$('#qxjtControl')[0].checked=false; 
	clearInterval(qxTimer);

})

