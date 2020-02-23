import React from "react";
import {Icon, Layout,Menu} from "antd";
import style from "./aside.module.css";
import configs from "../../routes/config";

export default class extends React.Component{
	render(){
		const {collapsed} = this.props;
		return(
			<Layout.Sider trigger={null} collapsible collapsed={collapsed} width={256}>
				<div className={style.title} onClick={()=>this.pathTo(configs.defaultRoute)}>
					<Icon type={"home"} theme="twoTone" className={style.logo}/>
					{
						!collapsed &&
						<div className={style.name}>CMS内容管理系统</div>
					}
				</div>
				<div>
					<Menu theme="dark" mode="inline" defaultSelectedKeys={[this.getHash()]} defaultOpenKeys={["newsList"]}>
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
						title={
							<span>
								<Icon type={item.icon}/>
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
					<Menu.Item onClick={()=>this.pathTo(item.path)} key={item.path}>
						<Icon type={item.icon}/>
						<span>{item.label}</span>
					</Menu.Item>
				)
			}
		});
	};
	pathTo=(path)=>{
		window.location.href="#"+path;
	};
	getHash=()=>{
		return window.location.hash.substring(1).split("?")[0];
	}
}