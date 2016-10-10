var shopDetailObj = Object.create(homeObj);
$.extend(shopDetailObj,{
	name:'我是商品列表页',
	dom:$('#shopDetail'),
	init:function(name){
		this.readerPage();
	},
	bindEvent:function(){
		
	},
	readerPage:function(){
		var url = location.href;
		debugger;
		$.ajax({
			url:'/shopping/restaurant/'+url.split('?')[1].split('&')[3].split('=')[1],
			type:'GET',
			data:{
				'extras[]':'activities',
				'extras[]':'album',
				'extras[]':'license',
				'extras[]':'identification',
				'extras[]':'statistics',
				latitude:45.77813,
				longitude:126.61776
			},
			success:function(res){
				console.log(res);
			},
			error:function(){

			}
		})
	}
})