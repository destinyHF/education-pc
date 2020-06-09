import React from "react";
import {Form,Radio,Input,Row,Col,Button,message} from "antd";
import style from "./index.module.css";
// import UEditor from "./editor";
// import DraftEditor from "./draft-editor";
import WangEditor from "./wang-editor";
import {parseParams} from "../../../utility/common";
import {getArticleDetail,createArticle,updateArticle} from "../../../data/request";


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
		}
		this.formRef = React.createRef();
	}
	render(){
		const {detailData,handleType} = this.state;
		return(
			<Form ref={this.formRef} {...layout} className={style.form}>
				<Form.Item
					label={"类型"}
					name={"articleType"}
					rules={[
						{required:true,message:"必填！"}
					]}
				>
					<Radio.Group>
						<Radio value={"normal"}>普通文章</Radio>
						<Radio value={"video"}>视频文章</Radio>
					</Radio.Group>
				</Form.Item>
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
					name={"content"}
					rules={[
						{required:true,message:"请输入内容！"}
					]}
				>
					<WangEditor handleType={handleType}/>
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
						<Button size={"large"} type={"primary"} onClick={()=>this.submit("1")}>保存并发布</Button>
						<Button size={"large"} type={"warning"} style={{marginLeft:"15px"}} onClick={()=>this.submit("2")}>保存至草稿箱</Button>
					</Col>
				</Row>
			</Form>
		)
	}
	componentDidMount() {
		this.getDetailData();
	}
	getDetailData=()=>{ //获取详情信息
		const {handleType="",articleId=""} = this.state;;
		if(handleType !== "edit" || !articleId){
			return false;
		}
		getArticleDetail({id:articleId}).then(({data})=>{
			this.setState({
				detailData:data
			});
		}).catch(error=>{
			message.error(error,2.5);
		});
	};
	buildReqData=(values)=>{
		return values;
	};
	submit=(type)=>{
		this.formRef.current.validateFields().then(values=>{
			const {articleId} = this.state;
			const reqData = this.buildReqData(values);
			const next = function(articleId,type){
				const data = {...reqData,id:articleId,saveType:type};
				if(articleId){
					return updateArticle(data);
				}else{
					delete data.id;
					return createArticle(data);
				}
			};
			next(articleId,type).then(()=>{
				message.success("操作成功！",1.5,()=>{
					const route = type === "1"?"published":"drafts";
					localStorage.clear();
					this.props.history.push(route);
				});
			}).catch(error=>{
				message.error(error,2.5);
			});
		}).catch(error=>console.log(error));
	};
}
