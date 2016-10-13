//入口-负责每个页面这件的相互跳转（单页面跳转）
var route = new Router ({
	'/:page':function(name){
		routeContral.init(name);
	}
})
route.init('home');
/*Pace.on("done",function(){
	console.log("进读条加载完成");
	
})*/