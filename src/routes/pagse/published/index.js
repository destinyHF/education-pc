import React from "react";
import ETable from "../../../components/e-table";

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
				tableColumn={[
					{title:"标题",width:"200px",key:"title"},
					{title:"摘要",width:"200px",key:"desc"},
					{title:"创建时间",width:"200px",key:"createTime"}
				]}
				dataSource={[]}
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
		console.log("创建");
	};
	editArticle=([target],callback)=>{
		console.log("编辑",target,callback);
	};
	deleteArticle=(selectedRows,callback)=>{
		console.log("删除",selectedRows,callback);
	};
}