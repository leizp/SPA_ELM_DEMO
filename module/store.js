//多态的写法：同一个API接口、函数、方法 他们执行的功能不一样，
//在js中利用传参的不一样实现多态,作用是性能优化,提高访问速度

function store(nameSpace,data){
	if(data){
		return localStorage.setItem(nameSpace,JSON.stringify(data));
	}
	return (nameSpace && JSON.parse(localStorage.getItem(nameSpace))) || null;
}