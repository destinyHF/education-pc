import React from "react";
import {Tooltip} from "antd";
import {EditOutlined,DeleteOutlined} from "@ant-design/icons";
import ETable from "../../../components/e-table";
import {getPublishedArticle} from "../../../data/request";

const conditions = [{
	label:"标题",type:"input",key:"title"
}];
const handleBtn = [
	{key:"create",name:"新建",type:"primary",relation:"none"},
	{key:"delete",name:"删除",type:"danger",relation:"multiple"},
	{key:"edit",name:"编辑",relation:"single"}
];

export default class extends React.Component{
	render(){
		return(
			<ETable
				conditions={conditions}
				handleBtn={handleBtn}
				handleCallback={this.handleCallback}
				scrollX={1050}
				tableColumn={[
					{title:"标题",width:"250px",key:"title",component:({data})=><span className={"a-link"}>{data.title}</span>},
					{title:"类型",width:"100px",key:"articleType"},
					{title:"来源",width:"100px",key:"source"},
					{title:"编辑",width:"100px",key:"editor"},
					{title:"发布时间",width:"150px",key:"publishedTime"},
					{title:"更新时间",width:"150px",key:"updateTime"},
					{title:"操作",width:"100px",key:"handle",component:({data,getList})=>
						<div>
							<Tooltip title={"编辑"}>
								<EditOutlined className={"table-icon"} />
							</Tooltip>
							<Tooltip title={"删除"}>
								<DeleteOutlined className={"table-icon"}/>
							</Tooltip>
						</div>
					}
				]}
				dataSource={getPublishedArticle}
			/>
		)
	}
	handleCallback=(key,selectedRowKeys,selectedRows,callback)=>{
		switch (key) {
			case "create":
				this.createArticle();break;
			case "edit":
				this.editArticle(selectedRows,callback);break;
			case "delete":
				this.deleteArticle(selectedRows,callback);break;
			default:
				return;
		}
	};
	createArticle=()=>{
		this.props.history.push("articleForm");
	};
	editArticle=([target],callback)=>{
		console.log("编辑",target,callback);
	};
	deleteArticle=(selectedRows,callback)=>{
		console.log("删除",selectedRows,callback);
	};
}
