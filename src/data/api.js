import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import {Spin} from "antd";

const API = {
	common:{
		login:"/auth/login",//登录
		getArticleDetail:"/getArticleDetail",//获取文章详情
		createArticle:"/createArticle",//创建文章
		updateArticle:"/updateArticle",//编辑文章
		getPublishedArticle:"/getPublishedArticle",//获取已发布文章
	}
};

const $http = function({
	url="",
	method="post",
	data={},
	responseType="json",
	testData
}){
	const close = createSpin();
	return new Promise((resolve, reject)=>{
		axios({
			url,
			method,
			data,
			responseType
		}).then(response=>{
			resolve(response);
		}).catch(error=>{
			if(testData){
				resolve(testData);
			}else{
				reject(error);
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