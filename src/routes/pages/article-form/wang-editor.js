import React from "react";
import WEditor from "wangeditor";
import {PictureOutlined} from "@ant-design/icons";
import {Button} from "antd";
import style from "./wang-editor.module.css";
import Upload from "@components/upload";

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
                <SelfToolbar/>
                <div id={this.containerId} className={style["wang-editor-content"]}></div>
            </div>
        )
    }
    componentDidMount() {
        this.initial();
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
        }
        this.instance.create();
    }
    click=()=>{
        this.instance.cmd.do('insertHTML', '<p>xxx</p>')
    }
}

class SelfToolbar extends React.Component{
    constructor(props) {
        super(props);
        this.imageInstance = React.createRef();
        this.videoInstance = React.createRef();
    }
    render(){
        return(
            <div>
                <Button onClick={()=>this.uploadFile(this.imageInstance)} className={style.selfBtn} size={"small"} icon={<PictureOutlined />}>本地图片</Button>
                <Upload ref={this.imageInstance} callback={this.imageCallback} visible={false} accept={"image/*"}/>
                <Button onClick={()=>this.chooseMaterial("image")} className={style.selfBtn} size={"small"} icon={<PictureOutlined />}>图片库</Button>

                <Button onClick={()=>this.uploadFile(this.videoInstance)} className={style.selfBtn} size={"small"} icon={<PictureOutlined />}>本地视频</Button>
                <Upload ref={this.videoInstance} callback={this.videoCallback} visible={false} accept={"video/*"}/>
                <Button onClick={()=>this.chooseMaterial("video")} className={style.selfBtn} size={"small"} icon={<PictureOutlined />}>视频库</Button>

            </div>
        )
    }
    uploadFile=(instance)=>{
        instance.current.chooseFile();
    };
    imageCallback=(files)=>{
        console.log(files);
    };
    videoCallback=(files)=>{
        console.log(files);
    };
    chooseMaterial=(type)=>{

    };
}