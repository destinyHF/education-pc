const http = require("http");

// const keepAliveAgent = new http.Agent({ keepAlive: true });
// options.agent = keepAliveAgent;

const req = http.request({
	host:"127.0.0.1",
	port:8081,
	method:"POST",
	path:"/"
},function(res){
	console.log(`状态码: ${res.statusCode}`);
	console.log(`响应头: ${JSON.stringify(res.headers)}`);
	res.setEncoding('utf8');
	res.on('data', (chunk) => {
		console.log(`响应主体: ${chunk}`);
	});
	res.on('end', () => {
		console.log('响应中已无数据');
	});
});
req.write("hello",function(e){


});
setTimeout(()=>{
	req.write("world");
},2000)
setTimeout(()=>{
	req.write("world2");
},4000)



// req.end("over");
