/*天津建筑面积扩张1975-2015年*/
function cnjs_Change(){
 $('#CNJiangshuiChangeWindow').window('open');
 $('#CNJiangshuiChangeWindow').window({left:300,top:50});	
 //locateTO(117.3462305,39.3512083,280000);
};
function cnjs_Cancel(){
 $('#CNJiangshuiChangeWindow').window('close');
   for(var i=0;i<cnjsImgs.length;i++){
		viewer.scene.imageryLayers.remove(cnjsImgs[i]);
		} 
}; 

var cnjsImgs=[];
var cnjs_timer;
var cnjs_image_other1961,cnjs_image_other1962,cnjs_image_other1963,cnjs_image_other1964,cnjs_image_other1965,cnjs_image_other1966,cnjs_image_other1967,cnjs_image_other1968,cnjs_image_other1969,cnjs_image_other1970;
var cnjs_image_other1971,cnjs_image_other1972,cnjs_image_other1973,cnjs_image_other1974,cnjs_image_other1975,cnjs_image_other1976,cnjs_image_other1977,cnjs_image_other1978,cnjs_image_other1979,cnjs_image_other1980;
var cnjs_image_other1981,cnjs_image_other1982,cnjs_image_other1983,cnjs_image_other1984,cnjs_image_other1985,cnjs_image_other1986,cnjs_image_other1987,cnjs_image_other1988,cnjs_image_other1989,cnjs_image_other1990;
var cnjs_image_other1991,cnjs_image_other1992,cnjs_image_other1993,cnjs_image_other1994,cnjs_image_other1995,cnjs_image_other1996,cnjs_image_other1997,cnjs_image_other1998,cnjs_image_other1999,cnjs_image_other2000;
var cnjs_image_other2001,cnjs_image_other2002,cnjs_image_other2003,cnjs_image_other2004,cnjs_image_other2005,cnjs_image_other2006,cnjs_image_other2007,cnjs_image_other2008,cnjs_image_other2009,cnjs_image_other2010;
var cnjs_image_other2011,cnjs_image_other2012,cnjs_image_other2013,cnjs_image_other2014,cnjs_image_other2015,cnjs_image_other2016;

	var cnjs_slider=document.getElementById("cnjs_slider");
        var cnjs_text=document.getElementById("cnjs_text");
        cnjs_slider.addEventListener("mouseup",function(){
           var slider_cnjs=cnjs_slider.value;
             switch(slider_cnjs){ 
        	  case "1961":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1961=image_show("../../otherData/jiangshui_change/1961/",0.3);
				 cnjs_text.value=slider_cnjs;
                 cnjsImgs.push(cnjs_image_other1961);				  
        		  break;
        	  case "1962":
        	    for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1962=image_show("../../otherData/jiangshui_change/1962/",0.3);
				 cnjs_text.value=slider_cnjs;
                 cnjsImgs.push(cnjs_image_other1962);				 
        		 break;
        	  case "1963":
        	     for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1963=image_show("../../otherData/jiangshui_change/1963/",0.3);
				 cnjs_text.value=slider_cnjs;
				 cnjsImgs.push(cnjs_image_other1963);
        		 break;
        	  case "1964": 
        	    for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1964=image_show("../../otherData/jiangshui_change/1964/",0.3);
				 cnjs_text.value=slider_cnjs;
				 cnjsImgs.push(cnjs_image_other1964);
        		 break;
        	 case "1965":
        	      for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1965=image_show("../../otherData/jiangshui_change/1965/",0.3);
				 cnjs_text.value=slider_cnjs;
				 cnjsImgs.push(cnjs_image_other1965);
        		 break;
        	 case "1966":
        	      for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1966=image_show("../../otherData/jiangshui_change/1966/",0.3);
				 cnjs_text.value=slider_cnjs;
				 cnjsImgs.push(cnjs_image_other1966);
        		 break;
        	 case "1967":
        	      for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1967=image_show("../../otherData/jiangshui_change/1967/",0.3);
				 cnjs_text.value=slider_cnjs;
				 cnjsImgs.push(cnjs_image_other1967);
        		 break;
        	 case "1968":
        	 	 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1968=image_show("../../otherData/jiangshui_change/1968/",0.3);
				 cnjs_text.value=slider_cnjs;
				 cnjsImgs.push(cnjs_image_other1968);
        		 break;
        	 case "1969":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
                 cnjs_image_other1969=image_show("../../otherData/jiangshui_change/1969/",0.3);
				 cnjs_text.value=slider_cnjs;
				 cnjsImgs.push(cnjs_image_other1969);
        		 break;
			 case "1970":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
                 cnjs_image_other1970=image_show("../../otherData/jiangshui_change/1970/",0.3);
				 cnjs_text.value=slider_cnjs;
				 cnjsImgs.push(cnjs_image_other1970);
        		 break;	
             case "1971":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1971=image_show("../../otherData/jiangshui_change/1971/",0.3);
				 cnjs_text.value=slider_cnjs;
                 cnjsImgs.push(cnjs_image_other1971);				  
        		  break;
        	  case "1972":
        	    for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1972=image_show("../../otherData/jiangshui_change/1972/",0.3);
				 cnjs_text.value=slider_cnjs;
                 cnjsImgs.push(cnjs_image_other1972);				 
        		 break;
        	  case "1973":
        	     for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1973=image_show("../../otherData/jiangshui_change/1973/",0.3);
				 cnjs_text.value=slider_cnjs;
				 cnjsImgs.push(cnjs_image_other1973);
        		 break;
        	  case "1974": 
        	    for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1974=image_show("../../otherData/jiangshui_change/1974/",0.3);
				 cnjs_text.value=slider_cnjs;
				 cnjsImgs.push(cnjs_image_other1974);
        		 break;
        	 case "1975":
        	      for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1975=image_show("../../otherData/jiangshui_change/1975/",0.3);
				 cnjs_text.value=slider_cnjs;
				 cnjsImgs.push(cnjs_image_other1975);
        		 break;
        	 case "1976":
        	      for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1976=image_show("../../otherData/jiangshui_change/1976/",0.3);
				 cnjs_text.value=slider_cnjs;
				 cnjsImgs.push(cnjs_image_other1976);
        		 break;
        	 case "1977":
        	      for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1977=image_show("../../otherData/jiangshui_change/1977/",0.3);
				 cnjs_text.value=slider_cnjs;
				 cnjsImgs.push(cnjs_image_other1977);
        		 break;
        	 case "1978":
        	 	 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1978=image_show("../../otherData/jiangshui_change/1978/",0.3);
				 cnjs_text.value=slider_cnjs;
				 cnjsImgs.push(cnjs_image_other1978);
        		 break;
        	 case "1979":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
                 cnjs_image_other1979=image_show("../../otherData/jiangshui_change/1979/",0.3);
				 cnjs_text.value=slider_cnjs;
				 cnjsImgs.push(cnjs_image_other1979);
        		 break;
			 case "1980":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
                 cnjs_image_other1980=image_show("../../otherData/jiangshui_change/1980/",0.3);
				 cnjs_text.value=slider_cnjs;
				 cnjsImgs.push(cnjs_image_other1980);
        		 break;
              case "1981":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1981=image_show("../../otherData/jiangshui_change/1981/",0.3);
				 cnjs_text.value=slider_cnjs;
                 cnjsImgs.push(cnjs_image_other1981);				  
        		  break;
        	  case "1982":
        	    for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1982=image_show("../../otherData/jiangshui_change/1982/",0.3);
				 cnjs_text.value=slider_cnjs;
                 cnjsImgs.push(cnjs_image_other1982);				 
        		 break;
        	  case "1983":
        	     for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1983=image_show("../../otherData/jiangshui_change/1983/",0.3);
				 cnjs_text.value=slider_cnjs;
				 cnjsImgs.push(cnjs_image_other1983);
        		 break;
        	  case "1984": 
        	    for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1984=image_show("../../otherData/jiangshui_change/1984/",0.3);
				 cnjs_text.value=slider_cnjs;
				 cnjsImgs.push(cnjs_image_other1984);
        		 break;
        	 case "1985":
        	      for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1985=image_show("../../otherData/jiangshui_change/1985/",0.3);
				 cnjs_text.value=slider_cnjs;
				 cnjsImgs.push(cnjs_image_other1985);
        		 break;
        	 case "1986":
        	      for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1986=image_show("../../otherData/jiangshui_change/1986/",0.3);
				 cnjs_text.value=slider_cnjs;
				 cnjsImgs.push(cnjs_image_other1986);
        		 break;
        	 case "1987":
        	      for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1987=image_show("../../otherData/jiangshui_change/1987/",0.3);
				 cnjs_text.value=slider_cnjs;
				 cnjsImgs.push(cnjs_image_other1987);
        		 break;
        	 case "1988":
        	 	 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1988=image_show("../../otherData/jiangshui_change/1988/",0.3);
				 cnjs_text.value=slider_cnjs;
				 cnjsImgs.push(cnjs_image_other1988);
        		 break;
        	 case "1989":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
                 cnjs_image_other1989=image_show("../../otherData/jiangshui_change/1989/",0.3);
				 cnjs_text.value=slider_cnjs;
				 cnjsImgs.push(cnjs_image_other1989);
        		 break;
			 case "1990":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
                 cnjs_image_other1990=image_show("../../otherData/jiangshui_change/1990/",0.3);
				 cnjs_text.value=slider_cnjs;
				 cnjsImgs.push(cnjs_image_other1990);
        		 break;	
             case "1991":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1991=image_show("../../otherData/jiangshui_change/1991/",0.3);
				 cnjs_text.value=slider_cnjs;
                 cnjsImgs.push(cnjs_image_other1991);				  
        		  break;
        	  case "1992":
        	    for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1992=image_show("../../otherData/jiangshui_change/1992/",0.3);
				 cnjs_text.value=slider_cnjs;
                 cnjsImgs.push(cnjs_image_other1992);				 
        		 break;
        	  case "1993":
        	     for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1993=image_show("../../otherData/jiangshui_change/1993/",0.3);
				 cnjs_text.value=slider_cnjs;
				 cnjsImgs.push(cnjs_image_other1993);
        		 break;
        	  case "1994": 
        	    for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1994=image_show("../../otherData/jiangshui_change/1994/",0.3);
				 cnjs_text.value=slider_cnjs;
				 cnjsImgs.push(cnjs_image_other1994);
        		 break;
        	 case "1995":
        	      for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1995=image_show("../../otherData/jiangshui_change/1995/",0.3);
				 cnjs_text.value=slider_cnjs;
				 cnjsImgs.push(cnjs_image_other1995);
        		 break;
        	 case "1996":
        	      for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1996=image_show("../../otherData/jiangshui_change/1996/",0.3);
				 cnjs_text.value=slider_cnjs;
				 cnjsImgs.push(cnjs_image_other1996);
        		 break;
        	 case "1997":
        	      for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1997=image_show("../../otherData/jiangshui_change/1997/",0.3);
				 cnjs_text.value=slider_cnjs;
				 cnjsImgs.push(cnjs_image_other1997);
        		 break;
        	 case "1998":
        	 	 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1998=image_show("../../otherData/jiangshui_change/1998/",0.3);
				 cnjs_text.value=slider_cnjs;
				 cnjsImgs.push(cnjs_image_other1998);
        		 break;
        	 case "1999":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
                 cnjs_image_other1999=image_show("../../otherData/jiangshui_change/1999/",0.3);
				 cnjs_text.value=slider_cnjs;
				 cnjsImgs.push(cnjs_image_other1999);
        		 break;
			 case "2000":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
                 cnjs_image_other2000=image_show("../../otherData/jiangshui_change/2000/",0.3);
				 cnjs_text.value=slider_cnjs;
				 cnjsImgs.push(cnjs_image_other2000);
        		 break;	
             case "2000":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
                 cnjs_image_other2000=image_show("../../otherData/jiangshui_change/2000/",0.3);
				 cnjs_text.value=slider_cnjs;
				 cnjsImgs.push(cnjs_image_other2000);
        		 break;	
             case "2001":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
                 cnjs_image_other2001=image_show("../../otherData/jiangshui_change/2001/",0.3);
				 cnjs_text.value=slider_cnjs;
				 cnjsImgs.push(cnjs_image_other2001);
        		 break;	
             case "2002":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
                 cnjs_image_other2002=image_show("../../otherData/jiangshui_change/2002/",0.3);
				 cnjs_text.value=slider_cnjs;
				 cnjsImgs.push(cnjs_image_other2002);
        		 break;	
              case "2003":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
                 cnjs_image_other2003=image_show("../../otherData/jiangshui_change/2003/",0.3);
				 cnjs_text.value=slider_cnjs;
				 cnjsImgs.push(cnjs_image_other2003);
        		 break;
             case "2004":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
                 cnjs_image_other2004=image_show("../../otherData/jiangshui_change/2004/",0.3);
				 cnjs_text.value=slider_cnjs;
				 cnjsImgs.push(cnjs_image_other2004);
        		 break;	
             case "2005":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
                 cnjs_image_other2005=image_show("../../otherData/jiangshui_change/2005/",0.3);
				 cnjs_text.value=slider_cnjs;
				 cnjsImgs.push(cnjs_image_other2005);
        		 break;	
             case "2006":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
                 cnjs_image_other2006=image_show("../../otherData/jiangshui_change/2006/",0.3);
				 cnjs_text.value=slider_cnjs;
				 cnjsImgs.push(cnjs_image_other2006);
        		 break;	
              case "2007":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
                 cnjs_image_other2007=image_show("../../otherData/jiangshui_change/2007/",0.3);
				 cnjs_text.value=slider_cnjs;
				 cnjsImgs.push(cnjs_image_other2007);
        		 break;	
             case "2008":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
                 cnjs_image_other2008=image_show("../../otherData/jiangshui_change/2008/",0.3);
				 cnjs_text.value=slider_cnjs;
				 cnjsImgs.push(cnjs_image_other2008);
        		 break;	
             case "2009":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
                 cnjs_image_other2009=image_show("../../otherData/jiangshui_change/2009/",0.3);
				 cnjs_text.value=slider_cnjs;
				 cnjsImgs.push(cnjs_image_other2009);
        		 break;	
             case "2010":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
                 cnjs_image_other2010=image_show("../../otherData/jiangshui_change/2010/",0.3);
				 cnjs_text.value=slider_cnjs;
				 cnjsImgs.push(cnjs_image_other2010);
        		 break;	
             case "2011":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
                 cnjs_image_other2011=image_show("../../otherData/jiangshui_change/2011/",0.3);
				 cnjs_text.value=slider_cnjs;
				 cnjsImgs.push(cnjs_image_other2011);
        		 break;	
              case "2012":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
                 cnjs_image_other2012=image_show("../../otherData/jiangshui_change/2012/",0.3);
				 cnjs_text.value=slider_cnjs;
				 cnjsImgs.push(cnjs_image_other2012);
        		 break;
             case "2013":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
                 cnjs_image_other2013=image_show("../../otherData/jiangshui_change/2013/",0.3);
				 cnjs_text.value=slider_cnjs;
				 cnjsImgs.push(cnjs_image_other2013);
        		 break;	
             case "2014":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
                 cnjs_image_other2014=image_show("../../otherData/jiangshui_change/2014/",0.3);
				 cnjs_text.value=slider_cnjs;
				 cnjsImgs.push(cnjs_image_other2014);
        		 break;	
             case "2015":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
                 cnjs_image_other2015=image_show("../../otherData/jiangshui_change/2015/",0.3);
				 cnjs_text.value=slider_cnjs;
				 cnjsImgs.push(cnjs_image_other2015);
        		 break;	
              case "2016":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
                 cnjs_image_other2016=image_show("../../otherData/jiangshui_change/2016/",0.3);
				 cnjs_text.value=slider_cnjs;
				 cnjsImgs.push(cnjs_image_other2016);
        		 break;				 
        	}
        });
        
        cnjs_text.addEventListener("change",function(){
           var text_cnjs=cnjs_text.value;
           //cnjs_slider.value=cnjs_text.value;
           switch(text_cnjs){ 
        	  /* case "1975":
        		 viewer.scene.imageryLayers.remove(cnjs_image_other1962);
        		 viewer.scene.imageryLayers.remove(cnjs_image_other1963);
        		 viewer.scene.imageryLayers.remove(cnjs_image_other1964);
        		 viewer.scene.imageryLayers.remove(cnjs_image_other1965);
        		 viewer.scene.imageryLayers.remove(cnjs_image_other1966);
        		 viewer.scene.imageryLayers.remove(cnjs_image_other1967);
        		 viewer.scene.imageryLayers.remove(cnjs_image_other1968);
        		 viewer.scene.imageryLayers.remove(cnjs_image_other1969);
        		 cnjs_image_other1961=image_show("../../otherData/tj_change/1975/",0.3); 
				 cnjs_slider.value=text_cnjs;
                 cnjsImgs.push(cnjs_image_other1961);				  
        		 break; */
        	   case "1961":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1961=image_show("../../otherData/jiangshui_change/1961/",0.3);
				 cnjs_slider.value=text_cnjs;
                 cnjsImgs.push(cnjs_image_other1961);				  
        		  break;
        	  case "1962":
        	    for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1962=image_show("../../otherData/jiangshui_change/1962/",0.3);
				 cnjs_slider.value=text_cnjs;
                 cnjsImgs.push(cnjs_image_other1962);				 
        		 break;
        	  case "1963":
        	     for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1963=image_show("../../otherData/jiangshui_change/1963/",0.3);
				 cnjs_slider.value=text_cnjs;
				 cnjsImgs.push(cnjs_image_other1963);
        		 break;
        	  case "1964": 
        	    for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1964=image_show("../../otherData/jiangshui_change/1964/",0.3);
				 cnjs_slider.value=text_cnjs;
				 cnjsImgs.push(cnjs_image_other1964);
        		 break;
        	 case "1965":
        	      for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1965=image_show("../../otherData/jiangshui_change/1965/",0.3);
				 cnjs_slider.value=text_cnjs;
				 cnjsImgs.push(cnjs_image_other1965);
        		 break;
        	 case "1966":
        	      for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1966=image_show("../../otherData/jiangshui_change/1966/",0.3);
				 cnjs_slider.value=text_cnjs;
				 cnjsImgs.push(cnjs_image_other1966);
        		 break;
        	 case "1967":
        	      for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1967=image_show("../../otherData/jiangshui_change/1967/",0.3);
				 cnjs_slider.value=text_cnjs;
				 cnjsImgs.push(cnjs_image_other1967);
        		 break;
        	 case "1968":
        	 	 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1968=image_show("../../otherData/jiangshui_change/1968/",0.3);
				 cnjs_slider.value=text_cnjs;
				 cnjsImgs.push(cnjs_image_other1968);
        		 break;
        	 case "1969":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
                 cnjs_image_other1969=image_show("../../otherData/jiangshui_change/1969/",0.3);
				 cnjs_slider.value=text_cnjs;
				 cnjsImgs.push(cnjs_image_other1969);
        		 break;
			 case "1970":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
                 cnjs_image_other1970=image_show("../../otherData/jiangshui_change/1970/",0.3);
				 cnjs_slider.value=text_cnjs;
				 cnjsImgs.push(cnjs_image_other1970);
        		 break;	
             case "1971":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1971=image_show("../../otherData/jiangshui_change/1971/",0.3);
				 cnjs_slider.value=text_cnjs;
                 cnjsImgs.push(cnjs_image_other1971);				  
        		  break;
        	  case "1972":
        	    for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1972=image_show("../../otherData/jiangshui_change/1972/",0.3);
				 cnjs_slider.value=text_cnjs;
                 cnjsImgs.push(cnjs_image_other1972);				 
        		 break;
        	  case "1973":
        	     for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1973=image_show("../../otherData/jiangshui_change/1973/",0.3);
				 cnjs_slider.value=text_cnjs;
				 cnjsImgs.push(cnjs_image_other1973);
        		 break;
        	  case "1974": 
        	    for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1974=image_show("../../otherData/jiangshui_change/1974/",0.3);
				 cnjs_slider.value=text_cnjs;
				 cnjsImgs.push(cnjs_image_other1974);
        		 break;
        	 case "1975":
        	      for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1975=image_show("../../otherData/jiangshui_change/1975/",0.3);
				 cnjs_slider.value=text_cnjs;
				 cnjsImgs.push(cnjs_image_other1975);
        		 break;
        	 case "1976":
        	      for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1976=image_show("../../otherData/jiangshui_change/1976/",0.3);
				 cnjs_slider.value=text_cnjs;
				 cnjsImgs.push(cnjs_image_other1976);
        		 break;
        	 case "1977":
        	      for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1977=image_show("../../otherData/jiangshui_change/1977/",0.3);
				 cnjs_slider.value=text_cnjs;
				 cnjsImgs.push(cnjs_image_other1977);
        		 break;
        	 case "1978":
        	 	 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1978=image_show("../../otherData/jiangshui_change/1978/",0.3);
				 cnjs_slider.value=text_cnjs;
				 cnjsImgs.push(cnjs_image_other1978);
        		 break;
        	 case "1979":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
                 cnjs_image_other1979=image_show("../../otherData/jiangshui_change/1979/",0.3);
				 cnjs_slider.value=text_cnjs;
				 cnjsImgs.push(cnjs_image_other1979);
        		 break;
			 case "1980":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
                 cnjs_image_other1980=image_show("../../otherData/jiangshui_change/1980/",0.3);
				 cnjs_slider.value=text_cnjs;
				 cnjsImgs.push(cnjs_image_other1980);
        		 break;
              case "1981":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1981=image_show("../../otherData/jiangshui_change/1981/",0.3);
				 cnjs_slider.value=text_cnjs;
                 cnjsImgs.push(cnjs_image_other1981);				  
        		  break;
        	  case "1982":
        	    for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1982=image_show("../../otherData/jiangshui_change/1982/",0.3);
				 cnjs_slider.value=text_cnjs;
                 cnjsImgs.push(cnjs_image_other1982);				 
        		 break;
        	  case "1983":
        	     for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1983=image_show("../../otherData/jiangshui_change/1983/",0.3);
				 cnjs_slider.value=text_cnjs;
				 cnjsImgs.push(cnjs_image_other1983);
        		 break;
        	  case "1984": 
        	    for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1984=image_show("../../otherData/jiangshui_change/1984/",0.3);
				 cnjs_slider.value=text_cnjs;
				 cnjsImgs.push(cnjs_image_other1984);
        		 break;
        	 case "1985":
        	      for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1985=image_show("../../otherData/jiangshui_change/1985/",0.3);
				 cnjs_slider.value=text_cnjs;
				 cnjsImgs.push(cnjs_image_other1985);
        		 break;
        	 case "1986":
        	      for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1986=image_show("../../otherData/jiangshui_change/1986/",0.3);
				 cnjs_slider.value=text_cnjs;
				 cnjsImgs.push(cnjs_image_other1986);
        		 break;
        	 case "1987":
        	      for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1987=image_show("../../otherData/jiangshui_change/1987/",0.3);
				 cnjs_slider.value=text_cnjs;
				 cnjsImgs.push(cnjs_image_other1987);
        		 break;
        	 case "1988":
        	 	 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1988=image_show("../../otherData/jiangshui_change/1988/",0.3);
				 cnjs_slider.value=text_cnjs;
				 cnjsImgs.push(cnjs_image_other1988);
        		 break;
        	 case "1989":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
                 cnjs_image_other1989=image_show("../../otherData/jiangshui_change/1989/",0.3);
				 cnjs_slider.value=text_cnjs;
				 cnjsImgs.push(cnjs_image_other1989);
        		 break;
			 case "1990":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
                 cnjs_image_other1990=image_show("../../otherData/jiangshui_change/1990/",0.3);
				 cnjs_slider.value=text_cnjs;
				 cnjsImgs.push(cnjs_image_other1990);
        		 break;	
             case "1991":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1991=image_show("../../otherData/jiangshui_change/1991/",0.3);
				 cnjs_slider.value=text_cnjs;
                 cnjsImgs.push(cnjs_image_other1991);				  
        		  break;
        	  case "1992":
        	    for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1992=image_show("../../otherData/jiangshui_change/1992/",0.3);
				 cnjs_slider.value=text_cnjs;
                 cnjsImgs.push(cnjs_image_other1992);				 
        		 break;
        	  case "1993":
        	     for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1993=image_show("../../otherData/jiangshui_change/1993/",0.3);
				 cnjs_slider.value=text_cnjs;
				 cnjsImgs.push(cnjs_image_other1993);
        		 break;
        	  case "1994": 
        	    for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1994=image_show("../../otherData/jiangshui_change/1994/",0.3);
				 cnjs_slider.value=text_cnjs;
				 cnjsImgs.push(cnjs_image_other1994);
        		 break;
        	 case "1995":
        	      for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1995=image_show("../../otherData/jiangshui_change/1995/",0.3);
				 cnjs_slider.value=text_cnjs;
				 cnjsImgs.push(cnjs_image_other1995);
        		 break;
        	 case "1996":
        	      for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1996=image_show("../../otherData/jiangshui_change/1996/",0.3);
				 cnjs_slider.value=text_cnjs;
				 cnjsImgs.push(cnjs_image_other1996);
        		 break;
        	 case "1997":
        	      for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1997=image_show("../../otherData/jiangshui_change/1997/",0.3);
				 cnjs_slider.value=text_cnjs;
				 cnjsImgs.push(cnjs_image_other1997);
        		 break;
        	 case "1998":
        	 	 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        		 cnjs_image_other1998=image_show("../../otherData/jiangshui_change/1998/",0.3);
				 cnjs_slider.value=text_cnjs;
				 cnjsImgs.push(cnjs_image_other1998);
        		 break;
        	 case "1999":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
                 cnjs_image_other1999=image_show("../../otherData/jiangshui_change/1999/",0.3);
				 cnjs_slider.value=text_cnjs;
				 cnjsImgs.push(cnjs_image_other1999);
        		 break;
			 case "2000":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
                 cnjs_image_other2000=image_show("../../otherData/jiangshui_change/2000/",0.3);
				 cnjs_slider.value=text_cnjs;
				 cnjsImgs.push(cnjs_image_other2000);
        		 break;	
             case "2000":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
                 cnjs_image_other2000=image_show("../../otherData/jiangshui_change/2000/",0.3);
				 cnjs_slider.value=text_cnjs;
				 cnjsImgs.push(cnjs_image_other2000);
        		 break;	
             case "2001":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
                 cnjs_image_other2001=image_show("../../otherData/jiangshui_change/2001/",0.3);
				 cnjs_slider.value=text_cnjs;
				 cnjsImgs.push(cnjs_image_other2001);
        		 break;	
             case "2002":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
                 cnjs_image_other2002=image_show("../../otherData/jiangshui_change/2002/",0.3);
				 cnjs_slider.value=text_cnjs;
				 cnjsImgs.push(cnjs_image_other2002);
        		 break;	
              case "2003":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
                 cnjs_image_other2003=image_show("../../otherData/jiangshui_change/2003/",0.3);
				 cnjs_slider.value=text_cnjs;
				 cnjsImgs.push(cnjs_image_other2003);
        		 break;
             case "2004":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
                 cnjs_image_other2004=image_show("../../otherData/jiangshui_change/2004/",0.3);
				 cnjs_slider.value=text_cnjs;
				 cnjsImgs.push(cnjs_image_other2004);
        		 break;	
             case "2005":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
                 cnjs_image_other2005=image_show("../../otherData/jiangshui_change/2005/",0.3);
				 cnjs_slider.value=text_cnjs;
				 cnjsImgs.push(cnjs_image_other2005);
        		 break;	
             case "2006":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
                 cnjs_image_other2006=image_show("../../otherData/jiangshui_change/2006/",0.3);
				 cnjs_slider.value=text_cnjs;
				 cnjsImgs.push(cnjs_image_other2006);
        		 break;	
              case "2007":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
                 cnjs_image_other2007=image_show("../../otherData/jiangshui_change/2007/",0.3);
				 cnjs_slider.value=text_cnjs;
				 cnjsImgs.push(cnjs_image_other2007);
        		 break;	
             case "2008":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
                 cnjs_image_other2008=image_show("../../otherData/jiangshui_change/2008/",0.3);
				 cnjs_slider.value=text_cnjs;
				 cnjsImgs.push(cnjs_image_other2008);
        		 break;	
             case "2009":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
                 cnjs_image_other2009=image_show("../../otherData/jiangshui_change/2009/",0.3);
				 cnjs_slider.value=text_cnjs;
				 cnjsImgs.push(cnjs_image_other2009);
        		 break;	
             case "2010":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
                 cnjs_image_other2010=image_show("../../otherData/jiangshui_change/2010/",0.3);
				 cnjs_slider.value=text_cnjs;
				 cnjsImgs.push(cnjs_image_other2010);
        		 break;	
             case "2011":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
                 cnjs_image_other2011=image_show("../../otherData/jiangshui_change/2011/",0.3);
				 cnjs_slider.value=text_cnjs;
				 cnjsImgs.push(cnjs_image_other2011);
        		 break;	
              case "2012":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
                 cnjs_image_other2012=image_show("../../otherData/jiangshui_change/2012/",0.3);
				 cnjs_slider.value=text_cnjs;
				 cnjsImgs.push(cnjs_image_other2012);
        		 break;
             case "2013":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
                 cnjs_image_other2013=image_show("../../otherData/jiangshui_change/2013/",0.3);
				 cnjs_slider.value=text_cnjs;
				 cnjsImgs.push(cnjs_image_other2013);
        		 break;	
             case "2014":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
                 cnjs_image_other2014=image_show("../../otherData/jiangshui_change/2014/",0.3);
				 cnjs_slider.value=text_cnjs;
				 cnjsImgs.push(cnjs_image_other2014);
        		 break;	
             case "2015":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
                 cnjs_image_other2015=image_show("../../otherData/jiangshui_change/2015/",0.3);
				 cnjs_slider.value=text_cnjs;
				 cnjsImgs.push(cnjs_image_other2015);
        		 break;	
              case "2016":
        		 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
                 cnjs_image_other2016=image_show("../../otherData/jiangshui_change/2016/",0.3);
				 cnjs_slider.value=text_cnjs;
				 cnjsImgs.push(cnjs_image_other2016);
        		 break;	
        	}
        });
        /* 动态按钮事件 */
		var cnjsstate=0;
		var cnsyPlay=document.getElementById("cnjs_play");
		var cnjsBP=document.getElementById("cnjsBP");
		cnsyPlay.onclick=function(){
		if(cnjsstate==0){
			cnjsBP.removeAttribute("class","fa fa-play fa-lg");
			cnjsBP.setAttribute("class","fa fa-pause fa-lg");
			
        /* viewer.camera.flyTo({
            destination : Cesium.Cartesian3.fromDegrees(117.3462305,39.3512083,280000),
        	duration:1
            }); */
				clearInterval(cnjs_timer);
				for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
				for(var j=1961;j<2017;j++){
				viewer.scene.imageryLayers.remove('cnjs_image_other'+j);	
				}
		
                cnjs_timer=setInterval(cnjs_change,2000);
        
			cnjsstate=1;
		}else if(cnjsstate==1){
			cnjsBP.removeAttribute("class","fa fa-pause fa-lg");
			cnjsBP.setAttribute("class","fa fa-play fa-lg");
			cnjsstate=0;
			
			clearInterval(cnjs_timer);
		    cnjs_i=1960;
			
				 for(var j=1961;j<2017;j++){
				viewer.scene.imageryLayers.remove('cnjs_image_other'+j);	
				}
				
				for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
        
		}
        }
       /* 动态函数 */
        var cnjs_i=1960;
        
        function cnjs_change(){
             cnjs_i++;
            if(cnjs_i==1961){
				for(var i=1961;i<2017;i++){
					viewer.scene.imageryLayers.remove('cnjs_image_other'+i);	
				}
        	    cnjs_image_other1961=image_show("../../otherData/jiangshui_change/1961/",0.3);
                cnjsImgs.push(cnjs_image_other1961);
                cnjs_slider.value=1961;
                cnjs_text.value=1961;				
        	}else if(cnjs_i==1962){
        	   viewer.scene.imageryLayers.remove(cnjs_image_other1961);
                cnjs_image_other1962=image_show("../../otherData/jiangshui_change/1962/",0.3);
                cnjsImgs.push(cnjs_image_other1962);
                cnjs_slider.value=1962;
                cnjs_text.value=1962;				
        	}else if(cnjs_i==1963){
        	    viewer.scene.imageryLayers.remove(cnjs_image_other1962);
                 cnjs_image_other1963=image_show("../../otherData/jiangshui_change/1963/",0.3);
				 cnjsImgs.push(cnjs_image_other1963);
                cnjs_slider.value=1963;
                cnjs_text.value=1963;
        	}else if(cnjs_i==1964){
        	    viewer.scene.imageryLayers.remove(cnjs_image_other1963);
                 cnjs_image_other1964=image_show("../../otherData/jiangshui_change/1964/",0.3);
				 cnjsImgs.push(cnjs_image_other1964);
                cnjs_slider.value=1964;
                cnjs_text.value=1964;
        	}else if(cnjs_i==1965){
        	    viewer.scene.imageryLayers.remove(cnjs_image_other1964);
                 cnjs_image_other1965=image_show("../../otherData/jiangshui_change/1965/",0.3);
				 cnjsImgs.push(cnjs_image_other1965);
                cnjs_slider.value=1965;
                cnjs_text.value=1965;
        	}else if(cnjs_i==1966){
        	    viewer.scene.imageryLayers.remove(cnjs_image_other1965);
                 cnjs_image_other1966=image_show("../../otherData/jiangshui_change/1966/",0.3);
				 cnjsImgs.push(cnjs_image_other1966);
                cnjs_slider.value=1966;
                cnjs_text.value=1966;
        	}else if(cnjs_i==1967){
        	    viewer.scene.imageryLayers.remove(cnjs_image_other1966);
                 cnjs_image_other1967=image_show("../../otherData/jiangshui_change/1967/",0.3);
				 cnjsImgs.push(cnjs_image_other1967);
                cnjs_slider.value=1967;
                cnjs_text.value=1967;
        	}else if(cnjs_i==1968){
        	    viewer.scene.imageryLayers.remove(cnjs_image_other1967);
                 cnjs_image_other1968=image_show("../../otherData/jiangshui_change/1968/",0.3);
				 cnjsImgs.push(cnjs_image_other1968);
                cnjs_slider.value=1968;
                cnjs_text.value=1968;
        	}else if(cnjs_i==1969){
        	    viewer.scene.imageryLayers.remove(cnjs_image_other1968);
                 cnjs_image_other1969=image_show("../../otherData/jiangshui_change/1969/",0.3);
				 cnjsImgs.push(cnjs_image_other1969);
                cnjs_slider.value=1969;
                cnjs_text.value=1969;
        	}else if(cnjs_i==1970){
        	   viewer.scene.imageryLayers.remove(cnjs_image_other1969);
                cnjs_image_other1970=image_show("../../otherData/jiangshui_change/1970/",0.3);
                cnjsImgs.push(cnjs_image_other1970);
                cnjs_slider.value=1970;
                cnjs_text.value=1970;				
        	}else if(cnjs_i==1971){
        	    viewer.scene.imageryLayers.remove(cnjs_image_other1970);
                 cnjs_image_other1971=image_show("../../otherData/jiangshui_change/1971/",0.3);
				 cnjsImgs.push(cnjs_image_other1971);
                cnjs_slider.value=1971;
                cnjs_text.value=1971;
        	}else if(cnjs_i==1972){
        	    viewer.scene.imageryLayers.remove(cnjs_image_other1971);
                 cnjs_image_other1972=image_show("../../otherData/jiangshui_change/1972/",0.3);
				 cnjsImgs.push(cnjs_image_other1972);
                cnjs_slider.value=1972;
                cnjs_text.value=1972;
        	}else if(cnjs_i==1973){
        	    viewer.scene.imageryLayers.remove(cnjs_image_other1972);
                 cnjs_image_other1973=image_show("../../otherData/jiangshui_change/1973/",0.3);
				 cnjsImgs.push(cnjs_image_other1973);
                cnjs_slider.value=1973;
                cnjs_text.value=1973;
        	}else if(cnjs_i==1974){
        	    viewer.scene.imageryLayers.remove(cnjs_image_other1973);
                 cnjs_image_other1974=image_show("../../otherData/jiangshui_change/1974/",0.3);
				 cnjsImgs.push(cnjs_image_other1974);
                cnjs_slider.value=1974;
                cnjs_text.value=1974;
        	}else if(cnjs_i==1975){
        	    viewer.scene.imageryLayers.remove(cnjs_image_other1974);
                 cnjs_image_other1975=image_show("../../otherData/jiangshui_change/1975/",0.3);
				 cnjsImgs.push(cnjs_image_other1975);
                cnjs_slider.value=1975;
                cnjs_text.value=1975;
        	}else if(cnjs_i==1976){
        	    viewer.scene.imageryLayers.remove(cnjs_image_other1975);
                 cnjs_image_other1976=image_show("../../otherData/jiangshui_change/1976/",0.3);
				 cnjsImgs.push(cnjs_image_other1976);
                cnjs_slider.value=1976;
                cnjs_text.value=1976;
        	}else if(cnjs_i==1977){
        	    viewer.scene.imageryLayers.remove(cnjs_image_other1976);
                 cnjs_image_other1977=image_show("../../otherData/jiangshui_change/1977/",0.3);
				 cnjsImgs.push(cnjs_image_other1977);
                cnjs_slider.value=1977;
                cnjs_text.value=1977;
        	}else if(cnjs_i==1978){
        	    viewer.scene.imageryLayers.remove(cnjs_image_other1977);
                 cnjs_image_other1978=image_show("../../otherData/jiangshui_change/1978/",0.3);
				 cnjsImgs.push(cnjs_image_other1978);
                cnjs_slider.value=1978;
                cnjs_text.value=1978;
        	}else if(cnjs_i==1979){
        	   viewer.scene.imageryLayers.remove(cnjs_image_other1978);
                cnjs_image_other1979=image_show("../../otherData/jiangshui_change/1979/",0.3);
                cnjsImgs.push(cnjs_image_other1979);
                cnjs_slider.value=1979;
                cnjs_text.value=1979;				
        	}else if(cnjs_i==1980){
        	    viewer.scene.imageryLayers.remove(cnjs_image_other1979);
                 cnjs_image_other1980=image_show("../../otherData/jiangshui_change/1980/",0.3);
				 cnjsImgs.push(cnjs_image_other1980);
                cnjs_slider.value=1980;
                cnjs_text.value=1980;
        	}else if(cnjs_i==1981){
        	    viewer.scene.imageryLayers.remove(cnjs_image_other1980);
                 cnjs_image_other1981=image_show("../../otherData/jiangshui_change/1981/",0.3);
				 cnjsImgs.push(cnjs_image_other1981);
                cnjs_slider.value=1981;
                cnjs_text.value=1981;
        	}else if(cnjs_i==1982){
        	    viewer.scene.imageryLayers.remove(cnjs_image_other1981);
                 cnjs_image_other1982=image_show("../../otherData/jiangshui_change/1982/",0.3);
				 cnjsImgs.push(cnjs_image_other1982);
                cnjs_slider.value=1982;
                cnjs_text.value=1982;
        	}else if(cnjs_i==1983){
        	    viewer.scene.imageryLayers.remove(cnjs_image_other1982);
                 cnjs_image_other1983=image_show("../../otherData/jiangshui_change/1983/",0.3);
				 cnjsImgs.push(cnjs_image_other1983);
                cnjs_slider.value=1983;
                cnjs_text.value=1983;
        	}else if(cnjs_i==1984){
        	    viewer.scene.imageryLayers.remove(cnjs_image_other1983);
                 cnjs_image_other1984=image_show("../../otherData/jiangshui_change/1984/",0.3);
				 cnjsImgs.push(cnjs_image_other1984);
                cnjs_slider.value=1984;
                cnjs_text.value=1984;
        	}else if(cnjs_i==1985){
        	    viewer.scene.imageryLayers.remove(cnjs_image_other1984);
                 cnjs_image_other1985=image_show("../../otherData/jiangshui_change/1985/",0.3);
				 cnjsImgs.push(cnjs_image_other1985);
                cnjs_slider.value=1985;
                cnjs_text.value=1985;
        	}else if(cnjs_i==1986){
        	    viewer.scene.imageryLayers.remove(cnjs_image_other1985);
                 cnjs_image_other1986=image_show("../../otherData/jiangshui_change/1986/",0.3);
				 cnjsImgs.push(cnjs_image_other1986);
                cnjs_slider.value=1986;
                cnjs_text.value=1986;
        	}else if(cnjs_i==1987){
        	   viewer.scene.imageryLayers.remove(cnjs_image_other1986);
                cnjs_image_other1987=image_show("../../otherData/jiangshui_change/1987/",0.3);
                cnjsImgs.push(cnjs_image_other1987);
                cnjs_slider.value=1987;
                cnjs_text.value=1987;				
        	}else if(cnjs_i==1988){
        	    viewer.scene.imageryLayers.remove(cnjs_image_other1987);
                 cnjs_image_other1988=image_show("../../otherData/jiangshui_change/1988/",0.3);
				 cnjsImgs.push(cnjs_image_other1988);
                cnjs_slider.value=1988;
                cnjs_text.value=1988;
        	}else if(cnjs_i==1989){
        	    viewer.scene.imageryLayers.remove(cnjs_image_other1988);
                 cnjs_image_other1989=image_show("../../otherData/jiangshui_change/1989/",0.3);
				 cnjsImgs.push(cnjs_image_other1989);
                cnjs_slider.value=1989;
                cnjs_text.value=1989;
        	}else if(cnjs_i==1990){
        	    viewer.scene.imageryLayers.remove(cnjs_image_other1989);
                 cnjs_image_other1990=image_show("../../otherData/jiangshui_change/1990/",0.3);
				 cnjsImgs.push(cnjs_image_other1990);
                cnjs_slider.value=1990;
                cnjs_text.value=1990;
        	}else if(cnjs_i==1991){
        	    viewer.scene.imageryLayers.remove(cnjs_image_other1990);
                 cnjs_image_other1991=image_show("../../otherData/jiangshui_change/1991/",0.3);
				 cnjsImgs.push(cnjs_image_other1991);
                cnjs_slider.value=1991;
                cnjs_text.value=1991;
        	}else if(cnjs_i==1992){
        	    viewer.scene.imageryLayers.remove(cnjs_image_other1991);
                 cnjs_image_other1992=image_show("../../otherData/jiangshui_change/1992/",0.3);
				 cnjsImgs.push(cnjs_image_other1992);
                cnjs_slider.value=1992;
                cnjs_text.value=1992;
        	}else if(cnjs_i==1993){
        	    viewer.scene.imageryLayers.remove(cnjs_image_other1992);
                 cnjs_image_other1993=image_show("../../otherData/jiangshui_change/1993/",0.3);
				 cnjsImgs.push(cnjs_image_other1993);
                cnjs_slider.value=1993;
                cnjs_text.value=1993;
        	}else if(cnjs_i==1994){
        	    viewer.scene.imageryLayers.remove(cnjs_image_other1993);
                 cnjs_image_other1994=image_show("../../otherData/jiangshui_change/1994/",0.3);
				 cnjsImgs.push(cnjs_image_other1994);
                cnjs_slider.value=1994;
                cnjs_text.value=1994;
        	}else if(cnjs_i==1995){
        	   viewer.scene.imageryLayers.remove(cnjs_image_other1994);
                cnjs_image_other1995=image_show("../../otherData/jiangshui_change/1995/",0.3);
                cnjsImgs.push(cnjs_image_other1995);
                cnjs_slider.value=1995;
                cnjs_text.value=1995;				
        	}else if(cnjs_i==1996){
        	    viewer.scene.imageryLayers.remove(cnjs_image_other1995);
                 cnjs_image_other1996=image_show("../../otherData/jiangshui_change/1996/",0.3);
				 cnjsImgs.push(cnjs_image_other1996);
                cnjs_slider.value=1996;
                cnjs_text.value=1996;
        	}else if(cnjs_i==1997){
        	    viewer.scene.imageryLayers.remove(cnjs_image_other1996);
                 cnjs_image_other1997=image_show("../../otherData/jiangshui_change/1997/",0.3);
				 cnjsImgs.push(cnjs_image_other1997);
                cnjs_slider.value=1997;
                cnjs_text.value=1997;
        	}else if(cnjs_i==1998){
        	    viewer.scene.imageryLayers.remove(cnjs_image_other1997);
                 cnjs_image_other1998=image_show("../../otherData/jiangshui_change/1998/",0.3);
				 cnjsImgs.push(cnjs_image_other1998);
                cnjs_slider.value=1998;
                cnjs_text.value=1998;
        	}else if(cnjs_i==1999){
        	    viewer.scene.imageryLayers.remove(cnjs_image_other1998);
                 cnjs_image_other1999=image_show("../../otherData/jiangshui_change/1999/",0.3);
				 cnjsImgs.push(cnjs_image_other1999);
                cnjs_slider.value=1999;
                cnjs_text.value=1999;
        	}else if(cnjs_i==2000){
        	    viewer.scene.imageryLayers.remove(cnjs_image_other1999);
                 cnjs_image_other2000=image_show("../../otherData/jiangshui_change/2000/",0.3);
				 cnjsImgs.push(cnjs_image_other2000);
                cnjs_slider.value=2000;
                cnjs_text.value=2000;
        	}else if(cnjs_i==2001){
        	    viewer.scene.imageryLayers.remove(cnjs_image_other2000);
                 cnjs_image_other2001=image_show("../../otherData/jiangshui_change/2001/",0.3);
				 cnjsImgs.push(cnjs_image_other2001);
                cnjs_slider.value=2001;
                cnjs_text.value=2001;
        	}else if(cnjs_i==2002){
        	    viewer.scene.imageryLayers.remove(cnjs_image_other2001);
                 cnjs_image_other2002=image_show("../../otherData/jiangshui_change/2002/",0.3);
				 cnjsImgs.push(cnjs_image_other2002);
                cnjs_slider.value=2002;
                cnjs_text.value=2002;
        	}else if(cnjs_i==2003){
        	   viewer.scene.imageryLayers.remove(cnjs_image_other2002);
                cnjs_image_other2003=image_show("../../otherData/jiangshui_change/2003/",0.3);
                cnjsImgs.push(cnjs_image_other2003);
                cnjs_slider.value=2003;
                cnjs_text.value=2003;				
        	}else if(cnjs_i==2004){
        	    viewer.scene.imageryLayers.remove(cnjs_image_other2003);
                 cnjs_image_other2004=image_show("../../otherData/jiangshui_change/2004/",0.3);
				 cnjsImgs.push(cnjs_image_other2004);
                cnjs_slider.value=2004;
                cnjs_text.value=2004;
        	}else if(cnjs_i==2005){
        	    viewer.scene.imageryLayers.remove(cnjs_image_other2004);
                 cnjs_image_other2005=image_show("../../otherData/jiangshui_change/2005/",0.3);
				 cnjsImgs.push(cnjs_image_other2005);
                cnjs_slider.value=2005;
                cnjs_text.value=2005;
        	}else if(cnjs_i==2006){
        	    viewer.scene.imageryLayers.remove(cnjs_image_other2005);
                 cnjs_image_other2006=image_show("../../otherData/jiangshui_change/2006/",0.3);
				 cnjsImgs.push(cnjs_image_other2006);
                cnjs_slider.value=2006;
                cnjs_text.value=2006;
        	}else if(cnjs_i==2007){
        	    viewer.scene.imageryLayers.remove(cnjs_image_other2006);
                 cnjs_image_other2007=image_show("../../otherData/jiangshui_change/2007/",0.3);
				 cnjsImgs.push(cnjs_image_other2007);
                cnjs_slider.value=2007;
                cnjs_text.value=2007;
        	}else if(cnjs_i==2008){
        	    viewer.scene.imageryLayers.remove(cnjs_image_other2007);
                 cnjs_image_other2008=image_show("../../otherData/jiangshui_change/2008/",0.3);
				 cnjsImgs.push(cnjs_image_other2008);
                cnjs_slider.value=2008;
                cnjs_text.value=2008;
        	}else if(cnjs_i==2009){
        	    viewer.scene.imageryLayers.remove(cnjs_image_other2008);
                 cnjs_image_other2009=image_show("../../otherData/jiangshui_change/2009/",0.3);
				 cnjsImgs.push(cnjs_image_other2009);
                cnjs_slider.value=2009;
                cnjs_text.value=2009;
        	}else if(cnjs_i==2010){
        	    viewer.scene.imageryLayers.remove(cnjs_image_other2009);
                 cnjs_image_other2010=image_show("../../otherData/jiangshui_change/2010/",0.3);
				 cnjsImgs.push(cnjs_image_other2010);
                cnjs_slider.value=2010;
                cnjs_text.value=2010;
        	}else if(cnjs_i==2011){
        	   viewer.scene.imageryLayers.remove(cnjs_image_other2010);
                cnjs_image_other2011=image_show("../../otherData/jiangshui_change/2011/",0.3);
                cnjsImgs.push(cnjs_image_other2011);
                cnjs_slider.value=2011;
                cnjs_text.value=2011;				
        	}else if(cnjs_i==2012){
        	    viewer.scene.imageryLayers.remove(cnjs_image_other2011);
                 cnjs_image_other2012=image_show("../../otherData/jiangshui_change/2012/",0.3);
				 cnjsImgs.push(cnjs_image_other2012);
                cnjs_slider.value=2012;
                cnjs_text.value=2012;
        	}else if(cnjs_i==2013){
        	    viewer.scene.imageryLayers.remove(cnjs_image_other2012);
                 cnjs_image_other2013=image_show("../../otherData/jiangshui_change/2013/",0.3);
				 cnjsImgs.push(cnjs_image_other2013);
                cnjs_slider.value=2013;
                cnjs_text.value=2013;
        	}else if(cnjs_i==2014){
        	    viewer.scene.imageryLayers.remove(cnjs_image_other2013);
                 cnjs_image_other2014=image_show("../../otherData/jiangshui_change/2014/",0.3);
				 cnjsImgs.push(cnjs_image_other2014);
                cnjs_slider.value=2014;
                cnjs_text.value=2014;
        	}else if(cnjs_i==2015){
        	    viewer.scene.imageryLayers.remove(cnjs_image_other2014);
                 cnjs_image_other2015=image_show("../../otherData/jiangshui_change/2015/",0.3);
				 cnjsImgs.push(cnjs_image_other2015);
                cnjs_slider.value=2015;
                cnjs_text.value=2015;
        	}else if(cnjs_i==2016){
        	    viewer.scene.imageryLayers.remove(cnjs_image_other2015);
                 cnjs_image_other2016=image_show("../../otherData/jiangshui_change/2016/",0.3);
				 cnjsImgs.push(cnjs_image_other2016);
                cnjs_slider.value=2016;
                cnjs_text.value=2016;
        	}
        }

$('#CNJiangshuiChangeWindow').window({
			 onClose:function(){
				 for(var i=0;i<cnjsImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnjsImgs[i]);
				}
			 }
		 });