import React from "react";
import {Modal,Button,Row,Col,message} from "antd";
import {getRelationSubject} from "../request";
import SelectSubject from "./select-subject";

export default class extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			selectedRowKeys:[],
			selectedRows:[]
		}
	}
	componentDidMount(){
		const {articleId,onChange} = this.props;
		if(articleId){
			getRelationSubject({id:articleId}).then(response=>{
				this.setState({
					selectedRows:response || []
				});
				onChange(response.map(item=>item.id).join(","))
			}).catch(error=>{
				message.error(error,2.5);
			})
		}
	}
	render(){
		const {selectedRows} = this.state;
		return(
			<Row>
				<Col span={24}>
					<Button onClick={this.selectSubject}>{`选择专题`}</Button>
				</Col>
				<Col span={24}>
					{
						selectedRows.map(item=>
							<Row key={item.id}>
								<Col>{item.name}</Col>
							</Row>
						)
					}
				</Col>
			</Row>
		)
	}
	selectSubject=()=>{
		const tableRef = React.createRef();
		const {selectedRowKeys,selectedRows} = this.state;
		const {onChange} = this.props;
		Modal.confirm({
			title:"选择专题",
			width:1000,
			content:<SelectSubject selectedRowKeys={selectedRowKeys} tableRef={tableRef}/>,
			onOk:(close)=>{
				const {selectedRows:newSelectedRows,selectedRowKeys:newSelectedRowKeys} = tableRef.current.state;
				const noRepeatSelectedRows = [...selectedRows,...newSelectedRows].reduce((init,item)=>{
					if(newSelectedRowKeys.includes(item.id)){
						init[item.id] = item;
					}
					return init;
				},{});
				const noRepeatSelectedRowKeys = noRepeatSelectedRows.map(item=>item.id);
				onChange(noRepeatSelectedRowKeys.join(","));
				this.setState({
					selectedRowKeys:noRepeatSelectedRowKeys,
					selectedRows:noRepeatSelectedRows
				});
				close();
			}
		})
	}
}