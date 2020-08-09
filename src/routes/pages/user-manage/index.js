/*
* 用户管理模块
* */
import React from "react";
import {Tooltip,message,Modal} from "antd";
import {EditOutlined,DeleteOutlined,LockOutlined,ExclamationCircleOutlined,UnlockOutlined} from "@ant-design/icons";
import ETable from "@components/e-table";
import {getUserList,createUser,switchUserStatus,updateUser,deleteUser} from "./request";
import moment from "moment";
import StatusText from "@components/status-text";
import UpdateForm from "./modal/update";

const conditions = [
    {label:"用户名",type:"input",key:"userName"},
    {label:"昵称",type:"input",key:"name"},
    {label:"状态",type:"select",key:"state",options:[
            {label:"全部",value:""},
            {label:"已启用",value:true},
            {label:"已禁用",value:false},
        ]
    },
];
const handleBtn = [
    {key:"create",name:"添加",type:"primary",relation:"none"}
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
                tableColumn={[
                    {title:"昵称",key:"name"},
                    {title:"用户名",key:"userName"},
                    {title:"状态",key:"status",component:({data})=>
                      <StatusText value={data.state} dataSource={[
                          {code:true,color:"success",text:"已启用"},
                          {code:false,color:"danger",text:"已禁用"}
                      ]}/>
                    },
                    {title:"角色",key:"role",component:({data})=><span>{data.roles[0] && data.roles[0].description}</span>},
                    {title:"邮箱",key:"email",width:"200px"},
                    {title:"创建时间",width:"200px",key:"createTime",component:({data})=>moment(data.createTime).format("YYYY-MM-DD HH:mm:ss")},
                    {title:"操作",width:"100px",key:"handle",component:({data,getList})=>
                        <div>
                            <Tooltip title={"编辑"}>
                                <EditOutlined onClick={()=>this.editUser(data,getList)} className={"table-icon"} />
                            </Tooltip>
                            <Tooltip title={"删除"}>
                                <DeleteOutlined onClick={()=>this.deleteUser(data,getList)} className={"table-icon"}/>
                            </Tooltip>
                            {
                                data.state === true &&
                                <Tooltip title={"禁用"}>
                                    <LockOutlined onClick={()=>this.switchStatus(data.userId,!data.state,getList)} className={"table-icon"}/>
                                </Tooltip>
                            }
                            {
                                data.state === false &&
                                <Tooltip title={"启用"}>
                                    <UnlockOutlined onClick={()=>this.switchStatus(data.userId,!data.state,getList)} className={"table-icon"}/>
                                </Tooltip>
                            }
                        </div>
                    }
                ]}
                dataSource={getUserList}
                rowKey={"userId"}
            />
        )
    }
    handleCallback=(key,selectedRowKeys,selectedRows,callback)=>{
        switch (key) {
            case "create":
                this.createUser(callback);break;
            default:
                return;
        }
    };
    createUser=(callback)=>{
        const formRef = React.createRef();
        Modal.confirm({
            title:"添加用户",
            width:600,
            content:<UpdateForm formRef={formRef}/>,
            onOk:(close)=>{
                formRef.current.validateFields().then(values=>{
                    const reqData = {...values};
                    delete reqData.confirm;
                    reqData.roleIds = [reqData.roleIds];
                    createUser(reqData).then(()=>{
                        message.success("操作成功！",1.5);
                        close();
                        callback();
                    }).catch(error=>{
                        message.error(error,2.5);
                    })
                }).catch(e=>console.log(e))
            }
        })
    };
    editUser=(target,callback)=>{
        const formRef = React.createRef();
        const initialValues = {
            ...target,
            roleIds:target.roles[0].roleId
        };
        delete initialValues.password;
        Modal.confirm({
            title:"编辑用户",
            width:600,
            content:<UpdateForm formRef={formRef} initialValues={initialValues}/>,
            onOk:(close)=>{
                formRef.current.validateFields().then(values=>{
                    const reqData = {...values,userId:target.userId};
                    delete reqData.confirm;
                    reqData.roleIds = [reqData.roleIds];
                    updateUser(reqData).then(()=>{
                        message.success("操作成功！",1.5);
                        close();
                        callback();
                    }).catch(error=>{
                        message.error(error,2.5);
                    })
                }).catch(e=>console.log(e))
            }
        })
    };
    deleteUser=({userId},callback)=>{
        Modal.confirm({
            title:"删除",
            icon:<DeleteOutlined />,
            content:"确认执行删除操作？",
            onOk:(close)=>{
                deleteUser({userId}).then(()=>{
                    message.success("操作成功！",1.5);
                    close();
                    callback();
                }).catch(error=>{
                    message.error(error,2.5);
                })
            }
        })
    };
    switchStatus=(userId,state,callback)=>{
        const txt = state?"启用":"禁用";
        Modal.confirm({
            title:txt,
            icon:<ExclamationCircleOutlined />,
            content:`确认执行${txt}操作？`,
            onOk:(close)=>{
                switchUserStatus({userId,state}).then(()=>{
                    message.success("操作成功！",1.5);
                    callback();
                    close();
                }).catch(error=>{
                    message.error(error,2.5);
                })
            }
        })
    }
}
