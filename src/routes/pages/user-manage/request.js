import {API,$http} from "../../../data/api";

/*获取用户列表*/
export function getUserList(data={}){
    return $http({
        url:API.user.getUserList,
        data,
    }).catch(()=>{
        return{
            data:[{
                userName:"admin123456",
                name:"笑嘻嘻下",
                email:"houfei321@hotmail.com",
                status:false,
                createTime:1551636031000,
                userId:123
            }]
        }
    })
}