import React from "react";
import {Row,Col,Form,Input,Checkbox,Button,message} from "antd";
import {UserOutlined,LockOutlined} from "@ant-design/icons";
import style from "./index.module.css";
import {login} from "../../data/request";

export default class extends React.Component{
	render(){
		return(
			<div className={style.container}>
				<Col className={style.formWrapper}>
					<div className={style.title}>内容管理系统</div>
					<SubmitForm callback={this.props.callback}/>
				</Col>
			</div>
		)
	}
}

const layout = {
	labelCol:{span:4},
	wrapperCol:{span:18},
};
const tailLayout = {
	wrapperCol:{offset:4,span:18},
};
class SubmitForm extends React.Component{
	render(){
		return(
			<Form {...layout} onFinish={this.onFinish}>
				<Form.Item
					label={"用户名"}
					name={"userName"}
					rules={[
						{required:"true",message:"请输入用户名！"}
					]}
				>
					<Input
						autoComplete={"off"}
						maxLength={30}
						prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}
					/>
				</Form.Item>
				<Form.Item
					label={"密码"}
					name={"password"}
					rules={[
						{required:"true",message:"请输入密码！"}
					]}
				>
					<Input
						type={"password"}
						autoComplete={"off"}
						maxLength={30}
						prefix={<LockOutlined  style={{color: 'rgba(0,0,0,.25)'}}/>}
					/>
				</Form.Item>
				{/*<Form.Item name={"remember"} {...tailLayout} initialValue={true} valuePropName="checked">*/}
				{/*	<Checkbox>自动登录</Checkbox>*/}
				{/*</Form.Item>*/}
				<Row>
					<Button type="primary" htmlType="submit" className={style.loginBtn}>登录</Button>
				</Row>
			</Form>
		)
	}
	onFinish=(values)=>{
		login(values).then(response=>{
			message.success("登录成功！",1.5,()=>{
				sessionStorage.setItem("token",response.token);
				sessionStorage.setItem("userInfo",JSON.stringify(response));
				this.props.callback(false);
			});
		}).catch(error=>{
			message.error(error,2.5);
		})
	}
}
