## 一、目录
### 1.1、基本结构
* public
    * index.html（静态模板文件）
* src
    * components（通用组件目录）
        * e-table（该组件用于快速渲染一个表格页面）
        * status-text（该组件用于渲染状态文本）
    * data（数据接口目录）
        * api.js（统一配置后端请求地址）
        * request.js（初始化axios请求，添加拦截器）
    * routes（路由目录）
        * config.js（配置菜单及路由导航）
        * index.js（渲染路由，权限控制）
    * static（静态资源目录）
    * structure（初始结构目录）
        * layout（布局组件）
        * login（登录组件）
    * utility（通用函数目录）
    * app.js（根组件）
    * index.css（全局样式表）
    * index.js（入口文件）
    * serviceWorker.js
* craco.config.js（webpack配置文件）



    