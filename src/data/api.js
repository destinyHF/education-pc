import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import {Spin} from "antd";

const API = {
	common:{
		autoLogin:"/auth/autoLogin",//自动登录
		login:"/auth/login",//登录
		getArticleDetail:"/getArticleDetail",//获取文章详情
		createArticle:"/createArticle",//创建文章
		updateArticle:"/updateArticle",//编辑文章
		getPublishedArticle:"/getPublishedArticle",//获取已发布文章
		uploadFile:"/uploadFile",//上传文件

		getImageMaterial:"/getImageMaterial",//获取图片库列表
		createImageMaterial:"/createImageMaterial",//新建图片素材
		deleteImageMaterial:"/deleteImageMaterial",//删除图片素材
		updateImageMaterial:"/updateImageMaterial",//更新图片素材

		getVideoMaterial:"/getVideoMaterial",//获取视频库列表
		createVideoMaterial:"/createVideoMaterial",//新建视频素材
		deleteVideoMaterial:"/deleteVideoMaterial",//删除视频素材
		updateVideoMaterial:"/updateVideoMaterial",//更新视频素材
	}
};

axios.defaults.baseURL = "/edu-pc";
axios.defaults.headers.post["Content-Type"] = 'application/json';
const $http = function({
	url="",
	method="post",
	data={},
	headers={},
	responseType="json",
	timeout=10000,
	testData,
}){
	if(headers["Content-Type"] === "multipart/form-data"){
		const formData = new FormData();
		Object.entries(data).forEach(item=>{
			formData.append(item[0],item[1]);
		});
		data = formData;
	}
	return new Promise((resolve, reject)=>{
		const close = createSpin();
		axios({
			url,
			method,
			data,
			timeout,
			headers,
			responseType
		}).then(response=>{
			if(response.data.code === "success"){
				resolve(response.data);
			}else{
				reject("error");
			}
		}).catch((error)=>{
			if(testData){
				resolve(testData);
			}else{
				reject(error.message);
			}
		}).then(()=>{
			close();
		});
	});
};
const createSpin = function(){
	const wrapper = document.createElement("div");
	wrapper.className = "mask-wrapper";
	document.body.append(wrapper);
	ReactDOM.render(<Spin size={"large"} wrapperClassName={"test"} tip={"数据交互中~"}/>,wrapper);
	return function(){
		wrapper.remove();
	}
};

export {
	API,
	$http
}
