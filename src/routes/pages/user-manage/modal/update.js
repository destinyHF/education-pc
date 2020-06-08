import React from "react";
import {Form,Input} from "antd";

const layout = {
    labelCol:{span:4},
    wrapperCol:{span:18}
}

export default class extends React.Component{
    render(){
        const {initialValues = {},formRef} = this.props;
        return(
            <Form ref={formRef} initialValues={initialValues} {...layout}>
                <Form.Item label={"昵称"} name={"name"} rules={[
                    {required:true,message:"必填！"}
                ]}>
                    <Input autoComplete={"off"} maxLength={10}/>
                </Form.Item>
                <Form.Item label={"用户名"} name={"userName"} rules={[
                    {required:true,message:"必填！"},
                    {min:5,message:"不少于5个字符！"},
                    {max:20,message:"不多于20个字符！"}
                ]}>
                    <Input autoComplete={"off"} maxLength={20}/>
                </Form.Item>
                <Form.Item label="密码" name="password" hasFeedback
                    rules={[
                        {required:true,message:"必填！"},
                        {min:8,message:"不少于8个字符！"},
                        {max:20,message:"不多于20个字符！"}
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item label="确认密码" name="confirm" dependencies={["password"]} hasFeedback
                    rules={[
                        {required:true,message:"必填！"},
                        {
                            validator:(rule,value)=>{
                                const {getFieldValue} = this.props.formRef.current;
                                if (!value || getFieldValue("password") === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject("密码输入不一致！");
                            }
                        }
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="邮箱"
                    name="email"
                    rules={[
                        {required:true,message: "必填！"},
                        {type:"email", message: "邮箱格式错误！"},
                    ]}
                >
                    <Input autoComplete={"off"} maxLength={30}/>
                </Form.Item>
            </Form>
        )
    }
}