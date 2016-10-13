//路由控制添加插件：director.js,用闭包写，写成一个变量返回init函数
var routeContral = (function(){

	//第一步建立映射关系
	var hashMap = {
		'home':homeObj,
		'cityList': cityListObj,
		'address' : addressObj,
		'shopList': shopListObj,
		'shopDetail':shopDetailObj
	};
	//存储两个变量存储当前模块和前一个模块
	var curModule = null;
	var preModule = null;
	//在存储一个变量,判断是否已经初始化过
	var haveModule = {};
	function init(name){
		//此处设计点击跳转页面
		console.log(name);
		var module = hashMap[name] || hashMap["home"];
		//减少发送的ajax次数
		/*if(name.indexof())*/
		//模块加载判断
		if(module){
			/*if(name.length == 1) {
				module = hashMap['cityList']
			}
			if(name.indexOf('address') !== -1) {
				module = hashMap['address'];
				module.init();	
			}*/
			if(name.indexOf('address') !== -1) {
				module = hashMap['address'];
				module.init();	
			}
			if(name.indexOf('address') !== -1) {
				module = hashMap['address'];
				module.init();	
			}
			if(name.indexOf('shopList') !== -1) {
				module = hashMap['shopList'];
				module.init();	
			}
			if(name.indexOf('shopDetail') !== -1) {
				module = hashMap['shopDetail'];
				module.init();	
			}
			//判断是否被实例化
			if(typeof haveModule[name] === 'undefined'){
				//证明没有被实例化-此时需要实例化
				console.log(name+'第一次实例化');
				module.init(name);
				haveModule[name] = true;
				//互换
				preModule = curModule;
				curModule = module;
				if(preModule){
					preModule.leave();
				}
				curModule.enter();
			}else{
				//已经实例化
				console.log(name+"已经实例化过")
				preModule = curModule;
				curModule = module;
				if(preModule){
					preModule.leave();
				}
				curModule.enter();
			}
		}else{
			//加载首页
			location.href = "#home";
		}
	};

	return {
		init:init
	}
})()