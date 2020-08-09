import React from "react";
import {Radio,Row,Col} from "antd";
import {QuestionCircleOutlined} from "@ant-design/icons";
import EUpload from "@components/e-upload";

export default class extends React.Component{
    render(){
        const {type,urls} = this.parsePropsValue();
        return(
            <Row style={{marginTop:"4px"}}>
                <Col span={24} style={{marginBottom:"15px"}}>
                    <Radio.Group value={type} onChange={this.onTypeChange}>
                        <Radio value={"singlePic"}>单大图</Radio>
                        <Radio value={"multiplePic"}>多图</Radio>
                        <Radio value={"video"}>视频</Radio>
                    </Radio.Group>
                    <span style={{fontSize:"13px"}} className={"text-primary"}>
                        <QuestionCircleOutlined /> 封面模式只会影响移动端新闻列表的展示方式；视频建议上传mp4格式，以避免浏览器无法播放
                    </span>


                </Col>
                <Col span={24} style={{marginBottom:"10px"}}>
                    {
                        type === "singlePic" && <EUpload value={urls} onChange={this.onSuccess} listType={"picture-card"} size={1}/>
                    }
                    {
                        type === "multiplePic" && <EUpload value={urls} onChange={this.onSuccess} listType={"picture-card"} size={3}/>
                    }
                    {
                        type === "video" && <EUpload value={urls} onChange={this.onSuccess} accept={"video"} size={1}/>
                    }
                </Col>
            </Row>
        )
    }
    parsePropsValue=()=>{
        const {type,urls=[]} = JSON.parse(this.props.value || `{"type":"","urls":[]}`);
        return{
            type,
            urls:JSON.stringify(urls)
        }
    }
    onTypeChange=(e)=>{
        this.props.onChange(JSON.stringify({
            type:e.target.value,
            urls:[]
        }));
    }
    onSuccess=(urls)=>{
        const {type} = this.parsePropsValue();
        this.props.onChange(JSON.stringify({
            type,
            urls:JSON.parse(urls)
        }))
    }
}