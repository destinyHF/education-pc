/*
* 用户管理模块
* */
import React from "react";
import {Tooltip,message,Modal} from "antd";
import {EditOutlined,DeleteOutlined} from "@ant-design/icons";
import ETable from "../../../components/e-table";
import {getUserList} from "./request";
import moment from "moment";
import StatusText from "../../../components/status-text";
import UpdateForm from "./modal/update";

const conditions = [
    {label:"用户名",type:"input",key:"userName"},
    {label:"昵称",type:"input",key:"name"},
];
const handleBtn = [
    {key:"create",name:"添加",type:"primary",relation:"none"}
];

export default class extends React.Component{
    render(){
        return(
            <ETable
                conditions={conditions}
                handleBtn={handleBtn}
                handleCallback={this.handleCallback}
                tableColumn={[
                    {title:"用户名",key:"userName"},
                    {title:"昵称",key:"name"},
                    {title:"邮箱",key:"email",width:"200px"},
                    {title:"创建时间",width:"200px",key:"createTime",component:({data})=>moment(data.createTime).format("YYYY-MM-DD HH:mm:ss")},
                    {title:"状态",key:"status",component:({data})=>
                        <StatusText value={data.status} dataSource={[
                            {code:true,color:"success",text:"已启用"},
                            {code:false,color:"danger",text:"已禁用"}
                        ]}/>
                    },
                    {title:"操作",width:"100px",key:"handle",component:({data,getList})=>
                        <div>
                            <Tooltip title={"编辑"}>
                                <EditOutlined onClick={()=>this.editUser(data,getList)} className={"table-icon"} />
                            </Tooltip>
                            <Tooltip title={"删除"}>
                                <DeleteOutlined onClick={()=>this.deleteUser(data,getList)} className={"table-icon"}/>
                            </Tooltip>
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
                this.createUser();break;
            default:
                return;
        }
    };
    createUser=()=>{
        const formRef = React.createRef();
        Modal.confirm({
            title:"添加用户",
            width:600,
            content:<UpdateForm formRef={formRef}/>,
            onOk:(close)=>{

            }
        })
    };
    editUser=(target,callback)=>{
        console.log("编辑",target,callback);
    };
    deleteUser=(target,callback)=>{
        console.log("删除",target,callback);
    };
}
