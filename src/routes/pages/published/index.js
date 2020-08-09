import React from "react";
import {Tooltip,Modal,message} from "antd";
import {EditOutlined, UndoOutlined, ExclamationCircleOutlined, BookOutlined} from "@ant-design/icons";
import ETable from "@components/e-table";
import {parseObject} from "@utility/common";
import {getArticleList,getArticleDetail} from "./request";
import {updateArticle} from "../article-form/request";
import moment from "moment";
import CoverModel from "./modal/cover-model";
import PreviewModal from "./modal/preview";

const conditions = [{
	label:"标题",type:"input",key:"title"
}];
const handleBtn = [
	{key:"create",name:"新建",type:"primary",relation:"none"}
];

export default class extends React.Component{
	render(){
		const {title} = this.props;
		return(
			<ETable
				title={title}
				conditions={conditions}
				handleBtn={handleBtn}
				handleCallback={this.handleCallback}
				scrollX={1100}
				tableColumn={[
					{title:"标题",width:"150px",key:"title",component:({data})=><span onClick={()=>this.previewArticle(data.id)} className={"a-link"}>{data.title}</span>},
					{title:"封面模式",width:"80px",key:"url",component:CoverModel},
					{title:"来源",width:"100px",key:"source"},
					{title:"编辑",width:"100px",key:"editor"},
					{title:"创建人",width:"100px",key:"createBy"},
					{title:"创建时间",width:"150px",key:"createTime",component:({data})=>data.createTime && <span>{moment(data.createTime).format("YYYY-MM-DD HH:mm:ss")}</span>},
					{title:"更新人",width:"100px",key:"updateBy"},
					{title:"更新时间",width:"150px",key:"updateTime",component:({data})=>data.updateTime && <span>{moment(data.updateTime).format("YYYY-MM-DD HH:mm:ss")}</span>},
					{title:"操作",width:"100px",key:"handle",component:({data,getList})=>
						<div>
							<Tooltip title={"编辑"} onClick={()=>this.editArticle(data)}>
								<EditOutlined className={"table-icon"} />
							</Tooltip>
							<Tooltip title={"撤回"} onClick={()=>this.recycleArticle(data,getList)}>
								<UndoOutlined className={"table-icon"}/>
							</Tooltip>
						</div>
					}
				]}
				dataSource={data=>getArticleList({...data,draft:0})}
			/>
		)
	}
	handleCallback=(key)=>{
		switch (key) {
			case "create":
				this.createArticle();break;
			default:
				return;
		}
	};
	createArticle=()=>{
		this.props.history.push("createArticle");
	};
	editArticle=(target)=>{
		const params = {
			handleType:"edit",
			articleId:target.id
		};
		this.props.history.push("updateArticle?"+parseObject(params));
	};
	recycleArticle=(data,callback)=>{
		Modal.confirm({
			icon:<ExclamationCircleOutlined />,
			title:"撤回文章",
			content:"被撤回的文章将会保存至草稿箱，确认撤回该文章？",
			onOk:(close)=>{
				updateArticle({id:data.id,draft: true}).then(()=>{
					message.success("操作成功！",1.5);
					close();
					callback();
				}).catch(error=>{
					message.error(error,2.5);
				})
			}
		})
	};
	previewArticle=(id)=>{
		getArticleDetail({id}).then(response=>{
			Modal.info({
				icon:<BookOutlined />,
				title:"预览",
				width:600,
				content:<PreviewModal data={response}/>,
				okText:"关闭"
			})
		})
	}
}