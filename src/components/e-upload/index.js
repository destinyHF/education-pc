import React from "react";
import {Upload,Button,message,Modal} from "antd";
import {UploadOutlined } from "@ant-design/icons";
import {API,$http} from "@data/api";
import {qiniuToken,qiniuUploadHost,resourceHost} from "../../config";
import rndm from "rndm";

export default class extends React.Component{
    static defaultProps = {
        action:qiniuUploadHost,
        // action:API.resource.upload,
        listType:"text",
        accept:"image",
        onSuccess:()=>{},
        onError:()=>{},
        size:1
    }
    constructor(props) {
        super(props);
        this.state = {
            fileList:this.paresPropsValue()
        }
    }
    render(){
        const {action,listType} = this.props;
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
                onRemove={this.onRemove}
                accept={this.getAccept()}
                fileList={fileList}
                data={{token:qiniuToken}}
            >
                <Button size={"small"}>
                    <UploadOutlined/>本地上传
                </Button>
            </Upload>
        )
    }
    paresPropsValue=()=>{
        const value = this.props.value || "[]";
        return JSON.parse(value).map(item=>{
            return {
                uid:"resource_"+rndm(10),
                thumbUrl:item,
                status:"done",
                url:item,
                name:item,
                response:{
                    name:item,
                    url:item
                }
            }
        })
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
        const {accept,size} = this.props;
        const {fileList} = this.state;
        if(fileList.length>=size){
            message.warn(`超过个数限制！`,2.5);
            return Promise.reject();
        }
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
            const newFileList = fileList.filter(item=>item.status==="done")
            this.props.onError();
            this.props.onChange(JSON.stringify(newFileList.map(item=>item.response.url)))
            this.setState({
                fileList:newFileList
            });
        }
        if(file.status === "done"){
            const newFileList = fileList.filter(item=>item.status==="done")
            this.props.onChange(JSON.stringify(newFileList.map(item=>item.response.url)))
            this.setState({
                fileList:newFileList
            });
        }
    }
    onPreview=(file)=>{
        window.open(file.response.url);
        // if(file.type.substring(0,5) === "image"){
        //     Modal.info({
        //         title:"预览",
        //         width:600,
        //         content:<div><img src={file.response.url} style={{width:"100%"}}/></div>,
        //         okText:"关闭"
        //     })
        // }
    }
    onRemove=(file)=>{
        const {fileList} = this.state;
        const newFileList = fileList.filter(item=>item.uid !== file.uid);
        this.setState({fileList:newFileList});
        this.props.onChange(JSON.stringify(newFileList));
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
        timeout:1000*60*5,
        onUploadProgress: ({ total, loaded }) => {
            onProgress({ percent: Math.round(loaded / total * 100).toFixed(2) }, file);
        },
    }).then(([res])=>{
        const url = res.url.indexOf("http://") === 0 ? res.url : resourceHost+res.url;
        return onSuccess({
            ...res,
            url
        })
    }).catch(onError);
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