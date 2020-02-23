import React from "react";
import {Row,Col,Form,Input,Icon,Checkbox,Button,message} from "antd";
import style from "./index.module.css";
import {login} from "../../data/request";

export default class extends React.Component{
	render(){
		return(
			<Row className={style.container}>
				<Col className={style.formWrapper}>
					<div className={style.title}>内容管理系统</div>
					<SubmitForm/>
				</Col>
			</Row>
		)
	}
}

class SubmitForm extends React.Component{
	render(){
		const {getFieldDecorator} = this.props.form;
		return(
			<Form onSubmit={this.handleSubmit}>
				<Form.Item label={"用户名"}>
					{
						getFieldDecorator("username",{
							rules:[
								{required:"true",message:"请输入用户名！"}
							]
						})(
							<Input
								autoComplete={"off"}
								maxLength={30}
								prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
							/>
						)
					}
				</Form.Item>
				<Form.Item label={"密码"}>
					{
						getFieldDecorator("password",{
							rules:[
								{required:"true",message:"请输入密码！"}
							]
						})(
							<Input
								type={"password"}
								autoComplete={"off"}
								maxLength={30}
								prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
							/>
						)
					}
				</Form.Item>
				<Form.Item>
					{
						getFieldDecorator("remember",{
							valuePropName: "checked",
							initialValue:true
						})(
							<Checkbox>自动登录</Checkbox>
						)
					}
				</Form.Item>
				<Row>
					<Button type="primary" htmlType="submit" className={style.loginBtn}>登录</Button>
				</Row>

			</Form>
		)
	}
	handleSubmit=(e)=>{
		e.preventDefault();
		this.props.form.validateFields((error,values)=>{
			if(!error){
				login(values).then(response=>{
					message.success("登录成功！",1.5,()=>{
						window.location.reload();
					});
				}).catch(error=>{
					message.error("用户名或密码错误！",2.5);
				})
			}
		});
	};
}
SubmitForm = Form.create()(SubmitForm);