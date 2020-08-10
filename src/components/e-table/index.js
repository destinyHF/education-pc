import React from "react";
import {message,Card} from "antd";
import "./index.less";
import SearchForm from "./search-wrapper";
import HandleGroups from "./handle-wrapper";
import TableWrapper from "./table-wrapper";
import {getDefaultSearchData,transformValues} from "./util";



class ETable extends React.Component{
	static defaultProps={
		conditions:[], //检索条件
		handleBtn:[], //操作按钮集合
		handleCallback:()=>{},
		selectedRowKeys:[],//被选中的keys
		recordRows:false,//是否启用翻页保留
		dataSource:[],//表格数据源
		rowKey:"id",//唯一标识符
		selectable:true,//是否可选
		selectType:"checkbox",//可选类型
		tableColumn:[] //表格列
	};
	constructor(props){
		super(props);
		const dynamic = props.dataSource instanceof Function;
		this.state = {
			searchData:getDefaultSearchData(props.conditions,true),
			searchDataOrigin:getDefaultSearchData(props.conditions),
			selectedRowKeys:props.selectedRowKeys,
			selectedRows:[],
			dataSource:[],
			dynamic,
			originDataSource:dynamic?[]:props.dataSource,
			currentPage:1,
			pageSize:10,
			totalSize:0,
			totalPage:0,
			recordRows:props.recordRows
		}
	}
	render(){
		const {conditions,handleBtn,rowKey,handleCallback,scrollX,tableColumn,selectable,selectType,title} = this.props;
		const {searchDataOrigin,dataSource,currentPage,pageSize,totalSize,totalPage,selectedRowKeys,selectedRows,recordRows} = this.state;
		return(
			<Card title={title}  bodyStyle={{padding:"10px 24px 0"}}>
				<div className={"table-choose"}>
					{
						!!conditions.length &&
						<SearchForm values={searchDataOrigin} dataSource={conditions} callback={this.setSearchData}/>
					}
					{
						!!handleBtn.length &&
						<HandleGroups
							dataSource={handleBtn}
							selectedRows={selectedRows}
							selectedRowKeys={selectedRowKeys}
							callback={this.getResourceData}
							handleCallback={handleCallback}
							instance={this}
						/>
					}
					<TableWrapper
						dataSource={dataSource}
						recordRows={recordRows}
						recordCallback={value=>this.setState({recordRows:value})}
						pagination={{
							defaultCurrent:1,
							current:currentPage,
							pageSize,
							total:totalSize,
							selectedRowKeys,
							selectedRows,
							showTotal:total=>`共${totalPage}页${totalSize}条`,
							style:{
								margin:"40px 40px 40px 0"
							},
							showSizeChanger:true,
							pageSizeOptions:["10","20","50"],
							onChange:(currentPage,pageSize)=>this.getResourceData({currentPage,pageSize},false),
							onShowSizeChange:(currentPage,pageSize)=>this.getResourceData({currentPage,pageSize},true),
							size:"default"
						}}
						tableColumn={tableColumn}
						rowKey={rowKey}
						scrollX={scrollX}
						callback={this.getResourceData}
						selectedCallback={this.tableSelect}
						rowSelection={selectable?{
							selectedRowKeys:selectedRowKeys,
							type:selectType,
							onSelect:this.onSelect,
							onSelectAll:this.onSelectAll
						}:null}
					/>
				</div>
			</Card>
		)
	}
	componentDidMount() {
		this.getResourceData({},true);
	};
	onSelect=(record, selected)=>{
		const {rowKey} = this.props;
		if(selected){
			this.setState(prevState=>{
				return{
					selectedRowKeys:[...prevState.selectedRowKeys,record[rowKey]],
					selectedRows:[...prevState.selectedRows,record]
				}
			});
		}else {
			this.setState(prevState=>{
				return{
					selectedRowKeys:prevState.selectedRowKeys.filter(item=>item !== record[rowKey]),
					selectedRows:prevState.selectedRows.filter(item=>item[rowKey] !== record[rowKey])
				}
			});
		}
	};
	onSelectAll=(selected, selectedRows, changeRows)=>{
		const {rowKey} = this.props;
		const changeRowKeys = changeRows.map(item=>item[rowKey]);
		if(selected){
			this.setState(prevState=>{
				return{
					selectedRowKeys:[...new Set([...prevState.selectedRowKeys,...changeRows.map(item=>item[rowKey])])],
					selectedRows:[...prevState.selectedRows,...changeRows.filter((item)=>{
						return !prevState.selectedRowKeys.includes(item[rowKey])
					})]
				}
			});
		}else{
			this.setState(prevState=>{
				return{
					selectedRowKeys:prevState.selectedRowKeys.filter(item=>{
						return !changeRowKeys.includes(item);
					}),
					selectedRows:prevState.selectedRows.filter(item=>{
						return !changeRowKeys.includes(item[rowKey]);
					})
				}
			});
		}
	};
	tableSelect=({selectedRowKeys,selectedRows})=>{
		this.setState({
			selectedRowKeys,
			selectedRows
		});
	};
	componentDidUpdate(prevProps, prevState, snapshot) {
		if(prevProps.dataSource !== this.props.dataSource){
			this.setState({
				originDataSource:this.props.dataSource
			},()=>{
				this.getResourceData({},true);
			});
		}
		if(prevProps.conditions !== this.props.conditions){
			this.setState({
				searchData:getDefaultSearchData(this.props.conditions,true),
				searchDataOrigin:getDefaultSearchData(this.props.conditions)
			});
		}
	};
	setSearchData=(values,next)=>{
		const {conditions} = this.props;
		this.setState({
			searchData:transformValues(values,conditions),
			searchDataOrigin:values
		});
		next && this.getResourceData({...transformValues(values,conditions),currentPage:1},true)
	};
	getResourceData=(params={},isRequest)=>{
		const reqData = {
			currentPage:this.state.currentPage,
			pageSize:this.state.pageSize,
			...this.state.searchData,
			...params
		};
		const {dynamic} = this.state;
		let {totalSize,totalPage,dataSource,originDataSource} = this.state;
		let {currentPage,pageSize} = reqData;
		const {recordRows} = this.state;
		const callback=()=>{
			const nextState = {
				totalSize,
				totalPage,
				dataSource,
				originDataSource,
				currentPage,
				pageSize
			};
			this.setState({
				...nextState,
				...(recordRows?{}:{
					selectedRowKeys:[],
					selectedRows:[]
				})
			})
		};
		if(dynamic){
			if(isRequest){
				this.props.dataSource(reqData).then((response={})=>{
					if(response instanceof Array){
						originDataSource = response;
						dataSource = originDataSource.slice(0,pageSize);
						totalSize = response.length;
						totalPage = Math.ceil(totalSize/pageSize);
						currentPage = 1;
					}else if(response.__proto__ === Object.prototype){
						const {data=[],page={}} = response;
						originDataSource = [];
						dataSource = data;
						totalSize = page.totalSize;
						totalPage = Math.ceil(totalSize/pageSize);
						currentPage = page.currentPage;
						pageSize = page.pageSize;
					}
					callback();
				}).catch(error=>{
					message.error(error,2.5);
				});
			}else{
				if(!!originDataSource.length){
					dataSource = originDataSource.slice(pageSize*currentPage - pageSize,pageSize*currentPage);
					callback();
				}else{
					this.props.dataSource(reqData).then(response=>{
						if(response){
							const {data=[],page={}} = response;
							dataSource = data;
							totalSize = page.totalSize;
							pageSize = page.pageSize;
							totalPage = Math.ceil(totalSize/pageSize);
							currentPage = page.currentPage;
						}
						callback();
					}).catch(error=>{
						message.error(error,2.5);
					});
				}
			}
		}else{
			dataSource = originDataSource.slice(pageSize*currentPage - pageSize,pageSize*currentPage);
			totalSize = originDataSource.length;
			totalPage = Math.ceil(totalSize/pageSize);
			callback();
		}
	};
}

export default ETable;