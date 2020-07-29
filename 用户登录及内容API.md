## 特别说明
* 所有post请求，除文件上传，所有请求头的Content-Type均为application/json
* 涉及到文件上传的接口，Content-Type为multipart/form-data
* 所有接口的响应编码类型也均为application/json
* 所有接口的响应数据必须包含code和msg，前者为success时表示成功，后者表示描述文本
* 内容模块包含文章、专题、图片资源、素材资源等，draft字段true表示为草稿箱，false表示正式启用
* 所有资源的时间区间查询，均以updateTime筛选，createTime创建以后将不会再发生变化
## 接口汇总
### 一、用户登录模块
* 默认系统包含一个管理员，用户名：admin，密码：Admin@123
* 角色写死2类：管理员admin、普通用户user
* 管理员可以操作所有的资源、普通用户只可以操作自己的资源，资源对所有人可见
#### 1.1、登录

登录做的是cookie认证
* url：http://localhost:6666/login
* method：post
* reqData：
    ```
    {
	"userName": "admin",
	"password":"Admin@123"
	}
    ```
* resData:
    ```
	{
    "meta": {
        "code": 200,
        "msg": "登录成功！"
    },
    "data": {
        "email": null,
        "name": "管理员",
        "state": true,
        "userName": "admin",
        "token": "39062cfc-d151-442c-94eb-737fa8d40fa4"
    }
	```

#### 1.2、登出
* url：http://localhost:6666/logout
* method：get
* resData:
    ```
	{
    "meta": {
        "code": 200,
        "msg": "登出成功！"
    },
    "data": null
	}
	```
登录成功以后，由后端写入cookie，则cookie的失效时间为可配置；否则关闭浏览器失效。
同时将cookie的值以token为键通过响应体返回。

#### 1.3、添加用户
* url：http://localhost:6666/user/userAdd
* method：post
* reqData：
    ```
    {
	"name":"用户2",
	"userName":"user2",
	"password":"user2",
	"roleIds":[2]
	}
    ```
* resData:
    ```
	{
    "meta": {
        "code": 200,
        "msg": "添加用户成功！"
    },
    "data": null
	}
	```
需要管理员权限，角色id传数组，为了以后扩展用户多角色，roleId由角色列表选择获取
	
#### 1.4、用户列表
* url：http://localhost:6666/user/userList?currentPage=1&pageSize=2
* method：get
* reqData：
    ```
    支持昵称name,用户名userName过滤查询
    ```
* resData
	```
	{
    "meta": {
        "code": 200,
        "msg": "查询成功！"
    },
    "data": {
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
	}
	```

#### 1.5、启用/禁用用户
* url：http://localhost:6666/user/switchStatus?userId=3&state=1
* method：get
* reqData：
    ```
	userId:string,
	state:boolean
    ```
* resData:
    ```
	{
    "meta": {
        "code": 200,
        "msg": "修改用户状态成功！"
    },
    "data": null
	}
	```
只有管理员可以启用、禁用用户状态

#### 1.6、修改用户昵称、密码、角色
* url：http://localhost:6666/user/userUpdate
* method：post
* reqData：
    ```
	{
	"userId":5,
	"name":"用户02",
	"userName":"user02",
	"password":"user02",
	"roleIds":[]
	}
    ```
* resData:
    ```
	{
    "meta": {
        "code": 200,
        "msg": "修改用户成功！"
    },
    "data": null
	}
	```
前端传所有值到后端，其中只允许修改name和密码以及角色，角色不修改传空数组	

#### 1.7、删除用户
* url：http://localhost:6666/user/userDel?userId=5
* method：delete
* reqData：
    ```
	{
	"userId":5
	}
    ```
* resData:
    ```
	{
    "meta": {
        "code": 200,
        "msg": "删除用户成功！"
    },
    "data": null
	}
	```
需要管理员权限

#### 1.8、角色列表
* url：http://localhost:6666/sys/role/roleList?currentPage=1&pageSize=2
* method：get
* reqData：
    ```
	支持角色名过滤
    ```
* resData:
    ```
	{
    "meta": {
        "code": 200,
        "msg": "查询成功！"
    },
    "data": {
        "page": {
            "currentPage": 1,
            "pageSize": 2,
            "totalPage": 1,
            "totalSize": 2
        },
        "data": [
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
    }
	}
	```
目前只有admin和user两种角色，后期可添加角色（角色增删改接口已有，但目前不需要，暂不写入文档，后期需要再写，包括权限表接口）

### 二、内容模块

#### 2.1 添加内容

添加内容时需指定专题，内容包含文章，图片，文档，视频等类型，根据type的枚举值区分：
	TEXT,     // 文字
    FILE,    // 文本文件
    PICTURE,    // 图片
    VIDEO,     // 视频
    UNKNOWN;    //未知
draft字段用于区分启用或者是草稿箱内容，true表示为草稿箱，false表示正式启用，
对于图片，文档和视频，添加内容前需调用上传文件接口，将返回的url，fileName等参数传入存库

* url：http://localhost:6666/content/add
* method：post
* reqData：
    ```
    {
	"topicId": 1,
	"type": "PICTURE",
	"draft": 0,
	"url": "localhost:6666/edu/static/images",
	"fileName":"飞哥之家+uuid.jpg",
	"title": "飞哥之家",
	"text": "文章内容",
	"size": 20
	}
    ```
* resData:
    ```
    {
    "meta": {
        "code": 200,
        "msg": "添加内容成功！"
    },
    "data": null
	}
    ```
#### 2.2 内容列表（支持查询指定专题下内容，支持草稿箱查询）
* url：http://localhost:6666/content/list?currentPage=1&pageSize=2&draft=0
* method：get
* reqData：
    ```
    支持参数过滤查询，按照updateTime降序排列
    ```
* resData:
    ```
    {
    "meta": {
        "code": 200,
        "msg": "请求/处理成功！"
    },
    "data": {
        "page": {
            "currentPage": 1,
            "pageSize": 2,
            "totalPage": 1,
            "totalSize": 2
        },
        "data": [
            {
                "id": 2,
                "draft": false,
                "url": "localhost:6666/edu/static/images",
                "fileName": "飞哥之家2+uuid.mp4",
                "type": "VIDEO",
                "topicId": 1,
                "title": "飞哥之家2",
                "text": "文章内容2",
                "size": 40,
                "createTime": 1591529986000,
                "updateTime": 1591529986000,
                "createBy": "admin",
                "updateBy": "admin"
            },
            {
                "id": 1,
                "draft": false,
                "url": "localhost:6666/edu/static/images",
                "fileName": "飞哥之家+uuid.jpg",
                "type": "PICTURE",
                "topicId": 1,
                "title": "飞哥之家",
                "text": "文章内容",
                "size": 20,
                "createTime": 1591527506000,
                "updateTime": 1591527506000,
                "createBy": "admin",
                "updateBy": "admin"
            }
        ]
    }
	}
    ```

#### 2.3 内容详情
* url：http://localhost:6666/content/detail?id=1
* method：get
* reqData：
    ```
    ```
* resData:
    ```
    {
    "meta": {
        "code": 200,
        "msg": "请求/处理成功！"
    },
    "data": {
        "id": 1,
        "draft": false,
        "url": "localhost:6666/edu/static/images",
        "fileName": "飞哥之家+uuid.jpg",
        "type": "PICTURE",
        "topicId": 1,
        "title": "飞哥之家",
        "text": "文章内容",
        "size": 20,
        "createTime": 1591527506000,
        "updateTime": 1591527506000,
        "createBy": "admin",
        "updateBy": "admin"
    }
	}
    ```
	
#### 2.4 内容编辑
* url：http://localhost:6666/content/update
* method：post
* reqData：
    ```
    {
	"id": 1,
	"topicId": 1,
	"type": "PICTURE",
	"draft": 1,
	"url": "localhost:6666/edu/static/images",
	"fileName":"飞哥之家+uuid.jpg",
	"title": "飞哥之家",
	"text": "文章内容123",
	"size": 40
	}
    ```
* resData:
    ```
    {
    "meta": {
        "code": 200,
        "msg": "更新内容成功！"
    },
    "data": null
	}
    ```
 
 #### 2.5 删除内容
* url：http://localhost:6666/content/delete?id=1
* method：delete
* reqData：
    ```
    {
	"id": 1
	}
    ```
* resData:
    ```
    {
    "meta": {
        "code": 200,
        "msg": "删除内容成功！"
    },
    "data": null
	}
    ```
 
 
### 三、专题模块

#### 2.1 分页查询所有专题

用于管理员管理专题页面查询列表


* url：http://localhost:6666/topic/listTopicPage
* method：GET
* reqData：
    ```
    ?currentPage=1&pageSize=10
    ```
* resData:
    ```
    {
        "meta": {
            "code": 200,
            "msg": "请求/处理成功！"
        },
        "data": {
            "page": {
                "currentPage": 1,
                "pageSize": 10,
                "totalPage": 1,
                "totalSize": 2
            },
            "data": [
                {
                    "id": 1,
                    "name": "dfa",
                    "description": "sdf",
                    "status": "OFFLINE",
                    "createTime": 1591745493000,
                    "updateTime": 1591745497000,
                    "createBy": "sdfa",
                    "updateBy": "sdaf"
                }
            ]
        }
    }
    ```

#### 2.2 查询上线专题

用于编辑文章时查询专题列表，添加专题到文章

* url：http://localhost:6666/topic/listTopicPage
* method：GET
* reqData：
    ```
    无
    ```
* resData:
    ```
    {
        "meta": {
            "code": 200,
            "msg": "请求/处理成功！"
        },
        "data": [
            {
                "id": 2,
                "name": "tt",
                "description": "tt",
                "status": "ONLINE",
                "createTime": 1591745508000,
                "updateTime": 1591745512000,
                "createBy": "tt",
                "updateBy": "tt"
            }
        ]
    }
    ```

#### 2.3 添加专题

* url：http://localhost:6666/topic/createTopic
* method：POST
* reqData：
    ```
    {
        "name": "tt",
        "description": "tt"
    }
    ```
* resData:
    ```
    {
    "meta": {
        "code": 200,
        "msg": "添加内容成功！"
    },
    "data": null
	}

#### 2.4 修改专题

* url：http://localhost:6666/topic/updateTopic
* method：PUT
* reqData：
    ```
    {
        "name": "tt",
        "description": "tt"
    }
    ```
* resData:
    ```
    {
    "meta": {
        "code": 200,
        "msg": "添加内容成功！"
    },
    "data": null
	}

#### 2.5 上线专题

* url：http://localhost:6666/topic/onlineTopic
* method：GET
* reqData：
    ```
    ?id=123
    ```
* resData:
    ```
    {
    "meta": {
        "code": 200,
        "msg": "成功！"
    },
    "data": null
	}

#### 2.5 下线专题

* url：http://localhost:6666/topic/offlineTopic
* method：GET
* reqData：
    ```
    ?id=123
    ```
* resData:
    ```
    {
    "meta": {
        "code": 200,
        "msg": "成功！"
    },
    "data": null
	}

#### 2.6 删除专题

* url：http://localhost:6666/topic/delTopic
* method：GET
* reqData：
    ```
    ?id=123
    ```
* resData:
    ```
    {
    "meta": {
        "code": 200,
        "msg": "成功！"
    },
    "data": null
	}

### 四、文件上传模块

#### 2.1 上传文件

图片或文件通过该接口上传到app，app把文件以ftp方式上传到nginx服务器，返回的路径为
/images/s1/dj/8Yn4sdHS5vq.jpg等，前端使用时需加上前端访问的应用的域名或IP


* url：http://localhost:6666/img/upload
* method：POST
* reqData：
    ```
    无
    ```
* resData:
    ```
    {
        "meta": {
            "code": 200,
            "msg": "请求/处理成功！"
        },
        "data": [
            {
                "msg": "success",
                "name": "环境相关.txt",
                "size": 371,
                "type": "text/plain",
                "url": "/images/s1/w3/SnzhXmCNgF7.txt"
            }
        ]
    }
    ```

#### 2.1 文件删除

不用的图片或文件可调用此接口删除文件，减轻服务器存储压力
/images/s1/dj/8Yn4sdHS5vq.jpg等，前端使用时需加上前端访问的应用的域名或IP


* url：http://localhost:6666/img/delete
* method：POST
* reqData：
    ```
    {
        "list":["/images/s1/dj/8Yn4sdHS5vq.jpg","/images/s1/dj/SnzhXmCNgF7.jpg"]
    }
    ```
* resData:
    ```
    {
        "meta": {
            "code": 200,
            "msg": ""
        },
        "data": null
    }
    ```
