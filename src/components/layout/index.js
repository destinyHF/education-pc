import React from "react";
import {Layout} from "antd";
import style from "./index.module.css";
import Aside from "./aside";
import Content from "./content";

export default class extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			collapsed: false,
		};
	}
	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	};
	render() {
		const {collapsed} = this.state;
		return (
			<Layout className={style.container}>
				<Aside collapsed={collapsed}/>
				<Content collapsed={collapsed} toggle={this.toggle}/>
			</Layout>
		);
	}
}