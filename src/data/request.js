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