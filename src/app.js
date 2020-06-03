import React from 'react';
import {ConfigProvider} from "antd";
import "antd/dist/antd.css";
import zhCN from "antd/lib/locale-provider/zh_CN";
import moment from "moment";
import Login from "./components/login";
import Layout from "./components/layout";
moment.locale("zh-cn");
import {autoLogin} from "./data/request";

export default class extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      redirect:true,//若为true，则渲染登录页面
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
  componentDidMount() {
    autoLogin().then(({token})=>{
      sessionStorage.setItem("token",token);
      this.setState({redirect:false})
    }).catch(err);
  }
}
