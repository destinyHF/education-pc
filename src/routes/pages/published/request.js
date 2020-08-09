import {API} from "@data/api";
import $http from "@data/$http";

/*获取文章列表*/
export function getArticleList(data={}){
	return $http({
		url:API.article.getArticleList,
		method:"get",
		data,
	})
}
/*获取文章详情*/
export function getArticleDetail(data={}){
	return $http({
		url:API.article.getArticleDetail,
		method:"get",
		data,
	})
}