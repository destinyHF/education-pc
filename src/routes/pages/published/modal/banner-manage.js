import React from "react";
import moment from "moment";
import {getBannerList} from "../request";
import {Tooltip,Table,message,Button,Modal} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import ArticleTable from "./article-table";

export default class extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			dataSource:[]
		}
	}
	componentDidMount(){
		getBannerList({currentPage:1,pageSize:10}).then(({data})=>{
			this.setState({dataSource:data})
		}).catch(error=>{
			message.error(error,2.5)
		})
	}
	render(){
		const {dataSource} = this.state;
		return(
			<div>
				<div style={{margin:"15px 0"}}>
					<Button onClick={this.addArticle} type={"primary"} size={"small"}>导入文章</Button>
				</div>
				<Table
					bordered={true}
					pagination={false}
					dataSource={dataSource}
					rowKey={"id"}
				>
					<Table.Column title={"标题"} dataIndex={"title"}/>
					<Table.Column title={"来源"} dataIndex={"source"}/>
					<Table.Column title={"编辑"} dataIndex={"editor"}/>
					<Table.Column title={"更新人"} dataIndex={"updateBy"}/>
					<Table.Column title={"更新时间"} dataIndex={"updateTime"} render={(text)=><span>{moment(text).format("YYYY-MM-DD HH:mm:ss")}</span>}/>
					<Table.Column title={"操作"} key={"handle"} render={
						(text,record)=>
							<div>
								<Tooltip title={"删除"} onClick={()=>this.deleteBanner(record.id)}>
									<DeleteOutlined className={"table-icon"}/>
								</Tooltip>
							</div>
						}
					/>
				</Table>
			</div>
		)
	}
	addArticle=()=>{
		const tableRef = React.createRef();
		const {dataSource} = this.state;
		Modal.confirm({
			title:"选择文章",
			width:800,
			content:<ArticleTable tableRef={tableRef} selectedRows={dataSource}/>,
			onOk:(close)=>{
				const {selectedRows} = tableRef.current.state;
				const next = selectedRows.some(item=>{
					return !item.url || JSON.parse(item.url).type === "video"
				});
				if(next){
					message.warning("封面模式为视频的文章不可加入Banner位！",2.5);
					return false;
				}
				this.setState({
					dataSource:tableRef.current.state.selectedRows
				});
				close();
			}
		})
	}
	deleteBanner=(id)=>{
		this.setState(prevState=>{
			return{
				dataSource:prevState.dataSource.filter(item=>item.id !== id)
			}
		})
	}
}