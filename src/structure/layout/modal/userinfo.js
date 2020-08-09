import React from "react";
import {Form,Input} from "antd";

const layout = {
    labelCol:{span:4},
    wrapperCol:{span:18}
}
export default class extends React.Component{
    render(){
        const {formRef} = this.props;
        return(
            <Form initialValues={this.getUserInfo()} ref={formRef} {...layout} style={{marginTop:"20px"}}>
                <Form.Item label={"用户名"} name={"userName"}>
                    <Input readOnly={true} disabled={true} autoComplete={"off"}/>
                </Form.Item>
                <Form.Item label={"昵称"} name={"name"}>
                    <Input readOnly={true} disabled={true} autoComplete={"off"}/>
                </Form.Item>
                <Form.Item label={"邮箱"} name={"email"}>
                    <Input readOnly={true} disabled={true} autoComplete={"off"}/>
                </Form.Item>
            </Form>
        )
    }
    getUserInfo=()=>{
        let userInfo = {};
        try{
            userInfo = JSON.parse(sessionStorage.getItem("userInfo")) || {};
        }catch (e) {
            console.log(e);
        }
        return userInfo;
    }
}