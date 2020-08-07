
/*静态资源host*/
export const resourceHost = (function(){
    if(process.env.NODE_ENV === "development"){
        return "http://221.237.108.131:81";
    }else if(process.env.NODE_ENV === "production"){
        return window.location.origin;
    }
})();
/*七牛云上传host*/
export const qiniuUploadHost = "http://upload-z2.qiniup.com";
/*七牛云资源host*/
export const qiniuResourceHost = "http://qems0mspk.bkt.clouddn.com/";
/*七牛云上传token*/
export const qiniuToken = "2qjcyL9Hy-A7a3uFWvZ862kbg22Nyth_cwY9bJk3:jrIZ0dUAdrPccXfVhTTsHhXpfp0=:eyJzY29wZSI6ImFzaGVuLWVkdSIsImRlYWRsaW5lIjoxNTk3MzA1NTg3fQ==";