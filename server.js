const http = require("http");
http.createServer((req,res)=>{
	res.writeHead(200,{"Content-Type":"text/plain"});
	const buffers = [];
	req.on("data",(chunk)=>{
		console.log("getData",chunk.toString());
		buffers.push(chunk);
	});
	req.on("end",()=>{
		const buffer = Buffer.concat(buffers);
		console.log(buffer.toString().length);
		res.end("hello world");
	});
}).listen(8081);