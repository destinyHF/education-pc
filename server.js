const http = require("http");
const server = http.createServer(function(req,res){

	if(req.url === "/getPublishedNews"){
		res.setHeader("Content-Type","application/json");
		res.writeHead(200);
		res.end(JSON.stringify({
			code:"success",
			data:[]
		}));
	}else{
		res.end("hello world");
	}
});
server.listen(9000);