var shopDetailObj = Object.create(homeObj);
$.extend(shopDetailObj,{
	name:'我是商品列表页',
	dom:$('#shopDetail'),
	init:function(name){
		var _this = this;
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
				//console.log(res);
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
				_this.shopCar();
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
							'<p class="sigleName">'+data.foods[j].name+'</p>'+
							'<p class="sel">'+
								'月售'+data.foods[j].month_sales+'份<span>好评率'+data.foods[j].satisfy_rate+'%</span>'+
							'</p>'+
							'<p class="price">'+
							'<span>￥<b class="siglePrice">'+data.foods[j].specfoods[0].price+' </b></span>起'+
							'<i><em id="'+data.foods[j].category_id+j+'" class="shopBtnE">+<b class="flayBox">+</b></em></i>'+
							'</p>'+
						'</dd>';								
					}
		return str2;		
	},
	fnScroll:function(){//滚动条代码
		//setTimeout(function(){});
			console.log('执行了此处代码');
			if(typeof myScroll !== 'undefined') {
				myScroll.destroy(); //删掉
			}
			window.myScroll = new IScroll('.shopDop_left', {
			    scrollbars: true,
			    bounce: true,
			    preventDefault: false, //让点击事件得以执行
			    probeType:2, //让滚动条滚动正常
			    interactiveScrollbars: true,
				shrinkScrollbars: 'scale',
				fadeScrollbars: true
			})
	},
	fnStar:function(){//楼梯函数
		//setTimeout(function(){});
			console.log('执行了1此处代码');
			if(typeof myScrollFood !== 'undefined') {
				myScrollFood.destroy(); //删掉
			}
			window.myScrollFood = new IScroll('.shopDop_right', {
			    scrollbars: true,
			    bounce: true,
			    preventDefault: false, //让点击事件得以执行
			    probeType:2, //让滚动条滚动正常
			    interactiveScrollbars: true,
				shrinkScrollbars: 'scale',
				fadeScrollbars: true
			});
			var aList_name = $('.List_name');
			var aShopList = $('.shopDop_left li');
			var arrTop = [];
			for(var i = 0 ; i < aList_name.length ; i++){
					arrTop.push(aList_name[i].offsetTop)
				}
			console.log(arrTop);
				myScrollFood.on("scroll",function(event){
					for(var i = 0 ; i < arrTop.length;i++){
						//console.log("我到顶部了"+Math.round(this.y)+"高度"+(-arrTop[i]));
						//debugger;
						if( Math.round(this.y) == -arrTop[i]){
							console.log("我到顶部了"+this.y+i);
							aShopList.removeClass("li");
							aShopList.eq(i).addClass("li");
						}
					}
				});
		
		//点击函数
		$('.shopDop_left').click(function(event){
			if(event.target.className === "shopDop_left"){
				return false;
			}else{
			$('.shopDop_left li').removeClass('li');
				event.target.className = 'li';
				for(var i = 0 ;i < $('.List_name').length ; i ++){
					if($('.List_name')[i].innerText ===event.target.innerText ){
						//console.log($('.List_name').eq(i).offset().top);
						myScrollFood.scrollToElement($('.List_name')[i], 132.234375, 0, 0);
					}
				}				
			}
		});
		
	},
	shopCar:function(){
		//第一步,实现点击购物车显示购物车页面
		var oShopCar = {
			oCar:$('.carImg'),
			oShopDisplay:$('.shopDisplay'),
			oDisplayNone:$('.displayNone'),
			aShopList:[],//存储购物车的数组变量
			init:function(){
				this.bindEvent();

			},
			bindEvent:function(){
				var _this = this;
				this.oCar.click(function(){
					//console.log('我点击了购物车');
					_this.oShopDisplay.show();
				});
				this.oDisplayNone.click(function(){
					_this.oShopDisplay.hide();
				});
				this.addClick();
				setTimeout(function(){
					_this.shopShowing();
					_this.shoppingChange();
				})
			},
			addClick:function(){
				var _this = this;
				for(var i = 0 ; i < $('.shopBtnE').length;i++){
					(function(index){
						$('.shopBtnE')[index].onclick = function(){
							if(store(this.id)){
								//console.log("购物车中已经有了");
								var data = store(this.id);
								data.num++;
								store(this.id,data);
								for(var j = 0 ; j < _this.aShopList.length;j++){
									if(_this.aShopList[j].id == this.id){
										_this.aShopList[j].num = store(this.id).num; 
									};
								};
								store('arrShop',_this.aShopList);
								//console.log(_this.aShopList)
								_this.shopShowing();
							}else{
								var data = {
										id:this.id,
										name:$('.sigleName')[index].innerText,
										price:$('.siglePrice')[index].innerText,
										num:1
									};
								store(this.id,data);
								_this.aShopList.push(store(this.id));
								store('arrShop',_this.aShopList)
								_this.shopShowing();
								//console.log(_this.aShopList)
							}
						}
					})(i)
				}
			},
			shopStr:function(data){
				var str = '';
					str = '<li>'+
							'<span>'+data.name+'</span>'+
							'<span class="showUl_right">'+
								'<i class="minus">-</i>'+
								'<i class="'+data.id+'">'+data.num+'</i>'+
								'<i class="plus">+</i>'+
							'</span>'+
						  '</li>';
						  return str;
			},
			shopShowing:function(){//购物车显示渲染
				var _this = this;
				var str = '';
				var totalNum = 0;
				var totalPrice = 0;
				if(store('arrShop')){
					_this.aShopList = store('arrShop');
					for(var i = 0 ; i < _this.aShopList.length ; i ++){
						str += _this.shopStr(_this.aShopList[i]);
						totalPrice += _this.aShopList[i].price*_this.aShopList[i].num;
						totalNum += _this.aShopList[i].num;
					}
				}else{
					for(var i = 0 ; i < _this.aShopList.length ; i ++){
						str += _this.shopStr(_this.aShopList[i]);
						totalPrice += _this.aShopList[i].price*_this.aShopList[i].num;
						totalNum += _this.aShopList[i].num;
					}
				}
				$('.shopCarShowUl').html(str);
				$('.totalPrice span').html(totalPrice);
				$('.carInnerBox em').html(totalNum);
			},
			shoppingChange:function(){//购物车的改变
				var _this = this;
				var fleg = true;
				
				$('.shopCarShowUl').click(function(event){
						var tuchDom = event.target.parentElement.children[1];
						if(event.target.className === "plus"){
							var data = store(tuchDom.className);
								data.num++;
							for(var j = 0 ; j < _this.aShopList.length;j++){
									if(_this.aShopList[j].id == tuchDom.className){
										store(tuchDom.className,data);
										_this.aShopList[j].num = store(tuchDom.className).num; 
									};
								};
								store('arrShop',_this.aShopList);
								_this.shopShowing();
						}
						if(event.target.className === "minus"){
							var data = store(tuchDom.className);
							if(data){
								if(data.num == 0){
									data.num = 0;
								}else{
									data.num--;
								}
							var brr = [];
							for(var j = 0 ; j < _this.aShopList.length;j++){
									if(_this.aShopList[j].id == tuchDom.className){
										if(data.num === 0){
											localStorage.removeItem(tuchDom.className);
											//删除data元素为0的数组
											delete _this.aShopList[j];
										}else{
											store(tuchDom.className,data);
											_this.aShopList[j].num = store(tuchDom.className).num; 
											console.log(store('arrShop'))
										}
									};
									if(_this.aShopList[j] !== undefined){
										brr.push(_this.aShopList[j]);
									}
								};
								store('arrShop',brr);
								_this.shopShowing();
							}
						}
				})
			}
		}
		oShopCar.init();
	}
})