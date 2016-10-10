var addressObj = Object.create(homeObj);
$.extend(addressObj,{
	name:'我是地址页',
	dom:$('#address'),
	init:function(name){
		this.addresReader();
	},
	bindEvent:function(){

	},
	addresReader:function(){
		var url = location.href;
		var arr = url.split('-')[1];
		var city_id = arr.split('&')[0].split('=')[1];
		var keyword = decodeURI(arr.split('&')[1].split('=')[1]);
		var data = {
			city_id:city_id,
			keyword:keyword,
			type:'search'
		}
		$.ajax({
			url:'/v1/pois',
			type:'GET',
			data:data,
			success:function(res){
				//console.log(res);
				var str = '';
				for(var i = 0 ; i < res.length ; i ++){
					str += '<a class="shop" href="#shopList?geohash='+res[i].geohash
							+'&latitude='+res[i].latitude
							+'&longitude='+res[i].longitude
							+'">'+
								'<span class="shopName">'+res[i].name+'</span>'+
								'<span class="shopAddress">'+res[i].address
								'</span>'+	
							'</a>';
				};
				$('#address').html(str);
			}
		})
	}
})