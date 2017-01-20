(function($) {
   $.fn.slide = function(options) {
    //插件参数的可控制性，外界可以修改默认参数
    var defaults=$.extend($.fn.slide.defaults, options);
    // 每次移动的水平距离
    var move_length=0;
    // 最长可移动的位移
    var max_move=parseInt(defaults.ul_width) - $('#slide .tempwrap').width() + parseInt(defaults.li_width);
    console.log(max_move);

    var $bd = $('#slide .bd');
    // 动态给ul赋值宽度
    $bd.width(defaults.ul_width);

    $('#slide .arr_div_r').click(function(){
            move_length += -parseInt(defaults.li_width);
        if (-move_length<max_move) {
    console.log(move_length);
            $('#slide .bd ').css({
                transform:'translateX('+move_length+'px)'
            })
        }else{
            $bd.stop().css({
                transform:'translateX(0)'
            })
            move_length = 0;
        }
    })
    $('#slide .arr_div_l').click(function(){
        move_length += parseInt(defaults.li_width);
        if (move_length<=0) {
            $bd.css({
                transform:'translateX('+move_length+'px)'
            })
        }else{
            $bd.stop().css({
                transform:'translateX(0)'
            })
            move_length = 0;
        }
    })
};
//参数默认值
    $.fn.slide.defaults={
        li_width: '160',
        ul_width:'1120'
    }
})(jQuery);
