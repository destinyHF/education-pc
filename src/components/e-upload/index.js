import React from "react";
import {Upload,Button,message,Modal} from "antd";
import {UploadOutlined } from "@ant-design/icons";
import {API,$http} from "../../data/api";
const token = "2qjcyL9Hy-A7a3uFWvZ862kbg22Nyth_cwY9bJk3:jrIZ0dUAdrPccXfVhTTsHhXpfp0=:eyJzY29wZSI6ImFzaGVuLWVkdSIsImRlYWRsaW5lIjoxNTk3MzA1NTg3fQ==";


export default class extends React.Component{
    static defaultProps = {
        action:API.resource.qiniuDomain,
        listType:"text",
        accept:"image",
        onSuccess:(e)=>{console.log("??",e)},
        onError:()=>{},
        size:1
    }
    constructor(props) {
        super(props);
        this.state = {
            fileList:props.value
        }
    }
    render(){
        const {action,listType,size} = this.props;
        const {fileList} = this.state;
        return (
            <Upload
                action={action}
                listType={listType}
                method={"post"}
                directory={false}
                beforeUpload={this.beforeUpload}
                customRequest={customRequest}
                onChange={this.onChange}
                onPreview={this.onPreview}
                accept={this.getAccept()}
                fileList={fileList}
                data={{token:token}}
                disabled={fileList.length>=size}
            >
                <Button size={"small"} disabled={fileList.length>=size}>
                    <UploadOutlined/>本地上传
                </Button>
            </Upload>
        )
    }
    getAccept=()=>{
        const {accept} = this.props;
        switch (accept) {
            case "image":
                return "image/*";
            case "video":
                return "video/*";
            default:
                return "";
        }
    }
    beforeUpload=(file)=>{
        const {accept} = this.props;
        if(file.type.substring(0,5) !== accept){
            message.warn(`请上传${accept}文件！`);
            return Promise.reject();
        }
        if(accept === "image" && accept.size>1024*1024*10){
            message.warn(`图片文件不可超过10Mb！`);
            return Promise.reject();
        }
        if(accept === "video" && accept.size>1024*1024*500){
            message.warn(`视频文件不可超过500Mb！`);
            return Promise.reject();
        }
        return Promise.resolve();
    }
    onChange=({file,fileList})=>{
        this.setState({fileList})
        if(file.status === "error"){
            message.error(file.error,2.5);
            this.props.onError();
            this.props.onChange(fileList)
        }
        if(file.status === "done"){
            this.props.onChange(fileList)
        }
    }
    onPreview=(file)=>{
        if(file.type.substring(0,5) === "image"){
            Modal.info({
                title:"预览",
                width:600,
                content:<div><img src={file.response[0].url} style={{width:"100%"}}/></div>,
                okText:"关闭"
            })
        }
    }
}
const customRequest = function({
   action,
   data,
   file,
   onError,
   onProgress,
   onSuccess,
}) {
    const formData = new FormData();
    formData.append("file",file);
    if (data) {
        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });
    }
    $http({
        url:action,
        method:"post",
        data:formData,
        onUploadProgress: ({ total, loaded }) => {
            onProgress({ percent: Math.round(loaded / total * 100).toFixed(2) }, file);
        },
    }).then(onSuccess).catch(onError);
}
const getImageInfo = function(file){
    return new Promise((resolve, reject)=>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = ()=>{
            const image = new Image();
            image.src = reader.result;
            image.onload = ()=>{
                resolve({
                    width:image.width,
                    height:image.height
                });
            }
        }
    });
}