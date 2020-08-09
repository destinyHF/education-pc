import React from "react";
import WEditor from "wangeditor";
import {PictureOutlined} from "@ant-design/icons";
import {Button,message} from "antd";
import style from "./wang-editor.module.css";
import uploadRequest from "@components/e-upload/request";
import rndm from "rndm";

export default class extends React.Component{
    constructor(props) {
        super(props);
        this.toolbarId = "wangEditorToolbar";
        this.containerId = "wangEditorContent";
        this.instance = null;
    }
    render(){
        return(
            <div>
                <div id={this.toolbarId} className={style["wang-editor-toolbar"]}></div>
                <SelfToolbar run={this.runCMD}/>
                <div id={this.containerId} className={style["wang-editor-content"]}></div>
            </div>
        )
    }
    componentDidMount() {
        this.initial();
    }
    shouldComponentUpdate(nextProps) {
        return this.props.value !== nextProps.value;
    }
    componentDidUpdate(){
        console.log("update");
        this.instance.txt.html(this.props.value);
    }
    initial=()=>{
        const {onChange} = this.props;
        this.instance = new WEditor(`#${this.toolbarId}`,`#${this.containerId}`);
        this.instance.customConfig.menus = [
            'head',  // 标题
            'bold',  // 粗体
            'fontSize',  // 字号
            'fontName',  // 字体
            'italic',  // 斜体
            'underline',  // 下划线
            'strikeThrough',  // 删除线
            'foreColor',  // 文字颜色
            'backColor',  // 背景颜色
            'link',  // 插入链接
            'list',  // 列表
            'justify',  // 对齐方式
            'quote',  // 引用
            'emoticon',  // 表情
            'image',  // 插入图片
            'table',  // 表格
            'video',  // 插入视频
            'undo',  // 撤销
            'redo'  // 重复
        ];
        this.instance.customConfig.onchange = function (html) {
            onChange(html)
        };
        this.instance.customConfig.zIndex = 100;
        this.instance.create();
    }
    runCMD=(name,value)=>{
        this.instance.cmd.do(name, value)
    }
}

class SelfToolbar extends React.Component{
    constructor(props) {
        super(props);
        this.imageInputId = "image_"+rndm(10);
        this.videoInputId = "image_"+rndm(10);
    }
    render(){
        return(
            <div>
                <Button onClick={()=>this.uploadImageFile()} className={style.selfBtn} size={"small"} icon={<PictureOutlined />}>本地图片</Button>
                <input style={{display:"none"}} id={this.imageInputId} type={"file"} accept={"image/*"}/>

                <Button onClick={()=>this.uploadVideoFile()} className={style.selfBtn} size={"small"} icon={<PictureOutlined />}>本地视频</Button>
                <input style={{display:"none"}} id={this.videoInputId} type={"file"} accept={"video/*"}/>

            </div>
        )
    }
    uploadImageFile=()=>{
        const {run} = this.props;
        const inputDOM = document.getElementById(this.imageInputId);
        inputDOM.click();
        inputDOM.onchange=()=>{
            const file = inputDOM.files[0];
            if(file.type.substring(0,5) !== "image"){
                message.warn("请选择图片文件！",2.5);
                return false;
            }
            uploadRequest({
                file,
                onSuccess:({url})=>{
                    console.log(url);
                    run('insertHTML', `<img src=${url} />`)
                },
                onError:(error)=>{
                    message.error(error,2.5);
                }
            })
        }
    }
    uploadVideoFile=()=>{
        const {run} = this.props;
        const inputDOM = document.getElementById(this.videoInputId);
        inputDOM.click();
        inputDOM.onchange=()=>{
            const file = inputDOM.files[0];
            if(file.type.substring(0,5) !== "video"){
                message.warn("请选择视频文件（建议mp4格式）！",2.5);
                return false;
            }
            if(file.size>1024*1024*100){
                message.warn(`视频文件不可超过100Mb！`,2.5);
                return false;
            }
            uploadRequest({
                file,
                onSuccess:({url})=>{
                    console.log(url);
                    run('insertHTML', `<video controls autoplay><source src="${url}" type="${file.type}"/></video>`)
                },
                onError:(error)=>{
                    message.error(error,2.5);
                }
            })
        }
    }
}