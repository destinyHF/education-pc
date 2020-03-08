
const proxyIP = "http://yapi.demo.qunar.com/mock/85180";
const addProxy = params => config => {
	config.proxy = {
		"/edu-pc":{
			target:proxyIP,
			changeOrigin:true
		},
	};
	return config;
};

exports.addProxy = addProxy;
