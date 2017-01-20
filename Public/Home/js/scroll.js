(function($){
	$.fn.scroll = function(options){
		var page_idx = 0;
		var is_finished = true;
		var ff_browser = window.navigator.userAgent.toLowerCase().indexOf('firefox');
		var ie_browser = window.navigator.userAgent.indexOf('MSIE');

		var defaults = $.extend($.fn.scroll.defaults,options)

		if(ff_browser != -1 || ie_browser != -1){
			$('body,html').animate({
				scrollTop:"0"
			})
		}else{
			$(document.body).animate({
				scrollTop:"0"
			})
		}
		
	// 滚动滑轮触发页面滑动事件
		var scrollFunc = function(event){
			var e = event || window.event; 
			e.preventDefault();
			if(is_finished){
				if(e.wheelDelta<0 || e.detail>0){	
					//滚轮下滑		
					if(page_idx == defaults.page_total-1) return;	
					page_idx++;
					scroll_page();
					change_nav();
					set_pos();
				}else if(e.wheelDelta>0 || e.detail<0){   	
					//滚轮上滑		
					if(page_idx == 0) return;
					set_pos();
					page_idx--;
					scroll_page();
					change_nav();
				}
			}
		}

	//点击nav触发的页面滑动事件
	 	$('.p2 .nav .nav_ct .nav_row .item').click(function(){
	 		page_idx = $(this).index()-1;
	 		scroll_page();
	 		change_nav();
			set_pos();
	 	})

	// 执行页面滚轮绑定
	 	regist_mousewheel();

	// 子页返回定位具体页面
		locate_to();

	// // // // // // // // // // // // // // // // // // // // // // // // 具体实现的方法// // // // // // // // // // // // // // // // // // // 

	//滚动页面效果函数 
		function scroll_page(){
			is_finished = false;

			if(ff_browser != -1 || ie_browser != -1){
				$('body,html').animate({
					scrollTop:$('.index').eq(page_idx).offset().top
				},defaults.transist_time,'easeInQuad')
			}else{
				$(document.body).animate({
					scrollTop:$('.index').eq(page_idx).offset().top
				},defaults.transist_time,'easeInQuad')
			}

			setTimeout(function(){
				is_finished = true;
			},defaults.transist_time)
		}

	//改变nav的动画样式 
		function change_nav(){
			_this = $('.p2 .nav .nav_ct .nav_row .item');
			_this.removeClass('active');
			_this.children('.mask_bg').removeClass('longer');
			_this.children('.mask_bg').hide();

			_this.eq(page_idx).addClass('active');
			_this.eq(page_idx).find('.mask_bg').show();
			_this.eq(page_idx).find('.mask_bg').addClass('longer');
		}


	// 注册滚轮事件方法
		 function regist_mousewheel(){
	        //非IE 
	        if(document.addEventListener && !document.attachEvent) { 
	            if (ff_browser != -1) {
	                //FF绑定滚动事件 
	                document.addEventListener('DOMMouseScroll', scrollFunc);
	            } else {
	                //其他浏览器
	               document.addEventListener('mousewheel',scrollFunc); 
	            }
	        } 
	        //IE
	        else if(document.attachEvent && !document.addEventListener){ 
	            document.attachEvent('onmousewheel',scrollFunc); 
	        }else{ 
	            window.onmousewheel = scrollFunc; 
	        }
	    }

	// 设置nav的定位position方法
		function set_pos(){
			if (page_idx >= 2) {
				$('.p2 .nav').css({
		 			position:'fixed'
		 		})
			}else{
				$('.p2 .nav').css({
		 			position:'absolute'
		 		})
			}
		}

	// 子页返回本页是刷新定位到具体的某个导航项；
		function locate_to(){
			page_idx = window.location.href.split('?')[1] || 0;
			scroll_page();
	 		change_nav();
	 		set_pos();
		}
	}

	// 设置默认参数
	$.fn.scroll.defaults = {
		'page_total':8,
		'transist_time':500
	}
})(jQuery)

