import React,{ Component } from 'react';
import { Tabs,Form,Button,Input,Modal } from 'antd';
import $ from 'jquery'
import './../../styles/view/home.less'

const { TabPane } = Tabs;

class ViewSetting extends Component{
  constructor(props){
    super(props);
    this.state={
        role:window.localStorage.getItem('role'),
        companyId:window.localStorage.getItem('companyId'),
        user_phone:window.localStorage.getItem('user_phone'),
        userInfo:[],
        loading:false,
    }
  }

  componentWillMount(){
    const {companyId,user_phone} = this.state
    $.ajax({
      url:'http://localhost:3200/selectSelfInfo',
      type:'post',
      data:{'companyId':companyId,'user_phone':user_phone},
      success:(data)=>{
        if(data.status == 0){
          this.setState({
            loading:true,
            userInfo:data.data[0]
          })
        }
      }
    })
  }

  updateSubmit=(values)=>{
    console.log(values)
    const {companyId,user_phone} = this.state
    let newObj = {}
    Object.assign(newObj,values,{'companyId':companyId,'user_phone':user_phone})
    $.ajax({
      url:'http://localhost:3200/updateSelfInfo',
      type:'post',
      data:newObj,
      success:(data)=>{
        if(data.status == 0){
          window.localStorage.setItem('user_phone',data.data.user_phone)
          Modal.success({
            content: '修改成功',
          });
          setTimeout(()=>{ window.location.reload()},2000)
         
        }
      }
    })
  }

  dissolveClick=()=>{
    const {companyId} = this.state
    $.ajax({
      url:'http://localhost:3200/dissolve',
      type:'post',
      data:{'companyId':companyId},
      success:(data)=>{
        if(data.status == 0){
          window.localStorage.clear()
          Modal.success({
            content: '解散成功',
          });
          setTimeout(()=>{Modal.destroyAll();this.props.history.push('/register')},1000)
        }
      }
    })
  }

  render(){
    const {userInfo,loading,role} = this.state
    return (
      <div className="settingHome">
       {loading?<Tabs defaultActiveKey="1">
          <TabPane tab="编辑信息" key="1">
            <Form onFinish={this.updateSubmit} className="updateinfo">
              <Form.Item label="ID">
                <Input disabled={true} value={userInfo.user_id}/>
              </Form.Item>
              <Form.Item label="姓名">
                <Input disabled={true} value={userInfo.user_name}/>
              </Form.Item>
              <Form.Item label="电话" name="user_phonenew">
                <Input defaultValue={userInfo.user_phone}/>
              </Form.Item>
              <Form.Item label="邮箱" name="user_email">
                <Input defaultValue={userInfo.user_email}/>
              </Form.Item>
              <Button type="primary" htmlType="submit">提交</Button>
            </Form>
          </TabPane>
          <TabPane tab="解散企业" key="2">
            <div style={{'margin':'10px 0 20px'}}>
              <h3>解散企业前请注意：</h3>
              <p>1.解散企业将无法使用该系统</p>
              <p>2.解散企业后所有访客信息将清空，即使重新注册，也将无法在查看访客信息</p>
            </div>
            <Button type="primary" onClick={this.dissolveClick} disabled={role==2?false:true}>解散企业</Button>
            <p style={{'color':'#ff0000','marginTop':'10px'}}>（注：只有高级管理员才可以解散企业）</p>
          </TabPane>
        </Tabs>:''} 
      </div>
    );
  }

}

export default ViewSetting;
