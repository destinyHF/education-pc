import React from "react";
import {Form,Button,Icon,Row,Col,message} from "antd";
import {uploadFile} from "../../../data/request";
import Thumbnail from "../../../components/thumbnail";
import rndm from "rndm";

const layout = {
	labelCol:{span:3},
	wrapperCol:{span:18}
};

export default Form.create()(class extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		const {getFieldDecorator} = this.props.form;
		const {data={}} = this.props;
		return(
			<Form {...layout}>
				<Form.Item label={"图片"}>
					{
						getFieldDecorator("src",{
							initialValue:data.src || "",
							rules:[
								{required:true,message:"请上传图片！"}
							]
						})(
							<UploadFile/>
						)
					}
				</Form.Item>
			</Form>
		)
	}
});

class UploadFile extends React.Component{
	static defaultProps={
		type:"image"
	};
	constructor(props){
		super(props);
		this.state = {
			fileName:"",
			fileSize:0
		};
		this.inputId = "input_"+rndm(10);
	}
	render(){
		const {fileName,fileSize,fileSrc} = this.parseValue();
		return(
			<div>
				<div>
					<Button type={"primary"} onClick={this.triggerClick}><Icon type={"upload"}/>上传</Button>
					<input style={{display:"none"}} type={"file"} id={this.inputId} accept={this.getAccept()} onChange={this.chooseFile}/>
				</div>
				<div>
					{
						fileSrc &&
						<>
							<Row>
								<Col span={12}>
									<Row type={"flex"}>
										<Col style={{width:"60px"}} className={"text-primary"}>文件名：</Col>
										<Col>{fileName}</Col>
									</Row>
								</Col>
								<Col span={12}>
									<Row type={"flex"}>
										<Col style={{width:"60px"}} className={"text-primary"}>大小：</Col>
										<Col>{(fileSize/1024/1024).toFixed(2)+"MB"}</Col>
									</Row>
								</Col>
							</Row>
							<Thumbnail src={fileSrc}/>
						</>

					}
				</div>
			</div>
		)
	}
	getAccept=()=>{
		const {type} = this.props;
		switch (type) {
			case "image":
				return "image/*";
			case "video":
				return "video/*";
			default:
				return "*"
		}
	};
	triggerClick=()=>{
		document.getElementById(this.inputId).click();
	};
	chooseFile=(e)=>{
		const {onChange,type:fileType} = this.props;
		const file = e.target.files[0];
		const {name:fileName,size:fileSize} = file;
		uploadFile({
			fileType,
			fileName,
			fileSize,
			file
		}).then(({data={}})=>{
			onChange(JSON.stringify({
				fileType,
				fileName,
				fileSize,
				fileSrc:data.src
			}));
		}).catch(error=>{
			message.error(error,2.5);
		});
	};
	parseValue=()=>{
		const {value} = this.props;
		if(value === ""){
			return {
				fileName:"",
				fileSize:0,
				fileSrc:""
			}
		}else{
			let fileName = "",fileSize = 0,fileSrc = "";
			try {
				const obj = JSON.parse(value);
				fileName = obj.fileName;
				fileSize = obj.fileSize;
				fileSrc = obj.fileSrc;
			}catch (e) {}
			return{
				fileName,
				fileSize,
				fileSrc
			}
		}
	}
}