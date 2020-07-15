import React,{ Component } from 'react';
import {Table,Button,Form,Modal,Input,Select} from 'antd'
import $ from 'jquery'

import './../../styles/view/personnel.less'

const {confirm} = Modal

class roleList extends Component{
  constructor(props){
    super(props);
    let roleAll = window.localStorage.getItem('role')
    let columns = [
    {
        title:'管理员ID',
        dataIndex:'user_id',
        key:'user_id'
    },{
        title:'管理员姓名',
        dataIndex:'user_name',
        key:'user_name',
    },{
        title:'管理员电话',
        dataIndex:'user_phone',
        key:'user_phone',
        // render:(value,record) => {
        // return (<div>{value.replace(/(\d{3})\d*(\d{4})/,"$1****$2")}</div>)
        // }
    },{
        title:'管理员邮箱',
        dataIndex:'user_email',
        key:'user_email'
    }
    ]
    let columns2 = [
        {
            title:'管理员姓名',
            dataIndex:'user_name',
            key:'user_name',
        },{
            title:'管理员电话',
            dataIndex:'user_phone',
            key:'user_phone',
        },{
            title:'目前管理员角色',
            dataIndex:'role',
            key:'role',
            render:(value,record)=>{
                if(value == 0){
                  return '初级管理员'
                }else if(value == 1){
                  return '中级管理员'
                }else if (value == 2){
                  return '高级管理员'
                }else{
                  return ''
                }
            }
        }
    ]
    this.state={
        roleList:'',
        columns:columns,
        roleCont:'',
        role:'',
        roleAll:roleAll,
        columns2:columns2,
        manageList:[],
        selectedRowKeys:[],
        hasSelected:false,
        visible:false
    }
  }

  componentWillMount(){
    let role = this.props.location.search.split('?')[1].split('=')[1]
    let companyId = window.localStorage.getItem('companyId')
    if(role == 0){
        this.setState({
            role:0,
            roleCont:'初级管理员'
        })
    }else if(role == 1){
        this.setState({
            role:1,
            roleCont:'中级管理员'
        })
    }else if(role == 2){
        this.setState({
            role:2,
            roleCont:'高级管理员'
        })
    }
    $.ajax({
        url:'http://localhost:3200/roleList',
        type:'post',
        data:{'role':role,'companyId':companyId},
        success:(data)=>{
            if(data.status == 0){
                this.setState({
                    roleList:data.data.roleList
                })
            }
        }
    })
  }
  
addRoleList=()=>{
    const {role,roleAll} = this.state
    
    if(this.state.roleAll == 0){
        this.props.history.push('/viewhome/addUser')
    }
    else{
        let user_phone = window.localStorage.getItem('user_phone')
        let companyId = window.localStorage.getItem('companyId')
        $.ajax({
            url:'http://localhost:3200/addRoleInfo',
            type:'post',
            data:{'role':role,'roleAll':roleAll,'companyId':companyId,'user_phone':user_phone},
            success:(data)=>{
                
                if(data.status == 0){
                    this.setState({
                        manageList:data.data,
                        visible:true
                    })
                }
            }
        })
        
    }
}

onSelectChange=selectedRowKeys=>{
    this.setState({ selectedRowKeys, hasSelected:true});
    if(selectedRowKeys.length==0){
        this.setState({hasSelected:false});
    }
}
addRoleList2=()=>{
    const {role,selectedRowKeys} = this.state
    console.log(role,selectedRowKeys)
    let companyId = window.localStorage.getItem('companyId')
    $.ajax({
        url:'http://localhost:3200/changeRole',
        type:'post',
        data:{'userPhoneArr':JSON.stringify(selectedRowKeys),'companyId':companyId,'role':role},
        success:(data)=>{
            if(data.status == 0){
                Modal.success({
                    content: '添加成功'
                });
                Modal.destroyAll()
                window.location.reload()
            }
        }
    })
}

handleCancel=()=>{
    this.setState({
        visible: false,
    });
}

render(){
    const {roleCont,roleList,columns,role,roleAll,selectedRowKeys,columns2,hasSelected,manageList} = this.state
    const rowSelection = {
        selectedRowKeys,
        onChange: this.onSelectChange,
    };
    return (
        <div className="adduser">
            <div className="header">
                <Button type="link" href="#/viewhome/role">返回</Button>
                <h3>{roleCont}</h3>
            </div>
            <div className="tableListRole">
                {roleAll>=role?<Button type="primary" className="addRoleList" onClick={this.addRoleList}>添加成员</Button>:''}
                
                <Table
                    columns={columns}
                    dataSource={roleList}
                    pagination={false}
                    rowKey="user_id"
                />
            </div>
            <Modal title="添加管理员" visible={this.state.visible}  footer={false} onCancel={this.handleCancel}>
                <div style={{'marginBottom':'10px'}}>
                    <Button type="primary" onClick={this.addRoleList2} disabled={!hasSelected}>添加</Button>
                </div>
                <Table rowKey="user_phone" className="addTable" rowSelection={rowSelection} columns={columns2} dataSource={manageList} pagination={false}/>
            </Modal>
        </div>
    );
  }

}

export default roleList;
