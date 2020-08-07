import axios from "axios";
import ReactDOM from "react-dom";
import {Spin} from "antd";
import React from "react";
import {qiniuResourceHost} from "../config";

axios.defaults.baseURL = "/edu";
axios.defaults.headers.post["Content-Type"] = 'application/json';
axios.defaults.headers.get["Content-Type"] = 'application/x-www-form-urlencoded';
axios.defaults.timeout = 10000;
axios.defaults.responseType = "json";
axios.interceptors.response.use((response)=>{
    const {data:resData} = response;
    if(Object.keys(resData).includes("hash")){
        return Promise.resolve([{
            name:resData.hash,
            url:qiniuResourceHost+resData.hash
        }]);
    }
    const {meta={},data={}} = resData;
    const {code,msg} = meta;
    if(code === "200" || code === 200){
        return Promise.resolve(data);
    }else{
        return Promise.reject(msg);
    }
},error=>{
    if(!error.response){
        return Promise.reject("请求失败！");
    }
    const {status,statusText} = error.response;
    return Promise.reject(JSON.stringify({status,statusText}));
});

const createSpin = function(){
    const wrapper = document.createElement("div");
    wrapper.className = "mask-wrapper";
    document.body.append(wrapper);
    ReactDOM.render(<Spin size={"large"} wrapperClassName={"test"} tip={"数据交互中~"}/>,wrapper);
    return function(){
        wrapper.remove();
    }
};

export default ({
    url="",
    method="post",
    params={},
    data={},
    headers={},
    responseType="json",
    onUploadProgress=()=>{},
    timeout
})=>{
    const close = createSpin();
    if(method.toLowerCase() === "get"){
        params = Object.keys(params).length?params:data;
    }
    return axios({
        url,
        method,
        params,
        data,
        headers,
        responseType,
        onUploadProgress,
        timeout
    }).finally(close);
}