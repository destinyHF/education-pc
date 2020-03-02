
const proxyIP = "http://127.0.0.1";

const addProxy = params => config => {
	config.proxy = {
		"/api":{
			target:proxyIP
		}
	};
	return config;
};

exports.addProxy = addProxy;
