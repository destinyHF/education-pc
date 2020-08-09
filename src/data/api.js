import $http from "./$http";

const API = {
	common:{
		login:"/login",//登录
		logout:"/logout",//登出
	},
	user:{
		getUserList:"/user/userList",//获取用户列表
		switchUserStatus:"/user/switchStatus",//切换用户状态
		createUser:"/user/userAdd",//创建用户
		updateUser:"/user/userUpdate",//修改用户
		deleteUser:"/user/userDel",//删除用户
		getRoleList:"/sys/role/roleList",//获取角色列表
	},
	article:{
		getArticleList:"/content/list",//获取文章列表
		getArticleDetail:"/content/detail",//获取文章详情
		createArticle:"/content/add",//创建文章
		updateArticle:"/content/update",//更新文章
		getRelationSubject:"/content/topics",//获取当前文章已关联的专题信息
	},
	resource:{
		upload:"/img/upload",
	},
	subject:{
		getSubjectList:"/topic/listTopicPage",
		addSubject:"/topic/createTopic",
		updateSubject:"/topic/updateTopic",
		enableSubject:"/topic/onlineTopic",
		disableSubject:"/topic/offlineTopic",
		deleteSubject:"/topic/delTopic"
	}
};

export {
	API,
	$http
}
