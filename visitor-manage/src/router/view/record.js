import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import {Form,Row,Col,Input,Button,Table,Modal,DatePicker} from 'antd';
import $ from 'jquery';
import moment from 'moment';
import './../../styles/view/record.less'

const formItemLayout = {
  labelCol:{
    xs:{span:24},
    sm:{span:8}
  },
  wrapperCol:{
    xs:{span:24},
    sm:{span:16}
  }
}

const tailFormItemLayout = {
  wrapperCol:{
    xs:{
      span:24,
      offset:0
    },
    sm:{
      span:24,
      offset:16
    }
  }
}
const { confirm } = Modal;

class ViewRecord extends Component{
  formRef = React.createRef();
  
  constructor(props){
    super(props);
    let role = window.localStorage.getItem('role')
    let columns = [
      {
        title:'访客ID',
        dataIndex:'visiter_id',
        key:'visiter_id'
      },{
        title:'访客姓名',
        dataIndex:'visiter_name',
        key:'visiter_name',
      },{
        title:'访客电话',
        dataIndex:'visiter_phone',
        key:'visiter_phone',
        // render:(value,record) => {
        //   return (<div>{value.replace(/(\d{3})\d*(\d{4})/,"$1****$2")}</div>)
        // }
      },{
        title:'访客邮箱',
        dataIndex:'visiter_email',
        key:'visiter_email',
      },{
        title:'来访时间',
        dataIndex:'create_time',
        key:'create_time'
      },{
        title:'离开时间',
        dataIndex:'leave_time',
        key:'leave_time'
      },{
        title:'被访人姓名',
        dataIndex:'visited_name',
        key:'visited_name'
      },{
        title:'被访人电话',
        dataIndex:'visited_phone',
        key:'visited_phone'
      },{
        title:'星级',
        dataIndex:'star',
        key:'star'
      },{
        title:'评价',
        dataIndex:'remark',
        key:'remark'
      },{
        title:'操作',
        fixed:'right',
        dataIndex:'action',
        key:'action',
        render:(value,record) => {
          return (
              <div>
                <Button type='link' size='small' disabled={role==0?true:false} onClick={this.updateClick.bind(this,record)}>编辑</Button>
                <Button type='link' size='small' disabled={role==2?false:true} onClick={this.deleteClick.bind(this,record)}>删除</Button>
                <Button type='link' size='small' onClick={this.addBlacklist.bind(this,record)}>加入黑名单</Button>
              </div>
            )
        }
      }
    ]
    this.state={
      current:1,
      total:0,
      visitList:'',
      columns:columns
    }
  }
  updateClick=(values)=>{ 
    let companyId=window.localStorage.getItem('companyId')
    confirm({
      title: '编辑访客信息',
      content: (
        <Form ref={this.formRef}>
          <Form.Item label="访客姓名" name="visiter_name">
            <Input disabled='false' defaultValue={values.visiter_name}/>
          </Form.Item>
          <Form.Item label="访客电话" name="visiter_phone">
            <Input disabled='false' defaultValue={values.visiter_phone}/>
          </Form.Item>
          <Form.Item label="访客邮箱" name="visiter_email">
            <Input defaultValue={values.visiter_email}/>
          </Form.Item>
          <Form.Item label="来访时间" name="create_time">
            <DatePicker 
              defaultValue={moment(values.create_time, 'YYYY-MM-DD HH:mm')} 
              showTime 
              format="YYYY-MM-DD HH:mm"
              onChange={this.onChange} onOk={this.onOk} 
            />
          </Form.Item>
          <Form.Item label="离开时间" name="leave_time">
            <DatePicker 
              defaultValue={moment(values.leave_time, 'YYYY-MM-DD HH:mm')} 
              showTime 
              format="YYYY-MM-DD HH:mm"
              onChange={this.onChange} onOk={this.onOk} 
            />
          </Form.Item>
          <Form.Item label="被访人姓名" name="visited_name">
            <Input defaultValue={values.visited_name}/>
          </Form.Item>
          <Form.Item label="被访人电话" name="visited_phone">
            <Input defaultValue={values.visited_phone}/>
          </Form.Item>
        </Form>
      ),
      cancelText:'取消',
      okText:'确定',
      onOk:()=>{
        let formInps = this.formRef.current.getFieldsValue()
        if(formInps.create_time){
          formInps.create_time = moment(formInps.create_time).format("YYYY-MM-DD HH:mm")
        }
        if(formInps.leave_time){
          formInps.leave_time = moment(formInps.leave_time).format("YYYY-MM-DD HH:mm")
        }
        let newdata = {}
        Object.assign(newdata,{'companyId':companyId,'visiter_id':values.visiter_id},formInps)
        $.ajax({
          url:'http://localhost:3200/updateVisiter',
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
  deleteClick=(values)=>{
    let companyId = window.localStorage.getItem('companyId')
    confirm({
      title: '删除',
      content: (
        <p>确定将访客信息删除吗？<br/>删除之后将无法再找回！</p>
      ),
      cancelText:'取消',
      okText:'确定',
      onOk:()=>{
        $.ajax({
          url:'http://localhost:3200/deleteVisiterList',
          type: 'post',
          data:{'companyId':companyId,'visiter_id':values.visiter_id},
          success: function (data) {
            if(data.status == 0){
              window.location.reload()
            }
          }
        })
      }
    });
  }
  addBlacklist=(values)=>{
    let remark;
    let companyId=window.localStorage.getItem('companyId')
    let visiter_id = values.visiter_id
    let user_name = window.localStorage.getItem('user_name')
    let date1 = new Date()
    let actionTime = date1.getFullYear()+'-'+(date1.getMonth()+1)+'-'+date1.getDate()
    let data = {
      'companyId':companyId,
      'visiter_id':visiter_id,
      'user_name':user_name,
      'actionTime':actionTime,
    }
    let newData = {}
    console.log(actionTime)
    confirm({
      title: '访客加入黑名单',
      content: (
        <textarea ref={(refDom)=>{remark = refDom}}  rows="5" placeholder="请填写将访客加入黑名单的原因"></textarea>
      ),
      cancelText:'取消',
      okText:'确定',
      onOk:()=>{
        Object.assign(newData,data,{'remark':remark.value})
        console.log(newData)
        $.ajax({
          url:'http://localhost:3200/addBlacklist',
          type: 'post',
          data:newData,
          success: function (data) {
            if(data.status == 0){
              window.location.reload()
            }
          }
        })
      }
    });
  }
  componentWillMount(){
    let companyId=window.localStorage.getItem('companyId')
    let _this = this
    $.ajax({
      url:'http://localhost:3200/record',
      type: 'post',
      data:{companyId:companyId},
      success: function (data) {
        if(data.status == 0){
          _this.setState({
            visitList:data.data,
            total:data.data.total,
          })
        }
      }
    })
  }

  handleSubmit=(values)=>{
    let _this = this
    let companyId = window.localStorage.getItem('companyId')
    let data = {'companyId':Number(companyId)}
    let newObj = {};
    Object.assign(newObj,data,values)
    $.ajax({
      url:'http://localhost:3200/record',
      type: 'post',
      data: newObj,
      success: function (data) {
        if(data.status == 0){
          _this.setState({
            visitList:data.data,
            total:data.data.total,
          })
        }
      }
    })
  }

  render(){
    const {current,total,visitList,columns} = this.state
    return (
      <div className="ViewHome">
        <Form
          {...formItemLayout}
          onFinish = {this.handleSubmit}
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="访客姓名" name="visiter_name" defaultValue="">
                <Input/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="访客电话" name="visiter_phone" defaultValue="">
                <Input/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="被访人姓名" name="visited_name" defaultValue="">
                <Input/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="被访人电话" name="visited_phone" defaultValue="">
                <Input/>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            {...tailFormItemLayout}
          >
            <Button type="primary" htmlType="submit">查询</Button>
          </Form.Item>
        </Form>
        <Table
          columns={columns}
          dataSource={visitList.list}
          scroll={{x:1200}}
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
    );
  }

}

export default ViewRecord;
