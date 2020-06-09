import React from "react";
import {Layout} from "antd";
import {HashRouter as Router} from "react-router-dom";
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
				<Router>
					<Aside collapsed={collapsed}/>
					<Content collapsed={collapsed} toggle={this.toggle}/>
				</Router>
			</Layout>
		);
	}
}