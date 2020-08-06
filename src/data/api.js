import $http from "./$http";

const API = {
	common:{
		login:"/login",//登录
		logout:"/logout",//登出
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
	},
	user:{
		getUserList:"/user/userList",//获取用户列表
		switchUserStatus:"/user/switchStatus",//切换用户状态
		createUser:"/user/userAdd",//创建用户
		updateUser:"/user/userUpdate",//修改用户
		deleteUser:"/user/userDel",//删除用户
		getRoleList:"/sys/role/roleList",//获取角色列表
	},
	resource:{
		upload:"/img/upload",
		qiniuDomain:"http://upload-z2.qiniup.com"
	}
};

export {
	API,
	$http
}
