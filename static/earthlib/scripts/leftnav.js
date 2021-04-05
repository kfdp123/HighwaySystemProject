$(function(){
	  //$('.leftnav-item.leftnav-show').removeClass('leftnav-show');
            //$('.leftnav-item').children('ul').removeAttr('style');
	//$('.leftnav-item').children('ul').css('display','none');
	//$('.leftnav-show').css('display','none');
	$('.leftnav').addClass('leftnav-mini');
    // leftnav收缩展开
    $('.leftnav-item>a').on('click',function(){
        if (!$('.leftnav').hasClass('leftnav-mini')) {
            if ($(this).next().css('display') == "none") {
                //展开未展开
                $('.leftnav-item').children('ul').slideUp(300);
                $(this).next('ul').slideDown(300);
                $(this).parent('li').addClass('leftnav-show').siblings('li').removeClass('leftnav-show');
            }else{
                //收缩已展开
                $(this).next('ul').slideUp(300);
                $('.leftnav-item.leftnav-show').removeClass('leftnav-show');
            }
        }
    });
    //leftnav-mini切换
    $('#mini').on('click',function(){
        if (!$('.leftnav').hasClass('leftnav-mini')) {
            $('.leftnav-item.leftnav-show').removeClass('leftnav-show');
            $('.leftnav-item').children('ul').removeAttr('style');
            $('.leftnav').addClass('leftnav-mini');
        }else{
            $('.leftnav').removeClass('leftnav-mini');
        }
    });
});