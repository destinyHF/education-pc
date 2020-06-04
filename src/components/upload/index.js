import React from "react";
import {Button} from "antd";
import {CloudUploadOutlined} from "@ant-design/icons";
import rndm from "rndm";

export default class extends React.Component{
    static defaultProps = {
        resource:"image",//默认资源类型为图片
        visible:true,//默认可见
    }
    constructor(props) {
        super(props);
        this.btnId = `btn_${rndm(20)}`;
        this.inputId = `input_file_${rndm(20)}`;
    }
    componentDidMount() {

    }
    render(){
        const {visible} = this.props;
        return(
            <div style={{display:visible?"initial":"none"}}>
                <div>
                    <Button id={this.btnId} onClick={this.chooseFile} type={"primary"} icon={<CloudUploadOutlined/>}>文件上传</Button>
                    <input id={this.inputId} onChange={this.fileChange} type={"file"} style={{display:"none"}} />
                </div>
            </div>
        )
    }
    chooseFile=()=>{
        const input = document.querySelector(`#${this.inputId}`);
        input.value = "";
        input.click();
    }
    fileChange=(e)=>{
        const dom = e.target;
        const files = dom.files;
        console.log(files);
    }

}