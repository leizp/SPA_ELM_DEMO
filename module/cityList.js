var cityListObj = Object.create(homeObj);
$.extend(cityListObj,{
	name:'我是城市列表页',
	dom:$('#cityList'),
	init:function(){
		this.bindEvent();
		this.readerCity();

	},
	bindEvent:function(){
		setTimeout(function(){
			var aLi = $('li');
			//console.log(aLi.length )
			for(var i = 0 ; i < aLi.length ; i ++){
				(function(index){
					aLi[i].onclick = function(){
						var city = this.innerText;
						//console.log(this.innerText);
						$('.nowCity').html(city);
						$('.city')[0].id = this.id;
						$('.city').html(city);
						location.href = '#home';
					}
				})(i)
			}
		})
	},
	readerCity:function(){
		this.positionCity();
		this.hotCityReader();
		this.cityGroupReader();
	},
	positionCity:function(){
		var nowCity = store('nowCity');
			if(nowCity){
				$('.nowCity').html(nowCity.name);	
			}else{
				//发送定位城市请求
				$.ajax({
					url:'/v1/cities?type=guess',
					type:"GET",
					success:function(res){
						store("nowCity",res);
						$('.nowCity').html(res.name);
					},
					error:function(){
						alert('后端数据出错');
					}
				})			
			}
	},
	hotCityReader:function(){
		var _this = this;
		var hotCity = store('hotCity');
			if(hotCity){
				var str = '';
				for(var i = 0 ; i < hotCity.length; i ++){
					str += '<li id="'+hotCity[i].id+'">'+hotCity[i].name+'</li>'
					}
				$('.hotName').html(str);
			}else{
				//发送热门城市ajax请求
				$.ajax({
					url:'/v1/cities?type=hot',
					type:"GET",
					success:function(res){
						store('hotCity',res);
						var str = '';
						for(var i = 0 ; i < res.length; i ++){
							str += '<li id="'+res[i].id+'">'+res[i].name+'</li>'
							//console.log(res);
							//此处一刷新页面就不在了需要存储
						}
						$('.hotName').html(str);
					},
					error:function(){
						alert('后端数据出错');
					}
				})				
			}
	},
	cityGroupReader:function(){
		var _this = this;
		//发送所有城市ajax请求
		var cityGroup = store('cityGroup');
		if(cityGroup){
			var str = '';
			var arr = [];
			for(var i in cityGroup){
				str += '<p>'+i+'</p><ul>'+_this.redLi(cityGroup[i]) +'</ul>';
				//console.log(res);
				//此处一刷新页面就不在了需要存储
			}
			$('.cityGroup').html(str);
		}else{
			$.ajax({
				url:'/v1/cities?type=group',
				type:"GET",
				success:function(res){
					store('cityGroup',res);
					var str = '';
					for(var i in res){
						//需要排序
						console.log(i)
						str += '<p>'+i+'</p><ul>'+_this.redLi(res[i]) +'</ul>';
						//console.log(res);
						//此处一刷新页面就不在了需要存储
					}
					$('.cityGroup').html(str);
				},
				error:function(){
					alert('后端数据出错');
				}
			});			
		}
	},
	redLi:function(arr){
		var str = '';
		for(var j = 0 ; j < arr.length ; j++){
			str += '<li id="'+arr[j].id+'">'+arr[j].name+'</li>';
		}
		return 	str;			
	}

})