import ETable from "@components/e-table";
import StatusText from "@components/status-text";
import moment from "moment";
import React from "react";

export default class extends React.Component{
	render(){
		const {data} = this.props;
		return(
			<ETable
				selectable={false}
				tableColumn={[
					{title:"文章标题",width:"100px",key:"title"},
					{title:"状态",width:"80px",key:"draft",component:({data})=>
							<StatusText value={data.draft} dataSource={[
								{code:false,color:"success",text:"已发布"},
								{code:true,color:"warning",text:"未发布"}
							]}/>
					},
					{title:"来源",width:"100px",key:"source"},
					{title:"编辑",width:"100px",key:"editor"},
					{title:"创建人",width:"80px",key:"createBy"},
					{title:"创建时间",width:"150px",key:"createTime",component:({data})=>moment(data.createTime).format("YYYY-MM-DD HH:mm:ss")},
				]}
				dataSource={data}
			/>
		)
	}
}