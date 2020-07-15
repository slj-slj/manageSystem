import React,{Component} from 'react'
import {Form,Input,Button,Modal} from 'antd'
import $ from 'jquery'

import './../../styles/view/appointment.less'
import right from  './../../images/right.png';

class SignIn extends Component{
    constructor(props){
        super(props)
        this.state={
            companyName:'',
            isShowTrue:false
        }
    }

    componentWillMount() {
        let companyName = this.props.location.search?this.props.location.search.split('?')[1].split('=')[1]:''
        companyName = decodeURI(companyName)
        this.setState({
            companyName:companyName
        })
    }

    singInClick=(values)=>{
        let time = new Date()
        let year=time.getFullYear(); //获取当前年份
        let mon=time.getMonth()+1; //获取当前月份
        let day=time.getDate(); //获取当前日
        let h=time.getHours(); //获取小时
        let m=time.getMinutes(); //获取分钟
        let timenow = year+'-'+mon+'-'+day+' '+h+':'+m
        let newObj = {}
        Object.assign(newObj,values,{'companyName':this.state.companyName,'time':timenow})
        $.ajax({
            url:'http://localhost:3200/signIn',
            type:'post',
            data:newObj,
            success:(data)=>{
                if(data.status === 0){
                    let visiter_name = data.data.visiter_name
                    let visiter_phone = data.data.visiter_phone
                    let create_time = data.data.create_time
                    window.localStorage.setItem('visiter_name',visiter_name)
                    window.localStorage.setItem('visiter_phone',visiter_phone)
                    window.localStorage.setItem('create_time',create_time)
                    this.setState({
                        isShowTrue:true
                    })
                }else if(data.status === 1){
                    Modal.info({
                        content:data.msg
                    })
                }
            }
        })
    }

    render(){
        const {isShowTrue} = this.state
        return(
            <div className="signIn">
                {!isShowTrue?<Form onFinish={this.singInClick}>
                    <Form.Item name="visiter_name" rules={[{required:true,message:'请输入您的姓名'}]}>
                        <Input size="large" placeholder="请输入您的姓名"/>
                    </Form.Item>
                    <Form.Item name="visiter_phone"
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
                        <Input size="large" placeholder="请输入您的手机号码"/>
                    </Form.Item>
                    <Form.Item>
                        <Button className="signBtn" size="large" type="primary" htmlType="submit">签到</Button>
                    </Form.Item>
                </Form>:<div className="rightHtml">
                    <img src={right}/>
                    <p>签到成功</p>
                </div>
                }
            </div>
        )
    }
}

export default SignIn