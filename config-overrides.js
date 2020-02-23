const { override, fixBabelImports, addLessLoader, addWebpackPlugin ,overrideDevServer} = require('customize-cra');
const {addProxy} = require("./config-proxy");

const addOverlay = params => config=>{
	return config;
};

module.exports = {
	webpack:override(
		fixBabelImports('import', {
			libraryName: 'antd',
			libraryDirectory: 'es',
			style: true,
		}),
		addLessLoader({
			javascriptEnabled: true,
			modifyVars: { '@primary-color': '#1890ff' },
		})
	),
	devServer:overrideDevServer(
		addProxy(),
		addOverlay()
	)
};