import React,{Component} from 'react'
import {Form,Input,Button,Modal,Rate} from 'antd'

import $ from 'jquery'

import './../../styles/view/appointment.less'
import right from  './../../images/right.png';

const { TextArea } = Input;

class SignOff extends Component{
    constructor(props){
        super(props)
        this.state={
            companyName:'',
            isShowTrue:false,
            visiter_name:window.localStorage.getItem('visiter_name'),
            visiter_phone:window.localStorage.getItem('visiter_phone'),
            create_time:window.localStorage.getItem('create_time'),
            value:'',
            star:'',
        }
    }

    componentWillMount() {
        let companyName = this.props.location.search?this.props.location.search.split('?')[1].split('=')[1]:''
        companyName = decodeURI(companyName)
        this.setState({
            companyName:companyName
        })
    }
    onStarChange=(values)=>{
        this.setState({
            star:values
        })
    }
    onpjChange=({ target: { value } })=>{
        this.setState({
            value:value
        })
    }

    signOffClick=()=>{
        const {value,star,companyName,visiter_name,visiter_phone,create_time} = this.state
        console.log(visiter_name)
        let time = new Date()
        let year=time.getFullYear(); //获取当前年份
        let mon=time.getMonth()+1; //获取当前月份
        let day=time.getDate(); //获取当前日
        let h=time.getHours(); //获取小时
        let m=time.getMinutes(); //获取分钟
        let timenow = year+'-'+mon+'-'+day+' '+h+':'+m
        let dataAll = {
            remark:value,
            star:star,
            companyName:companyName,
            visiter_name:visiter_name,
            visiter_phone:visiter_phone,
            create_time:create_time,
            leave_time:timenow
        }
        $.ajax({
            url:'http://localhost:3200/signOff',
            type:'post',
            data:dataAll,
            success:(data)=>{
                if(data.status==0){
                    this.setState({
                        isShowTrue:true
                    })
                }else{
                    Modal.info({
                        content:'出错了'
                    })
                }
            }
        })

    }

    render(){
        const {isShowTrue,value} = this.state
        return(
            <div className="signIn">
                {!isShowTrue?<div>
                    <p style={{'marginTop':'10px','fontSize':'16px'}}>请打星</p>
                    <Rate allowHalf onChange={this.onStarChange} size="large"/>
                    <p style={{'margin':'25px 0px 10px','fontSize':'16px'}}>请输入您的评价</p>
                    <TextArea
                        value={value}
                        onChange={this.onpjChange}
                        placeholder="写入此次来访评价"
                        autoSize={{ minRows: 3, maxRows: 5 }}
                    />
                    <Button className="signBtn" size="large" type="primary" onClick={this.signOffClick}>签退</Button>
                </div>:<div className="rightHtml">
                    <img src={right}/>
                    <p>感谢您的访问</p>
                </div>
                }
            </div>
        )
    }
}

export default SignOff