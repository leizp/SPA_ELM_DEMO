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
 var detectBack = {  //监听浏览器 前进后退事件
        initialize: function() {
            //监听hashchange事件
            window.addEventListener('hashchange', function() {
                //为当前导航页附加一个tag
                this.history.replaceState('hasHash', '', '');
            }, false);
            window.addEventListener('popstate', function(e) {
                if (e.state) {
                	alert('我要刷新页面')
                    //侦测是用户触发的后退操作, dosomething
                    //这里刷新当前url
                    this.location.reload(); 
                }
            }, false);
        }
    }
    detectBack.initialize();