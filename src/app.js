import React from 'react';
import {ConfigProvider} from "antd";
import zhCN from "antd/lib/locale-provider/zh_CN";
import moment from "moment";
import Login from "./components/login";
import Layout from "./components/layout";
moment.locale("zh-cn");

export default class extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      redirect:false,//若为true，则渲染登录页面
    }
  }
  render(){
    const {redirect} = this.state;
    return(
      <ConfigProvider locale={zhCN}>
        {
          redirect?<Login/>:<Layout/>
        }
      </ConfigProvider>
    )
  }
}
