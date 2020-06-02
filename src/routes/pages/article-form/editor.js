import React from "react";
// import UE from "UE";
import {Modal} from "antd";

export default class extends React.Component{
	constructor(props){
		super(props);
		this.domID = "id_ue_editor";
		this.instance = null;
	}
	render(){
		return(
			<div id={this.domID}/>
		)
	}
	componentDidMount() {
		// this.regInstance();
	}
	componentWillUnmount() {
		this.instance && this.instance.destroy();
	}
	// regInstance=()=>{
	// 	const {handleType} = this.props;
	// 	this.instance = UE.getEditor(this.domID,{
	// 		autoHeight: true,
	// 		autoHeightEnabled: true,
	// 		autoFloatEnabled: true,
	// 		initialFrameWidth:"100%",
	// 		initialFrameHeight:400,
	// 		autotypeset:{
	// 			mergeEmptyline: true, //合并空行
	// 			removeClass: true, //去掉冗余的class
	// 			removeEmptyline: true, //去掉空行
	// 			textAlign: "left", //段落的排版方式，可以是 left，right，center，justify 去掉这个属性表示不执行排版
	// 			imageBlockLine: 'center', //图片的浮动方式，独占一行剧中，左右浮动，默认: center，left，right，none 去掉这个属性表示不执行排版
	// 			pasteFilter: false, //根据规则过滤没事粘贴进来的内容
	// 			clearFontSize: false, //去掉所有的内嵌字号，使用编辑器默认的字号
	// 			clearFontFamily: true, //去掉所有的内嵌字体，使用编辑器默认的字体
	// 			removeEmptyNode: true, // 去掉空节点
	// 			//可以去掉的标签
	// 			removeTagNames: {},
	// 			indent: false, // 行首缩进
	// 			indentValue: '2em', //行首缩进的大小
	// 			bdc2sb: false,
	// 			tobdc: false
	// 		}
	// 	});
	// 	this.instance.ready(()=>{
	// 		if(handleType === "create"){
	// 			let drafts = "";
	// 			try {
	// 				drafts = Object.values(JSON.parse(localStorage.getItem("ueditor_preference")))[0];
	// 			}catch (e) {}
	// 			if(!!drafts){
	// 				Modal.confirm({
	// 					title:"提示",
	// 					content:"检测到本地存在草稿内容，是否选择回填？",
	// 					okText:"确认",
	// 					onOk:(close)=>{
	// 						this.instance.setContent(drafts);
	// 						close();
	// 					}
	// 				});
	// 			}
	// 		}else{
	// 			this.instance.setContent(this.props.value);
	// 		}
	// 		this.instance.addListener("contentChange",(()=>{
	// 			this.props.onChange(this.instance.getContent());
	// 		}));
	// 		// setTimeout(()=>{
	// 		// 	instance.execCommand('drafts');
	// 		// },500);
	// 	});
	// };
}
