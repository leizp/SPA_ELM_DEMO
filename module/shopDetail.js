var shopDetailObj = Object.create(homeObj);
$.extend(shopDetailObj,{
	name:'我是商品列表页',
	dom:$('#shopDetail'),
	init:function(name){
		this.readerPage();
		this.shoppingReader();
		this.bindEvent();
	},
	bindEvent:function(){
		this.TapChange();

	},
	readerPage:function(){ //商品名称渲染
		var url = location.href;
		$.ajax({
			url:'/shopping/restaurant/'+url.split('?')[1].split('&')[3].split('=')[1],
			type:'GET',
			data:{
				'extras[]':'activities',
				'extras[]':'album',
				'extras[]':'license',
				'extras[]':'identification',
				'extras[]':'statistics',
				latitude:url.split('?')[1].split('&')[1].split('=')[1],
				longitude:url.split('?')[1].split('&')[2].split('=')[1]
			},
			success:function(res){
				var str = '';
				//图片地址处理
					var img_url = res.image_path;
					var first = img_url.substring(0,3).charAt(0)+'/'+img_url.substring(1,3)+'/';
					img_url = img_url.replace(img_url.substring(0,3),first);
					if(img_url.charAt(img_url.length-2) === 'n'){
						img_url = img_url + '.png';
					}else{
						img_url = img_url + '.jpeg';
					}
					str += '<img src="//fuss10.elemecdn.com/'+img_url+'" alt="" class="top_img" />'+
							'<div class="title_wrap">'+
								'<div class="top_Tit">'+res.name+'</div>'+
								'<div class="tit_tips">'+
									'<span>商家配送</span>/'+
									'<span>'+res.piecewise_agent_fee.description
									+'</span>'+
								'</div>'+
								'<div class="tit_tips">'+
									'<span class="act">减</span>'+
									'<span>&nbsp满45元减12元</span>'+
								'</div>'+
							'</div>'+
							'<div class = "info"></div>'+
							'<div class="promotion_info"><span class="promotion">公告</span>&nbsp'
							+res.promotion_info
							+'</div>';
					$('.Detail_title').html(str);
				console.log(res);
			},
			error:function(){
				alert('后端数据出错！')
			}
		})
	},
	shoppingReader:function(){//商品列表渲染
		var _this = this;
		var url = location.href;
		$.ajax({
			url:'/shopping/v1/menu',
			type:'GET',
			data:{
				restaurant_id:url.split('?')[1].split('&')[3].split('=')[1]
			},
			success:function(res){
				var str = '';
				var str1 = '';
				for(var i = 0; i < res.length; i++){
					str += '<li>'+res[i].name+'</li>';
					str1 += '<p class="List_name">'+
								'<b>'+res[i].name+'</b>'+
								'<span>'+res[i].description+
								'</span>'+
							'</p>'+
							'<dl class="List_detail">'+_this.readerStr(res[i])
							+'</dl>';
				}
				$('.shopDop_left ul').html(str);
				$('.shopDop_right_List').html(str1);
				$('.shopDop_left li')[0].className = 'li';
				_this.fnScroll();
				_this.fnStar();
				console.log(res)
			}
		})
	},
	TapChange:function(){//选项卡切换
		$('.tap_box').click(function(event){
			if(event.target.innerText === '商品'){
				$('.shoppingDop').show();
				$('.shopHostDop').hide();
			}else{
				$('.shoppingDop').hide();
				$('.shopHostDop').show();
			}
		})
	},
	readerStr:function(data){//内部字符串拼接
			var str2 = '';
			for(var j = 0 ; j < data.foods.length ; j++){
				if(data.foods[j].image_path){
					var img_url = data.foods[j].image_path;
					var first = img_url.substring(0,3).charAt(0)+'/'+img_url.substring(1,3)+'/';						
					img_url = img_url.replace(img_url.substring(0,3),first);
					if(img_url.charAt(img_url.length-2) === 'n'){
						img_url = img_url + '.png';
					}else{
						img_url = img_url + '.jpeg';
					};
				}else{
					img_url = '';
				}
				str2 += '<dt>'+
							'<img src="//fuss10.elemecdn.com/'+img_url+'" alt="" />'+
						'</dt>'+
						'<dd>'+
							'<p>'+data.foods[j].name+'</p>'+
							'<p class="sel">'+
								'月售'+data.foods[j].month_sales+'份<span>好评率'+data.foods[j].satisfy_rate+'%</span>'+
							'</p>'+
							'<p class="price">'+
								'<span>￥'+data.foods[j].specfoods[0].price+' </span>起'+
								'<i><em id="'+data.foods[j].category_id+'">+</em></i>'+
							'</p>'+
						'</dd>';								
					}
		return str2;		
	},
	fnScroll:function(){//滚动条代码
			setTimeout(function(){
			console.log('执行了此处代码');
			window.myScrollFood = new IScroll('.shopDop_left', {
			    scrollbars: true,
			    bounce: true,
			    preventDefault: false, //让点击事件得以执行
			    probeType:2, //让滚动条滚动正常
			    interactiveScrollbars: true,
				shrinkScrollbars: 'scale',
				fadeScrollbars: true
			});
		})
	},
	fnStar:function(){//楼梯函数
		setTimeout(function(){
			console.log('执行了1此处代码');
			window.myScrollFood = new IScroll('.shopDop_right', {
			    scrollbars: true,
			    bounce: true,
			    preventDefault: false, //让点击事件得以执行
			    probeType:2, //让滚动条滚动正常
			    interactiveScrollbars: true,
				shrinkScrollbars: 'scale',
				fadeScrollbars: true
			});
		});	

		//点击函数
		$('.shopDop_left').click(function(event){
			$('.shopDop_left li').removeClass('li');
			event.target.className = 'li';
			for(var i = 0 ;i < $('.List_name').length ; i ++){
				if($('.List_name')[i].innerText ===event.target.innerText ){
					//console.log($('.List_name').eq(i).offset().top);
					myScrollFood.scrollToElement($('.List_name')[i], 132.234375, 0, 0);
				}
			}
		});
		//滚动事件
	},
	shopCar:function(){

	}
})