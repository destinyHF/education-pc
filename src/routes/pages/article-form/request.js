import {API} from "@data/api";
import $http from "@data/$http";

/*新建文章*/
export function createArticle(data={}){
	return $http({
		url:API.common.createArticle,
		method:"post",
		data,
	})
}
/*更新文章*/
export function updateArticle(data={}){
	return $http({
		url:API.article.updateArticle,
		method:"post",
		data
	})
}
/*
* 获取当前文章已关联的专题信息
* */
export function getRelationSubject(data={}){
	return $http({
		url:API.article.getRelationSubject,
		method:"get",
		data
	})
}