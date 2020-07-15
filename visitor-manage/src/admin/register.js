import React,{Component} from 'react';
import { Form, Input, Button, Col,Row,Modal} from 'antd';
import $ from 'jquery';

import './../styles/admin/register.less'
import logo from './../images/logo.png'
import invoite_toutu from './../images/invoite_toutu.jpg'


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 18 },
};

class Register extends Component {
  constructor(props){
    super(props)
    
    this.state={
      vercodeHtml:'获取验证码',
      timer: 60,
      isdisabled:false,
      isdisabledT:false,
      code: '',
      vercode:'',
      codeLength: 4,
      fontSizeMin: 20,
      fontSizeMax: 22,
      backgroundColorMin: 240,
      backgroundColorMax: 250,
      colorMin: 10,
      colorMax: 20,
      lineColorMin: 40,
      lineColorMax: 180,
      contentWidth: 96,
      contentHeight: 38,
      showError: false, // 默认不显示验证码的错误信息
    }

  }

  componentWillMount() {
    this.canvas = React.createRef()
  }

  componentDidMount() {
      this.drawPic()
  }

  randomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
}

drawPic = () => {
    this.randomCode()
}

// 生成一个随机的颜色
// eslint-disable-next-line react/sort-comp
randomColor(min, max) {
    const r = this.randomNum(min, max)
    const g = this.randomNum(min, max)
    const b = this.randomNum(min, max)
    return `rgb(${r}, ${g}, ${b})`
}

drawText(ctx, txt, i) {
    ctx.fillStyle = this.randomColor(this.state.colorMin, this.state.colorMax)
    const fontSize = this.randomNum(this.state.fontSizeMin, this.state.fontSizeMax)
    ctx.font = fontSize + 'px SimHei'
    const padding = 10;
    const offset = (this.state.contentWidth - 40) / (this.state.code.length - 1)
    let x = padding;
    if (i > 0) {
        x = padding + (i * offset)
    }
    let y = this.randomNum(this.state.fontSizeMax, this.state.contentHeight - 5)
    if (fontSize > 40) {
        y = 40
    }
    const deg = this.randomNum(-10, 10)
    // 修改坐标原点和旋转角度
    ctx.translate(x, y)
    ctx.rotate(deg * Math.PI / 180)
    ctx.fillText(txt, 0, 0)
    // 恢复坐标原点和旋转角度
    ctx.rotate(-deg * Math.PI / 180)
    ctx.translate(-x, -y)
}

drawLine(ctx) {
    // 绘制干扰线
    for (let i = 0; i < 1; i++) {
        ctx.strokeStyle = this.randomColor(this.state.lineColorMin, this.state.lineColorMax)
        ctx.beginPath()
        ctx.moveTo(this.randomNum(0, this.state.contentWidth), this.randomNum(0, this.state.contentHeight))
        ctx.lineTo(this.randomNum(0, this.state.contentWidth), this.randomNum(0, this.state.contentHeight))
        ctx.stroke()
    }
}

drawDot(ctx) {
    // 绘制干扰点
    for (let i = 0; i < 100; i++) {
        ctx.fillStyle = this.randomColor(0, 255)
        ctx.beginPath()
        ctx.arc(this.randomNum(0, this.state.contentWidth), this.randomNum(0, this.state.contentHeight), 1, 0, 2 * Math.PI)
        ctx.fill()
    }
}

reloadPic = () => {
    this.drawPic()
    this.setState({
        sendcode: '',
    });
}

// 输入验证码
changeCode = e => {
    if (e.target.value.toLowerCase() !== '' && e.target.value.toLowerCase() !== this.state.code.toLowerCase()) {
        this.setState({
            showError: true
        })
    } else if (e.target.value.toLowerCase() === '') {
        this.setState({
            showError: false
        })
    } else if (e.target.value.toLowerCase() === this.state.code.toLowerCase()) {
        this.setState({
            showError: false
        })
    }
}

// 随机生成验证码
randomCode() {
    let random = ''
    // 去掉了I l i o O,可自行添加
    const str = 'QWERTYUPLKJHGFDSAZXCVBNMqwertyupkjhgfdsazxcvbnm1234567890'
    for (let i = 0; i < this.state.codeLength; i++) {
        const index = Math.floor(Math.random() * 57);
        random += str[index];
    }
    this.setState({
        code: random
    }, () => {
        const canvas = this.canvas.current;
        const ctx = canvas.getContext('2d')
        ctx.textBaseline = 'bottom'
        // 绘制背景
        ctx.fillStyle = this.randomColor(this.state.backgroundColorMin, this.state.backgroundColorMax)
        ctx.fillRect(0, 0, this.state.contentWidth, this.state.contentHeight)
        // 绘制文字
        for (let i = 0; i < this.state.code.length; i++) {
            this.drawText(ctx, this.state.code[i], i)
        }
        this.drawLine(ctx)
        this.drawDot(ctx)
    })
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

  imgCodeInput=(rule, value, callback) => {
    if (value) {
      if(value.toLowerCase()===this.state.code.toLowerCase()){                                                       
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
    let newObj = {}
    Object.assign(newObj,values,{'role':2})
    $.ajax({
      url:'http://localhost:3200/register',
      type: 'post',
      data: newObj,
      success:(data)=>{
        if(data.status == 0){
          let phone = data.data.phone
          let role = data.data.role
          let companyName = data.data.companyName
          let companyId = data.data.companyId
          console.log(phone,role,companyName,companyId)
          window.localStorage.setItem('user_phone',phone)
          window.localStorage.setItem('role',role)
          window.localStorage.setItem('companyName',companyName)
          window.localStorage.setItem('companyId',companyId)
          window.localStorage.setItem('user_name',data.data.user_name)
          this.props.history.push('/viewhome/home')
        }else{
          Modal.info({
            content:data.msg
          })
        }
      },
      error: function(err) {
        console.log(err);
      }
    })
    // console.log(values)
    // this.props.history.push('/viewhome/home')
  }
  render(){
    const {vercodeHtml,isdisabled,isdisabledT,current} =this.state
    const suffix =
            <div style={{'height':'40px'}}>
                <canvas
                    onClick={this.reloadPic}
                    ref={this.canvas}
                    width='100'
                    height='40'>
                </canvas>
            </div>
    return (
      <div className="RegisterWhole">
          <div className="logo_header">
            <a href="#/"><div className="header">
              <img src={logo} alt=""/>
              <h2>访客信息管理平台</h2>
            </div></a>
          </div>
          <div className="banner_register" style={{'backgroundImage':`url(${invoite_toutu})`,'backgroundRepeat':'no-repeat','backgroundSize':'100% 100%'}}>
              {/* <img src={invoite_toutu} alt=""/> */}
              <div className="register">
                <div className="mengban"></div>
                <div className="registerCon">
                <Form
                  // {...layout} 
                  ref={this.formRef} 
                  name="control-ref"
                  onFinish={this.onFinish}
                >
                    <Form.Item
                      name="companyName"
                      label="公司名称"
                      rules={[
                        {
                          required: true,
                          message: '请输入您的公司名称!',
                        },
                        {
                          max:20,
                          message:"公司名称最多20个汉字"
                        },
                        {
                          min:2,
                          message:"公司名称最少2个汉字"
                        }
                      ]}
                    >
                      <Input placeholder="公司名称" />
                    </Form.Item>
                    <Form.Item
                      name="user_name"
                      label="姓名"
                      rules={[
                        {
                          required: true,
                          message: '请输入您的姓名!',
                        }
                      ]}
                    >
                      <Input placeholder="您的姓名" />
                    </Form.Item>
                    <Form.Item
                      name="phone"
                      label="手机号"
                      rules={[
                        {
                          required: true,
                          message: '请输入您的电话号码!',
                        },{
                          validator:this.phoneInput
                        },
                      ]}
                    >
                      <Input placeholder="手机号"  maxLength="11"/>
                    </Form.Item>
                    <Form.Item className='for-form' label="校验码"
                        name="sendcode"
                        rules= {[
                          { required: true, message: '请输入校验码!' },
                          {
                            validator: this.imgCodeInput
                          }
                        ]}>
                          <Input
                                // size="large"
                                // prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                suffix={suffix}
                                onChange={this.changeCode}
                                placeholder="请输入校验码"
                            />
                    </Form.Item>
                    <Row gutter={6}>
                      <Col span={16}>
                        <Form.Item
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
                        <Button className="captchaBtn" disabled={!(isdisabled&&isdisabledT)?true:false} onClick={this.getCaptcha}>{vercodeHtml}</Button>
                      </Col>
                    </Row>
                    <Form.Item
                        name="password"
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
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                        {
                            required: true,
                            message: '请确定您的密码',
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject('两次输入的密码不一致');
                            },
                        }),
                        ]}
                    >
                        <Input.Password placeholder="再次输入密码" maxLength="6"/>
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="邮箱"
                        rules={[
                        {
                            type: 'email',
                            message: '邮箱格式不正确！',
                        },
                        {
                            required: true,
                            message: '请输入您的邮箱！',
                        },
                        ]}
                    >
                        <Input placeholder="邮箱"/>
                    </Form.Item>
                    <Form.Item  wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
                      <Button type="primary" htmlType="submit" className="login-form-button">
                        注册
                      </Button>
                      <br/>
                      <a href="#/login" style={{'marginTop':'10px'}}>已有账号？去登录</a>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </div>
      </div>
    );
  }
  
}

export default Register;
