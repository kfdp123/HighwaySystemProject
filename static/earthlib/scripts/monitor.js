// JavaScript source code
// ��Ա���
/*
* goose 2017��4��26�� for forest information inquery!~
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




