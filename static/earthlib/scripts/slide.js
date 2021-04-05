(function($){
    $.fn.ckSlide = function (opts) {
        
        opts = $.extend({}, $.fn.ckSlide.opts, opts);
        var vimgs = opts.imgs;
        this.each(function(){
            var slidewrap = $(this).find('.ck-slide-wrapper');
            var slide = slidewrap.find('li');
            var count = opts.imgs.length;// slide.length;
            var that = this;
            var index = 0;
            var vpage = 0;//goose page number
            var time = null;
            $(this).data('opts', opts);
            // next
            $(this).find('.ck-next').on('click', function(){
                if(opts['isAnimate'] == true){
                    return;
                }
                
                var old = index;
                if (old == count-1) {
                    alert("已经是最后一张了，请单击左侧按钮！"); return;
                }
                index = (index >= count - 1) ? (count - 1) : index + 1;
                prepare_info(opts.imgs, index, opts.baseadd);
                if (opts.callbkBrowse != null)
                    opts.callbkBrowse(index);
                //change.call(that, index, old);
            });

            // prev
            $(this).find('.ck-prev').on('click', function(){
                if(opts['isAnimate'] == true){
                    return;
                }
                
                var old = index;
                if (old == 0) {
                    alert("已经是第一张了，请单击右侧按钮！"); return;
                }
                index = (index <= 0) ? 0 : index - 1;
                prepare_info(opts.imgs, index, opts.baseadd);
                if (opts.callbkBrowse != null)
                    opts.callbkBrowse(index);
                //change.call(that, index, old);
            });

            $(this).find('.ck-slidebox li').each(function(cindex){
                $(this).on('click.slidebox', function(){
                    change.call(that, cindex, index);
                    index = cindex;
                });
            });
            
            // focus clean auto play
            /*
            $(this).on('mouseover', function(){
                if(opts.autoPlay){
                    clearInterval(time);
                }
                $(this).find('.ctrl-slide').css({opacity:0.6});
            });
            //  leave
            $(this).on('mouseleave', function(){
                if(opts.autoPlay){
                    startAtuoPlay();
                }
                $(this).find('.ctrl-slide').css({opacity:0.15});
            });
            */
           // startAtuoPlay();
            // auto play
            function startAtuoPlay(){
                if(opts.autoPlay){
                    time  = setInterval(function(){
                        var old = index;
                        if(index >= count - 1){
                            index = 0;
                        }else{
                            index++;
                        }
                        change.call(that, index, old);
                    }, 2000);
                }
            }
            // 修正box
            var box = $(this).find('.ck-slidebox');
            box.css({
                'margin-left':-(box.width() / 2)
            })
            // dir
            switch(opts.dir){
                case "x":
                    opts['width'] = $(this).width();
                    slidewrap.css({
                        'width':count * opts['width']
                    });
                    slide.css({
                        'float':'left',
                        'position':'relative'
                    });
                    slidewrap.wrap('<div class="ck-slide-dir"></div>');
                    slide.show();
                    break;
            }
        });
    };

    function change(show, hide){
        var opts = $(this).data('opts');
        prepare_info(opts.imgs,show,opts.baseadd);
        /*
        var opts = $(this).data('opts');
        if(opts.dir == 'x'){
            var x = show * opts['width'];
            $(this).find('.ck-slide-wrapper').stop().animate({'margin-left':-x}, function(){opts['isAnimate'] = false;});
            opts['isAnimate'] = true
        }else{
            $(this).find('.ck-slide-wrapper li').eq(hide).stop().animate({opacity:0});
            $(this).find('.ck-slide-wrapper li').eq(show).show().css({opacity:0}).stop().animate({opacity:1});
        }
       
        $(this).find('.ck-slidebox li').removeClass('current');        var vcurr = $(this).find('.ck-slidebox li').eq(show);
        vcurr.addClass('current');
        vcurr.attr('src', opts.baseadd + opts.imgs[show].PHOTO);
        */
    }

    $.fn.ckSlide.opts = {
        autoPlay: false,
        callbkBrowse:null,//浏览后的回调函数
        dir: null,
        isAnimate: false,
        imgs: [],//goose 
        baseadd:''//goose 
    };

})(jQuery);

function prepare_info(ventss,idx,vimgbase)
{
    if (isbad(ventss)) return;
    var vlen = ventss.length;
    if (idx < 0 || idx >= vlen) return;

    var vent = ventss[idx];
    if (isbad(vent)) return;
    //准备数据
    var vinfo = "<b>第" + (idx + 1) + "/" + vlen + " 张</b>&nbsp;<br/>" +
        "<b>IMEI:</b>&nbsp;&nbsp" + vent.IMEI +
        "&nbsp;&nbsp<b>定位时间:</b>&nbsp;&nbsp" + vent.TIME + "<br/>" +
        "<b>经纬度:</b>&nbsp;&nbsp" + vent.X + "," + vent.Y +
        "&nbsp;&nbsp<b>定位精度:</b>&nbsp;&nbsp" + vent.ACCURACY + "<br/>" +
        "<b>备注:</b>&nbsp;&nbsp" + vent.REMARK + "&nbsp;&nbsp<b>上传说明:</b>&nbsp;&nbsp" + vent.INFO;
    // 替换无效字符
    vinfo = vinfo.replace(/null/g, "");
    vinfo = vinfo.replace(/undefined/g, "");

    $("#lbsdetailinfo").html(vinfo);
    //准备图片
    var vimg0 = $("#lbsimg1");
    vimg0.attr('src', vimgbase + vent.PHOTO);
    vimg0.show();
    //$("#lbsli1").show();
}