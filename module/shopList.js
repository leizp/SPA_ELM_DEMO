var shopListObj = Object.create(homeObj);
$.extend(shopListObj,{
	name:'我是商品列表页',
	dom:$('#shopList'),
	init:function(name){
		console.log(name);
		this.shopReader();
		this.shopListReader();
		this.bindEvent();
	},
	bindEvent:function(){
		setTimeout(function(){
			
			$('.nearShopList').click(function(event){
				var oLi = event.target.parentElement.parentElement;
				//console.log(oLi.id);
				var url = location.href;
				url = url.split('?')[1];
				location.href = '#shopDetail?'+url+'&id='+oLi.id;

			})
		})

	},
	shopReader:function(){
		var url = location.href;
		$.ajax({
			url:'/v2/index_entry',
			type:'GET',
			data:{
				geohash:url.split('?')[1].split('&')[0].split('=')[1],
				group_type:1,
				'flags[]':'F',
			},
			success:function(res){
				var str = '';
				for(var i = 0 ; i < res.length ; i++){
					str += '<div class="shopTitle">'+
								'<img src="https://fuss10.elemecdn.com'+res[i].image_url+'" alt="" />'+
								'<h3>'+res[i].title+'</h3>'+
							'</div>';
				}
				$('.active').html(str);
				console.log(res);
			},
			error:function(){
				alert('后端错误');
			}
		})
	},
	shopListReader:function(){
		var url = location.href;
		$.ajax({
			url:'/shopping/restaurants',
			type:'GET',
			data:{
				latitude:url.split('?')[1].split('&')[1].split('=')[1],
				longitude:url.split('?')[1].split('&')[2].split('=')[1],
				offset:0,
				limit:20,
				'extras[]':'activities',
			},
			success:function(res){
				var str = '';
				for(var i = 0 ; i < res.length; i++){
					//图片地址处理
					var img_url = res[i].image_path;
					var first = img_url.substring(0,3).charAt(0)+'/'+img_url.substring(1,3)+'/';
					img_url = img_url.replace(img_url.substring(0,3),first);
					if(img_url.charAt(img_url.length-2) === 'n'){
						img_url = img_url + '.png';
					}else{
						img_url = img_url + '.jpeg';
					}
					str += '<li id="'+res[i].id+'">'+
								'<img src="//fuss10.elemecdn.com/'+img_url+'" alt="" />'+
								'<div class="near_left">'+
									'<h4>'+res[i].name+'</h4>'+
									'<h5>月送45单</h5>'+
									'<h6>'+res[i].piecewise_agent_fee.description+'</h6>'+
								'</div>'+
							'</li>';
				}
				$('.nearShopList').html(str);
				console.log(res)
			}
		})
	}
})