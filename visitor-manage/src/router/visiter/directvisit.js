import React,{Component} from 'react';
import { Form, Input, Button, Col,Row,Modal,DatePicker} from 'antd';
import moment from 'moment';
import $ from 'jquery';

import './../../styles/view/appointment.less'
import right from  './../../images/right.png';


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 18 },
};

class DirectVisit extends Component {
  constructor(props){
    super(props)
    
    this.state={
        companyName:'',
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
        isShowResult:false,
        msg:''
    }

  }

    componentWillMount() {
        let companyName = this.props.location.search?this.props.location.search.split('?')[1].split('=')[1]:''
        companyName = decodeURI(companyName)
        console.log(companyName)
        this.setState({
            companyName:companyName
        })
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
        this.setState({
            isdisabled:false,
            vercodeHtml:'获取验证码'
        })
        if(value.length == 11){
            this.reloadPic()
        }
        if((/^1[3456789]\d{9}$/.test(value))){
            this.setState({
            isdisabled:true,
            phone:value,
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
    console.log(data)
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
    let time = new Date()
    let year=time.getFullYear(); //获取当前年份
    let mon=time.getMonth()+1; //获取当前月份
    let day=time.getDate(); //获取当前日
    let h=time.getHours(); //获取小时
    let m=time.getMinutes(); //获取分钟
    let timenow = year+'-'+mon+'-'+day+' '+h+':'+m
    let newObj = {}
    Object.assign(newObj,values,{'companyName':this.state.companyName,'type':0,'create_time':timenow})
    $.ajax({
      url:'http://localhost:3200/directvisit',
      type: 'post',
      data: newObj,
      success:(data)=>{
        if(data.status == 0){
            let visiter_name = data.data.visiter_name
            let visiter_phone = data.data.visiter_phone
            let create_time = data.data.create_time
            window.localStorage.setItem('visiter_name',visiter_name)
            window.localStorage.setItem('visiter_phone',visiter_phone)
            window.localStorage.setItem('create_time',create_time)
            this.setState({
                isShowResult:true,
                msg:data.msg
            })
        }else{
            Modal.info({
                content:data.msg
            })
        }
      }
    })
  }
  render(){
    const {vercodeHtml,isdisabled,isdisabledT,msg,isShowResult} =this.state
    const suffix =
            <div style={{'height':'40px'}}>
                <canvas
                    onClick={this.reloadPic}
                    ref={this.canvas}
                    width='100'
                    height='40'>
                </canvas>
            </div>
    const suffix2 =
    <div style={{'height':'26px'}}>
        <Button className="captchaBtn" disabled={!(isdisabled&&isdisabledT)?true:false} onClick={this.getCaptcha}>{vercodeHtml}</Button>
    </div>
    return (
        <div className="appointment">
            {!isShowResult?<div>
                <h2>签到信息</h2>
            <Form
                {...layout}
                onFinish={this.onFinish}
                className="formInput"
            >
                <Form.Item
                    name="visiter_name"
                    label="您的姓名"
                    rules={[
                    {
                        required: true,
                        message: '请输入您的姓名!',
                    }
                    ]}
                >
                    <Input placeholder="您的姓名" autoComplete="off"/>
                </Form.Item>
                <Form.Item
                    name="visiter_phone"
                    label="您的手机号"
                    rules={[
                    {
                        required: true,
                        message: '请输入您的电话号码!',
                    },{
                        validator:this.phoneInput
                    },
                    ]}
                >
                    <Input placeholder="您的手机号"  maxLength="11" autoComplete="off"/>
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
                            autoComplete="off"
                        />
                </Form.Item>
                {/* <Row gutter={1}> */}
                    {/* <Col span={13}> */}
                    <Form.Item
                        name="captcha"
                        label="验证码"
                        rules={[{ required: true, message: '请输入验证码' },
                        {validator:this.verCode}
                        ]}
                    >
                        <Input  placeholder="验证码"  maxLength="6" suffix={suffix2} autoComplete="off"/>
                        
                    </Form.Item>
                   
                    {/* </Col> */}
                    {/* <Col span={8}> */}
                   
                    {/* </Col> */}
                {/* </Row> */}
                <Form.Item
                    name="visited_name"
                    label="被访人姓名"
                    rules={[
                    {
                        required: true,
                        message: '请输入您将要访问的人的称呼!',
                    }]}
                >
                    <Input placeholder="被访人姓名" autoComplete="off"/>
                </Form.Item>
                <Form.Item
                      name="visited_phone"
                      label="手机号"
                      rules={[
                        {
                          required: true,
                          message: '请输入您将要访问的人的手机号码!',
                        },{
                          pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
                          message: '请输入正确的电话号码!',
                        },
                      ]}
                    >
                      <Input maxLength= "11" placeholder="被访人手机号" autoComplete="off"/>
                </Form.Item>
                <Form.Item
                    name="visiter_email"
                    label="您的邮箱"
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
                    <Input placeholder="您的邮箱"/>
                </Form.Item>
                <Form.Item className="buttonBottom">
                    <Button type="primary" htmlType="submit" className="appointment-form-button">
                    签到
                    </Button>
                </Form.Item>
            </Form>
            </div>:<div className="rightHtml">
                <img src={right}/>
                <p>{msg}</p>
            </div>
            }
            
        </div>
    );
  }
  
}

export default DirectVisit;
