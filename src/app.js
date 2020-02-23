import React from 'react';
import Login from "./components/login";
import Layout from "./components/layout";

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
      <div>
        {
          redirect?<Login/>:<Layout/>
        }
      </div>
    )
  }
}
