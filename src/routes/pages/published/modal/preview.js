import React from "react";
import style from "./preview.module.css";
import moment from "moment"

export default class extends React.Component{
	render(){
		const {title,updateTime,source,text} = this.props.data;
		return(
			<div className={style.wrapper}>
				<header className={style.header}>
					<div className={style.url}>&nbsp;http://127.0.0.1</div>
				</header>
				<section className={style.content}>
					<h3 className={style.title}>{title}</h3>
					<div className={style.info}>
						<span>{`发布日期：${moment(updateTime).format("YYYY-MM-DD")}`}</span>
						<span>{`来源：${source}`}</span>
					</div>
					<div className={style.text} dangerouslySetInnerHTML={{__html:text}}></div>
				</section>
			</div>
		)
	}
}