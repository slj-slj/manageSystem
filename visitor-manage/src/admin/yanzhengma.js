"use strict";
var React = require('react');
var AMR = require('amazeui-react');
var PropTypes = require('prop-types')
var Input = AMR.Input;
var Captcha = React.createClass({
    propTypes: {
        bgImage: React.PropTypes.string,
        size: React.PropTypes.number,
        captchaType: React.PropTypes.oneOf(['Calculation', 'Normal']),
        color: React.PropTypes.string
    },
    getDefaultProps: function() {
        return {
            size: 4,
            captchaType: 'Normal'
        };
    },
    getInitialState: function(){
        return {
            expression: '',
            validate: '',
            validateInput: ''
        };
    },
    renderCode: function() {
        //定义expression和result，expression是字符串，result可能是字符串也可能是数字
        var expression = '', result;
        //判断验证码类型    
        if (this.props.captchaType == 'Calculation') {
            result = 0;//计算类型则result为数字，初始化为0
            //获取随机的两个两位数
            var Calpre = Math.round(Math.random()*100);
            var Calafter = Math.round(Math.random()*100);
    
            var codeCal = ['-','+','x'];//运算符
            var i = Math.round(Math.random()*2);//获得随机运算符
    
            switch (codeCal[i]) {//判断运算符并计算
                case '-': 
                    expression = Calpre + '-' + Calafter;
                    result = Calpre - Calafter;
                    break;
                case '+': 
                    expression = Calpre + '+' + Calafter;
                    result = Calpre + Calafter;
                    break;
                case 'x': 
                    expression = Calpre + 'x' + Calafter;
                    result = Calpre * Calafter;
                    break;
            }
        } else if (this.props.captchaType == 'Normal'){
            result = '';
            var codeNormal = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';//字母库
            for (var i =0; i < this.porps.size; i ++) {
                result = result + codeNormal[Math.round(Math.random()*(codeNormal.length-1))];
            }//随机获取字母四个
    
            expression = result.toLowerCase();//忽略大小写
        }
    
        this.setState({//设置更新状态
            expression: expression,
            validate: result
        });
    },
    componentDidMount: function() {
        this.renderCode();
    },
    handleChange: function() {
        this.setState({
            validateInput: this.refs.field.getValue()
        });
    },
    validate: function() {
        var thisInput = this.state.validateInput;
        var validateCode = this.state.validate;
        if (thisInput.toLowerCase() == validateCode.toString().toLowerCase()) {
            return 'success';
        } else if (thisInput != ''){
            return 'error';
        }
    },
    render: function() {
        var inlineStyle = {
            color: this.props.color,
            backgroundImage: 'url(' + this.props.bgImage + ')'
        };
        return (
            <div>
                <Input
                value={this.state.validateInput}
                placeholder="请输入验证码"
                validation={this.validate()}
                ref="field"
                onChange={this.handleChange} hasFeedback/>
                <AMR.Button style={inlineStyle} 
                className="am-btn" 
                onClick={this.renderCode}>
                {this.state.expression}</AMR.Button>
            </div>
        );
    }
})
module.exports = Captcha;