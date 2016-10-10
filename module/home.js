var homeObj = {
	name:'我是首页',
	dom:$('#home'),
	init:function(name){
		console.log(this.name);
		this.bindEvent();
	},
	bindEvent:function(){		
		$('.city').click(function(){		
			location.href="#cityList";
		});
		$('#btn').click(function(){
			var url = '?-city_id='+Number($('.city')[0].id)+'&keyword='+encodeURI($('#txt').val())+'&type=search';
			location.href = '#address'+url;
		})
	},
	leave:function(){
		this.dom.hide();
	},
	enter:function(){
		this.dom.show();
	},

}