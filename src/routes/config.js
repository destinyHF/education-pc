import Published from "./pages/published";
import ArticleForm from "./pages/article-form";
import ImgMaterial from "./pages/img-material";
/*
* 默认路由
* */
const defaultRoute = "/published";
/*
* 路由配置（菜单渲染）
* */
const configs = [{
	label:"新闻列表",
	key:"newsList",
	icon:"unordered-list",
	children:[{
		label:"新建文章",
		path:"/articleForm",
		component:ArticleForm
	},{
		label:"已发布",
		path:"/published",
		component:Published
	},{
		label:"草稿箱",
		path:"/drafts",
	}],
},{
	label:"素材库",
	key:"material",
	icon:"folder",
	children:[{
		label:"图片",
		path:"/imgMaterial",
		component:ImgMaterial
	},{
		label:"视频",
		path:"/videoMaterial",
	}],
}];
const otherConfigs = [];

configs.defaultRoute = defaultRoute;
configs.otherConfigs = otherConfigs;
export default configs;