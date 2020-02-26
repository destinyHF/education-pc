import Published from "./pagse/published";

const defaultRoute = "/published";

const configs = [{
	label:"新闻列表",
	key:"newsList",
	icon:"unordered-list",
	children:[{
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

	},{
		label:"视频",
		path:"/videoMaterial",

	}],
}];
configs.defaultRoute = defaultRoute;
export default configs;