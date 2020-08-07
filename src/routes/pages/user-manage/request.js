import {API} from "@data/api";
import $http from "@data/$http";

/*获取用户列表*/
export function getUserList(data={}){
    return $http({
        url:API.user.getUserList,
        method:"get",
        data,
    })
}
/*切换用户状态*/
export function switchUserStatus(data={}){
    return $http({
        url:API.user.switchUserStatus,
        method:"get",
        data,
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
/*修改用户*/
export function updateUser(data={}){
    return $http({
        url:API.user.updateUser,
        method:"post",
        data,
    });
}
/*删除用户*/
export function deleteUser(data={}){
    return $http({
        url:API.user.deleteUser,
        method:"delete",
        params:data,
    });
}

