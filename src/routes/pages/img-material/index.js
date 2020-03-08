import React from "react";
import {Tooltip,Icon,Modal} from "antd";
import ETable from "../../../components/e-table";
import Thumbnail from "../../../components/thumbnail";
import {getImgMaterial} from "../../../data/request";
import MaterialForm from "./form";

const conditions = [
	{label:"描述",type:"input",key:"desc"},
	{label:"上传时间（起）",type:"date",key:"beginDate"},
	{label:"上传时间（止）",type:"date",key:"endDate"}
];
const handleBtn = [
	{key:"create",name:"新建",type:"primary",relation:"none"},
	{key:"delete",name:"删除",type:"danger",relation:"multiple"}
];

export default class extends React.Component{
	render(){
		return(
			<ETable
				conditions={conditions}
				handleBtn={handleBtn}
				handleCallback={this.handleCallback}
				scrollX={800}
				tableColumn={[
					{title:"图片",width:"150px",key:"src",component:({data})=><Thumbnail src={data.src}/>},
					{title:"描述",width:"200px",key:"desc"},
					{title:"编辑",width:"100px",key:"editor"},
					{title:"创建时间",width:"150px",key:"createTime"},
					{title:"更新时间",width:"150px",key:"updateTime"},
					{title:"操作",width:"100px",key:"handle",component:({data,getList})=>
							<div>
								<Tooltip title={"编辑"}>
									<Icon type={"edit"} className={"table-icon"}/>
								</Tooltip>
								<Tooltip title={"删除"}>
									<Icon type={"delete"} className={"table-icon"}/>
								</Tooltip>
							</div>
					}
				]}
				dataSource={getImgMaterial}
			/>
		)
	}
	handleCallback=(key,selectedRowKeys,selectedRows,callback)=>{
		switch (key) {
			case "create":
				this.createMaterial(callback);break;
			case "delete":
				this.deleteMaterial(selectedRows,callback);break;
			default:
				return;
		}
	};
	createMaterial=(callback)=>{
		this.instance = React.createRef();
		Modal.confirm({
			title:"新建",
			icon:"none",
			width:800,
			content:<MaterialForm ref={this.instance}/>,
			onOk:(close)=>{

			}
		});
	};
	editdeleteMaterial=([target],callback)=>{
		console.log("编辑",target,callback);
	};
	deleteMaterial=(selectedRows,callback)=>{
		console.log("删除",selectedRows,callback);
	};
}