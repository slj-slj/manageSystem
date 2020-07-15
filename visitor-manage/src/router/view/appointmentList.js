import React,{ Component } from 'react';
import {Button,Table} from 'antd';
import $ from 'jquery';
import moment from 'moment';
import './../../styles/view/record.less'

class AppointmentList extends Component{
  
  constructor(props){
    super(props);
    let role = window.localStorage.getItem('role')
    let columns = [
      {
        title:'访客姓名',
        dataIndex:'visiter_name',
        key:'visiter_name',
      },{
        title:'访客电话',
        dataIndex:'visiter_phone',
        key:'visiter_phone',
      },{
        title:'来访时间',
        dataIndex:'create_time',
        key:'create_time'
      },{
        title:'被访人姓名',
        dataIndex:'visited_name',
        key:'visited_name'
      },{
        title:'被访人电话',
        dataIndex:'visited_phone',
        key:'visited_phone'
      },{
        title:'操作',
        fixed:'right',
        dataIndex:'action',
        key:'action',
        render:(value,record) => {
          let type = record.type
          if(type == 0){
            return (
              <div>
                <Button type='link' size='small' onClick={this.acceptClick.bind(this,record)}>接受</Button>
                <Button type='link' size='small' onClick={this.refuseClick.bind(this,record)}>拒绝</Button>
              </div>
            )
          }else{
            return ''
          }
          
        }
      }
    ]
    this.state={
      current:1,
      total:0,
      visitList:'',
      columns:columns,
      companyId:window.localStorage.getItem('companyId')
    }
  }
  acceptClick=(values)=>{ 
    let dataInfo = {
      'apikey':'45d3dc4fe9e8c77f5d9c09e7092b9820',
      'mobile':values.visiter_phone,
      'text':'【史丽佳】祝您来访愉快'
    }
    $.ajax({
      url:'http://localhost:3200/acceptVisit',
      type:'post',
      data:{'phone':values.visiter_phone,'time':values.create_time,'companyId':this.state.companyId},
      success:(data)=>{
        if(data.status === 0){
          $.ajax({
            url:'https://sms.yunpian.com/v2/sms/single_send.json',
            type:'post',
            data:dataInfo
          })
          setTimeout(()=>{window.location.reload()},1000)
        }
      }
    })
  }
  refuseClick=(values)=>{
    let dataInfo = {
      'apikey':'45d3dc4fe9e8c77f5d9c09e7092b9820',
      'mobile':values.visiter_phone,
      'text':'【史丽佳】别气馁，希望您保持愉快的心情~'
    }
    $.ajax({
      url:'http://localhost:3200/refuseVisit',
      type:'post',
      data:{'phone':values.visiter_phone,'time':values.create_time,'companyId':this.state.companyId},
      success:(data)=>{
        if(data.status === 0){
          $.ajax({
            url:'https://sms.yunpian.com/v2/sms/single_send.json',
            type:'post',
            data:dataInfo
          })
          setTimeout(()=>{window.location.reload()},1000)
        }
      }
    })
  }
  componentWillMount(){
    let companyId=window.localStorage.getItem('companyId')
    $.ajax({
      url:'http://localhost:3200/appointmentList',
      type: 'post',
      data:{companyId:companyId},
      success: (data)=>{
        if(data.status == 0){
          this.setState({
            visitList:data.data,
          })
        }
      }
    })
  }

  render(){
    const {visitList,columns} = this.state
    console.log(visitList)
    return (
      <div className="appointmentList">
        <Button style={{'margin':'20px 0px'}} type="primary" onClick={()=>{window.history.back(-1)}}>返回</Button>
        <Table
          columns={columns}
          dataSource={visitList}
          pagination={false}
        />
      </div>
    );
  }

}

export default AppointmentList;
