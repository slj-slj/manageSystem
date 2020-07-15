import React,{ Component } from 'react';
import {Form,Row,Col,Input,Select,DatePicker,Button,Table,Modal} from 'antd'
import $ from 'jquery'
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

class ViewBlacklist extends Component{
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
        title:'操作时间',
        dataIndex:'actionTime',
        key:'actionTime'
      },{
        title:'操作人',
        dataIndex:'actionPerson',
        key:'actionPerson'
      },{
        title:'备注',
        dataIndex:'remark',
        key:'remark'
      },{
        title:'操作',
        dataIndex:'action',
        key:'action',
        render:(value,record) => {
          return (
              <div>
                <Button type='link' size='small' onClick={this.detailClick.bind(this,record)}>详情</Button>
                <Button type='link' size='small' disabled={role==2?false:true} onClick={this.removeBlacklist.bind(this,record)}>移除</Button>
              </div>
            )
        }
      }
    ]
    this.state={
      blackList:[],
      current:1,
      total:0,
      columns:columns
    }
  }

  componentWillMount(){
    let _this = this
    let companyId = window.localStorage.getItem('companyId')
    $.ajax({
      url:'http://localhost:3200/blacklist',
      type:'post',
      data:{'companyId':companyId},
      success:function(data){
        if(data.status ==0){
          console.log(data.data.list)
          _this.setState({
            blackList:data.data.list,
            total:data.data.total
          })
        }
      }
    })
  }

  detailClick=(values)=>{
    confirm({
      title:'详情',
      width:700,
      content:(
        <div className="detailInfo">
          <div className="detailinfor">
            <p>访客ID：{values.visiter_id}</p>
            <p>访客名称：{values.visiter_name}</p>
          </div>
          <div className="detailinfor">
            <p>访客电话：{values.visiter_phone}</p>
            <p>访客邮箱：{values.visiter_email}</p>
          </div>
          <div className="detailinfor">
            <p>来访时间：{values.create_time}</p>
            <p>离开时间：{values.leave_time}</p>
          </div>
          <div className="detailinfor">
            <p>被访人姓名：{values.visited_name}</p>
            <p>被访人电话：{values.visited_phone}</p>
          </div>
          <div className="detailinfor">
            <p>操作人：{values.actionPerson}</p>
            <p>操作时间：{values.actionTime}</p>
          </div>
          <div>
            <p>备注：{values.remark}</p>
          </div>
        </div>
      ),
      cancelText:'取消',
      okText:'确定',
    })
  }

  removeBlacklist=(values)=>{
    let companyId = window.localStorage.getItem('companyId')
    confirm({
      title: '移除',
      content: (
        <p>确定将访客移除黑名单吗？</p>
      ),
      cancelText:'取消',
      okText:'确定',
      onOk:()=>{
        $.ajax({
          url:'http://localhost:3200/removeBlacklist',
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
  handleSubmit=(values)=>{
    console.log(values)
    let companyId = window.localStorage.getItem('companyId')
    let newData = {}
    let data = {'companyId':companyId}
    Object.assign(newData,data,values)
    $.ajax({
      url:'http://localhost:3200/blacklist',
      type:'post',
      data:newData,
      success:(data)=>{
        if(data.status ==0){
          console.log(data.data.list)
          this.setState({
            blackList:data.data.list,
            total:data.data.total
          })
        }
      }
    })
  }

  render(){
    const {current,total,blackList,columns} = this.state
    return (
      <div className="ViewHome">
        <Form
          {...formItemLayout}
          onFinish = {this.handleSubmit}
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="访客ID" name="visiter_id">
                <Input/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="访客姓名" name="visiter_name">
                <Input/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="操作人姓名" name="actionPerson">
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
          dataSource={blackList}
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

export default ViewBlacklist;
