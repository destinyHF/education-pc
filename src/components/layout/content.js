import React from "react";
import style from "./content.module.css";
import {Layout} from "antd";
import {MenuUnfoldOutlined,MenuFoldOutlined} from "@ant-design/icons";
import Routes from "../../routes";

export default class extends React.Component{
	render(){
		const {collapsed,toggle} = this.props;
		return(
			<section className={style.wrapper}>
				<Layout.Header style={{background:'#fff',padding:0}}>
					{
						collapsed?
							<MenuUnfoldOutlined className={style.trigger} onClick={toggle}/>
							:
							<MenuFoldOutlined className={style.trigger} onClick={toggle}/>
					}
				</Layout.Header>
				<Layout.Content
					className={style.content}
					style={{
						margin: '24px 16px',
						background: '#fff',
						minHeight: 280,
					}}
				>
					<Routes/>
				</Layout.Content>
			</section>
		)
	}
}
