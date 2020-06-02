import React from "react";
import {Row,Tag} from "antd";
import {UpCircleOutlined,DownCircleOutlined} from "@ant-design/icons";
import SearchForm from "./form";
import Submit from "./submit";
import moment from "moment";
import {getDefaultSearchData} from "../util";

/*
* 检索栏组件
* */
class SearchWrapper extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			showForm:false
		};
		this.formRef = React.createRef();
	}
	render(){
		const {dataSource} = this.props;
		const {showForm} = this.state;
		return(
			<Row className={"search-wrapper"}>
				<div className={"search-wrapper-title"}>
					<div className={"title"}>
						<span>检索条件：</span>
						{
							!showForm &&
							<span>{this.getSearchDescription()}</span>
						}
					</div>
					<div className={"toggle-wrapper"} onClick={this.toggle}>
						<span>
							{
								showForm?"收起":"展开"
							}
						</span>
						{
							showForm?<UpCircleOutlined/>:<DownCircleOutlined/>
						}
					</div>
				</div>
				<Row className={`search-wrapper-form ${showForm?"show":"hide"}`}>
					<SearchForm ref={this.formRef} dataSource={dataSource}/>
					<Submit onSubmit={this.onSubmit} onReset={this.onReset}/>
				</Row>
			</Row>
		)
	}
	onSubmit=()=>{
		const {callback} = this.props;
		const {validateFields} = this.formRef.current;
		validateFields((error,values)=>{
			callback(values,true);
		})
	};
	onReset=()=>{
		const {dataSource,callback} = this.props;
		const {setFieldsValue} = this.formRef.current;
		const getInitValues = getDefaultSearchData(dataSource);
		setFieldsValue(getInitValues);
		callback(getInitValues);
	};
	toggle=()=>{
		this.setState(prevState=>{
			return{
				showForm: !prevState.showForm
			}
		});
	};
	getSearchDescription=()=>{
		const {dataSource,values} = this.props;
		const arr = dataSource.map(item=>{
			const {key,label,type} = item;
			const value = values[key];
			const showValue = this.mapValueToLabel(item,value);
			return {label,value,showValue,key,type}
		}).filter(item=>{
			return item.showValue;
		});
		return (
			<>
				{
					arr.map(item=>{
						return <Tag color={"blue"} key={item.key}>{`${item.label}：${item.showValue}`}</Tag>
					})
				}
			</>
		)
	};
	mapValueToLabel=(target,value)=>{
		const {type} = target;
		if(["input"].includes(type)){
			return value;
		}else if(["radio","select","checkbox"].includes(type)){
			const {options} = target;
			return options.reduce((init,item)=>{
				if(typeof(value) === "string" && value === item.value){
					init.push(item.label);
				}
				if(Array.isArray(value) && value.includes(item.value)){
					init.push(item.label);
				}
				return init;
			},[]).join("、");
		}else if(value instanceof moment){
			if(type === "date"){
				return value.format("YYYY-MM-DD");
			}else if(type === "time"){
				return value.format("HH:mm:ss");
			}else{
				return value.format("YYYY-MM-DD HH:mm:ss");
			}
		}else{
			return value;
		}
	}
}

export default SearchWrapper;
