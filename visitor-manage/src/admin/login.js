import React,{Component} from 'react';
import { Form, Input, Button, Checkbox,Row,Col,Modal } from 'antd';
import $ from 'jquery';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './../styles/admin/login.less'
import logo from './../images/logo.png'
import invoite_toutu from './../images/invoite_toutu.jpg'


const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      visibily:false,
      vercodeHtml:'获取验证码',
      phone:'',
      vercode:''
    }

  }

  phoneInput = (rule,value,callback) =>{
    if(value){
      if((/^1[3456789]\d{9}$/.test(value))){
        this.setState({
          isdisabled:true,
          phone:value
        })
        return Promise.resolve();
      }else{
        return Promise.reject('请输入正确的电话号码')
      }
    }else{
      return Promise.resolve();
    }
    
  }

  getRandom=(min, max)=>{
    return Math.round(Math.random() * (max - min) + min);
  }

  getCaptcha = () => {
    const {phone,sendcode} = this.state
    let timer = 60
    let siv = setInterval(() => {
      timer--
      this.setState({vercodeHtml: timer, isdisabledT: false,isdisabled:false });
      if (timer === 0) {
        clearInterval(siv);
        this.setState({ vercodeHtml: '重新发送', isdisabledT: true,isdisabled:true })
    }
    }, 1000);
    let vercode = '233467'
    // for (var i = 0; i < 6; i++) {
    //   vercode+=String.fromCharCode(this.getRandom(48, 57))
    // }
    this.setState({
      vercode:vercode
    })
    let data = {
      'apikey':'45d3dc4fe9e8c77f5d9c09e7092b9820',
      'mobile':phone,
      'text':`【史丽佳】您的验证码是${vercode}。如非本人操作，请忽略本短信`
    }
    // $.ajax({
    //   url:'https://sms.yunpian.com/v2/sms/single_send.json',
    //   type:'post',
    //   data:data
    // })
  }

  verCode=(role,value,callback)=>{
    if (value) {
      if(value.toLowerCase()===this.state.vercode.toLowerCase()){                                                       
        this.setState({
          sendcode: value,
          isdisabledT:true,
          showError: false
        })
        return Promise.resolve();
      } else {
          // callback('请输入正确的验证码')
          this.setState({
              showError: true
          })
          return Promise.reject('请输入正确的验证码')
      }
    } else {
      return Promise.resolve();
    }
  }

  onFinish = (values) => {
    let _this = this
    $.ajax({
      url:'http://localhost:3200/login',
      type: 'post',
      data: values,
      // contentType: false,
      // processData: false,
      dataType: 'json',
      success: function (data) {
        if(data.status == 0){
          let phone = data.data.phone
          let role = data.data.role
          let companyName = data.data.companyName
          let companyId = data.data.companyId
          window.localStorage.setItem('user_phone',phone)
          window.localStorage.setItem('role',role)
          window.localStorage.setItem('companyName',companyName)
          window.localStorage.setItem('companyId',companyId)
          window.localStorage.setItem('user_name',data.data.user_name)
          // window.location.href='http://localhost:3000/#/viewhome/home'
          // console.log(this.props)
          _this.props.history.push('/viewhome/home')
        }else{
          Modal.info({
            content:data.msg
          })
        }
      }
    })
  };
  onFinish2 = (values) => {
    console.log(values)
    $.ajax({
      url:'http://localhost:3200/updatePassword',
      type: 'post',
      data: values,
      success:(data)=>{
        if(data.status == 0){
          this.setState({
            visibily:false
          })
        }else{
          Modal.info({
            content:data.msg
          })
        }
      }
    })
  };
  render(){
    const {isdisabled,vercodeHtml} = this.state
    return (
      <div className="LoginWhole">
          <div className="logo_header">
            <a href="#/"><div className="header">
              <img src={logo} alt=""/>
              <h2>访客信息管理平台</h2>
            </div></a>
          </div>
          <div className="banner_login" style={{'backgroundImage':`url(${invoite_toutu})`,'backgroundRepeat':'no-repeat','backgroundSize':'100% 100%'}}>
              {/* <img src={invoite_toutu} alt=""/> */}
              <div className="login">
                <div className="mengban"></div>
                {!this.state.visibily?
                  <div className="loginCon">
                  <Form
                    {...layout}
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={this.onFinish}
                  >
                    <Form.Item
                      name="phone"
                      label="手机号"
                      rules={[
                        {
                          required: true,
                          message: '请输入您的手机号码!',
                        },{
                          pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
                          message: '请输入正确的电话号码!',
                        },
                      ]}
                    >
                      <Input maxLength= "11" placeholder="手机号" />
                    </Form.Item>
                    <Form.Item
                      name="password"
                      label="密码"
                      rules={[
                        {
                          required: true,
                          message: '请输入您的六位数密码!',
                        },{
                          validator: (_, value) =>{
                          if(value&&value.length!=6) {
                            return Promise.reject('密码长度为6位')
                          }else{
                            return Promise.resolve()
                          }
                        }
                      }
                      ]}
                    >
                      <Input.Password maxLength= "6" placeholder="密码" />
                    </Form.Item>
                    <a className="login-form-forgot" href="javascript:void(0)" onClick={()=>{
                      this.setState({
                        visibily:true
                      })
                    }}> 忘记密码？</a>
                      <br/>
                    <Form.Item className="login-button">
                      <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                      </Button>
                      或者 <a href="#/register">现在注册</a>
                    </Form.Item>
                  </Form>
                </div>:<div className="loginCon">
                  <Form
                    {...layout}
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={this.onFinish2}
                  >
                    <Form.Item
                      name="phoneU"
                      label="手机号"
                      rules={[
                        {
                          required: true,
                          message: '请输入您的手机号码!',
                        },{
                          validator:this.phoneInput
                        },
                      ]}
                    >
                      <Input maxLength= "11" placeholder="手机号" />
                    </Form.Item>
                    <Row gutter={4}>
                      <Col span={16}>
                        <Form.Item
                          labelCol={{span:9}}
                          name="captcha"
                          label="验证码"
                          rules={[{ required: true, message: '请输入验证码' },
                            {validator:this.verCode}
                          ]}
                        >
                          <Input  placeholder="验证码"  maxLength="6"/>
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Button className="captchaBtn" disabled={!isdisabled?true:false} onClick={this.getCaptcha}>{vercodeHtml}</Button>
                      </Col>
                    </Row>
                    <Form.Item
                        name="passwordU"
                        label="密码"
                        rules={[
                          {
                              required: true,
                              message: '请输入你的密码！',
                          },{
                            validator: (_, value) =>{
                              if(value&&value.length!==6) {
                                return Promise.reject('请输入六位数密码')
                              }else{
                                return Promise.resolve()
                              }
                            }
                          }
                        ]}
                        hasFeedback
                    >
                        <Input.Password placeholder="密码" maxLength="6"/>
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="确认密码"
                        dependencies={['passwordU']}
                        hasFeedback
                        rules={[
                        {
                            required: true,
                            message: '请确定您的密码',
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                            if (!value || getFieldValue('passwordU') === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject('两次输入的密码不一致');
                            },
                        }),
                        ]}
                    >
                        <Input.Password placeholder="再次输入密码" maxLength="6"/>
                    </Form.Item>
                    <Form.Item className="login-button">
                      <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                      </Button>
                      <a href="javascript:void(0)" style={{'marginLeft':'10px'}} onClick={()=>{
                        this.setState({
                          visibily:false
                        })
                      }}>返回</a>
                    </Form.Item>
                  </Form>
                </div>
                }
                
              </div>
            </div>
      </div>
    );
  }
  
}

export default Login;
