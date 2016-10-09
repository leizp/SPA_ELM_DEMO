var homeObj = {
	name:'我是首页',
	dom:$('#home'),
	init:function(name){
		console.log(this.name)
	},
	bindEvent:function(){

	},
	leave:function(){
		this.dom.hide();
	},
	enter:function(){
		this.dom.show();
	}
}