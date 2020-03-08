import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import {Spin} from "antd";
import {instanceOf} from "prop-types";

const API = {
	common:{
		login:"/auth/login",//登录
		getArticleDetail:"/getArticleDetail",//获取文章详情
		createArticle:"/createArticle",//创建文章
		updateArticle:"/updateArticle",//编辑文章
		getPublishedArticle:"/getPublishedArticle",//获取已发布文章
		getImageMaterial:"/getImageMaterial",//获取图片库列表
		uploadFile:"/uploadFile",//上传文件
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
	testData,
}){
	const close = createSpin();
	if(headers["Content-Type"] === "multipart/form-data"){
		const formData = new FormData();
		Object.entries(data).forEach(item=>{
			formData.append(item[0],item[1]);
		});
		data = formData;
	}
	return new Promise((resolve, reject)=>{
		axios({
			url,
			method,
			data,
			headers,
			responseType
		}).then(response=>{
			resolve(response.data);
		}).catch((...error)=>{
			if(testData){
				resolve(testData);
			}else{
				reject("error");
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