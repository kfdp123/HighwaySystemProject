/*天津建筑面积扩张1975-2015年*/
function cnqw_Change(){
 $('#CNQiwenChangeWindow').window('open');
 $('#CNQiwenChangeWindow').window({left:300,top:50});	
 //locateTO(117.3462305,39.3512083,280000);
};
function cnqw_Cancel(){
 $('#CNQiwenChangeWindow').window('close');
   for(var i=0;i<cnqwImgs.length;i++){
		viewer.scene.imageryLayers.remove(cnqwImgs[i]);
		} 
}; 

var cnqwImgs=[];
var cnqw_timer;
var cnqw_image_other1961,cnqw_image_other1962,cnqw_image_other1963,cnqw_image_other1964,cnqw_image_other1965,cnqw_image_other1966,cnqw_image_other1967,cnqw_image_other1968,cnqw_image_other1969,cnqw_image_other1970;
var cnqw_image_other1971,cnqw_image_other1972,cnqw_image_other1973,cnqw_image_other1974,cnqw_image_other1975,cnqw_image_other1976,cnqw_image_other1977,cnqw_image_other1978,cnqw_image_other1979,cnqw_image_other1980;
var cnqw_image_other1981,cnqw_image_other1982,cnqw_image_other1983,cnqw_image_other1984,cnqw_image_other1985,cnqw_image_other1986,cnqw_image_other1987,cnqw_image_other1988,cnqw_image_other1989,cnqw_image_other1990;
var cnqw_image_other1991,cnqw_image_other1992,cnqw_image_other1993,cnqw_image_other1994,cnqw_image_other1995,cnqw_image_other1996,cnqw_image_other1997,cnqw_image_other1998,cnqw_image_other1999,cnqw_image_other2000;
var cnqw_image_other2001,cnqw_image_other2002,cnqw_image_other2003,cnqw_image_other2004,cnqw_image_other2005,cnqw_image_other2006,cnqw_image_other2007,cnqw_image_other2008,cnqw_image_other2009,cnqw_image_other2010;
var cnqw_image_other2011,cnqw_image_other2012,cnqw_image_other2013,cnqw_image_other2014,cnqw_image_other2015,cnqw_image_other2016;

	var cnqw_slider=document.getElementById("cnqw_slider");
        var cnqw_text=document.getElementById("cnqw_text");
        cnqw_slider.addEventListener("mouseup",function(){
           var slider_cnqw=cnqw_slider.value;
             switch(slider_cnqw){ 
        	  case "1961":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1961=image_show("../../otherData/qiwen_change/1961/",0.3);
				 cnqw_text.value=slider_cnqw;
                 cnqwImgs.push(cnqw_image_other1961);				  
        		  break;
        	  case "1962":
        	    for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1962=image_show("../../otherData/qiwen_change/1962/",0.3);
				 cnqw_text.value=slider_cnqw;
                 cnqwImgs.push(cnqw_image_other1962);				 
        		 break;
        	  case "1963":
        	     for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1963=image_show("../../otherData/qiwen_change/1963/",0.3);
				 cnqw_text.value=slider_cnqw;
				 cnqwImgs.push(cnqw_image_other1963);
        		 break;
        	  case "1964": 
        	    for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1964=image_show("../../otherData/qiwen_change/1964/",0.3);
				 cnqw_text.value=slider_cnqw;
				 cnqwImgs.push(cnqw_image_other1964);
        		 break;
        	 case "1965":
        	      for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1965=image_show("../../otherData/qiwen_change/1965/",0.3);
				 cnqw_text.value=slider_cnqw;
				 cnqwImgs.push(cnqw_image_other1965);
        		 break;
        	 case "1966":
        	      for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1966=image_show("../../otherData/qiwen_change/1966/",0.3);
				 cnqw_text.value=slider_cnqw;
				 cnqwImgs.push(cnqw_image_other1966);
        		 break;
        	 case "1967":
        	      for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1967=image_show("../../otherData/qiwen_change/1967/",0.3);
				 cnqw_text.value=slider_cnqw;
				 cnqwImgs.push(cnqw_image_other1967);
        		 break;
        	 case "1968":
        	 	 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1968=image_show("../../otherData/qiwen_change/1968/",0.3);
				 cnqw_text.value=slider_cnqw;
				 cnqwImgs.push(cnqw_image_other1968);
        		 break;
        	 case "1969":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
                 cnqw_image_other1969=image_show("../../otherData/qiwen_change/1969/",0.3);
				 cnqw_text.value=slider_cnqw;
				 cnqwImgs.push(cnqw_image_other1969);
        		 break;
			 case "1970":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
                 cnqw_image_other1970=image_show("../../otherData/qiwen_change/1970/",0.3);
				 cnqw_text.value=slider_cnqw;
				 cnqwImgs.push(cnqw_image_other1970);
        		 break;	
             case "1971":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1971=image_show("../../otherData/qiwen_change/1971/",0.3);
				 cnqw_text.value=slider_cnqw;
                 cnqwImgs.push(cnqw_image_other1971);				  
        		  break;
        	  case "1972":
        	    for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1972=image_show("../../otherData/qiwen_change/1972/",0.3);
				 cnqw_text.value=slider_cnqw;
                 cnqwImgs.push(cnqw_image_other1972);				 
        		 break;
        	  case "1973":
        	     for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1973=image_show("../../otherData/qiwen_change/1973/",0.3);
				 cnqw_text.value=slider_cnqw;
				 cnqwImgs.push(cnqw_image_other1973);
        		 break;
        	  case "1974": 
        	    for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1974=image_show("../../otherData/qiwen_change/1974/",0.3);
				 cnqw_text.value=slider_cnqw;
				 cnqwImgs.push(cnqw_image_other1974);
        		 break;
        	 case "1975":
        	      for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1975=image_show("../../otherData/qiwen_change/1975/",0.3);
				 cnqw_text.value=slider_cnqw;
				 cnqwImgs.push(cnqw_image_other1975);
        		 break;
        	 case "1976":
        	      for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1976=image_show("../../otherData/qiwen_change/1976/",0.3);
				 cnqw_text.value=slider_cnqw;
				 cnqwImgs.push(cnqw_image_other1976);
        		 break;
        	 case "1977":
        	      for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1977=image_show("../../otherData/qiwen_change/1977/",0.3);
				 cnqw_text.value=slider_cnqw;
				 cnqwImgs.push(cnqw_image_other1977);
        		 break;
        	 case "1978":
        	 	 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1978=image_show("../../otherData/qiwen_change/1978/",0.3);
				 cnqw_text.value=slider_cnqw;
				 cnqwImgs.push(cnqw_image_other1978);
        		 break;
        	 case "1979":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
                 cnqw_image_other1979=image_show("../../otherData/qiwen_change/1979/",0.3);
				 cnqw_text.value=slider_cnqw;
				 cnqwImgs.push(cnqw_image_other1979);
        		 break;
			 case "1980":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
                 cnqw_image_other1980=image_show("../../otherData/qiwen_change/1980/",0.3);
				 cnqw_text.value=slider_cnqw;
				 cnqwImgs.push(cnqw_image_other1980);
        		 break;
              case "1981":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1981=image_show("../../otherData/qiwen_change/1981/",0.3);
				 cnqw_text.value=slider_cnqw;
                 cnqwImgs.push(cnqw_image_other1981);				  
        		  break;
        	  case "1982":
        	    for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1982=image_show("../../otherData/qiwen_change/1982/",0.3);
				 cnqw_text.value=slider_cnqw;
                 cnqwImgs.push(cnqw_image_other1982);				 
        		 break;
        	  case "1983":
        	     for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1983=image_show("../../otherData/qiwen_change/1983/",0.3);
				 cnqw_text.value=slider_cnqw;
				 cnqwImgs.push(cnqw_image_other1983);
        		 break;
        	  case "1984": 
        	    for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1984=image_show("../../otherData/qiwen_change/1984/",0.3);
				 cnqw_text.value=slider_cnqw;
				 cnqwImgs.push(cnqw_image_other1984);
        		 break;
        	 case "1985":
        	      for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1985=image_show("../../otherData/qiwen_change/1985/",0.3);
				 cnqw_text.value=slider_cnqw;
				 cnqwImgs.push(cnqw_image_other1985);
        		 break;
        	 case "1986":
        	      for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1986=image_show("../../otherData/qiwen_change/1986/",0.3);
				 cnqw_text.value=slider_cnqw;
				 cnqwImgs.push(cnqw_image_other1986);
        		 break;
        	 case "1987":
        	      for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1987=image_show("../../otherData/qiwen_change/1987/",0.3);
				 cnqw_text.value=slider_cnqw;
				 cnqwImgs.push(cnqw_image_other1987);
        		 break;
        	 case "1988":
        	 	 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1988=image_show("../../otherData/qiwen_change/1988/",0.3);
				 cnqw_text.value=slider_cnqw;
				 cnqwImgs.push(cnqw_image_other1988);
        		 break;
        	 case "1989":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
                 cnqw_image_other1989=image_show("../../otherData/qiwen_change/1989/",0.3);
				 cnqw_text.value=slider_cnqw;
				 cnqwImgs.push(cnqw_image_other1989);
        		 break;
			 case "1990":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
                 cnqw_image_other1990=image_show("../../otherData/qiwen_change/1990/",0.3);
				 cnqw_text.value=slider_cnqw;
				 cnqwImgs.push(cnqw_image_other1990);
        		 break;	
             case "1991":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1991=image_show("../../otherData/qiwen_change/1991/",0.3);
				 cnqw_text.value=slider_cnqw;
                 cnqwImgs.push(cnqw_image_other1991);				  
        		  break;
        	  case "1992":
        	    for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1992=image_show("../../otherData/qiwen_change/1992/",0.3);
				 cnqw_text.value=slider_cnqw;
                 cnqwImgs.push(cnqw_image_other1992);				 
        		 break;
        	  case "1993":
        	     for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1993=image_show("../../otherData/qiwen_change/1993/",0.3);
				 cnqw_text.value=slider_cnqw;
				 cnqwImgs.push(cnqw_image_other1993);
        		 break;
        	  case "1994": 
        	    for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1994=image_show("../../otherData/qiwen_change/1994/",0.3);
				 cnqw_text.value=slider_cnqw;
				 cnqwImgs.push(cnqw_image_other1994);
        		 break;
        	 case "1995":
        	      for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1995=image_show("../../otherData/qiwen_change/1995/",0.3);
				 cnqw_text.value=slider_cnqw;
				 cnqwImgs.push(cnqw_image_other1995);
        		 break;
        	 case "1996":
        	      for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1996=image_show("../../otherData/qiwen_change/1996/",0.3);
				 cnqw_text.value=slider_cnqw;
				 cnqwImgs.push(cnqw_image_other1996);
        		 break;
        	 case "1997":
        	      for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1997=image_show("../../otherData/qiwen_change/1997/",0.3);
				 cnqw_text.value=slider_cnqw;
				 cnqwImgs.push(cnqw_image_other1997);
        		 break;
        	 case "1998":
        	 	 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1998=image_show("../../otherData/qiwen_change/1998/",0.3);
				 cnqw_text.value=slider_cnqw;
				 cnqwImgs.push(cnqw_image_other1998);
        		 break;
        	 case "1999":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
                 cnqw_image_other1999=image_show("../../otherData/qiwen_change/1999/",0.3);
				 cnqw_text.value=slider_cnqw;
				 cnqwImgs.push(cnqw_image_other1999);
        		 break;
			 case "2000":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
                 cnqw_image_other2000=image_show("../../otherData/qiwen_change/2000/",0.3);
				 cnqw_text.value=slider_cnqw;
				 cnqwImgs.push(cnqw_image_other2000);
        		 break;	
             case "2000":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
                 cnqw_image_other2000=image_show("../../otherData/qiwen_change/2000/",0.3);
				 cnqw_text.value=slider_cnqw;
				 cnqwImgs.push(cnqw_image_other2000);
        		 break;	
             case "2001":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
                 cnqw_image_other2001=image_show("../../otherData/qiwen_change/2001/",0.3);
				 cnqw_text.value=slider_cnqw;
				 cnqwImgs.push(cnqw_image_other2001);
        		 break;	
             case "2002":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
                 cnqw_image_other2002=image_show("../../otherData/qiwen_change/2002/",0.3);
				 cnqw_text.value=slider_cnqw;
				 cnqwImgs.push(cnqw_image_other2002);
        		 break;	
              case "2003":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
                 cnqw_image_other2003=image_show("../../otherData/qiwen_change/2003/",0.3);
				 cnqw_text.value=slider_cnqw;
				 cnqwImgs.push(cnqw_image_other2003);
        		 break;
             case "2004":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
                 cnqw_image_other2004=image_show("../../otherData/qiwen_change/2004/",0.3);
				 cnqw_text.value=slider_cnqw;
				 cnqwImgs.push(cnqw_image_other2004);
        		 break;	
             case "2005":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
                 cnqw_image_other2005=image_show("../../otherData/qiwen_change/2005/",0.3);
				 cnqw_text.value=slider_cnqw;
				 cnqwImgs.push(cnqw_image_other2005);
        		 break;	
             case "2006":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
                 cnqw_image_other2006=image_show("../../otherData/qiwen_change/2006/",0.3);
				 cnqw_text.value=slider_cnqw;
				 cnqwImgs.push(cnqw_image_other2006);
        		 break;	
              case "2007":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
                 cnqw_image_other2007=image_show("../../otherData/qiwen_change/2007/",0.3);
				 cnqw_text.value=slider_cnqw;
				 cnqwImgs.push(cnqw_image_other2007);
        		 break;	
             case "2008":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
                 cnqw_image_other2008=image_show("../../otherData/qiwen_change/2008/",0.3);
				 cnqw_text.value=slider_cnqw;
				 cnqwImgs.push(cnqw_image_other2008);
        		 break;	
             case "2009":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
                 cnqw_image_other2009=image_show("../../otherData/qiwen_change/2009/",0.3);
				 cnqw_text.value=slider_cnqw;
				 cnqwImgs.push(cnqw_image_other2009);
        		 break;	
             case "2010":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
                 cnqw_image_other2010=image_show("../../otherData/qiwen_change/2010/",0.3);
				 cnqw_text.value=slider_cnqw;
				 cnqwImgs.push(cnqw_image_other2010);
        		 break;	
             case "2011":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
                 cnqw_image_other2011=image_show("../../otherData/qiwen_change/2011/",0.3);
				 cnqw_text.value=slider_cnqw;
				 cnqwImgs.push(cnqw_image_other2011);
        		 break;	
              case "2012":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
                 cnqw_image_other2012=image_show("../../otherData/qiwen_change/2012/",0.3);
				 cnqw_text.value=slider_cnqw;
				 cnqwImgs.push(cnqw_image_other2012);
        		 break;
             case "2013":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
                 cnqw_image_other2013=image_show("../../otherData/qiwen_change/2013/",0.3);
				 cnqw_text.value=slider_cnqw;
				 cnqwImgs.push(cnqw_image_other2013);
        		 break;	
             case "2014":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
                 cnqw_image_other2014=image_show("../../otherData/qiwen_change/2014/",0.3);
				 cnqw_text.value=slider_cnqw;
				 cnqwImgs.push(cnqw_image_other2014);
        		 break;	
             case "2015":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
                 cnqw_image_other2015=image_show("../../otherData/qiwen_change/2015/",0.3);
				 cnqw_text.value=slider_cnqw;
				 cnqwImgs.push(cnqw_image_other2015);
        		 break;	
              case "2016":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
                 cnqw_image_other2016=image_show("../../otherData/qiwen_change/2016/",0.3);
				 cnqw_text.value=slider_cnqw;
				 cnqwImgs.push(cnqw_image_other2016);
        		 break;				 
        	}
        });
        
        cnqw_text.addEventListener("change",function(){
           var text_cnqw=cnqw_text.value;
           //cnqw_slider.value=cnqw_text.value;
           switch(text_cnqw){ 
        	  /* case "1975":
        		 viewer.scene.imageryLayers.remove(cnqw_image_other1962);
        		 viewer.scene.imageryLayers.remove(cnqw_image_other1963);
        		 viewer.scene.imageryLayers.remove(cnqw_image_other1964);
        		 viewer.scene.imageryLayers.remove(cnqw_image_other1965);
        		 viewer.scene.imageryLayers.remove(cnqw_image_other1966);
        		 viewer.scene.imageryLayers.remove(cnqw_image_other1967);
        		 viewer.scene.imageryLayers.remove(cnqw_image_other1968);
        		 viewer.scene.imageryLayers.remove(cnqw_image_other1969);
        		 cnqw_image_other1961=image_show("../../otherData/tj_change/1975/",0.3); 
				 cnqw_slider.value=text_cnqw;
                 cnqwImgs.push(cnqw_image_other1961);				  
        		 break; */
        	   case "1961":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1961=image_show("../../otherData/qiwen_change/1961/",0.3);
				 cnqw_slider.value=text_cnqw;
                 cnqwImgs.push(cnqw_image_other1961);				  
        		  break;
        	  case "1962":
        	    for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1962=image_show("../../otherData/qiwen_change/1962/",0.3);
				 cnqw_slider.value=text_cnqw;
                 cnqwImgs.push(cnqw_image_other1962);				 
        		 break;
        	  case "1963":
        	     for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1963=image_show("../../otherData/qiwen_change/1963/",0.3);
				 cnqw_slider.value=text_cnqw;
				 cnqwImgs.push(cnqw_image_other1963);
        		 break;
        	  case "1964": 
        	    for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1964=image_show("../../otherData/qiwen_change/1964/",0.3);
				 cnqw_slider.value=text_cnqw;
				 cnqwImgs.push(cnqw_image_other1964);
        		 break;
        	 case "1965":
        	      for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1965=image_show("../../otherData/qiwen_change/1965/",0.3);
				 cnqw_slider.value=text_cnqw;
				 cnqwImgs.push(cnqw_image_other1965);
        		 break;
        	 case "1966":
        	      for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1966=image_show("../../otherData/qiwen_change/1966/",0.3);
				 cnqw_slider.value=text_cnqw;
				 cnqwImgs.push(cnqw_image_other1966);
        		 break;
        	 case "1967":
        	      for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1967=image_show("../../otherData/qiwen_change/1967/",0.3);
				 cnqw_slider.value=text_cnqw;
				 cnqwImgs.push(cnqw_image_other1967);
        		 break;
        	 case "1968":
        	 	 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1968=image_show("../../otherData/qiwen_change/1968/",0.3);
				 cnqw_slider.value=text_cnqw;
				 cnqwImgs.push(cnqw_image_other1968);
        		 break;
        	 case "1969":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
                 cnqw_image_other1969=image_show("../../otherData/qiwen_change/1969/",0.3);
				 cnqw_slider.value=text_cnqw;
				 cnqwImgs.push(cnqw_image_other1969);
        		 break;
			 case "1970":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
                 cnqw_image_other1970=image_show("../../otherData/qiwen_change/1970/",0.3);
				 cnqw_slider.value=text_cnqw;
				 cnqwImgs.push(cnqw_image_other1970);
        		 break;	
             case "1971":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1971=image_show("../../otherData/qiwen_change/1971/",0.3);
				 cnqw_slider.value=text_cnqw;
                 cnqwImgs.push(cnqw_image_other1971);				  
        		  break;
        	  case "1972":
        	    for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1972=image_show("../../otherData/qiwen_change/1972/",0.3);
				 cnqw_slider.value=text_cnqw;
                 cnqwImgs.push(cnqw_image_other1972);				 
        		 break;
        	  case "1973":
        	     for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1973=image_show("../../otherData/qiwen_change/1973/",0.3);
				 cnqw_slider.value=text_cnqw;
				 cnqwImgs.push(cnqw_image_other1973);
        		 break;
        	  case "1974": 
        	    for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1974=image_show("../../otherData/qiwen_change/1974/",0.3);
				 cnqw_slider.value=text_cnqw;
				 cnqwImgs.push(cnqw_image_other1974);
        		 break;
        	 case "1975":
        	      for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1975=image_show("../../otherData/qiwen_change/1975/",0.3);
				 cnqw_slider.value=text_cnqw;
				 cnqwImgs.push(cnqw_image_other1975);
        		 break;
        	 case "1976":
        	      for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1976=image_show("../../otherData/qiwen_change/1976/",0.3);
				 cnqw_slider.value=text_cnqw;
				 cnqwImgs.push(cnqw_image_other1976);
        		 break;
        	 case "1977":
        	      for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1977=image_show("../../otherData/qiwen_change/1977/",0.3);
				 cnqw_slider.value=text_cnqw;
				 cnqwImgs.push(cnqw_image_other1977);
        		 break;
        	 case "1978":
        	 	 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1978=image_show("../../otherData/qiwen_change/1978/",0.3);
				 cnqw_slider.value=text_cnqw;
				 cnqwImgs.push(cnqw_image_other1978);
        		 break;
        	 case "1979":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
                 cnqw_image_other1979=image_show("../../otherData/qiwen_change/1979/",0.3);
				 cnqw_slider.value=text_cnqw;
				 cnqwImgs.push(cnqw_image_other1979);
        		 break;
			 case "1980":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
                 cnqw_image_other1980=image_show("../../otherData/qiwen_change/1980/",0.3);
				 cnqw_slider.value=text_cnqw;
				 cnqwImgs.push(cnqw_image_other1980);
        		 break;
              case "1981":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1981=image_show("../../otherData/qiwen_change/1981/",0.3);
				 cnqw_slider.value=text_cnqw;
                 cnqwImgs.push(cnqw_image_other1981);				  
        		  break;
        	  case "1982":
        	    for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1982=image_show("../../otherData/qiwen_change/1982/",0.3);
				 cnqw_slider.value=text_cnqw;
                 cnqwImgs.push(cnqw_image_other1982);				 
        		 break;
        	  case "1983":
        	     for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1983=image_show("../../otherData/qiwen_change/1983/",0.3);
				 cnqw_slider.value=text_cnqw;
				 cnqwImgs.push(cnqw_image_other1983);
        		 break;
        	  case "1984": 
        	    for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1984=image_show("../../otherData/qiwen_change/1984/",0.3);
				 cnqw_slider.value=text_cnqw;
				 cnqwImgs.push(cnqw_image_other1984);
        		 break;
        	 case "1985":
        	      for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1985=image_show("../../otherData/qiwen_change/1985/",0.3);
				 cnqw_slider.value=text_cnqw;
				 cnqwImgs.push(cnqw_image_other1985);
        		 break;
        	 case "1986":
        	      for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1986=image_show("../../otherData/qiwen_change/1986/",0.3);
				 cnqw_slider.value=text_cnqw;
				 cnqwImgs.push(cnqw_image_other1986);
        		 break;
        	 case "1987":
        	      for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1987=image_show("../../otherData/qiwen_change/1987/",0.3);
				 cnqw_slider.value=text_cnqw;
				 cnqwImgs.push(cnqw_image_other1987);
        		 break;
        	 case "1988":
        	 	 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1988=image_show("../../otherData/qiwen_change/1988/",0.3);
				 cnqw_slider.value=text_cnqw;
				 cnqwImgs.push(cnqw_image_other1988);
        		 break;
        	 case "1989":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
                 cnqw_image_other1989=image_show("../../otherData/qiwen_change/1989/",0.3);
				 cnqw_slider.value=text_cnqw;
				 cnqwImgs.push(cnqw_image_other1989);
        		 break;
			 case "1990":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
                 cnqw_image_other1990=image_show("../../otherData/qiwen_change/1990/",0.3);
				 cnqw_slider.value=text_cnqw;
				 cnqwImgs.push(cnqw_image_other1990);
        		 break;	
             case "1991":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1991=image_show("../../otherData/qiwen_change/1991/",0.3);
				 cnqw_slider.value=text_cnqw;
                 cnqwImgs.push(cnqw_image_other1991);				  
        		  break;
        	  case "1992":
        	    for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1992=image_show("../../otherData/qiwen_change/1992/",0.3);
				 cnqw_slider.value=text_cnqw;
                 cnqwImgs.push(cnqw_image_other1992);				 
        		 break;
        	  case "1993":
        	     for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1993=image_show("../../otherData/qiwen_change/1993/",0.3);
				 cnqw_slider.value=text_cnqw;
				 cnqwImgs.push(cnqw_image_other1993);
        		 break;
        	  case "1994": 
        	    for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1994=image_show("../../otherData/qiwen_change/1994/",0.3);
				 cnqw_slider.value=text_cnqw;
				 cnqwImgs.push(cnqw_image_other1994);
        		 break;
        	 case "1995":
        	      for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1995=image_show("../../otherData/qiwen_change/1995/",0.3);
				 cnqw_slider.value=text_cnqw;
				 cnqwImgs.push(cnqw_image_other1995);
        		 break;
        	 case "1996":
        	      for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1996=image_show("../../otherData/qiwen_change/1996/",0.3);
				 cnqw_slider.value=text_cnqw;
				 cnqwImgs.push(cnqw_image_other1996);
        		 break;
        	 case "1997":
        	      for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1997=image_show("../../otherData/qiwen_change/1997/",0.3);
				 cnqw_slider.value=text_cnqw;
				 cnqwImgs.push(cnqw_image_other1997);
        		 break;
        	 case "1998":
        	 	 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        		 cnqw_image_other1998=image_show("../../otherData/qiwen_change/1998/",0.3);
				 cnqw_slider.value=text_cnqw;
				 cnqwImgs.push(cnqw_image_other1998);
        		 break;
        	 case "1999":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
                 cnqw_image_other1999=image_show("../../otherData/qiwen_change/1999/",0.3);
				 cnqw_slider.value=text_cnqw;
				 cnqwImgs.push(cnqw_image_other1999);
        		 break;
			 case "2000":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
                 cnqw_image_other2000=image_show("../../otherData/qiwen_change/2000/",0.3);
				 cnqw_slider.value=text_cnqw;
				 cnqwImgs.push(cnqw_image_other2000);
        		 break;	
             case "2000":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
                 cnqw_image_other2000=image_show("../../otherData/qiwen_change/2000/",0.3);
				 cnqw_slider.value=text_cnqw;
				 cnqwImgs.push(cnqw_image_other2000);
        		 break;	
             case "2001":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
                 cnqw_image_other2001=image_show("../../otherData/qiwen_change/2001/",0.3);
				 cnqw_slider.value=text_cnqw;
				 cnqwImgs.push(cnqw_image_other2001);
        		 break;	
             case "2002":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
                 cnqw_image_other2002=image_show("../../otherData/qiwen_change/2002/",0.3);
				 cnqw_slider.value=text_cnqw;
				 cnqwImgs.push(cnqw_image_other2002);
        		 break;	
              case "2003":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
                 cnqw_image_other2003=image_show("../../otherData/qiwen_change/2003/",0.3);
				 cnqw_slider.value=text_cnqw;
				 cnqwImgs.push(cnqw_image_other2003);
        		 break;
             case "2004":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
                 cnqw_image_other2004=image_show("../../otherData/qiwen_change/2004/",0.3);
				 cnqw_slider.value=text_cnqw;
				 cnqwImgs.push(cnqw_image_other2004);
        		 break;	
             case "2005":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
                 cnqw_image_other2005=image_show("../../otherData/qiwen_change/2005/",0.3);
				 cnqw_slider.value=text_cnqw;
				 cnqwImgs.push(cnqw_image_other2005);
        		 break;	
             case "2006":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
                 cnqw_image_other2006=image_show("../../otherData/qiwen_change/2006/",0.3);
				 cnqw_slider.value=text_cnqw;
				 cnqwImgs.push(cnqw_image_other2006);
        		 break;	
              case "2007":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
                 cnqw_image_other2007=image_show("../../otherData/qiwen_change/2007/",0.3);
				 cnqw_slider.value=text_cnqw;
				 cnqwImgs.push(cnqw_image_other2007);
        		 break;	
             case "2008":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
                 cnqw_image_other2008=image_show("../../otherData/qiwen_change/2008/",0.3);
				 cnqw_slider.value=text_cnqw;
				 cnqwImgs.push(cnqw_image_other2008);
        		 break;	
             case "2009":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
                 cnqw_image_other2009=image_show("../../otherData/qiwen_change/2009/",0.3);
				 cnqw_slider.value=text_cnqw;
				 cnqwImgs.push(cnqw_image_other2009);
        		 break;	
             case "2010":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
                 cnqw_image_other2010=image_show("../../otherData/qiwen_change/2010/",0.3);
				 cnqw_slider.value=text_cnqw;
				 cnqwImgs.push(cnqw_image_other2010);
        		 break;	
             case "2011":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
                 cnqw_image_other2011=image_show("../../otherData/qiwen_change/2011/",0.3);
				 cnqw_slider.value=text_cnqw;
				 cnqwImgs.push(cnqw_image_other2011);
        		 break;	
              case "2012":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
                 cnqw_image_other2012=image_show("../../otherData/qiwen_change/2012/",0.3);
				 cnqw_slider.value=text_cnqw;
				 cnqwImgs.push(cnqw_image_other2012);
        		 break;
             case "2013":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
                 cnqw_image_other2013=image_show("../../otherData/qiwen_change/2013/",0.3);
				 cnqw_slider.value=text_cnqw;
				 cnqwImgs.push(cnqw_image_other2013);
        		 break;	
             case "2014":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
                 cnqw_image_other2014=image_show("../../otherData/qiwen_change/2014/",0.3);
				 cnqw_slider.value=text_cnqw;
				 cnqwImgs.push(cnqw_image_other2014);
        		 break;	
             case "2015":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
                 cnqw_image_other2015=image_show("../../otherData/qiwen_change/2015/",0.3);
				 cnqw_slider.value=text_cnqw;
				 cnqwImgs.push(cnqw_image_other2015);
        		 break;	
              case "2016":
        		 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
                 cnqw_image_other2016=image_show("../../otherData/qiwen_change/2016/",0.3);
				 cnqw_slider.value=text_cnqw;
				 cnqwImgs.push(cnqw_image_other2016);
        		 break;	
        	}
        });
        /* 动态按钮事件 */
		var cnqwstate=0;
		var cnsyPlay=document.getElementById("cnqw_play");
		var cnqwBP=document.getElementById("cnqwBP");
		cnsyPlay.onclick=function(){
		if(cnqwstate==0){
			cnqwBP.removeAttribute("class","fa fa-play fa-lg");
			cnqwBP.setAttribute("class","fa fa-pause fa-lg");
			
        /* viewer.camera.flyTo({
            destination : Cesium.Cartesian3.fromDegrees(117.3462305,39.3512083,280000),
        	duration:1
            }); */
				clearInterval(cnqw_timer);
				for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
				for(var j=1961;j<2017;j++){
				viewer.scene.imageryLayers.remove('cnqw_image_other'+j);	
				}
		
                cnqw_timer=setInterval(cnqw_change,2000);
        
			cnqwstate=1;
		}else if(cnqwstate==1){
			cnqwBP.removeAttribute("class","fa fa-pause fa-lg");
			cnqwBP.setAttribute("class","fa fa-play fa-lg");
			cnqwstate=0;
			
			clearInterval(cnqw_timer);
		    cnqw_i=1960;
			
				 for(var j=1961;j<2017;j++){
				viewer.scene.imageryLayers.remove('cnqw_image_other'+j);	
				}
				
				for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
        
		}
        }
       /* 动态函数 */
        var cnqw_i=1960;
        
        function cnqw_change(){
             cnqw_i++;
            if(cnqw_i==1961){
				for(var i=1961;i<2017;i++){
					viewer.scene.imageryLayers.remove('cnqw_image_other'+i);	
				}
        	    cnqw_image_other1961=image_show("../../otherData/qiwen_change/1961/",0.3);
                cnqwImgs.push(cnqw_image_other1961);
                cnqw_slider.value=1961;
                cnqw_text.value=1961;				
        	}else if(cnqw_i==1962){
        	   viewer.scene.imageryLayers.remove(cnqw_image_other1961);
                cnqw_image_other1962=image_show("../../otherData/qiwen_change/1962/",0.3);
                cnqwImgs.push(cnqw_image_other1962);
                cnqw_slider.value=1962;
                cnqw_text.value=1962;				
        	}else if(cnqw_i==1963){
        	    viewer.scene.imageryLayers.remove(cnqw_image_other1962);
                 cnqw_image_other1963=image_show("../../otherData/qiwen_change/1963/",0.3);
				 cnqwImgs.push(cnqw_image_other1963);
                cnqw_slider.value=1963;
                cnqw_text.value=1963;
        	}else if(cnqw_i==1964){
        	    viewer.scene.imageryLayers.remove(cnqw_image_other1963);
                 cnqw_image_other1964=image_show("../../otherData/qiwen_change/1964/",0.3);
				 cnqwImgs.push(cnqw_image_other1964);
                cnqw_slider.value=1964;
                cnqw_text.value=1964;
        	}else if(cnqw_i==1965){
        	    viewer.scene.imageryLayers.remove(cnqw_image_other1964);
                 cnqw_image_other1965=image_show("../../otherData/qiwen_change/1965/",0.3);
				 cnqwImgs.push(cnqw_image_other1965);
                cnqw_slider.value=1965;
                cnqw_text.value=1965;
        	}else if(cnqw_i==1966){
        	    viewer.scene.imageryLayers.remove(cnqw_image_other1965);
                 cnqw_image_other1966=image_show("../../otherData/qiwen_change/1966/",0.3);
				 cnqwImgs.push(cnqw_image_other1966);
                cnqw_slider.value=1966;
                cnqw_text.value=1966;
        	}else if(cnqw_i==1967){
        	    viewer.scene.imageryLayers.remove(cnqw_image_other1966);
                 cnqw_image_other1967=image_show("../../otherData/qiwen_change/1967/",0.3);
				 cnqwImgs.push(cnqw_image_other1967);
                cnqw_slider.value=1967;
                cnqw_text.value=1967;
        	}else if(cnqw_i==1968){
        	    viewer.scene.imageryLayers.remove(cnqw_image_other1967);
                 cnqw_image_other1968=image_show("../../otherData/qiwen_change/1968/",0.3);
				 cnqwImgs.push(cnqw_image_other1968);
                cnqw_slider.value=1968;
                cnqw_text.value=1968;
        	}else if(cnqw_i==1969){
        	    viewer.scene.imageryLayers.remove(cnqw_image_other1968);
                 cnqw_image_other1969=image_show("../../otherData/qiwen_change/1969/",0.3);
				 cnqwImgs.push(cnqw_image_other1969);
                cnqw_slider.value=1969;
                cnqw_text.value=1969;
        	}else if(cnqw_i==1970){
        	   viewer.scene.imageryLayers.remove(cnqw_image_other1969);
                cnqw_image_other1970=image_show("../../otherData/qiwen_change/1970/",0.3);
                cnqwImgs.push(cnqw_image_other1970);
                cnqw_slider.value=1970;
                cnqw_text.value=1970;				
        	}else if(cnqw_i==1971){
        	    viewer.scene.imageryLayers.remove(cnqw_image_other1970);
                 cnqw_image_other1971=image_show("../../otherData/qiwen_change/1971/",0.3);
				 cnqwImgs.push(cnqw_image_other1971);
                cnqw_slider.value=1971;
                cnqw_text.value=1971;
        	}else if(cnqw_i==1972){
        	    viewer.scene.imageryLayers.remove(cnqw_image_other1971);
                 cnqw_image_other1972=image_show("../../otherData/qiwen_change/1972/",0.3);
				 cnqwImgs.push(cnqw_image_other1972);
                cnqw_slider.value=1972;
                cnqw_text.value=1972;
        	}else if(cnqw_i==1973){
        	    viewer.scene.imageryLayers.remove(cnqw_image_other1972);
                 cnqw_image_other1973=image_show("../../otherData/qiwen_change/1973/",0.3);
				 cnqwImgs.push(cnqw_image_other1973);
                cnqw_slider.value=1973;
                cnqw_text.value=1973;
        	}else if(cnqw_i==1974){
        	    viewer.scene.imageryLayers.remove(cnqw_image_other1973);
                 cnqw_image_other1974=image_show("../../otherData/qiwen_change/1974/",0.3);
				 cnqwImgs.push(cnqw_image_other1974);
                cnqw_slider.value=1974;
                cnqw_text.value=1974;
        	}else if(cnqw_i==1975){
        	    viewer.scene.imageryLayers.remove(cnqw_image_other1974);
                 cnqw_image_other1975=image_show("../../otherData/qiwen_change/1975/",0.3);
				 cnqwImgs.push(cnqw_image_other1975);
                cnqw_slider.value=1975;
                cnqw_text.value=1975;
        	}else if(cnqw_i==1976){
        	    viewer.scene.imageryLayers.remove(cnqw_image_other1975);
                 cnqw_image_other1976=image_show("../../otherData/qiwen_change/1976/",0.3);
				 cnqwImgs.push(cnqw_image_other1976);
                cnqw_slider.value=1976;
                cnqw_text.value=1976;
        	}else if(cnqw_i==1977){
        	    viewer.scene.imageryLayers.remove(cnqw_image_other1976);
                 cnqw_image_other1977=image_show("../../otherData/qiwen_change/1977/",0.3);
				 cnqwImgs.push(cnqw_image_other1977);
                cnqw_slider.value=1977;
                cnqw_text.value=1977;
        	}else if(cnqw_i==1978){
        	    viewer.scene.imageryLayers.remove(cnqw_image_other1977);
                 cnqw_image_other1978=image_show("../../otherData/qiwen_change/1978/",0.3);
				 cnqwImgs.push(cnqw_image_other1978);
                cnqw_slider.value=1978;
                cnqw_text.value=1978;
        	}else if(cnqw_i==1979){
        	   viewer.scene.imageryLayers.remove(cnqw_image_other1978);
                cnqw_image_other1979=image_show("../../otherData/qiwen_change/1979/",0.3);
                cnqwImgs.push(cnqw_image_other1979);
                cnqw_slider.value=1979;
                cnqw_text.value=1979;				
        	}else if(cnqw_i==1980){
        	    viewer.scene.imageryLayers.remove(cnqw_image_other1979);
                 cnqw_image_other1980=image_show("../../otherData/qiwen_change/1980/",0.3);
				 cnqwImgs.push(cnqw_image_other1980);
                cnqw_slider.value=1980;
                cnqw_text.value=1980;
        	}else if(cnqw_i==1981){
        	    viewer.scene.imageryLayers.remove(cnqw_image_other1980);
                 cnqw_image_other1981=image_show("../../otherData/qiwen_change/1981/",0.3);
				 cnqwImgs.push(cnqw_image_other1981);
                cnqw_slider.value=1981;
                cnqw_text.value=1981;
        	}else if(cnqw_i==1982){
        	    viewer.scene.imageryLayers.remove(cnqw_image_other1981);
                 cnqw_image_other1982=image_show("../../otherData/qiwen_change/1982/",0.3);
				 cnqwImgs.push(cnqw_image_other1982);
                cnqw_slider.value=1982;
                cnqw_text.value=1982;
        	}else if(cnqw_i==1983){
        	    viewer.scene.imageryLayers.remove(cnqw_image_other1982);
                 cnqw_image_other1983=image_show("../../otherData/qiwen_change/1983/",0.3);
				 cnqwImgs.push(cnqw_image_other1983);
                cnqw_slider.value=1983;
                cnqw_text.value=1983;
        	}else if(cnqw_i==1984){
        	    viewer.scene.imageryLayers.remove(cnqw_image_other1983);
                 cnqw_image_other1984=image_show("../../otherData/qiwen_change/1984/",0.3);
				 cnqwImgs.push(cnqw_image_other1984);
                cnqw_slider.value=1984;
                cnqw_text.value=1984;
        	}else if(cnqw_i==1985){
        	    viewer.scene.imageryLayers.remove(cnqw_image_other1984);
                 cnqw_image_other1985=image_show("../../otherData/qiwen_change/1985/",0.3);
				 cnqwImgs.push(cnqw_image_other1985);
                cnqw_slider.value=1985;
                cnqw_text.value=1985;
        	}else if(cnqw_i==1986){
        	    viewer.scene.imageryLayers.remove(cnqw_image_other1985);
                 cnqw_image_other1986=image_show("../../otherData/qiwen_change/1986/",0.3);
				 cnqwImgs.push(cnqw_image_other1986);
                cnqw_slider.value=1986;
                cnqw_text.value=1986;
        	}else if(cnqw_i==1987){
        	   viewer.scene.imageryLayers.remove(cnqw_image_other1986);
                cnqw_image_other1987=image_show("../../otherData/qiwen_change/1987/",0.3);
                cnqwImgs.push(cnqw_image_other1987);
                cnqw_slider.value=1987;
                cnqw_text.value=1987;				
        	}else if(cnqw_i==1988){
        	    viewer.scene.imageryLayers.remove(cnqw_image_other1987);
                 cnqw_image_other1988=image_show("../../otherData/qiwen_change/1988/",0.3);
				 cnqwImgs.push(cnqw_image_other1988);
                cnqw_slider.value=1988;
                cnqw_text.value=1988;
        	}else if(cnqw_i==1989){
        	    viewer.scene.imageryLayers.remove(cnqw_image_other1988);
                 cnqw_image_other1989=image_show("../../otherData/qiwen_change/1989/",0.3);
				 cnqwImgs.push(cnqw_image_other1989);
                cnqw_slider.value=1989;
                cnqw_text.value=1989;
        	}else if(cnqw_i==1990){
        	    viewer.scene.imageryLayers.remove(cnqw_image_other1989);
                 cnqw_image_other1990=image_show("../../otherData/qiwen_change/1990/",0.3);
				 cnqwImgs.push(cnqw_image_other1990);
                cnqw_slider.value=1990;
                cnqw_text.value=1990;
        	}else if(cnqw_i==1991){
        	    viewer.scene.imageryLayers.remove(cnqw_image_other1990);
                 cnqw_image_other1991=image_show("../../otherData/qiwen_change/1991/",0.3);
				 cnqwImgs.push(cnqw_image_other1991);
                cnqw_slider.value=1991;
                cnqw_text.value=1991;
        	}else if(cnqw_i==1992){
        	    viewer.scene.imageryLayers.remove(cnqw_image_other1991);
                 cnqw_image_other1992=image_show("../../otherData/qiwen_change/1992/",0.3);
				 cnqwImgs.push(cnqw_image_other1992);
                cnqw_slider.value=1992;
                cnqw_text.value=1992;
        	}else if(cnqw_i==1993){
        	    viewer.scene.imageryLayers.remove(cnqw_image_other1992);
                 cnqw_image_other1993=image_show("../../otherData/qiwen_change/1993/",0.3);
				 cnqwImgs.push(cnqw_image_other1993);
                cnqw_slider.value=1993;
                cnqw_text.value=1993;
        	}else if(cnqw_i==1994){
        	    viewer.scene.imageryLayers.remove(cnqw_image_other1993);
                 cnqw_image_other1994=image_show("../../otherData/qiwen_change/1994/",0.3);
				 cnqwImgs.push(cnqw_image_other1994);
                cnqw_slider.value=1994;
                cnqw_text.value=1994;
        	}else if(cnqw_i==1995){
        	   viewer.scene.imageryLayers.remove(cnqw_image_other1994);
                cnqw_image_other1995=image_show("../../otherData/qiwen_change/1995/",0.3);
                cnqwImgs.push(cnqw_image_other1995);
                cnqw_slider.value=1995;
                cnqw_text.value=1995;				
        	}else if(cnqw_i==1996){
        	    viewer.scene.imageryLayers.remove(cnqw_image_other1995);
                 cnqw_image_other1996=image_show("../../otherData/qiwen_change/1996/",0.3);
				 cnqwImgs.push(cnqw_image_other1996);
                cnqw_slider.value=1996;
                cnqw_text.value=1996;
        	}else if(cnqw_i==1997){
        	    viewer.scene.imageryLayers.remove(cnqw_image_other1996);
                 cnqw_image_other1997=image_show("../../otherData/qiwen_change/1997/",0.3);
				 cnqwImgs.push(cnqw_image_other1997);
                cnqw_slider.value=1997;
                cnqw_text.value=1997;
        	}else if(cnqw_i==1998){
        	    viewer.scene.imageryLayers.remove(cnqw_image_other1997);
                 cnqw_image_other1998=image_show("../../otherData/qiwen_change/1998/",0.3);
				 cnqwImgs.push(cnqw_image_other1998);
                cnqw_slider.value=1998;
                cnqw_text.value=1998;
        	}else if(cnqw_i==1999){
        	    viewer.scene.imageryLayers.remove(cnqw_image_other1998);
                 cnqw_image_other1999=image_show("../../otherData/qiwen_change/1999/",0.3);
				 cnqwImgs.push(cnqw_image_other1999);
                cnqw_slider.value=1999;
                cnqw_text.value=1999;
        	}else if(cnqw_i==2000){
        	    viewer.scene.imageryLayers.remove(cnqw_image_other1999);
                 cnqw_image_other2000=image_show("../../otherData/qiwen_change/2000/",0.3);
				 cnqwImgs.push(cnqw_image_other2000);
                cnqw_slider.value=2000;
                cnqw_text.value=2000;
        	}else if(cnqw_i==2001){
        	    viewer.scene.imageryLayers.remove(cnqw_image_other2000);
                 cnqw_image_other2001=image_show("../../otherData/qiwen_change/2001/",0.3);
				 cnqwImgs.push(cnqw_image_other2001);
                cnqw_slider.value=2001;
                cnqw_text.value=2001;
        	}else if(cnqw_i==2002){
        	    viewer.scene.imageryLayers.remove(cnqw_image_other2001);
                 cnqw_image_other2002=image_show("../../otherData/qiwen_change/2002/",0.3);
				 cnqwImgs.push(cnqw_image_other2002);
                cnqw_slider.value=2002;
                cnqw_text.value=2002;
        	}else if(cnqw_i==2003){
        	   viewer.scene.imageryLayers.remove(cnqw_image_other2002);
                cnqw_image_other2003=image_show("../../otherData/qiwen_change/2003/",0.3);
                cnqwImgs.push(cnqw_image_other2003);
                cnqw_slider.value=2003;
                cnqw_text.value=2003;				
        	}else if(cnqw_i==2004){
        	    viewer.scene.imageryLayers.remove(cnqw_image_other2003);
                 cnqw_image_other2004=image_show("../../otherData/qiwen_change/2004/",0.3);
				 cnqwImgs.push(cnqw_image_other2004);
                cnqw_slider.value=2004;
                cnqw_text.value=2004;
        	}else if(cnqw_i==2005){
        	    viewer.scene.imageryLayers.remove(cnqw_image_other2004);
                 cnqw_image_other2005=image_show("../../otherData/qiwen_change/2005/",0.3);
				 cnqwImgs.push(cnqw_image_other2005);
                cnqw_slider.value=2005;
                cnqw_text.value=2005;
        	}else if(cnqw_i==2006){
        	    viewer.scene.imageryLayers.remove(cnqw_image_other2005);
                 cnqw_image_other2006=image_show("../../otherData/qiwen_change/2006/",0.3);
				 cnqwImgs.push(cnqw_image_other2006);
                cnqw_slider.value=2006;
                cnqw_text.value=2006;
        	}else if(cnqw_i==2007){
        	    viewer.scene.imageryLayers.remove(cnqw_image_other2006);
                 cnqw_image_other2007=image_show("../../otherData/qiwen_change/2007/",0.3);
				 cnqwImgs.push(cnqw_image_other2007);
                cnqw_slider.value=2007;
                cnqw_text.value=2007;
        	}else if(cnqw_i==2008){
        	    viewer.scene.imageryLayers.remove(cnqw_image_other2007);
                 cnqw_image_other2008=image_show("../../otherData/qiwen_change/2008/",0.3);
				 cnqwImgs.push(cnqw_image_other2008);
                cnqw_slider.value=2008;
                cnqw_text.value=2008;
        	}else if(cnqw_i==2009){
        	    viewer.scene.imageryLayers.remove(cnqw_image_other2008);
                 cnqw_image_other2009=image_show("../../otherData/qiwen_change/2009/",0.3);
				 cnqwImgs.push(cnqw_image_other2009);
                cnqw_slider.value=2009;
                cnqw_text.value=2009;
        	}else if(cnqw_i==2010){
        	    viewer.scene.imageryLayers.remove(cnqw_image_other2009);
                 cnqw_image_other2010=image_show("../../otherData/qiwen_change/2010/",0.3);
				 cnqwImgs.push(cnqw_image_other2010);
                cnqw_slider.value=2010;
                cnqw_text.value=2010;
        	}else if(cnqw_i==2011){
        	   viewer.scene.imageryLayers.remove(cnqw_image_other2010);
                cnqw_image_other2011=image_show("../../otherData/qiwen_change/2011/",0.3);
                cnqwImgs.push(cnqw_image_other2011);
                cnqw_slider.value=2011;
                cnqw_text.value=2011;				
        	}else if(cnqw_i==2012){
        	    viewer.scene.imageryLayers.remove(cnqw_image_other2011);
                 cnqw_image_other2012=image_show("../../otherData/qiwen_change/2012/",0.3);
				 cnqwImgs.push(cnqw_image_other2012);
                cnqw_slider.value=2012;
                cnqw_text.value=2012;
        	}else if(cnqw_i==2013){
        	    viewer.scene.imageryLayers.remove(cnqw_image_other2012);
                 cnqw_image_other2013=image_show("../../otherData/qiwen_change/2013/",0.3);
				 cnqwImgs.push(cnqw_image_other2013);
                cnqw_slider.value=2013;
                cnqw_text.value=2013;
        	}else if(cnqw_i==2014){
        	    viewer.scene.imageryLayers.remove(cnqw_image_other2013);
                 cnqw_image_other2014=image_show("../../otherData/qiwen_change/2014/",0.3);
				 cnqwImgs.push(cnqw_image_other2014);
                cnqw_slider.value=2014;
                cnqw_text.value=2014;
        	}else if(cnqw_i==2015){
        	    viewer.scene.imageryLayers.remove(cnqw_image_other2014);
                 cnqw_image_other2015=image_show("../../otherData/qiwen_change/2015/",0.3);
				 cnqwImgs.push(cnqw_image_other2015);
                cnqw_slider.value=2015;
                cnqw_text.value=2015;
        	}else if(cnqw_i==2016){
        	    viewer.scene.imageryLayers.remove(cnqw_image_other2015);
                 cnqw_image_other2016=image_show("../../otherData/qiwen_change/2016/",0.3);
				 cnqwImgs.push(cnqw_image_other2016);
                cnqw_slider.value=2016;
                cnqw_text.value=2016;
        	}
        }

$('#CNQiwenChangeWindow').window({
			 onClose:function(){
				 for(var i=0;i<cnqwImgs.length;i++){
					viewer.scene.imageryLayers.remove(cnqwImgs[i]);
				}
			 }
		 });