import React from "react";
import {Tag,Button} from "antd";

export default class extends React.Component{
	render(){
		const {type} = this.parsePropsValue();
		return(
			<div>
				{
					type === "singlePic" && <Tag color="cyan">单大图</Tag>
				}
				{
					type === "multiplePic" && <Tag color="blue">多图</Tag>
				}
				{
					type === "video" && <Tag color="geekblue">视频</Tag>
				}
			</div>
		)
	}
	parsePropsValue=()=>{
		const {data} = this.props;
		try {
			return JSON.parse(data.url)
		}catch (e) {
			return {type:"",urls:[]}
		}
	}
}