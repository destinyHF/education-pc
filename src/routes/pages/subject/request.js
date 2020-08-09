import {$http,API} from "@data/api";
/*
* 获取专题列表
* */
export function getSubjectList(data={}){
    return $http({
        url:API.subject.getSubjectList,
        method:"get",
        data
    })
}
/*
* 新建专题
* */
export function addSubject(data={}){
    return $http({
        url:API.subject.addSubject,
        method:"post",
        data
    })
}
/*
* 编辑专题
* */
export function updateSubject(data={}){
    return $http({
        url:API.subject.updateSubject,
        method:"put",
        data
    })
}
/*
* 删除专题
* */
export function deleteSubject(params={}){
    return $http({
        url:API.subject.deleteSubject,
        method:"delete",
        params
    })
}
/*
* 上线专题
* */
export function enableSubject(data={}){
    return $http({
        url:API.subject.enableSubject,
        method:"get",
        data
    })
}
/*
* 下线专题
* */
export function disableSubject(data={}){
    return $http({
        url:API.subject.disableSubject,
        method:"get",
        data
    })
}
/*
* 获取当前专题下的文章
* */
export function getInsertArticles(data={}){
    return $http({
        url:API.subject.getInsertArticles,
        method:"get",
        data
    })
}
/*
* 导入文章
* */
export function insertArticles(data={}){
    return $http({
        url:API.subject.insertArticles,
        method:"post",
        data
    })
}