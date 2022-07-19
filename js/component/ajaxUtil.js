export const getData = (url,data={},callFun=null,
			header={
				"Content-Type": "application/json;charset=UTF-8",
				"Sec-Fetch-Mode": "no-cors"
			}) => {

	if(null==url || url.length<1){
		return null;
	}

	let promise = new Promise((resolve, reject) => {
		$.ajax({
			type:"GET",
			url:url,
			data:data,
			headers:{},
			dataType:"json",
			success:function (data) {
				resolve(data);
			},
			error:function (err) {
				reject(err);
			}
		});
	});

	promise.then(data=>{ //为第一个回调处理函数
		callFun(data); 
	}).then(data2=>{ //第二个回调处理函数
		console.log(data2);
		//f2(data2);
	}).catch(err=>{
		console.log(err);
	});

}



export const postData = (url,data,callFun=null,
			header={
				"Content-Type": "application/json;charset=UTF-8",
				"Sec-Fetch-Mode": "no-cors"
			}) => {
 
	if(null==url || url.length<1){
		return null;
	}

	let promise = new Promise((resolve, reject) => {
		$.ajax({
			type:"POST",
			url:url,
			data:data,
			headers:{},
			dataType:"json",
			success:function (data) {
				resolve(data);
			},
			error:function (err) {
				reject(err);
			}
		});
	});

	promise.then(data=>{ //为第一个回调处理函数
		callFun(data); 
	}).then(data2=>{ //第二个回调处理函数
		console.log(data2);
		//f2(data2);
	}).catch(err=>{
		console.log(err);
	});
}