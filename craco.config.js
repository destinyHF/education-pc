const path = require("path");
const CracoAntDesignPlugin = require("craco-antd");
const CracoAlias = require("craco-alias");
const CracoLessPlugin = require("craco-less");

const proxyIP = "http://221.237.108.131:81";

module.exports = {
  plugins:[
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeThemeLessPath: path.join(
            __dirname,
            "src/styles/antd.theme.less"
        ),
      },
    },
    {
      plugin: CracoLessPlugin,
      options: {
        cssLoaderOptions: {
          modules: { localIdentName: "[local]_[hash:base64:5]" },
        },
        modifyLessRule: function(lessRule, _context) {
          lessRule.test = /\.(module)\.(less)$/;
          lessRule.exclude = path.join(__dirname, 'node_modules');
          return lessRule;
        },
      },
    },
  ],
  devServer:{
    proxy:{
      "/edu":{
        target:proxyIP,
        changeOrigin:true,
        pathRewrite:{"^/edu":"/edu"},
        secure:false
      }
    }
  }
};
