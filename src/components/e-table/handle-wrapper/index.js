import React from "react";
import {Row,Button} from "antd";

const btnStyle = {
	margin:"0 10px 5px 0"
};

export default class extends React.Component{
	render(){
		const {dataSource} = this.props;
		return(
			<Row className={"handle-wrapper"}>
				{
					dataSource.map(item=>
						<Button
							disabled={this.isDisabled(item.relation)}
							onClick={()=>this.onClick(item.key)}
							style={btnStyle}
							type={item.type}
							key={item.key}
						>
							{item.name}
						</Button>
					)
				}
			</Row>
		)
	};
	onClick=(key)=>{
		const {handleCallback,callback,instance,selectedRowKeys,selectedRows} = this.props;
		handleCallback(key,selectedRowKeys,selectedRows,(params={})=>{
			callback({currentPage:1,...params},true);
		},instance);
	};
	isDisabled=(relation)=>{
		const {selectedRowKeys} = this.props;
		if(relation === "single"){
			return selectedRowKeys.length !== 1;
		}else if(relation === "multiple"){
			return selectedRowKeys.length === 0;
		}else{
			return false;
		}
	}
}