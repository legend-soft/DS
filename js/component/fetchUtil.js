/**
 * get请求 
 * @param string url 请求地址
 * @param {k:v} data 请求参数
 * @param function callFun 回调函数(异步)
 */
export const getData = (url,data,callFun=null) => {
	if(null==url || url.length<1){
		return null;
	}
	url=url+"?";
	for (var k in data) {
		url=url+k+"="+data[k]+"&";
	}
	fetch(url, {
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		headers: {
		  'content-type': 'application/json',
		  'authorization': localStorage.getItem('token')
		},
		method: 'GET', // *GET, POST, PUT, DELETE, etc.
		redirect: 'follow', // manual, *follow, error
		mode: 'no-cors', 
		referrer: 'no-referrer', // *client, no-referrer
  }).then(response =>{
	  console.log(response);
	  return response.json()
	}) // parses response to JSON
  .then(res =>{
	  if(null!=callFun){
			callFun(res);
	  }
  }).catch(error =>console.error(error));
}


/**
 * post请求 
 * @param string url 请求地址
 * @param {k:v} data 请求参数
  * @param function callFun 回调函数(异步)
 */
 export const postData = (url,data,callFun=null) => {
  	if(null==url || url.length<1){
		return null;
	}
  // Default options are marked with *
	fetch(url, {
		body: JSON.stringify(data), // must match 'Content-Type' header
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
	//				credentials: 'same-origin', // include, same-origin, *omit
		headers: {
		  'content-type': 'application/json',
		  'authorization':localStorage.getItem('token')
		},
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		mode: 'no-cors',  // no-cors, cors, *same-origin
		redirect: 'follow', // manual, *follow, error
		referrer: 'no-referrer', // *client, no-referrer
  }).then(response =>response.json()) // parses response to JSON
  .then(res =>{
	  if(null!=callFun){
			callFun(res);
	  }
  }).catch(error =>console.error(error));
}



