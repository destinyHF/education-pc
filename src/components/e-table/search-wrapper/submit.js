import React from "react";
import {Button,Icon} from "antd";

class Submit extends React.Component{
	render(){
		return(
			<div style={{textAlign:"right"}}>
				<Button onClick={this.props.onSubmit} style={{marginRight:"15px"}} type={"primary"}>
					<Icon type={"search"}/>查找
				</Button>
				<Button onClick={this.props.onReset}>重置</Button>
			</div>
		)
	}
}

export default Submit;