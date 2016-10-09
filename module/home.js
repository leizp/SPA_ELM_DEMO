var homeObj = {
	name:'我是首页',
	dom:$('#home'),
	init:function(name){
		console.log(this.name);
		this.bindEvent();
	},
	bindEvent:function(){
		var _this = this;
		$('.city').click(function(){

			//发送定位城市请求
			$.ajax({
				url:'/v1/cities?type=guess',
				type:"GET",
				success:function(res){
					$('.nowCity').html(res.name);
					location.href="#cityList";
				},
				error:function(){
					alert('后端数据出错');
				}
			})
			//发送热门城市ajax请求
			$.ajax({
				url:'/v1/cities?type=hot',
				type:"GET",
				success:function(res){
					var str = '';
					for(var i = 0 ; i < res.length; i ++){
						str += '<li id="'+res[i].id+'">'+res[i].name+'</li>'
						//console.log(res);
						//此处一刷新页面就不在了需要存储
					}
					$('.hotName').html(str);
					location.href="#cityList";
				},
				error:function(){
					alert('后端数据出错');
				}
			})
			//发送所有城市ajax请求
			
			$.ajax({
				url:'/v1/cities?type=group',
				type:"GET",
				success:function(res){
					
					var str = '';
					for(var i in res){
						str += '<p>'+i+'</p><ul>'+_this.redLi(res[i]) +'</ul>';
						//console.log(res);
						//此处一刷新页面就不在了需要存储
					}
					$('.cityGroup').html(str);
					location.href="#cityList";
				},
				error:function(){
					alert('后端数据出错');
				}
			});
		})
	},
	leave:function(){
		this.dom.hide();
	},
	enter:function(){
		this.dom.show();
	},
	redLi:function(arr){
		var str = '';
		for(var j = 0 ; j < arr.length ; j++){
			str += '<li id="'+arr[j].id+'">'+arr[j].name+'</li>';
		}
		return 	str;			
	}
}