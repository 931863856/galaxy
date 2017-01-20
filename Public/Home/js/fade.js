$(function(){
	var flag = false;
	var li_before_idx=0;
	var li_after_idx_r=li_before_idx+1;
	var li_after_idx_l=2-li_before_idx;

	$(".p1 #fadebox .right").click(function(){
		if (flag) {
			// 记录返回前一页的索引（把点击前的索引赋值给左箭头点击后的显示页的索引）
			li_after_idx_l = li_before_idx;
		}
		if(li_after_idx_r == 3){
			li_after_idx_r = 0;	
		}
		fade($('.p1 #fadebox .ul li').eq(li_before_idx),$('.p1 #fadebox .ul li').eq(li_after_idx_r));
		li_before_idx = li_after_idx_r;
		li_after_idx_r++;
		flag=true;
	})
	$(".p1 #fadebox .left").click(function(){
		if (flag) {
			// 记录返回前一页的索引（把点击前的索引赋值给右箭头点击后的显示页的索引）
			li_after_idx_r = li_before_idx;
		}
		if(li_after_idx_l == -1){
			li_after_idx_l = 2;
		}
		fade($('.p1 #fadebox .ul li').eq(li_before_idx),$('.p1 #fadebox .ul li').eq(li_after_idx_l));
		li_before_idx=li_after_idx_l;
		li_after_idx_l--;
		flag=true;
	})
	function fade(linow,liNext){ 
		linow.addClass('hide').removeClass('fade_in');
		liNext.removeClass('hide').addClass('fade_in');
	}

	// 设置自动播放

	var auto = setInterval(function(){
		$(".p1 #fadebox .right").trigger('click');
	},2500)

	$('.p1 #fadebox .ul li').hover(function(){
		clearInterval(auto);
	},function(){
		auto = setInterval(function(){
			$(".p1 #fadebox .right").trigger('click');
		},2500)
	})

})