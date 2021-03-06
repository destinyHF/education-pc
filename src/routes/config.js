import React from "react";
import {PicLeftOutlined,UnorderedListOutlined,UsergroupAddOutlined} from "@ant-design/icons"
import Published from "./pages/published";
import Drafts from "./pages/drafts";
import ArticleForm from "./pages/article-form";
// import ImgMaterial from "./pages/img-material";
// import VideoMaterial from "./pages/video-material";
import UserManage from "./pages/user-manage";
import SubjectManage from "./pages/subject";
/*
* 默认路由
* */
const defaultRoute = "/published";
/*
* 路由配置（菜单渲染）
* */
const configs = [
	{
		label:"新闻列表",
		key:"newsList",
		icon:<PicLeftOutlined />,
		children:[{
			label:"新建文章",
			path:"/createArticle",
			component:ArticleForm
		},{
			label:"已发布",
			path:"/published",
			component:Published
		},{
			label:"草稿箱",
			path:"/drafts",
			component:Drafts
		}],
	},{
		label: "专题管理",
		key:"subject",
		path:"/subject",
		icon:<UnorderedListOutlined />,
		component: SubjectManage
	},
	// {
	// 	label:"素材库",
	// 	key:"material",
	// 	icon:<UnorderedListOutlined />,
	// 	children:[{
	// 		label:"图片",
	// 		path:"/imgMaterial",
	// 		component:ImgMaterial
	// 	},{
	// 		label:"视频",
	// 		path:"/videoMaterial",
	// 		component:VideoMaterial
	// 	}],
	// },
	{
		label:"用户管理",
		key:"userManage",
		path:"/userManage",
		icon:<UsergroupAddOutlined />,
		component:UserManage
	}
];
const otherConfigs = [
	{
		label: "编辑文章",
		key:"updateArticle",
		path:"/updateArticle",
		icon:<UnorderedListOutlined />,
		component: ArticleForm
	}
];

configs.defaultRoute = defaultRoute;
configs.otherConfigs = otherConfigs;
export default configs;