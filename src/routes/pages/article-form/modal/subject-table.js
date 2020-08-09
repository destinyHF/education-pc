import ETable from "@components/e-table";
import StatusText from "@components/status-text";
import moment from "moment";
import React from "react";
import {getSubjectList,} from "../../subject/request";

const conditions = [
	{label:"专题名称",type:"input",key:"name"},
	{label:"专题状态",type:"select",key:"status",options:[
			{label:"全部",value:""},
			{label:"已上线",value:"ONLINE"},
			{label:"已下线",value:"OFFLINE"},
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
				handleCallback={this.handleCallback}
				tableColumn={[
					{title:"名称",width:"100px",key:"name"},
					{title:"状态",width:"80px",key:"status",component:({data})=>
							<StatusText value={data.status} dataSource={[
								{code:"ONLINE",color:"success",text:"已上线"},
								{code:"OFFLINE",color:"warning",text:"已下线"}
							]}/>
					},
					{title:"描述",width:"100px",key:"description"},
					{title:"创建人",width:"80px",key:"createBy"},
					{title:"创建时间",width:"150px",key:"createTime",component:({data})=>moment(data.createTime).format("YYYY-MM-DD HH:mm:ss")},
				]}
				dataSource={getSubjectList}
			/>
		)
	}
}