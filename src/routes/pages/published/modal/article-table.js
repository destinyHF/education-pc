import ETable from "@components/e-table";
import StatusText from "@components/status-text";
import moment from "moment";
import React from "react";
import {getArticleList} from "../../published/request";
import CoverModel from "./cover-model";

const conditions = [
	{label:"文章标题",type:"input",key:"name"},
];

export default class extends React.Component{
	render(){
		const {tableRef,selectedRows} = this.props;
		return(
			<ETable
				ref={tableRef}
				selectedRowKeys={selectedRows.map(item=>item.id)}
				selectedRows={selectedRows}
				recordRows={true}
				conditions={conditions}
				tableColumn={[
					{title:"文章标题",width:"100px",key:"title"},
					{title:"封面模式",width:"80px",key:"url",component:CoverModel},
					{title:"状态",width:"80px",key:"draft",component:({data})=>
							<StatusText value={data.draft} dataSource={[
								{code:false,color:"success",text:"已发布"},
								{code:true,color:"warning",text:"未发布"}
							]}/>
					},
					{title:"更新人",width:"80px",key:"updateBy"},
					{title:"更新时间",width:"150px",key:"updateTime",component:({data})=>moment(data.updateTime).format("YYYY-MM-DD HH:mm:ss")},
				]}
				dataSource={data=>getArticleList({...data,draft:false})}
			/>
		)
	}
}