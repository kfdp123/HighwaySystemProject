var ctx_line ;

//Chart.defaults.global.scaleShowLabels = false;
  var config = {
      type: 'line',
      data: {
          labels: [],
          datasets: []
      },
      options: {

          legend:{
              display:false,
          },
          responsive: true,
          title:{
              display:true,
              fontSize:20,
              fontColor:'#5bc153',
              text:'最大遮蔽角密位分析图'
          },
          tooltips: {
              mode: 'index',
              intersect: false,
          },
          hover: {
              mode: 'nearest',
              intersect: true
          },
          scales: {
              xAxes: [{
                  display: true,
                  scaleLabel: {
                      display: true,
                      fontSize:17,
                      fontColor:'#5bc153',
                      labelString: '密       位'
                  }
              }],
              yAxes: [{
                  display: true,
                  scaleLabel: {
                      display: true,
                      fontSize:17,
                      fontColor:'#5bc153',
                      labelString: '遮蔽角度数（º）'
                  }
              }]
          }
      }
  };
   var newDataset = {
      label: "遮蔽角度数",
      fill: false,
      backgroundColor: window.chartColors.blue,
      borderColor: window.chartColors.blue,
      pointRadius:0,
      fill:true,
      lineTension:0,
      data: []
    };
  /*雷达*/
  var chartColors = window.chartColors;
  var color = Chart.helpers.color;
  var config2 = {
      data: {
          datasets: [],
          labels: []
      },
      options: {
          defaultFontColor:'',
          startAngle:0,
          responsive: true,
          legend: {
              display:false,
              position: 'right',
          },
          title: {
              display: true,
              fontSize:20,
              fontColor:'#5bc153',
              text: '最大遮蔽角雷达图'
          },
          scale: {
              gridLines:{display:true,
                  zeroLineColor:"rgba(0, 0, 0, 0.25)",
              },
              ticks: {
                  display: true,
                  beginAtZero: true
              },
              reverse: false
          },
          animation: {
              animateRotate: false,
              animateScale: true
          }
      }};
     var newDataset2={
				  data: [],
				  backgroundColor: [],
				  borderWidth:[],
				  label: 'My dataset',
				  xAxisID: "x-axis-1",
				  yAxisID: "y-axis-1",
			  }
			  
     /*高程值剖面  */
	 
   var config3 = {
        type: 'line',
		pointDot : false,
		scaleShowGridLines : false,
		pointRadius:0,
		pointDotStrokeWidth:0,
		datasetStroke : false,
		datasetStroke : false,
        data: {
            labels: [],
            datasets: []	
        },
        options: {
            legend:{
                display:true,
            },
			
            responsive: true,
            title:{
                display:true,
                fontSize:20,
                fontColor:'#5bc153',
                text:'两点之间剖面高程值'
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        fontSize:17,
                        fontColor:'#5bc153',
                        labelString: '距离'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        fontSize:17,
                        fontColor:'#5bc153',
                        labelString: '高程（m）'
                    }
                }]
            }
        }
    };
	    	 var newDataset3 = {
                label: "高程",
                fill: false,
                backgroundColor: window.chartColors.blue,
                borderColor: window.chartColors.blue,
                data: []
            };

    
   
      var  begin_state=0;
    function radar_plline_draw(){
	      
	    if(begin_state==3){
	     window.myPolarArea.destroy();
		}
		  if(begin_state==2){
	     window.myLineLine.destroy();
		}
		   if(begin_state==1){
		  window.myLine.destroy();
		  }
	     ctx_line = document.getElementById("canvas-line").getContext("2d");
		
         myLine = new Chart(ctx_line, config);
	    //var drawpicture= document.getElementById('drawpicture')
         //drawpicture.style.display='';
		 var topPosition = $(document).height() - 370;  
         var leftPosition = $(document).width() - 460; 
		 $('#radarZBJID').window('open');
		 $('#radarZBJID').window({left:leftPosition,top:topPosition});
	   
	   //$("#radar_all").hide();
	  
     // $.getJSON("scripts/radar/loaddata.json",function(data) {
		  /*var name=viewer.selectedEntity.name;
		  str=viewer.selectedEntity.name.split("@");
		  lat_select=str[1];
		  lon_select=str[0];
		  scope_select=str[2];
		  height_select=str[3];*/
		  
		  
		  //$.getJSON("http://localhost:8080/dem/zbj?lon="+lon_select+"&lat="+lat_select+"&scope=221&num=1&h="+height_select,
		  $.getJSON("http://localhost:9090/WebForm4.aspx?lat="+latitudeZBJ+"&lon="+longitudeZBJ+"&len="+calculateDis_toshi(zhebijiaoArray[0],zhebijiaoArray[1])/111000+"&h="+15,
		  function(data) {
		  config.data.labels=[];
		  config.data.datasets=[];
          newDataset.data=[];
          for (var i = 0; i < data.length; i++) {
              switch (i) {
                  case 0:
                      config.data.labels.push(0);
                      break;
                  case 90:
                      config.data.labels.push(1500);
                      break;
                  case 180:
                      config.data.labels.push(3000);
                      break;
                  case 270:
                      config.data.labels.push(4500);
                      break;
                  case 359:
                      config.data.labels.push(6000);
                      break;
                  default:
                      config.data.labels.push('');
                      break;
              }
              newDataset.data.push(data[i].angle);
              
          }
		 
          config.data.datasets.push(newDataset);
           window.myLine.update();
		  
        })
          begin_state=1; 
		
	}
	
      
	  
      function radar_polar_draw(){
		  if(begin_state==1){
		  window.myLine.destroy();
		  }
		   if(begin_state==2){
	     window.myLineLine.destroy();
		}
	 if(begin_state==3){
	     window.myPolarArea.destroy();
		}
		 ctx_line= document.getElementById("canvas-line").getContext("2d");
		
		   window.myPolarArea = Chart.PolarArea(ctx_line, config2);
		   
             //drawpicture.style.display='';
			  
			 //  $.getJSON("scripts/radar/loaddata.json",function(data) {
				  /* str=viewer.selectedEntity._name.split("@");
		  lat_select=str[1];
		  lon_select=str[0];
		  scope_select=str[2];
		  height_select=str[3];*/
		  
		  
		  $.getJSON("http://localhost:9090/WebForm4.aspx?lat="+latitudeZBJ+"&lon="+longitudeZBJ+"&len="+calculateDis_toshi(zhebijiaoArray[0],zhebijiaoArray[1])/111000+"&h="+15,function(data) {
				 
				// $.getJSON("http://localhost:8080/dem/zbj?lon=106&lat=36&scope=321&num=1&h=10",function(data) {
				    config2.data.labels=[];
                  newDataset2.data=[]; 
				 config2.data.datasets=[];
				   for(var j=0;j<data.length;j++){
              // config2.data.labels.push("遮蔽角度数");
              newDataset2.data.push(data[359-j].angle);
              newDataset2.backgroundColor.push(color(chartColors.blue).alpha(0.5).rgbString());
              newDataset2.borderWidth.push(0);
               }
      		    config2.data.datasets.push(newDataset2);
                window.myPolarArea.update();
			   })
			   begin_state=3; 
		     }
	   
	    var label_array=[25107,25108,25109,25110,25111, 25112,
         25113,25114,25115,25116,25117,25118,25119,25120,25121,25122,25123,25124,25125,25126,25127,25128]
		 
     var data_array=[8.0,8.0,6.0,5.0,7.0,6.0,5.0,3.0,5.0,2.0,2.0,2.0,1.0,-3.0,-3.0,-3.0,-3.0,-3.0,-3.0,2.0,4.0,3.0]
	 
	 
         function twopoint_attitude2(lon1,lat1,lon2,lat2){
			 if(begin_state==1){
				 window.myLine.destroy(); 
			 }
			 if(begin_state==3){
	     window.myPolarArea.destroy();
		}
	  if(begin_state==2){
	     window.myLineLine.destroy();
		}
		
		var ctx_line = document.getElementById("canvas-line2").getContext("2d");
         myLineLine = new Chart(ctx_line,config3);
		 
		 var topPosition = $(document).height() - 340;  
         var leftPosition = $(document).width() - 460; 
		 $('#attiPMID').window('open');
		 $('#attiPMID').window({left:leftPosition,top:topPosition});
		  //drawpicture2.style.display='';
		  config3.data.labels=[];
		  config3.data.datasets=[];
          newDataset3.data=[];
		   var flag=0;
      
        // 横坐标刻度
		
				  //$.getJSON("http://localhost:8080/dem/twoprofile?lon1="+lon1+"&lat1="+lat1+"&lon2="+lon2+"&lat2="+lat2+"&num=1"
		 $.getJSON("http://localhost:9090/WebForm5.aspx?lat1="+lat1+"&lon1="+lon1+"&lat2="+lat2+"&lon2="+lon2+"&num=25",function(data) {
				 
				// $.getJSON("http://localhost:8080/dem/zbj?lon=106&lat=36&scope=321&num=1&h=10",function(data) {
				    var level_num=Math.round(data.length/20)+1
				   for(var j=0;j<data.length;j++){
					   
					 if ((j%level_num)==0) 
					 {var dis=data[j].dis;
				 var height=data[j].height;
						config3.data.labels.push(dis) 
						 newDataset3.data.push(height);
					 }
             
                  
           //   newDataset3.backgroundColor.push(color(chartColors.blue).alpha(0.5).rgbString());
          //    newDataset3.borderWidth.push(0);
               }
      		     config3.data.datasets.push(newDataset3);
            window.myLineLine.update();
			   })
		
   //  if (flag == 0) {
   //      for (var m = 0; m < label_array.length; m++) {
   //          config3.data.labels.push(label_array[m]);
   //      }
   //
   //  
   //
   //      for (var j = 0; j < data_array.length; j++) {
   //          newDataset3.data.push(data_array[j]);
   //      }
           
            flag = 1;
        tsArray=[];
		   begin_state=2; 
      }
	  
	  
	  /*
	  function attitude_dre(){
			 if(begin_state==1){
				 window.myLine.destroy(); 
			 }
			 if(begin_state==3){
	     window.myPolarArea.destroy();
		}
		
		var ctx_line = document.getElementById("canvas-line").getContext("2d");
         myLineLine = new Chart(ctx_line,config3);
		 
		  drawpicture.style.display='';
		  config3.data.labels=[];
		  config3.data.datasets=[];
          newDataset3.data=[];
		   var flag=0;
      
        // 横坐标刻度
		
				  $.getJSON("http://localhost:8080/dem/oneprofile?lon=116&lat=39&angle=60&dis=10000&num=1",function(data) {
				 
				// $.getJSON("http://localhost:8080/dem/zbj?lon=106&lat=36&scope=321&num=1&h=10",function(data) {
				    var level_num=Math.round(data.length/20)
				   for(var j=0;j<data.length;j++){
					   
					 if ((j%level_num)==0) 
					 {var dis=data[j].dis;
				 var height=data[j].height;
						config3.data.labels.push(dis) 
						 newDataset3.data.push(height);
					 }
             
                  
           //   newDataset3.backgroundColor.push(color(chartColors.blue).alpha(0.5).rgbString());
          //    newDataset3.borderWidth.push(0);
               }
      		     config3.data.datasets.push(newDataset3);
            window.myLineLine.update();
			   })
		
   //  if (flag == 0) {
   //      for (var m = 0; m < label_array.length; m++) {
   //          config3.data.labels.push(label_array[m]);
   //      }
   //
   //  
   //
   //      for (var j = 0; j < data_array.length; j++) {
   //          newDataset3.data.push(data_array[j]);
   //      }
           
            flag = 1;
        
		   begin_state=2; 
      }
	  */
	  //通过一点坐标和角度距离求两点的高程
	  
	  function atti_convert(){
		  var angle_value=document.getElementById("point_angle").value;
	      var indis_value=document.getElementById("point_dis").value;
	
		   if(begin_state==1){
				 window.myLine.destroy(); 
			 }
			 if(begin_state==3){
	     window.myPolarArea.destroy();
		}
		
		var ctx_line = document.getElementById("canvas-line").getContext("2d");
         myLineLine = new Chart(ctx_line,config3);
		 
		  drawpicture.style.display='';
		  config3.data.labels=[];
		  config3.data.datasets=[];
          newDataset3.data=[];
		   var flag=0;
		   
		      str=viewer.selectedEntity._name.split("@");
		  lat_select=str[1];
		  lon_select=str[0];
		  scope_select=str[2];
		  height_select=str[3];
			
		    $.getJSON("http://localhost:8080/dem/oneprofile?lon="+lon_select+"&lat="+lat_select+"&angle="+angle_value+"&dis="+indis_value+"&num=1",function(data) {
				 
				    var level_num=Math.round(data.length/20)
				   for(var j=0;j<data.length;j++){
					   
					 if ((j%level_num)==0) 
					 {var dis=data[j].dis;
				 var height=data[j].height;
						config3.data.labels.push(dis) 
						 newDataset3.data.push(height);
					 }
             
                  
          
               }
      		     config3.data.datasets.push(newDataset3);
            window.myLineLine.update();
			   })
           
            flag = 1;
        
		   begin_state=2; 
		  
	  }
	  
	  

	   
 
     


