import {API} from "../../../data/api";
import $http from "../../../data/$http";

/*获取用户列表*/
export function getUserList(data={}){
    return $http({
        url:API.user.getUserList,
        method:"get",
        data,
    }).catch((err)=>{
        return{
            "page": {
                "currentPage": 1,
                "pageSize": 2,
                "totalPage": 1,
                "totalSize": 2
            },
            "data": [
                {
                    "userId": 1,
                    "createTime": 1551636031000,
                    "email": null,
                    "expiredDate": null,
                    "name": "管理员",
                    "password": "ee04f47fa402788c61f3205e44fbe472",
                    "salt": "debdd418b73c75b63f5b1a709cbff7ab",
                    "state": true,
                    "userName": "admin",
                    "credentialsSalt": "admindebdd418b73c75b63f5b1a709cbff7ab"
                },
                {
                    "userId": 3,
                    "createTime": 1591020175000,
                    "email": null,
                    "expiredDate": null,
                    "name": "用户1",
                    "password": "60b38010552ff6d73a109ff3d2ef69fa",
                    "salt": "cedde6a3bfe45e9070af1b2ed5b9c88e",
                    "state": true,
                    "userName": "user1",
                    "credentialsSalt": "user1cedde6a3bfe45e9070af1b2ed5b9c88e"
                }
            ]
        }
    })
}

/*获取角色列表*/
export function getRoleList(data={}){
    return $http({
        url:API.user.getRoleList,
        method:"get",
        data,
    }).then(response=>{
        return response.data || [];
    }).catch(()=>{
        return[
            {
                "roleId": 1,
                "available": true,
                "description": "管理员",
                "role": "admin"
            },
            {
                "roleId": 2,
                "available": true,
                "description": "普通用户",
                "role": "user"
            }
        ]
    })
}

/*创建用户*/
export function createUser(data={}){
    return $http({
        url:API.user.createUser,
        method:"post",
        data,
    });
}

