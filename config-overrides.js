const path = require("path");
const { override, fixBabelImports, addLessLoader, addWebpackPlugin ,overrideDevServer ,addWebpackExternals} = require('customize-cra');
const {addProxy} = require("./config-proxy");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const addOverlay = params => config=>{
	config.contentBase = path.join(__dirname, 'src');
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
		}),
		addWebpackPlugin(
			new CopyWebpackPlugin([
				{from:"./src/static/",to:__dirname+"/build/static/"}
			])
		),
		addWebpackExternals({
			UE:"UE"
		})
	),
	devServer:overrideDevServer(
		addProxy(),
		addOverlay()
	)
};