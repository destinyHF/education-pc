import React from "react";
import {Modal, Button, Row, Col, message, Table, Tooltip} from "antd";
import {getRelationSubject} from "../request";
import SelectSubject from "./subject-table";
import {DeleteOutlined} from "@ant-design/icons";

const style = {
	wrapper:{
		marginTop:"15px",
		outline:"1px solid #d9d9d9"
	}
};

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
			getRelationSubject({contentId:articleId}).then(response=>{
				this.setState({
					selectedRowKeys:(response || []).map(item=>item.id),
					selectedRows:response || []
				});
				onChange((response || []).map(item=>item.id).join(","))
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
					<Button onClick={this.selectItem}>{`选择专题`}</Button>
				</Col>
				<Col span={12} style={style.wrapper}>
					<Table
						dataSource={selectedRows}
						rowKey={"id"}
						pagination={false}
						size={"small"}
					>
						<Table.Column
							title={"专题名称"}
							key={"name"}
							render={(text,record)=><span>{record.name}</span>}
						/>
						<Table.Column
							title={"操作"}
							key={"name"}
							render={
								(text,record)=>
									<div>
										<Tooltip title={"删除"} onClick={()=>this.deleteItem(record)}>
											<DeleteOutlined className={"table-icon"}/>
										</Tooltip>
									</div>
							}
						/>
					</Table>
				</Col>
			</Row>
		)
	}
	selectItem=()=>{
		const tableRef = React.createRef();
		const {selectedRowKeys,selectedRows} = this.state;
		const {onChange} = this.props;
		Modal.confirm({
			title:"选择专题",
			width:1000,
			content:<SelectSubject selectedRowKeys={selectedRowKeys} tableRef={tableRef}/>,
			onOk:(close)=>{
				const {selectedRows:newSelectedRows,selectedRowKeys:newSelectedRowKeys} = tableRef.current.state;
				const noRepeatSelectedRows = Object.values([...selectedRows,...newSelectedRows].reduce((init,item)=>{
					if(newSelectedRowKeys.includes(item.id)){
						init[item.id] = item;
					}
					return init;
				},{}));
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
	deleteItem=(data)=>{
		const {selectedRows} = this.state;
		const {newSelectedRows,newSelectedRowKeys} = selectedRows.reduce((init,item)=>{
			if(item.id !== data.id){
				init.newSelectedRows.push(item);
				init.newSelectedRowKeys.push(item.id);
			}
			return init;
		},{
			newSelectedRows:[],
			newSelectedRowKeys:[]
		});
		this.setState({
			selectedRowKeys:newSelectedRowKeys,
			selectedRows:newSelectedRows
		});
		this.props.onChange(newSelectedRowKeys.join(","));
	}
}