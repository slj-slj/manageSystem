import React,{ Component } from 'react';
import {Table,Button,Form,Modal,Input,Select} from 'antd'
import $ from 'jquery'

import './../../styles/view/personnel.less'

const { Option } = Select;

class AddUser extends Component{
  constructor(props){
    super(props);
    let role = window.localStorage.getItem('role')
    let user_phone = window.localStorage.getItem('user_phone')
    this.state={
      role:role,
      user_phone:user_phone
    }
  }

  componentWillMount(){
    
  }

  submitInfo=(values)=>{
    let _this = this
    let companyId=window.localStorage.getItem('companyId')
    let user_phone = window.localStorage.getItem('user_phone')
    let newObj = {}
    Object.assign(newObj,values,{'companyId':companyId,'user_phone':user_phone})
    $.ajax({
      url:'http://localhost:3200/addUser',
      type:'post',
      data:newObj,
      success:(data)=>{
        if(data.status == 1){
          Modal.info({
            content: data.msg
          });
        }else if(data.status == 0){
          Modal.success({
            content: '添加成功，即将跳转到管理员页面'
          });
          setTimeout(()=>{
            Modal.destroyAll()
            this.props.history.push('/viewhome/personnel')
          },2000)
          
        }
      }
    })
  }

  render(){
    const {current,total,userList,columns,role} = this.state
    return (
      <div className="adduser">
        <div className="header">
          <Button type="link" onClick={()=>{window.history.back(-1)}}>返回</Button>
          <h3>添加管理员</h3>
        </div>
        <Form ref={this.formRef} className="inputsInfo" onFinish={this.submitInfo}>
          <Form.Item label="管理员姓名" name="user_name"
            rules={[
              {
                  required: true,
                  message: '请输入管理员姓名！',
              }
            ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item label="管理员电话" name="addUser_phone"
            rules={[
              {
                required: true,
                message: '请输入管理员的电话号码!',
              },{
                pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
                message: '请输入正确的电话号码!',
              },
            ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item label="管理员邮箱" name="user_email"
            rules={[
              {
                  type: 'email',
                  message: '邮箱格式不正确！',
              },
              {
                  required: true,
                  message: '请输入管理员的邮箱！',
              },
            ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item label="管理员角色" name="role" 
            rules={[
              {
                  required: true,
                  message: '请选择管理员角色！',
              },
            ]}
          >
            <Select style={{ width: 180 }}>
              <Option value="0">初级管理员</Option>
              <Option value="1" disabled={role==0?true:false}>中级管理员</Option>
              <Option value="2" disabled={role==2?false:true}>高级管理员</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">提交</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }

}

export default AddUser;
