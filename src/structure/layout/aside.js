import React from "react";
import {Layout,Menu} from "antd";
import {HomeOutlined} from "@ant-design/icons";
import {withRouter} from "react-router-dom";
import style from "./aside.module.css";
import configs from "../../routes/config";

export default withRouter(class extends React.Component{
	render(){
		const {collapsed,location} = this.props;
		return(
			<Layout.Sider trigger={null} collapsible collapsed={collapsed}>
				<div className={style.title} onClick={()=>this.pathTo(configs.defaultRoute)}>
					<HomeOutlined style={collapsed?{margin:"auto"}:{}} theme="twoTone" className={style.logo}/>
					{
						!collapsed &&
						<div className={style.name}>CMS内容管理系统</div>
					}
				</div>
				<div>
					<Menu theme="dark" mode="inline" selectedKeys={[location.pathname]} defaultOpenKeys={["newsList"]}>
						{
							this.loopMenu()
						}
					</Menu>
				</div>
			</Layout.Sider>
		)
	}
	loopMenu=()=>{
		return configs.map(item=>{
			if(Array.isArray(item.children)){
				return(
					<Menu.SubMenu
						key={item.key}
						icon={item.icon}
						title={
							<span>
								{/*<Icon type={item.icon}/>*/}
								<span>{item.label}</span>
							</span>
						}
					>
						{
							item.children.map(item=>
								<Menu.Item onClick={()=>this.pathTo(item.path)} key={item.path}><span>{item.label}</span></Menu.Item>
							)
						}
					</Menu.SubMenu>
				)
			}else{
				return(
					<Menu.Item icon={item.icon} onClick={()=>this.pathTo(item.path)} key={item.path}>
						<span>{item.label}</span>
					</Menu.Item>
				)
			}
		});
	};
	pathTo=(path)=>{
		this.props.history.push(path);
	};
})
