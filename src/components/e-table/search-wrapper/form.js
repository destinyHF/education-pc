import React from "react";
import {Form,Checkbox,Input,Radio,Col,DatePicker,Select} from "antd";
import {getDefaultValue} from "../util";

const formItemStyle = {
	minWidth:"175px"
};

export default class extends React.Component{
	render(){
		const {dataSource,instance} = this.props;
		return(
			<Form ref={instance} style={{display:"flex",flexWrap:"wrap"}}>
				{
					dataSource.map(item=>
						this.formItem(item)
					)
				}
			</Form>
		)
	}
	formItem=(item)=>{
		const layout = {
			radio:24,
			checkbox:24
		};
		return(
			<Col span={layout[item.type]} key={item.key}>
				<Form.Item
					label={item.label}
					key={item.key}
					name={item.key}
					rules={[
						{required:false}
					]}
					initialValue={item.defaultValue || ""}
				>
					{
						this.renderItem(item)
					}
				</Form.Item>
			</Col>
		)
	};
	renderItem=(item)=>{
		switch (item.type) {
			case "select":
				return <SelectForm options={item.options}/>;
			case "checkbox":
				return <CheckboxForm options={item.options}/>;
			case "input":
				return <InputForm/>;
			case "radio":
				return <RadioForm options={item.options}/>;
			case "date":
				return <DatePicker style={formItemStyle} format={"YYYY-MM-DD"}/>;
			case "time":
				return <DatePicker style={formItemStyle} showTime={true} format={"HH:mm:ss"}/>;
			case "dateTime":
				return <DatePicker style={formItemStyle} showTime={true} format={"YYYY-MM-DD HH:mm:ss"}/>;
			default:
				return null;
		}
	};
}

class CheckboxForm extends React.Component{
	render(){
		const {options,value,onChange} = this.props;
		const defaultValue = Array.isArray(value)?value:options.map(item=>item.value);
		return(
			<Checkbox.Group style={formItemStyle} value={defaultValue} onChange={onChange}>
				{
					options.map(item=>
						<Checkbox key={item.value} value={item.value}>{item.label}</Checkbox>
					)
				}
			</Checkbox.Group>
		)
	}
}

class InputForm extends React.Component{
	render(){
		const {value,onChange} = this.props;
		return(
			<Input style={formItemStyle} value={value} onChange={onChange}/>
		)
	}
}

class RadioForm extends React.Component{
	render(){
		const {options,value,onChange} = this.props;
		return(
			<Radio.Group style={formItemStyle} value={value} onChange={onChange}>
				{
					options.map(item=>
						<Radio key={item.value} value={item.value}>{item.label}</Radio>
					)
				}
			</Radio.Group>
		)
	}
}

class SelectForm extends React.Component{
	render(){
		const {options,value,onChange} = this.props;
		return(
			<Select style={formItemStyle} value={value} onChange={onChange}>
				{
					options.map(item=>
						<Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
					)
				}
			</Select>
		)
	}
}
