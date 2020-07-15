import React,{ Component } from 'react';
import { Tabs,Button} from 'antd';

import '../../styles/view/home.less'
import role from './../../images/role.png'
import employee from './../../images/employee.png'
import one from './../../images/one.png'
import two from './../../images/two.png'
import three from './../../images/three.png'
import four from './../../images/four.png'

const { TabPane } = Tabs;

class ViewHomeCont extends Component{
  constructor(props){
    super(props);
    this.state={
        
    }
  }

  callback = (key) => {
    console.log(key);
  }

  render(){
    return (
      <div className="homeIndex">
        <div className="tabs">
          <div className="foots">
            <p>新手引导</p>
            <span>仅需2步，安心使用，让访客管理更简单</span>
          </div>
          <Tabs defaultActiveKey="1" onChange={this.callback} type="card" tabBarGutter="25">
            <TabPane tab="添加员工" key="1" forceRender="true">
              <div className="footsout">
                <div>
                  <h5>第一步 添加员工</h5>
                  <p>
                    <img src={one} alt=""/> 点击左侧菜单中的“员工”
                  </p>
                  <p>
                    <img src={two} alt=""/> 点击新增
                  </p>
                  <p>
                    <img src={three} alt=""/> 输入员工基本信息
                  </p>
                  <p>
                    <img src={four} alt=""/> 输入之后点击确定，即可添加（添加员工的登录密码与添加者一致）
                  </p>
                  <a href="#/viewhome/personnel"><Button>立即前往</Button></a>
                </div>
                <img src={employee} alt=""/>
              </div>
              
            </TabPane>
            <TabPane tab="角色设置" key="2" forceRender="true">
              <div className="footsout">
                <div>
                  <h5>第二步 给员工赋予角色</h5>
                  <p>
                    <img src={one} alt=""/> 点击左侧菜单中的“角色”
                  </p>
                  <p>
                    <img src={two} alt=""/> 在列表里找到对应的角色，点击“管理成员”
                  </p>
                  <p>
                    <img src={three} alt=""/> 点击添加员工
                  </p>
                  <p>
                    <img src={four} alt=""/> 在出现的多选列表中选中要添加的员工，点击“确定”
                  </p>
                  <a href="#/viewhome/role"><Button>立即前往</Button></a>
                </div>
                <img src={role} alt=""/>
              </div>
            </TabPane>
          </Tabs>
        </div>
        
      </div>
    );
  }

}

export default ViewHomeCont;
