const proxyIP = "http://127.0.0.1:7001";
module.exports = {
  devServer:{
    proxy:{
      "/edu-pc":{
        target:proxyIP,
        changeOrigin:true,
        pathRewrite:{"^/edu-pc":"/"},
        secure:false
      }
    }
  }
};
