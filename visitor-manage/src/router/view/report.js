import React,{ Component } from 'react';
import {Input,Select,Form,Button,DatePicker} from 'antd'
import ReactEcharts from 'echarts-for-react'
import moment from 'moment'
import $ from 'jquery'
import './../../styles/view/record.less'
const { Option } = Select;

class ViewReport extends Component{
  constructor(props){
    super(props);
    let option = {
      title:{
        text:'一年内每月访客数量展示',
        textAlign:'center',
        x:'center',
        y:'top',

      },
      xAxis: {
          type: 'category',
          data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
      },
      yAxis: {
          type: 'value',
          name:'访客数量'
      },
      series: [{
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          type: 'line'
      }]
    };
    this.state={
      companyId:window.localStorage.getItem('companyId'),
      nowYear:'',
      option:option,
      countList:''
    }
  }

  componentWillMount(){
    let date = new Date()
    let nowYear = date.getFullYear()
    this.setState({
      nowYear:nowYear
    })
  }

  disabledDate = (current)=>{
    // Can not select days before today and today
    return current && current > moment().endOf('year');
  }

  timeSelect=(values)=>{
   let year = moment(values.year).format('YYYY')
   
    $.ajax({
      url:'http://localhost:3200/report',
      type:'post',
      data:{'companyId':this.state.companyId,'year':year},
      success:(data)=>{
        if(data.status == 0){
          if(data.data.length == 0){
            for(let i=0; i<12;i++){
              this.setState((state)=>{
                return state.option.series[0].data[i]=0
              })
            }
          }else{
            for(let i=0;i<data.data.length;i++){
              this.setState((state)=>{
                return state.option.series[0].data[data.data[i].month-1]=data.data[i].counts
              })
            }
          }
        }
      }
    })
  }

  render(){
    const {option,nowYear} = this.state
    return (
      <div className="reportHome">
        <Form onFinish={this.timeSelect} layout="inline" >
          <Form.Item name="year">
            <DatePicker picker="year" disabledDate={this.disabledDate} placeholder="选择年份"/>
          </Form.Item>
          <Button type="primary" htmlType="submit">查询</Button>
        </Form>
        <ReactEcharts
          option={option}
          style={{height: '350px', width: '1000px'}}
          className='react_for_echarts' 
          key={Date.now()}
          style={{
            'marginTop':'50px'
          }}
        />
      </div>
    );
  }

}

export default ViewReport;
