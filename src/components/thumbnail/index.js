import React from "react";
import {Modal} from "antd";
import style from "./index.module.css";
export default class extends React.Component{
	render(){
		const {src} = this.props;
		return(
			<div className={style.wrapper} onClick={()=>this.showModal(src)}>
				<img className={style.img} alt={""} src={src}/>
			</div>
		)
	}
	showModal=(src)=>{
		if(!src){
			return false;
		}
		Modal.info({
			title:"预览",
			width:600,
			content:<Img src={src}/>,
			okText:"关闭"
		})
	}
}

class Img extends React.Component{
	render(){
		return(
			<div className={style.prevWrapper}>
				<img className={style.prevImg} src={this.props.src} alt={""}/>
			</div>
		)
	}
}
export {
	Img
}