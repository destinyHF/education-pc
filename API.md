## 特别说明
* 所有post请求，除文件上传，所有请求头的Content-Type均为application/json
* 涉及到文件上传的接口，Content-Type为multipart/form-data
* 所有接口的响应编码类型也均为application/json
* 所有接口的响应数据必须包含code和message，前者为success时表示成功，后者表示描述文本，非success的时候显示
* 由服务端生成的时间，均以时间戳保存，返回给前端只返时间戳即可，不需要格式化
* 所有素材包含文章、专题、图片资源、素材资源，均含有status字段，published表示已发布/已启用、draft表示草稿箱/未启用、delete表示已删除（此时将不再显示，但数据库保留）
* 所有资源的时间区间查询，均以updateTime筛选，createTime创建以后将不会再发生变化
## 接口汇总
### 五、用户模块
* 默认系统包含一个管理员，用户名：administrator，密码：administrator!@#~
* 角色写死2类：管理员admin、编辑editor
* 管理员可以操作所有的资源、编辑只可以操作自己的资源，资源对所有人可见
#### 1.1、登录
* url：/auth/login
* method：post
* reqData：
    ```
    {
        username:string, //用户名
        password:string, //密码
        remember:boolean //是否保存cookie
    }
    ```
* resData:
    ```
    {
        code:string, //状态码
        message:string, //描述文本
        data:{
            username:string, //用户名
            nickname:string, //昵称
            role:string, // 角色
            token:string // token
        }
    }
    ```
登录成功以后，由后端写入cookie，如果remember为true，则cookie的失效时间为7天；否则关闭浏览器失效。
同时将cookie的值以token为键通过响应体返回。
#### 1.2、添加用户
* url：/auth/addUser
* method：post
* reqData：
    ```
    {
        username:string, //用户名
        password:string, //密码
        nickname:string, //昵称
        email:string, //邮箱
        role:string //枚举值：admin、editor
    }
    ```
后端追加status状态，默认published，表示启用
#### 1.2、添加用户
* url：/auth/addUser
* method：post
* reqData：
    ```
    {
        username:string, //用户名
        password:string, //密码
        nickname:string, //昵称
        email:string, //邮箱
        role:string //枚举值：admin、editor
    }
    ```
后端追加status状态，默认published，表示启用。
#### 1.3、启用/禁用用户
* url：/auth/switchStatus
* method：post
* reqData：
    ```
    {
        id:string,
        status:string
    }
    ```
只有管理员可以启用、禁用用户状态
#### 1.4、自动登录
* url：/auth/autoLogin
* method：post
* reqHeaders：cookie
* reqData：
    ```
    {}
    ```
* resData:
    ```
    {
        code:string, //状态码
        message:string, //描述文本
        data:{
            username:string, //用户名
            nickname:string, //昵称
            role:string, // 角色
            token:string // token
        }
    }
    ```
刷新浏览器会调用此接口，会自动传递cookie，后端判断cookie是否有效，有效则返回同登录接口相同的响应体。
### 二、新闻模块
#### 2.1 创建新闻
* url：/news/create
* method：post
* reqData：
    ```
    {
        articleType:string ,// 文章类型，枚举值：normal、video
        title:string, //文章标题
        content:string, //内容
        source:string, //文章来源
        editor:string, //编辑
        coverImages:string, //封面图
        status:string, //文章状态，枚举值
    }
    ```
* resData:
    ```
    {
        code:string, //状态码
        message:string, //描述文本
    }
    ```

coverImages字段是一个字符串的json，后端不需要关心格式。

status字段表示文章的状态，**published**表示已发布、**draft**表示草稿箱（撤回也是这个状态）

创建新闻的时候，后端还应该追加创建时间（createTime）、创建用户（creator）
#### 2.2 新闻列表
* url：/news/list
* method：post
* reqData：
    ```
    {
        articleType:string, // 文章类型，默认空字符串表示全部，枚举值：空、normal、video
        title:string, //文章标题
        status:string, //文章状态
        startPublishedTime:string, //发布时间起，默认空字符串，YYYY-MM-DD格式
        endPublishedTime:string, //发布时间止，默认空字符串，YYYY-MM-DD格式
        page:number, //分页页数
        pageSize:number, //每页展示条数
    }
    ```
* resData：
    ```
    {
      
        code:string,
        message:string,
        data:{
            list:[], //数据源
            page:number, //分页页数
            pageSize:number, //每页展示条数
            totlaPage:numbser, //共多少页
            total:number， //共多少条
        }
    }
    ```
响应体的list字段的每一项，包含除内容以外，创建文章时候的所有字段，并追加creator、createTime、updateTime（初始等同于createTime）
#### 2.3 获取新闻详情
* url：/news/getDetail
* method：post
* reqData：
    ```
    {
        id:string, // 文章id
    }
    ```
* resData：
    ```
    {
        code:string,
        message:string,
        data:{
            ... //同列表接口内容，但包含content字段
        }
    }
    ```
#### 2.4 更新文章
* url：/news/update
* method：post
* reqData：
    ```
    {
        id:string, // 文章id
        ... // 同新建文章
    }
    ```
* resData：
    ```
    {
        code:string,
        message:string
    }
    ```  
编辑文章保存，后端需更新updateTime，同时前端依然会传递status，后端记得更新。
#### 2.5 发布/撤回文章
* url：/news/switchStatus
* method：post
* reqData：
    ```
    {
        id:string, // 文章id
        status:string
    }
    ```
* resData：
    ```
    {
        code:string,
        message:string
    }
    ``` 
后端更新状态即可，并刷新updateTime（既用于发布时间，也用于撤回时间）。
### 三、素材库模块
#### 3.1 上传文件
* url：/material/uploadFile
* method：post
* reqContentType:multipart/form-data
* reqData：
    ```
    {
        file:file
    }
    ```
* resData:
    ```
    {
        code:string, //状态码
        message:string, //描述文本
        data:{
            src:string, //文件路径
        }
    }
    ```
#### 3.2 新建素材
* url：/material/create
* method：post
* reqData：
    ```
    {
        materialType:string ,// 素材类型，枚举值：image、video
        type:string, //文件MIME类型
        desc:string, //描述
        size:number, //文件大小（单位byte）
        src:string, //文件路径
    }
    ```
* resData:
    ```
    {
        code:string, //状态码
        message:string, //描述文本
    }
    ```
初始status为published，同新建文章一样，后端追加creator、createTime、updateTime字段。
#### 3.3 素材列表
* url：/material/list
* method：post
* reqData：
    ```
    {
        materialType:string, // 素材类型，默认空字符串表示全部，枚举值：空、image、video
        desc:string, //素材描述
        status:string, //素材状态
        startPublishedTime:string, //发布时间起，默认空字符串，YYYY-MM-DD格式
        endPublishedTime:string, //发布时间止，默认空字符串，YYYY-MM-DD格式
        page:number, //分页页数
        pageSize:number, //每页展示条数
    }
    ```
* resData：
    ```
    {
      
        code:string,
        message:string,
        data:{
            list:[], //数据源
            page:number, //分页页数
            pageSize:number, //每页展示条数
            totlaPage:numbser, //共多少页
            total:number， //共多少条
        }
    }
    ```
响应体的list字段的每一项，包含所有内容以外，并追加creator、createTime、updateTime（初始等同于createTime）
#### 3.4 更新素材
* url：/material/update
* method：post
* reqData：
    ```
    {
        id:string, // 素材id
        ... // 同新建素材
    }
    ```
* resData：
    ```
    {
        code:string,
        message:string
    }
    ```  
编辑素材保存，后端需更新updateTime。
#### 3.5 启用/禁用素材
* url：/material/switchStatus
* method：post
* reqData：
    ```
    {
        id:string, // 素材id
        status:string
    }
    ```
* resData：
    ```
    {
        code:string,
        message:string
    }
    ``` 
后端更新状态即可，并刷新updateTime。
### 四、专题模块
#### 3.1 新建专题
* url：/subject/create
* method：post
* reqData：
    ```
    {
        title:string, //标题
        desc:string, //描述
        coverImage:string, //封面图
        relations:string, //关联的文章，一个字符串数组，每个元素为文章的id
    }
    ```
* resData:
    ```
    {
        code:string, //状态码
        message:string, //描述文本
    }
    ```
初始status为published，同新建文章一样，后端追加creator、createTime、updateTime字段。
#### 3.2 专题列表
* url：/subject/list
* method：post
* reqData：
    ```
    {
        title:string, // 专题标题
        status:string, //专题状态
        startPublishedTime:string, //发布时间起，默认空字符串，YYYY-MM-DD格式
        endPublishedTime:string, //发布时间止，默认空字符串，YYYY-MM-DD格式
        page:number, //分页页数
        pageSize:number, //每页展示条数
    }
    ```
* resData：
    ```
    {
      
        code:string,
        message:string,
        data:{
            list:[], //数据源
            page:number, //分页页数
            pageSize:number, //每页展示条数
            totlaPage:numbser, //共多少页
            total:number， //共多少条
        }
    }
    ```
响应体的list字段的每一项，包含所有内容以外，并追加creator、createTime、updateTime（初始等同于createTime）
#### 3.3 更新专题
* url：/subject/update
* method：post
* reqData：
    ```
    {
        id:string, // 专题id
        ... // 同新建专题
    }
    ```
* resData：
    ```
    {
        code:string,
        message:string
    }
    ```  
编辑专题保存，后端需更新updateTime。
#### 3.4 启用/禁用专题
* url：/subject/switchStatus
* method：post
* reqData：
    ```
    {
        id:string, // 专题id
        status:string
    }
    ```
* resData：
    ```
    {
        code:string,
        message:string
    }
    ``` 
后端更新状态即可，并刷新updateTime。
#### 3.5 获取某个专题关联的文章集合
* url：/subject/getRelationArticles
* method：post
* reqData：
    ```
    {
        id:string, // 专题id
    }
    ```
* resData：
    ```
    {
        code:string,
        message:string,
        data:array, //关联的文章集合
    }
    ``` 
后端更新状态即可，并刷新updateTime。