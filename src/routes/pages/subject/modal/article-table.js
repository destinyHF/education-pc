import ETable from "@components/e-table";
import StatusText from "@components/status-text";
import moment from "moment";
import React from "react";
import {getArticleList} from "../../published/request";

const conditions = [
	{label:"文章标题",type:"input",key:"name"},
	{label:"文章状态",type:"select",key:"draft",options:[
			{label:"全部",value:""},
			{label:"已发布",value:false},
			{label:"未发布",value:true},
		]
	}
];

export default class extends React.Component{
	render(){
		const {tableRef,selectedRowKeys} = this.props;
		return(
			<ETable
				ref={tableRef}
				selectedRowKeys={selectedRowKeys}
				recordRows={true}
				conditions={conditions}
				tableColumn={[
					{title:"文章标题",width:"100px",key:"title"},
					{title:"状态",width:"80px",key:"draft",component:({data})=>
							<StatusText value={data.draft} dataSource={[
								{code:false,color:"success",text:"已发布"},
								{code:true,color:"warning",text:"未发布"}
							]}/>
					},
					{title:"创建人",width:"80px",key:"createBy"},
					{title:"创建时间",width:"150px",key:"createTime",component:({data})=>moment(data.createTime).format("YYYY-MM-DD HH:mm:ss")},
				]}
				dataSource={getArticleList}
			/>
		)
	}
}