import React from "react";
import {Button} from "antd";
import {SearchOutlined} from "@ant-design/icons";

class Submit extends React.Component{
	render(){
		return(
			<div style={{textAlign:"right"}}>
				<Button onClick={this.props.onSubmit} style={{marginRight:"15px"}} type={"primary"}>
					<SearchOutlined />查找
				</Button>
				<Button onClick={this.props.onReset}>重置</Button>
			</div>
		)
	}
}

export default Submit;
