import React from "react";
import {Radio,Row,Col,Button} from "antd";
import rndm from "rndm";
import EUpload from "../../../../components/e-upload";

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
                </Col>
                <Col span={24} style={{marginBottom:"10px"}}>
                    {
                        type === "singlePic" && <EUpload value={urls} onChange={this.onSuccess} listType={"picture-card"} size={1}/>
                    }
                    {
                        type === "multiplePic" && <EUpload value={urls} onChange={this.onSuccess} listType={"picture-card"} size={3}/>
                    }
                    {
                        type === "video" && <EUpload value={urls} accept={"video"} size={1}/>
                    }
                </Col>
            </Row>
        )
    }
    parsePropsValue=()=>{
        const {type,urls} = JSON.parse(this.props.value || `{"type":"multiplePic","urls":[]}`);
        return{
            type,
            urls:urls.map(item=>{
                return {
                    uid:"resource_"+rndm(10),
                    thumbUrl:item,
                    status:"done",
                    response:[{
                        name:item,
                        url:item
                    }]
                }
            })
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
            urls:urls.map(item=>{
                return item.response[0].url
            })
        }))
    }
}