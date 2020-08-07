import React from "react";
import {Modal, message, Tooltip} from "antd";
import ETable from "@components/e-table";
import StatusText from "@components/status-text";
import Thumbnail from "@components/thumbnail";
import moment from "moment";
import {getSubjectList,addSubject,updateSubject,deleteSubject,enableSubject,disableSubject} from "./request";
import ModalForm from "./modal/update";
import {DeleteOutlined, EditOutlined, LockOutlined, QuestionCircleOutlined, UnlockOutlined,CopyOutlined} from "@ant-design/icons";


const conditions = [
    {label:"专题名称",type:"input",key:"name"},
    {label:"专题状态",type:"select",key:"status",options:[
            {label:"全部",value:""},
            {label:"已上线",value:"ONLINE"},
            {label:"已下线",value:"OFFLINE"},
        ]
    }
];
const handleBtn = [
    {key:"create",name:"添加",type:"primary",relation:"none"},
];

export default class extends React.Component{
    render(){
        const {title} = this.props;
        return(
            <ETable
                title={title}
                conditions={conditions}
                handleBtn={handleBtn}
                handleCallback={this.handleCallback}
                scrollX={1200}
                tableColumn={[
                    {title:"名称",width:"150px",key:"name"},
                    {title:"封面图",width:"150px",key:"url",component:({data})=>
                        <Thumbnail src={JSON.parse(data.url || "[]")[0]}/>
                    },
                    {title:"状态",width:"100px",key:"status",component:({data})=>
                        <StatusText value={data.status} dataSource={[
                            {code:"ONLINE",color:"success",text:"已上线"},
                            {code:"OFFLINE",color:"warning",text:"已下线"}
                        ]}/>
                    },
                    {title:"描述",width:"200px",key:"description"},
                    {title:"创建人",width:"100px",key:"createBy"},
                    {title:"创建时间",width:"150px",key:"createTime",component:({data})=>moment(data.createTime).format("YYYY-MM-DD HH:mm:ss")},
                    {title:"更新人",width:"100px",key:"updateBy"},
                    {title:"更新时间",width:"150px",key:"updateTime",component:({data})=>moment(data.updateTime).format("YYYY-MM-DD HH:mm:ss")},
                    {title:"操作",fixed:"right",width:"100px",key:"handle",component:({data,getList})=>
                        <div>
                            <Tooltip title={"编辑"}>
                                <EditOutlined onClick={()=>this.editSubject(data,getList)} className={"table-icon"} />
                            </Tooltip>
                            <Tooltip title={"导入文章"}>
                                <CopyOutlined onClick={()=>this.importArticle(data,getList)} className={"table-icon"} />
                            </Tooltip>
                            <Tooltip title={"删除"}>
                                <DeleteOutlined onClick={()=>this.deleteSubject(data,getList)} className={"table-icon"}/>
                            </Tooltip>
                            {
                                data.status === "ONLINE" &&
                                <Tooltip title={"下线专题"}>
                                    <LockOutlined onClick={()=>this.disableSubject(data,getList)} className={"table-icon"}/>
                                </Tooltip>
                            }
                            {
                                data.status === "OFFLINE" &&
                                <Tooltip title={"上线专题"}>
                                    <UnlockOutlined onClick={()=>this.enableSubject(data,getList)} className={"table-icon"}/>
                                </Tooltip>
                            }
                        </div>
                    }
                ]}
                dataSource={getSubjectList}
            />
        )
    }
    handleCallback=(key,selectedRowKeys,selectedRows,callback)=>{
        switch (key) {
            case "create":
                this.create(callback);break;
            default:
                return;
        }
    };
    create=(callback)=>{
        const formRef = React.createRef();
        Modal.confirm({
            title:"新建专题",
            width:800,
            content:<ModalForm formRef={formRef}/>,
            onOk:(close)=>{
                const {validateFields} = formRef.current;
                validateFields().then(values=>{
                    addSubject(values).then(()=>{
                        message.success("操作成功！",1.5,()=>close());
                        callback();
                    }).catch(e=>message.error(e,2.5));
                }).catch(()=>{});
            }
        })
    };
    editSubject=(data,callback)=>{
        const formRef = React.createRef();
        Modal.confirm({
            title:"编辑专题",
            width:800,
            content:<ModalForm formRef={formRef} initialValues={data}/>,
            onOk:(close)=>{
                const {validateFields} = formRef.current;
                validateFields().then(values=>{
                    updateSubject({
                        ...values,
                        id:data.id
                    }).then(()=>{
                        message.success("操作成功！",1.5,()=>close());
                        callback();
                    }).catch(e=>message.error(e,2.5));
                }).catch(()=>{});
            }
        })
    }
    importArticle=(data,callback)=>{

    }
    deleteSubject=(data,callback)=>{
        if(data.status === "ONLINE"){
            message.warn("请先下线该专题！",2.5);
            return false;
        }
        Modal.confirm({
            title:"删除",
            icon:<QuestionCircleOutlined />,
            content:"确认执行删除操作？",
            onOk:(close)=>{
                deleteSubject({id:data.id}).then(()=>{
                    message.success("操作成功！",1.5);
                    close();
                    callback();
                }).catch(error=>{
                    message.error(error,2.5);
                })
            }
        })
    }
    enableSubject=({id},callback)=>{
        enableSubject({id}).then(()=>{
            message.success("操作成功！",1.5);
            callback();
        }).catch(error=>{
            message.error(error,2.5);
        })
    }
    disableSubject=({id},callback)=>{
        Modal.confirm({
            title:"下线专题",
            icon:<QuestionCircleOutlined />,
            content:"确认执行下线操作？",
            onOk:(close)=>{
                disableSubject({id}).then(()=>{
                    message.success("操作成功！",1.5);
                    close();
                    callback();
                }).catch(error=>{
                    message.error(error,2.5);
                })
            }
        })
    }
}