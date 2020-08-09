import React from "react";
import {Form,Input,Row,Col,Button,message,Card} from "antd";
import style from "./index.module.css";
import WangEditor from "./wang-editor";
import {parseParams} from "@utility/common";
import {getArticleDetail} from "../published/request";
import {createArticle,updateArticle} from "./request";
import CoverModel from "./modal/cover-model";
import RelateSubject from "./modal/relate-subject";

const layout = {
	labelCol:{span:3},
	wrapperCol:{span:18}
};

export default class extends React.Component{
	constructor(props){
		super(props);
		const {handleType="create",articleId=""} = parseParams(props.location.search);
		this.state = {
			handleType:handleType,
			articleId:articleId,
			detailData:{}
		};
		this.formRef = React.createRef();
	}
	render(){
		const {handleType,articleId} = this.state;
		return(
			<Card title={handleType==="edit"?"编辑文章":"新建文章"}>
				<Form ref={this.formRef} {...layout} className={style.form}>
					<Form.Item
						label={"标题"}
						name={"title"}
						rules={[
							{required:true,message:"请输入标题！"}
						]}
					>
						<Input autoComplete={"off"} maxLength={30}/>
					</Form.Item>
					<Form.Item
						label={"内容"}
						name={"text"}
						rules={[
							{required:true,message:"请输入内容！"}
						]}
					>
						<WangEditor handleType={handleType}/>
					</Form.Item>
					<Form.Item
						label={"关联专题"}
						name={"topicIds"}
					>
						<RelateSubject articleId={articleId}/>
					</Form.Item>
					<Form.Item
						label={"封面模式"}
						name={"url"}
						rules={[
							{required:true,message:"必填！"},
							{
								validator(rule,value){
									if(!value){
										return Promise.reject();
									}
									try{
										const {type,urls} = JSON.parse(value);
										if(!urls.length){
											return Promise.reject("必填！");
										}else if(type === "multiplePic" && urls.length === 2){
											return Promise.reject("多图模式，需上传1或3张图片！");
										}
										return Promise.resolve();
									}catch (e) {
										return Promise.reject("数据异常！");
									}
								}
							}
						]}
					>
						<CoverModel/>
					</Form.Item>
					<Form.Item
						label={"来源"}
						wrapperCol={{span:6}}
						name={"source"}
						rules={[
							{required:false,message:""}
						]}
					>
						<Input autoComplete={"off"} maxLength={10}/>
					</Form.Item>
					<Form.Item
						label={"编辑"}
						wrapperCol={{span:6}}
						name={"editor"}
						rules={[
							{required:false,message:""}
						]}
					>
						<Input autoComplete={"off"} maxLength={10}/>
					</Form.Item>
					<Row className={style.btnWrapper}>
						<Col offset={3} span={18}>
							<Button size={"large"} type={"primary"} onClick={()=>this.submit({draft:false})}>保存并发布</Button>
							<Button size={"large"} type={"warning"} style={{marginLeft:"15px"}} onClick={()=>this.submit({draft:true})}>保存至草稿箱</Button>
						</Col>
					</Row>
				</Form>
			</Card>
		)
	}
	componentDidMount() {
		this.getDetailData();
	}
	getDetailData=()=>{ //获取详情信息
		const {handleType="",articleId=""} = this.state;
		const {setFieldsValue} = this.formRef.current;
		if(handleType !== "edit" || !articleId){
			return false;
		}
		getArticleDetail({id:articleId}).then(detailData=>{
			this.setState({
				detailData
			});
			setFieldsValue({
				title:detailData.title,
				text:detailData.text,
				url:detailData.url,
				source:detailData.source,
				editor:detailData.editor
			})

		}).catch(error=>{
			message.error(error,2.5);
		});
	};
	buildReqData=(values)=>{
		return values;
	};
	submit=(extraData={})=>{
		this.formRef.current.validateFields().then(values=>{
			const {articleId} = this.state;
			const reqData = this.buildReqData(values);
			const next = function(){
				const data = {
					...reqData,
					id:articleId,
					...extraData,
					type:"TEXT"
				};
				if(articleId){
					return updateArticle(data);
				}else{
					delete data.id;
					return createArticle(data);
				}
			};
			next().then(()=>{
				message.success("操作成功！",1.5,()=>{
					const route = !extraData.draft?"published":"drafts";
					localStorage.clear();
					this.props.history.push(route);
				});
			}).catch(error=>{
				message.error(error,2.5);
			});
		}).catch(error=>console.log(error));
	};
}
