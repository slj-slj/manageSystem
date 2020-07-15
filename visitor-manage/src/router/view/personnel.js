import React,{ Component } from 'react';
import {Table,Button,Form,Modal,Input,Select} from 'antd'
import $ from 'jquery'

import './../../styles/view/personnel.less'


const { confirm } = Modal;
const { Option } = Select;

class ViewPersonnel extends Component{
  formRef = React.createRef();
  constructor(props){
    super(props);
    let role = window.localStorage.getItem('role')
    let user_phone = window.localStorage.getItem('user_phone')
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
        //   return (<div>{value.replace(/(\d{3})\d*(\d{4})/,"$1****$2")}</div>)
        // }
      },{
        title:'管理员邮箱',
        dataIndex:'user_email',
        key:'user_email'
      },{
        title:'管理员角色',
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
      },{
        title:'操作',
        dataIndex:'action',
        key:'action',
        render:(value,record) => {
          return (
              <div>
                <Button type='link' size='small' disabled={role==0?true:false} onClick={this.updateClick.bind(this,record)}>编辑</Button>
                <Button type='link' size='small' disabled={role==2&&record.user_phone!=user_phone?false:true} onClick={this.deleteUser.bind(this,record)}>删除</Button>
              </div>
            )
        }
      }
    ]
    this.state={
      current:1,
      total:0,
      userList:'',
      columns:columns,
      role:role
    }
  }

  componentWillMount(){
    let _this=this
    let companyId = window.localStorage.getItem('companyId')
    $.ajax({
      url:'http://localhost:3200/personnel',
      type:'post',
      data:{'companyId':companyId},
      success:function(data){
        if(data.status == 0){
          _this.setState({
            userList:data.data.list,
            total:data.data.total
          })
        }
        
      }
    })
  }

  updateClick=(values)=>{ 
    const {role} = this.state
    let companyId=window.localStorage.getItem('companyId')
    let user_phone = window.localStorage.getItem('user_phone')
    let user_id = values.user_id
    confirm({
      title: '编辑访客信息',
      content: (
        <Form ref={this.formRef}>
          <Form.Item label="管理员ID">
            <Input disabled='false' defaultValue={values.user_id}/>
          </Form.Item>
          <Form.Item label="管理员姓名" name="user_name">
            <Input disabled='false' defaultValue={values.user_name}/>
          </Form.Item>
          <Form.Item label="管理员电话" name="user_phone">
            <Input defaultValue={values.user_phone}/>
          </Form.Item>
          <Form.Item label="管理员邮箱" name="user_email">
            <Input defaultValue={values.user_email}/>
          </Form.Item>
          <Form.Item label="角色" name="role">
            <Select defaultValue={`${values.role}`} style={{ width: 180 }} disabled={role<values.role||user_phone==values.user_phone?true:false}>
              <Option value="0">初级管理员</Option>
              <Option value="1" disabled={role==1||role==2?false:true}>中级管理员</Option>
              <Option value="2" disabled={role==1||role==0?true:false}>高级管理员</Option>
            </Select>
          </Form.Item>
        </Form>
      ),
      cancelText:'取消',
      okText:'确定',
      onOk:()=>{
        let formInps = this.formRef.current.getFieldsValue()
        let newdata = {}
        let data = {
          'companyId':companyId,
          'user_id':user_id
        }
        Object.assign(newdata,data,formInps)
        $.ajax({
          url:'http://localhost:3200/updateUser',
          type: 'post',
          data:newdata,
          success: function (data) {
            if(data.status == 0){
              window.location.reload()
            }
          }
        })
      }
    });
  }

  deleteUser=(values)=>{
    let companyId=window.localStorage.getItem('companyId')
    let user_id = values.user_id
    confirm({
      title: '删除',
      content: (
        <p>确认删除管理员吗？删除之后该管理员将无法使用该系统！</p>
      ),
      cancelText:'取消',
      okText:'确定',
      onOk:()=>{
        $.ajax({
          url:'http://localhost:3200/deleteUser',
          type: 'post',
          data:{'companyId':companyId,'user_id':user_id},
          success: function (data) {
            if(data.status == 0){
              window.location.reload()
            }
          }
        })
      }
    });
  }

  render(){
    const {current,total,userList,columns} = this.state
    return (
      <div className="personnel">
        <div className="header">
          <h3>管理员</h3>
        </div>
        <div className="action">
          <a href="#/viewhome/addUser"><Button type="primary">新增管理员</Button></a>
        </div>
        <div className="tableList">
          <Table
            columns={columns}
            dataSource={userList}
            pagination={{
              current,
              total,
              pageSize:3,
              onChange:(page)=>{
                this.setState({
                  current:page
                })
              }
            }}
          />
        </div>
      </div>
    );
  }

}

export default ViewPersonnel;
