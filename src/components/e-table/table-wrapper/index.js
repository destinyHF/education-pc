import React from "react";
import {Table,Row,Alert,Button} from "antd";
import rndm from "rndm";
const {Column} = Table;

export default class extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			columnKeys:props.tableColumn.map(item=>item.key),
			tableWidth:0
		};
		this.tableId = "tb_"+rndm(10);
	}
	render(){
		const {dataSource,pagination,tableColumn,rowKey,scrollX,rowSelection} = this.props;
		const {columns,isScroll} = this.filterColumn(tableColumn);
		return(
			<Row className={"table-wrapper"}>
				{
					!!(rowSelection || {selectedRowKeys:[]}).selectedRowKeys.length &&
						<Alert
							style={{marginBottom:"10px"}}
							type={"info"}
							message={
								<div>
									{`已选择`}
									<span className={"text-primary"}>&nbsp;{`${rowSelection.selectedRowKeys.length}`}&nbsp;</span>
									{`项`}
									<Button onClick={this.resetSelected} type={"link"}>清空</Button>
								</div>
							}
						/>
				}
				<Table
					style={{minHeight:"200px"}}
					id={this.tableId}
					dataSource={dataSource}
					bordered
					size={"middle"}
					pagination={pagination}
					rowKey={rowKey}
					scroll={(scrollX && isScroll)?{x:scrollX}:{}}
					rowSelection={rowSelection?Object.assign(rowSelection,{onChange:this.rowSelect}):null}
				>
					{
						columns.map(item=>
							<Column
								title={item.title}
								key={item.key}
								width={item.width}
								fixed={isScroll?item.fixed:undefined}
								render={(text,record)=>{
									const Content = item.component;
									return Content?<Content data={record} getList={this.getList}/>:<span>{record[item.key]}</span>
								}}
							/>
						)
					}
				</Table>
			</Row>
		)
	}
	filterColumn=(tableColumn)=>{
		const {columnKeys,tableWidth} = this.state;
		const {columns,maxWidth} = tableColumn.reduce((init,item)=>{
			if(columnKeys.includes(item.key)){
				init.columns.push(item);
				init.maxWidth += item.width?Number(String(item.width).replace("px","")):300;
			}
			return init;
		},{
			columns:[],
			maxWidth:0
		});
		return{
			columns,
			isScroll:maxWidth>tableWidth
		}
	};
	componentDidMount(){
		const tableWidth = document.getElementById(this.tableId).offsetWidth;
		this.setState({tableWidth});
	};
	getList=(params={})=>{
		this.props.callback({currentPage:1,...params},true);
	};
	rowSelect=(selectedRowKeys,selectedRows)=>{
		const {selectedCallback} = this.props;
		selectedCallback({selectedRowKeys,selectedRows});
	};
	resetSelected=()=>{
		const {selectedCallback} = this.props;
		selectedCallback({selectedRowKeys:[],selectedRows:[]});
	};
}