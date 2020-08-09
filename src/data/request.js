import {API,$http} from "./api";

/*自动登录接口*/
export function autoLogin(){
	return $http({
		url:API.common.autoLogin
	})
}
/*登录接口*/
export function login(data={}){
	return $http({
		url:API.common.login,
		data,
	})
}
/*登出接口*/
export function logout(data={}){
	return $http({
		url:API.common.logout,
	})
}
/*获取文章内容*/
export function getArticleDetail(data={}){
	return $http({
		url:API.common.getArticleDetail,
		data,
		testData:{
			code:"success",
			data:{
				title:`这是测试标题----${data.id}`,
				content:`这是测试内容----${data.id}`,
				articleType:`normal`,
				source:"封面新闻",
				editor:"黄小茜"
			}
		}
	})
}
/*编辑文章*/
export function updateArticle(data={}){
	return $http({
		url:API.common.updateArticle,
		data,
		testData:{
			code:"success",
			data:{}
		}
	})
}
/*获取已发布文章列表*/
export function getPublishedArticle(data={}){
	return $http({
		url:API.common.getPublishedArticle,
		data
	})
}
/*上传文件*/
export function uploadFile(data={}) {
	return $http({
		url:API.common.uploadFile,
		timeout:60*60*1000,
		headers:{
			"Content-Type":"multipart/form-data"
		},
		data,
	})
}

/*获取图片素材列表*/
export function getImgMaterial(data={}){
	return $http({
		url:API.common.getImageMaterial,
		data
	})
}
/*新建图片素材*/
export function createImageMaterial(data={}) {
	return $http({
		url:API.common.createImageMaterial,
		data,
	})
}
/*删除图片素材*/
export function deleteImageMaterial(data={}) {
	return $http({
		url:API.common.deleteImageMaterial,
		data,
	})
}
/*编辑图片素材*/
export function updateImageMaterial(data={}) {
	return $http({
		url:API.common.updateImageMaterial,
		data,
	})
}

/*获取视频素材列表*/
export function getVideoMaterial(data={}){
	return $http({
		url:API.common.getVideoMaterial,
		data
	})
}
/*新建视频素材*/
export function createVideoMaterial(data={}) {
	return $http({
		url:API.common.createVideoMaterial,
		data,
	})
}
/*删除视频素材*/
export function deleteVideoMaterial(data={}) {
	return $http({
		url:API.common.deleteVideoMaterial,
		data,
	})
}
/*编辑视频素材*/
export function updateVideoMaterial(data={}) {
	return $http({
		url:API.common.updateVideoMaterial,
		data,
	})
}
