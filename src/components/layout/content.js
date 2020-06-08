import React from "react";
import style from "./content.module.css";
import {Layout,Row,Avatar,Dropdown,Menu,Modal,message} from "antd";
import {MenuUnfoldOutlined,MenuFoldOutlined,UserOutlined,IdcardOutlined,LogoutOutlined,InfoCircleOutlined} from "@ant-design/icons";
import Routes from "../../routes";
import {logout} from "../../data/request";
import UserInfo from "./modal/userinfo";

export default class extends React.Component{
	constructor(props) {
		super(props);
		let userInfo = {};
		try {
			userInfo = JSON.parse(sessionStorage.getItem("userInfo")) || {};
		}catch (e) {
			console.log(e);
		}
		this.state = {
			userInfo
		}
	}
	render(){
		const {collapsed,toggle} = this.props;
		const {userName,name} = this.state.userInfo;
		return(
			<section className={style.wrapper}>
				<Layout.Header style={{background:'#fff',padding:0}}>
					<Row align={"middle"} justify={"space-between"}>
						{
							collapsed?
							<MenuUnfoldOutlined className={style.trigger} onClick={toggle}/>
							:
							<MenuFoldOutlined className={style.trigger} onClick={toggle}/>
						}
						<Row align={"middle"} className={style.avatarWrapper}>
							<Dropdown overlay={
								<Menu className={style.dropMenu}>
									<Menu.Item onClick={this.showUserInfo}><IdcardOutlined />个人信息</Menu.Item>
									<Menu.Divider/>
									<Menu.Item onClick={this.logout}><LogoutOutlined />退出</Menu.Item>
								</Menu>
							}>
								<div>
									<Avatar className={style.avatar} icon={<UserOutlined/>} />
									<span>{`${userName}`}</span>
									<span>{`（${name}）`}</span>
								</div>
							</Dropdown>
						</Row>
					</Row>

				</Layout.Header>
				<Layout.Content
					className={style.content}
					style={{
						margin: '24px 16px',
						background: '#fff',
						minHeight: 280,
					}}
				>
					<Routes/>
				</Layout.Content>
			</section>
		)
	}
	/*登出*/
	logout=()=>{
		Modal.confirm({
			icon:<InfoCircleOutlined />,
			title:"退出",
			content:<p className={"text-center"}>确认退出系统？</p>,
			onOk:(close)=>{
				logout().then(()=>{
					sessionStorage.clear();
					message.success("请重新登录！",1.5,()=>{
						close();
						window.location.reload();
					})
				}).catch(error=>{
					message.error(error,2.5);
				})
			}
		});
	}
	showUserInfo=()=>{
		const formRef = React.createRef();
		Modal.confirm({
			icon:<IdcardOutlined />,
			title:"个人信息",
			width:500,
			content:<UserInfo formRef={formRef}/>,
			okText:"保存",
			onOk:(close)=>{
				formRef.current.validateFields().then(values=>{
					// 执行ajax更新用户信息
					message.success("修改成功！",1.5,close);
				}).catch(error=>console.log(error));
			}
		})
	}
}