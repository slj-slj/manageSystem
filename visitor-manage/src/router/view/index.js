import React,{ Component } from 'react';
import { Layout, Menu,Popover,Button } from 'antd';
import { Route, Switch, withRouter } from 'react-router'
import ViewManage from './record';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
// import ViewManage from './manage';
import ViewHomeCon from './home';

import './../../styles/view/viewHome.less';

import logo from './../../images/logo.png'
import qiyexinxi from './../../images/qiyexinxi.png'
import record from './../../images/record.png'
import home from './../../images/home.png'
import report from './../../images/report.png'
import setting from './../../images/setting.png'
import blacklist from './../../images/blacklist.png'
import xiaoxi from './../../images/xiaoxi.png'
import ViewRecord from './record';
import ViewReport from './report';
import ViewPersonnel from './personnel';
import AddUser from './addUser';
import ViewRole from './role';
import ViewBlacklist from './blacklist';
import roleList from './roleList';
import ViewSetting from './setting';
import AppointmentList from './appointmentList';


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


class ViewHome extends Component{
  constructor(props){
    super(props);
    this.state={
      collapsed: false,
      companyName:window.localStorage.getItem('companyName'),
      phone:window.localStorage.getItem('user_phone'),
      role:window.localStorage.getItem('role'),
    }
  }

  componentWillMount(){
    let companyId = window.localStorage.getItem('companyId')
    if(!companyId){
      this.props.history.push('/login')
    }
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  LoadingComponent = () =>{
    return <div>abababa</div>
  }

  exitLogin=()=>{
    window.localStorage.clear()
    this.props.history.push('/login')
  }

  render(){
    const { location } = this.props
    const {companyName,phone,role} = this.state
    console.log(phone,role)
    const content = (
      <Button onClick={this.exitLogin}>退出登录</Button>
    )
    return (
      <div className="ViewHome">
        <Layout>
          <Sider
            style={{
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0,
              zIndex:1000,
            }}
          >
            <div className="logo">
              <img src={logo} alt=""/>
              <h2>访客管理系统</h2>
            </div>
            <Menu
              theme = {"dark"}
              selectedKeys={[location.pathname]}
              mode="inline"
            >
              <Menu.Item key="/viewhome/home">
                <img src={home}/>
                <a href="#/viewhome/home" className="menu-title">首页</a>
              </Menu.Item>
              <Menu.Item key="/viewhome/record">
                <img src={record}/>
                <a href="#/viewhome/record" className="menu-title">访客数据</a>
              </Menu.Item>
              <Menu.Item key="/viewhome/report">
                <img src={report}/>
                <a href="#/viewhome/report" className="menu-title">访客报表</a>
              </Menu.Item>
              <Menu.ItemGroup
                // title="企业信息"
                title={
                  <div>
                    <img src={qiyexinxi} alt=""/>
                    <span className="menu-title">企业信息</span>
                  </div>
                }
              >
                  <Menu.Item key="/viewhome/personnel">
                    <a href="#/viewhome/personnel" className="menu-title-child">管理员</a>
                    </Menu.Item>
                  <Menu.Item key="/viewhome/role">
                    <a href="#/viewhome/role" className="menu-title-child">角色</a>
                  </Menu.Item>
              </Menu.ItemGroup>
              <Menu.Item key="/viewhome/blacklist">
                <img src={blacklist}/>
                <a href="#/viewhome/blacklist" className="menu-title">黑名单</a>
              </Menu.Item>
              <Menu.Item key="/viewhome/setting">
                <img src={setting}/>
                <a href="#/viewhome/setting" className="menu-title">设置</a>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout" style={{ marginLeft: 200 }}>
            <Header className="site-layout-background headerAll" style={{ padding: 0 }} >
              <div className="header-content">
                <h2>{companyName}</h2>
                <div className="userinfo">
                  <div  
                    onClick={()=>{this.props.history.push('/viewhome/appointmentList')}}
                    style={{'display':'flex','flexDirection':'column','alignItems':'center','marginRight':'20px','cursor':'pointer'}}
                  >
                    <img src={xiaoxi} alt=""/>
                    <p style={{'lineHeight':'20px'}}>查看预约</p>
                  </div>
                  <p>
                    <Popover placement="bottom"  content={content} trigger="hover" className='phoneNum'>
                      {phone}
                    </Popover>
                    <span data-role={role}>{role == 0?'初级管理员':(role == 1?'中级管理员':role == 2?'高级管理员':'')}</span>
                  </p>
                </div>
              </div>
            </Header>
            <Content style={{ 'margin': '94px 16px 0', 'overflow': 'initial' }}>
              {/* {this.props.children} */}
              <Switch>
                <Route path="/viewhome/home" component={ViewHomeCon}/>
                <Route exact path="/viewhome/manage" component={ViewManage}/>
                <Route exact path="/viewhome/record" component={ViewRecord}/>
                <Route exact path="/viewhome/report" component={ViewReport}/>
                <Route exact path="/viewhome/personnel" component={ViewPersonnel}/>
                <Route exact path="/viewhome/addUser" component={AddUser}/>
                <Route exact path="/viewhome/role" component={ViewRole}/>
                <Route exact path="/viewhome/roleList" component={roleList}/>
                <Route exact path="/viewhome/blacklist" component={ViewBlacklist}/>
                <Route exact path="/viewhome/setting" component={ViewSetting}/>
                <Route exact path="/viewhome/appointmentList" component={AppointmentList}/>
              </Switch>
            </Content>
            <Footer style={{ textAlign: 'center' }}>访客管理系统@2020 slinajary</Footer>
          </Layout>
        </Layout>
      </div>
    );
  }

}

export default ViewHome;
