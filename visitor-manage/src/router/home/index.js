import React,{Component} from 'react';
import {Link} from 'react-router-dom'
// import 'swiper/js/swiper.min.js'
import Swiper from "swiper"
import 'swiper/css/swiper.min.css'
import './../../styles/home/home.less';

import swiper1 from './../../images/swiper1.jpg'
import swiper2 from './../../images/swiper2.jpg'
import swiper3 from './../../images/swiper3.jpg'
import logo from './../../images/logo.png'
import guanli from './../../images/guanli2.png'
import fenxi from './../../images/analysis.png'
import yuyue from './../../images/invatite.png'
import anquan from './../../images/safe.png'

class Home extends Component{
  constructor(props){
    super(props)
    this.state = {
      bgWhite:false
    }
  }
  componentDidMount(){
    new Swiper ('.swiper-container', {
      loop: true,
      autoplay:true,
      pagination: {
        el: '.swiper-pagination',
        hideOnClick :true,
      },
      
    });
    window.addEventListener('scroll', this.bindHandleScroll)              
  }
  bindHandleScroll=(event)=>{
    // 滚动的高度
    const scrollTop = (event.srcElement ? event.srcElement.documentElement.scrollTop : false) 
                  || window.pageYOffset
                  || (event.srcElement ? event.srcElement.body.scrollTop : 0);
    if(scrollTop>0){
      this.setState({
        bgWhite:true
      })
    }else{
      this.setState({
        bgWhite:false
      })        
    }
  }
  LoginClick=()=>{
    console.log(111)
  }
  render(){
    return (
      <div className="homePage">
        <div className={!this.state.bgWhite?'menu':'menu bgWhite'}>
          <div className="menu_left">
            <img src={logo} alt=""/>
            <h2>访客信息管理平台</h2>
          </div>
          <div className="menu_right">
            <a href="#/login"><button>登 录</button></a>
            <a href="#/register"><button>注 册</button></a>
          </div>
        </div>
        <div className="swiper-container">
          <div className="swiper-wrapper">
              <div className="swiper-slide"><img src={swiper1} alt=""/></div>
              <div className="swiper-slide"><img src={swiper2} alt=""/></div>
              <div className="swiper-slide"><img src={swiper3} alt=""/></div>
          </div>
          <div className="swiper-pagination"></div>
        </div>
        <div className="homeCont">
          <div className="partInfor infor1">
            <div className="mengban"></div>
            <div className="conInfor">
              <img src={guanli} alt=""/>
              <h2>访客管理</h2>
              <p>告别传统访客来访手动录入信息<br/>提高管理效率</p>
            </div>
            
          </div>
          <div className="partInfor infor2">
            <div className="mengban"></div>
            <div className="conInfor">
              <img src={fenxi} alt=""/>
              <h2>数据分析</h2>
              <p>对访客数据进行整理与分析<br/>直接可观、方便快捷</p>
            </div>
          </div>
          <div className="partInfor infor3">
            <div className="mengban"></div>
            <div className="conInfor">
              <img src={yuyue} alt=""/>
              <h2>访客预约</h2>
              <p>访客来访之前可进行预约<br/>方便员工提前预留时间</p>
            </div>
          </div>
          <div className="partInfor infor4" style={{'marginRgiht':'none'}}>
            <div className="mengban"></div>
            <div className="conInfor">
              <img src={anquan} alt=""/>
              <h2>安全可靠</h2>
              <p>确定访客信息正确性<br/>减少公司员工不必要的麻烦</p>
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="footer_left">
            <img src={logo} alt=""/>
            <p>访客信息管理平台</p>
          </div>
          <p className="footer_right">客服电话：13287456699</p>
        </div>
      </div>
    );
  }
 
}

export default Home;
