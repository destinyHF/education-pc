import React from "react";
import style from "./content.module.css";
import {Icon, Layout} from "antd";
import Routes from "../../routes";

export default class extends React.Component{
	render(){
		const {collapsed,toggle} = this.props;
		return(
			<section className={style.wrapper}>
				<Layout.Header style={{background:'#fff',padding:0}}>
					<Icon
						className={style.trigger}
						type={collapsed ? 'menu-unfold' : 'menu-fold'}
						onClick={toggle}
					/>
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