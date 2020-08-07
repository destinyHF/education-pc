import React from "react";
import {Tooltip,Modal,message} from "antd";
import {EditOutlined,DeleteOutlined} from "@ant-design/icons";
import ETable from "@components/e-table";
import Thumbnail from "@components/thumbnail";
import {getImgMaterial,createImageMaterial,deleteImageMaterial,updateImageMaterial} from "@data/request";
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
					{title:"容量",width:"100px",key:"fileSize",component:({data})=><span>{Number.isInteger(data.fileSize)?`${(data.fileSize/1024/1024).toFixed(2)}MB`:""}</span>},
					{title:"编辑",width:"100px",key:"editor"},
					{title:"创建时间",width:"150px",key:"createTime"},
					{title:"操作",width:"100px",key:"handle",component:({data,getList})=>
						<div>
							<Tooltip title={"编辑"} onClick={()=>this.editMaterial(data,getList)}>
								<EditOutlined className={"table-icon"} />
							</Tooltip>
							<Tooltip title={"删除"} onClick={()=>this.deleteMaterial([data],getList)}>
								<DeleteOutlined className={"table-icon"}/>
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
				this.instance.current.validateFields((error,values)=>{
					if(error){
						return false;
					}
					const reqData = {
						...values,
						...JSON.parse(values.src)
					};
					delete reqData.src;
					createImageMaterial(reqData).then(()=>{
						message.success("操作成功！",1.5,()=>{
							close();
						});
						callback();
					}).catch(error=>{
						message.error(error,2.5);
					});
				})
			}
		});
	};
	editMaterial=(data,callback)=>{
		this.instance = React.createRef();
		Modal.confirm({
			title:"编辑",
			icon:"none",
			width:800,
			content:<MaterialForm ref={this.instance} data={data} type={"edit"}/>,
			onOk:(close)=>{
				this.instance.current.validateFields((error,values)=>{
					if(error){
						return false;
					}
					const reqData = {
						id:data.id,
						...values
					};
					updateImageMaterial(reqData).then(()=>{
						message.success("操作成功！",1.5,()=>{
							close();
						});
						callback();
					}).catch(error=>{
						message.error(error,2.5);
					});
				})
			}
		});
	};
	deleteMaterial=(selectedRows,callback)=>{
		Modal.confirm({
			title:"警告",
			icon:"warning",
			content:"删除将不可恢复，已使用的文章将不会加载该图片，确认执行操作？",
			okText:"删除",
			okType:"danger",
			onOk:(close)=>{
				deleteImageMaterial({
					ids:selectedRows.map(item=>item.id)
				}).then(()=>{
					message.success("操作成功！",1.5,()=>{
						close();
					});
					callback();
				}).catch(error=>{
					message.error(error,2.5);
				});
			}
		});
	};
}
