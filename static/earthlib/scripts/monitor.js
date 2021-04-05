// JavaScript source code
// 人员监控
/*
* goose 2017年4月26日 for forest information inquery!~
*/

function lbsmonitor(vbegin)
{
	
    //menu
    if(vbegin == true) $('#dlgmenu_moni').show();
	else $('#dlgmenu_moni').hide();

    if(vbegin)
    {
        init_map2d();
    }
    else {
        close_wins();
    }
}




