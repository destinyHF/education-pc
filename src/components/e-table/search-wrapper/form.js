import React from "react";
import {Form,Checkbox,Input,Radio,Col,DatePicker,Select} from "antd";

const formItemStyle = {
	minWidth:"175px"
};
const layout = {
	radio:24,
	checkbox:24
};
export default class extends React.Component{
	render(){
		const {dataSource,instance} = this.props;
		return(
			<Form
				ref={instance}
				style={{display:"flex",flexWrap:"wrap"}}
			>
				{
					dataSource.map(item=>
						<Col span={layout[item.type]} key={item.key}>
							<Form.Item
								label={item.label}
								rules={[
									{required:false}
								]}
							>
								{
									item.type === "select" &&
									<Form.Item name={item.key} noStyle={true} initialValue={item.defaultValue || ""}>
										<SelectForm options={item.options}/>
									</Form.Item>
								}
								{
									item.type === "checkbox" &&
									<Form.Item name={item.key} noStyle={true} initialValue={item.defaultValue || ""}>
										<CheckboxForm options={item.options}/>
									</Form.Item>
								}
								{
									item.type === "input" &&
									<Form.Item name={item.key} noStyle={true} initialValue={item.defaultValue || ""}>
										<InputForm/>
									</Form.Item>
								}
								{
									item.type === "radio" &&
									<Form.Item name={item.key} noStyle={true} initialValue={item.defaultValue || ""}>
										<RadioForm options={item.options}/>
									</Form.Item>
								}
								{
									item.type === "date" &&
									<Form.Item name={item.key} noStyle={true} initialValue={item.defaultValue || ""}>
										<DatePicker style={formItemStyle} format={"YYYY-MM-DD"}/>
									</Form.Item>
								}
								{
									item.type === "time" &&
									<Form.Item name={item.key} noStyle={true} initialValue={item.defaultValue || ""}>
										<DatePicker style={formItemStyle} showTime={true} format={"HH:mm:ss"}/>
									</Form.Item>
								}
								{
									item.type === "dateTime" &&
									<Form.Item name={item.key} noStyle={true} initialValue={item.defaultValue || ""}>
										<DatePicker style={formItemStyle} showTime={true} format={"YYYY-MM-DD HH:mm:ss"}/>
									</Form.Item>
								}
							</Form.Item>
						</Col>
					)
				}
			</Form>
		)
	}
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
	constructor(props) {
		super(props);
		this.state = {
			dataSource:[]
		}
	}
	componentDidMount() {
		const {options,defaultValue=""} = this.props;
		if(options instanceof Function){
			options().then(dataSource=>{
				this.setState({
					dataSource:[{label:"全部",value:defaultValue},...dataSource]
				});
			}).catch(e=>{console.log(e)})
		}else if(Array.isArray(options)){
			this.setState({
				dataSource:options
			});
		}
	}
	render(){
		const {value,onChange} = this.props;
		const {dataSource} = this.state;
		return(
			<Select style={formItemStyle} value={value} onChange={onChange}>
				{
					dataSource.map(item=>
						<Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
					)
				}
			</Select>
		)
	}
}
