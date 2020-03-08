import React from "react";
import {message,Row} from "antd";
import "./index.less";
import SearchForm from "./search-wrapper";
import HandleGroups from "./handle-wrapper";
import TableWrapper from "./table-wrapper";
import {getDefaultSearchData,transformValues} from "./util";

class ETable extends React.Component{
	static defaultProps={
		conditions:[],
		handleBtn:[],
		handleCallback:()=>{},
		selectedRowKeys:[],
		recordRows:false,
		dataSource:[],
		rowKey:"id",
		selectable:true,
		selectType:"checkbox",
		tableColumn:[]
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
			total:0,
			totalPage:0,
			recordRows:props.recordRows
		}
	}
	render(){
		const {conditions,handleBtn,rowKey,handleCallback,scrollX,tableColumn,selectable,selectType} = this.props;
		const {searchDataOrigin,dataSource,currentPage,pageSize,total,totalPage,selectedRowKeys,selectedRows,recordRows} = this.state;
		return(
			<Row className={"table-choose"}>
				{
					!!conditions.length &&
					<Row>
						<SearchForm values={searchDataOrigin} dataSource={conditions} callback={this.setSearchData}/>
					</Row>
				}
				{
					!!handleBtn.length &&
					<Row>
						<HandleGroups
							dataSource={handleBtn}
							selectedRows={selectedRows}
							selectedRowKeys={selectedRowKeys}
							callback={this.getResourceData}
							handleCallback={handleCallback}
							instance={this}
						/>
					</Row>
				}
				<Row>
					<TableWrapper
						dataSource={dataSource}
						recordRows={recordRows}
						recordCallback={value=>this.setState({recordRows:value})}
						pagination={{
							defaultCurrent:1,
							current:currentPage,
							pageSize,
							total,
							selectedRowKeys,
							selectedRows,
							showTotal:total=>`共${totalPage}页${total}条`,
							style:{
								margin:"40px 40px 40px 0"
							},
							showSizeChanger:true,
							pageSizeOptions:["10","20","50","100","200","500"],
							onShowSizeChange:(current,pageSize)=>this.getResourceData({currentPage,pageSize},false),
							size:"default"
						}}
						tableColumn={tableColumn}
						rowKey={rowKey}
						scrollX={scrollX}
						callback={this.getResourceData}
						selectedCallback={this.tableSelect}
						rowSelection={selectable?{
							selectedRowKeys:selectedRowKeys,
							type:selectType
						}:null}
					/>
				</Row>
			</Row>
		)
	}
	componentDidMount() {
		this.getResourceData({},true);
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
		let {total,totalPage,dataSource,originDataSource} = this.state;
		let {currentPage,pageSize} = reqData;
		const {recordRows} = this.state;
		const callback=()=>{
			const nextState = {
				total,
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
				this.props.dataSource(reqData).then(response=>{
					const {data} = response;
					if(data instanceof Array){
						originDataSource = data;
						dataSource = originDataSource.slice(0,pageSize);
						total = data.length;
						totalPage = Math.ceil(total/pageSize);
						currentPage = 1;
					}else if(data.__proto__ === Object.prototype){
						const {list=[],page={}} = data;
						originDataSource = [];
						dataSource = list;
						total = page.totalSize;
						totalPage = page.totalPage;
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
						const {data} = response;
						if(data){
							const {list=[],page={}} = data;
							dataSource = list;
							total = page.totalSize;
							totalPage = page.totalPage;
							currentPage = page.currentPage;
							pageSize = page.pageSize;
						}
						callback();
					}).catch(error=>{
						message.error(error,2.5);
					});
				}
			}
		}else{
			dataSource = originDataSource.slice(pageSize*currentPage - pageSize,pageSize*currentPage);
			total = originDataSource.length;
			totalPage = Math.ceil(total/pageSize);
			callback();
		}
	};
}

export default ETable;