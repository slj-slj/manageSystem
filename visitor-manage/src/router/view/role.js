import React,{ Component } from 'react';
import {Button,Table,Modal} from 'antd';
import $ from 'jquery';
import './../../styles/view/role.less';

const {confirm} = Modal

class ViewRole extends Component{
  constructor(props){
    super(props);
    let role = window.localStorage.getItem('role')
    let columns = [
      {
        title:'角色名称',
        dataIndex:'role_name',
        key:'role_name'
      },{
        title:'角色说明',
        dataIndex:'role_infor',
        key:'role_infor',
      },{
        title:'人数',
        dataIndex:'role_count',
        key:'role_count',
      },{
        title:'操作',
        dataIndex:'action',
        key:'action',
        render:(value,record) => {
          return (
              <div>
                <Button type='link' size='small' onClick={this.detailClick.bind(this,record.role_name)}>详情</Button>
                <Button type='link' size='small' onClick={this.manageRole.bind(this,record.role_name)}>{role>=record.role?'管理角色':'查看角色'}</Button>
              </div>
            )
        }
      }
    ]
    this.state={
      roleList:[],
      columns:columns,
    }
  }

  componentWillMount(){
    let roleList = [
      {
        'role_name':'初级管理员',
        'role_infor':'初级管理员只对所有管理员以、访客记录与黑名单有查看的权力',
        'role_count':0,
        'role':0,
      },
      {
        'role_name':'中级管理员',
        'role_infor':'中级管理员对管理员以及访客记录有查看和编辑的权力',
        'role_count':0,
        'role':1,
      },
      {
        'role_name':'高级管理员',
        'role_infor':'高级管理员对管理员、访客记录、黑名单有查看、编辑和删除的权力',
        'role_count':0,
        'role':2,
      }
    ]
    // this.setState({
    //   roleList:roleList
    // })
    let companyId = window.localStorage.getItem('companyId')
    let _this = this
    $.ajax({
      url:'http://localhost:3200/role',
      type:'post',
      data:{'companyId':companyId},
      success:function(data){
        if(data.status == 0){
          roleList[0].role_count = data.data.primaryCount;
          roleList[1].role_count = data.data.middleCount;
          roleList[2].role_count = data.data.seniorCount;
          _this.setState({
            roleList:roleList
          })
        }
      }
    })
  }
  
  detailClick=(values)=>{
    let contentText;
    if(values == '初级管理员'){
      contentText = '初级管理员对访客记录有查看和加入黑名单的权限，没有编辑、删除和将访客移除黑名单的权限。初级管理员有查看管理员信息和添加初级管理员的权力。'
    }else if(values == '中级管理员'){
      contentText = '中级管理员对访客记录有查看、编辑和加入黑名单的权限，没有删除和将访客移除黑名单的权限。中级管理员有查看管理员信息、编辑初中级管理员和添加初中级管理员的权力。'
    }else if(values == '高级管理员'){
      contentText = '中级管理员对访客记录有查看、编辑、删除和加入、移除黑名单的权限。中级管理员有查看管理员信息、编辑初中高级管理员和添加初中高级管理员的权力。'
    }
    confirm({
      title: '详情',
      content: contentText,
      cancelText:'取消',
      okText:'确定'
    });
  }

  manageRole=(values)=>{
    let role;
    if(values == '初级管理员'){
      role = 0
    }else if(values == '中级管理员'){
      role = 1
    }else if(values == '高级管理员'){
      role = 2  
    }
    this.props.history.push(`/viewhome/roleList?role=${role}`)
  }

  render(){
    const {columns,roleList} =this.state
    return (
      <div className="Viewrole">
        <div className="header">
          <h3>角色</h3>
        </div>
        <div className="roleList">
          <Table 
            columns={columns}
            dataSource={roleList}
            pagination={false}
          />
        </div>
      </div>
    );
  }

}

export default ViewRole;
