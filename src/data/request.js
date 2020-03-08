import {API,$http} from "./api";

/*登录接口*/
export function login(data={}){
	return $http({
		url:API.common.login,
		data,
		testData:{
			code:"success",
			data:"登录成功"
		}
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
/*新建文章*/
export function createArticle(data={}){
	return $http({
		url:API.common.createArticle,
		data,
		testData:{
			code:"success",
			data:{}
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
		data,
		testData:{
			code:"success",
			data:{
				list:[{
					id:222,
					title:`这是测试标题这是测试标题这是测试标题这是测试标题这是测试标题`,
					content:`这是测试内容这是测试内容这是测试内容这是测试内容这是测试标题`,
					articleType:`normal`,
					source:"封面新闻",
					editor:"黄小茜",
					publishedTime:"2020-03-02 10:22:31",
					updateTime:"2020-03-02 10:22:31"
				}],
				page:{
					totalSize:1,
					totalPage:1,
					currentPage:1,
					pageSize:10
				}
			}
		}
	})
}
/*获取图片素材列表*/
export function getImgMaterial(data={}){
	return $http({
		url:API.common.getImageMaterial,
		data
	})
}
/*上传文件*/
export function uploadFile(data={}) {
	return $http({
		url:API.common.uploadFile,
		headers:{
			"Content-Type":"multipart/form-data"
		},
		data,

	})
}