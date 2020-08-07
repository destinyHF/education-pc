import React from "react";
import {Form,Input} from "antd";
import EUpload from "@components/e-upload";

const layout = {
    labelCol:{span:4},
    wrapperCol:{span:18}
}

export default class extends React.Component{
    render(){
        const {
            initialValues = {
                name:"",
                url:"",
                description:""
            },
            formRef
        } = this.props;
        return(
            <Form ref={formRef} initialValues={initialValues} {...layout}>
                <Form.Item
                    label={"名称"}
                    name={"name"}
                    rules={[
                        {required:true,message:"必填！"}
                    ]}
                >
                    <Input autoComplete={"off"} maxLength={30} placeholder={"请输入专题名称，30个字符以内"}/>
                </Form.Item>
                <Form.Item
                    label={"封面图"}
                    name={"url"}
                    rules={[
                        {required:true,message:"必填！"}
                    ]}
                >
                    <EUpload listType={"picture-card"} size={1} accept={"image"}/>
                </Form.Item>
                <Form.Item
                    label={"描述"}
                    name={"description"}
                    rules={[
                        {required:false,message:""}
                    ]}
                >
                    <Input.TextArea autoComplete={"off"} maxLength={200} style={{resize:"none"}} rows={4} placeholder={"请输入专题描述，200个字符以内"}/>
                </Form.Item>
            </Form>
        )
    }
}