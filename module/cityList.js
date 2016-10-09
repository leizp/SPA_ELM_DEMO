var cityListObj = Object.create(homeObj);
$.extend(cityListObj,{
	name:'我是城市列表页',
	dom:$('#cityList'),
	init:function(){
		this.bindEvent();
	},
	bindEvent:function(){
		$('li').click(function(){
			debugger;
		})





		
	},
	readerCity:function(){

	}
})