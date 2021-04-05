var timerCollection =[];
function dongtai(qxPngTime,qxPngType,qxPngIndex){
    var tmpLayer=null;
    var tmpLayer1=null;
    var f_time=1;//循环状态1，2，3
	var timer = null;
	var qx_loop_flag = 1;
	var move = function(){
		addImage(qxPngTime,qxPngType)
	}
	const qxdtType={"TMP":"气温","PRES":"气压","PWAT":"降水量","RH":"湿度","SPFH":"比湿"};
	let year = qxPngTime.substring(0,4);
	let month = qxPngTime.substring(4,6);
	$('#qxdtDate').html('日期: '+year+'-'+month+'-'+qxPngIndex);
	$('#qxdtType').html('数据类型： '+qxdtType[qxPngType]);
    if(imageryLayers.length==2){
        tmpLayer= imageryLayers.addImageryProvider(new Cesium.SingleTileImageryProvider({
            url:'../../localOtherData/qixiangImg/'+qxPngTime+'/'+  qxPngType +'_' + qxPngIndex + '.png',
            rectangle:Cesium.Rectangle.fromDegrees(-360,-90,0,90)
        }));
        tmpLayer.alpha=0.3;
        tmpLayer1= imageryLayers.addImageryProvider(new Cesium.SingleTileImageryProvider({
            url:'../../localOtherData/qixiangImg/'+qxPngTime+'/'+  qxPngType +'_' + qxPngIndex + '.png',
            rectangle:Cesium.Rectangle.fromDegrees(0,-90,360,90)
        }));
        tmpLayer1.alpha=0.3;
    }
    //播放暂停
    $("#play").click(function () {
		$(this).css("display","none");
		$('#pause').css("display","");
        //循环加载
        qx_loop_flag = 1;
		if(qx_loop_flag==1){
			timer = setInterval(move,500);
			timerCollection.push(timer);
		}else{
			clearInterval(timer);
		}
    });
	$("#pause").click(function(){
		$(this)[0].style.display = 'none';
		$('#play')[0].style.display = '';
		clearInterval(timer);
		qx_loop_flag = 0;
	})
	
    //上一个
    $('#last').click(function () {
        qxPngIndex--;
        if(qxPngIndex<=0){
            qxPngIndex = 30;
        }
        else{
			let year = qxPngTime.substring(0,4);
			let month = qxPngTime.substring(4,6);
			$('#qxdtDate').html('日期: '+year+'-'+month+'-'+qxPngIndex);
			$('#qxdtType').html('数据类型： '+qxdtType[qxPngType]);
            while (imageryLayers._layers.length >=3) {
                imageryLayers.remove(imageryLayers._layers[2]);
            }
            tmpLayer= imageryLayers.addImageryProvider(new Cesium.SingleTileImageryProvider({
                url:'../../localOtherData/qixiangImg/'+qxPngTime+'/'+  qxPngType +'_' + qxPngIndex + '.png',
                rectangle:Cesium.Rectangle.fromDegrees(-360,-90,0,90)
            }));
            tmpLayer.alpha=0.3;
            tmpLayer1= imageryLayers.addImageryProvider(new Cesium.SingleTileImageryProvider({
                url:'../../localOtherData/qixiangImg/'+qxPngTime+'/'+  qxPngType +'_' + qxPngIndex + '.png',
                rectangle:Cesium.Rectangle.fromDegrees(0,-90,360,90)
            }));
            tmpLayer1.alpha=0.3;
        }
    });
    
    //下一个
    $('#next').click(function () {
        qxPngIndex++;
        if(qxPngIndex>30){
            qxPngIndex = 1;
        }
        else{
			let year = qxPngTime.substring(0,4);
			let month = qxPngTime.substring(4,6);
			$('#qxdtDate').html('日期: '+year+'-'+month+'-'+qxPngIndex);
			$('#qxdtType').html('数据类型： '+qxdtType[qxPngType]);
            while (imageryLayers._layers.length >=3) {
                imageryLayers.remove(imageryLayers._layers[2]);
            }
            tmpLayer= imageryLayers.addImageryProvider(new Cesium.SingleTileImageryProvider({
                url:'../../localOtherData/qixiangImg/'+qxPngTime+'/'+  qxPngType +'_' + qxPngIndex + '.png',
                rectangle:Cesium.Rectangle.fromDegrees(-360,-90,0,90)
            }));
            tmpLayer.alpha=0.3;
            tmpLayer1= imageryLayers.addImageryProvider(new Cesium.SingleTileImageryProvider({
                url:'../../localOtherData/qixiangImg/'+qxPngTime+'/'+  qxPngType +'_' + qxPngIndex + '.png',
                rectangle:Cesium.Rectangle.fromDegrees(0,-90,360,90)
            }));
            tmpLayer1.alpha=0.3;
        }
    });
    
    //图像加载函数
    function addImage(date,attr) {
        //date = 201808
		let year = qxPngTime.substring(0,4);
        var month = date.substring(4,6);
		$('#qxdtDate').html('日期: '+year+'-'+month+'-'+qxPngIndex);
		$('#qxdtType').html('数据类型： '+qxdtType[qxPngType]);
        var mon_flag = 0;
        if((month=="01")||(month="03")||(month="05")||(month="07")||(month="08")||(month="10")||(month="12")){
            mon_flag = 1;
        }else{
            mon_flag = 0;
        }
        if (f_time==1) {
            if ((mon_flag==1)&&(qxPngIndex==31)) {
                qxPngIndex = 1;
            }
            else if((mon_flag==0)&&(qxPngIndex==30)){
                qxPngIndex = 1;
            }
			while (imageryLayers._layers.length >=5) {
				imageryLayers.remove(imageryLayers._layers[2]);
			}
			tmpLayer.alpha = 0.3;
			tmpLayer1.alpha = 0.3;
			f_time++;
            
        }
        else {
            if ((mon_flag==1)&&(qxPngIndex==32)) {
                qxPngIndex = 1;
            }
            else if((mon_flag==0)&&(qxPngIndex==31)){
                qxPngIndex = 1;
            }
            tmpLayer = imageryLayers.addImageryProvider(new Cesium.SingleTileImageryProvider({
                url: '../../localOtherData/qixiangImg/' +date + '/' + attr + '_' + qxPngIndex + '.png',
                rectangle: Cesium.Rectangle.fromDegrees(-360,-90,0,90)
            }));
            tmpLayer.alpha = 0.0;
            tmpLayer1 = imageryLayers.addImageryProvider(new Cesium.SingleTileImageryProvider({
                url: '../../localOtherData/qixiangImg/' + date + '/' + attr + '_' + qxPngIndex + '.png',
                rectangle: Cesium.Rectangle.fromDegrees(0,-90,360,90)
            }));
            tmpLayer1.alpha = 0.0;
            qxPngIndex++;
            f_time=1;
        }
    }
}

