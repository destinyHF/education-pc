/*
* 该组件用于渲染列表的状态文本
* */
import React from "react";
import {Tag} from "antd";

const colorMap = {
    danger:"#ff4d4f",
    success:"#52c41a",
    warning:"#faad14",
    info:"#1890ff"
}
export default class extends React.Component{
    static defaultProps = {
        dataSource:[],
        value:""
    }
    render(){
        const {text,color} = this.getTarget();
        return(
            <Tag color={colorMap[color] || color}>{text}</Tag>
        )
    }
    getTarget=()=>{
        const {dataSource,value} = this.props;
        return dataSource.find(item=>{
            return item.code === value;
        }) || {text:value,color:"rgba(0, 0, 0, 0.65)"}
    }
}