var express = require('express');
var loginRouter = express.Router();
var connection = require('./mysql')
/* GET home page. */
loginRouter.post('/', function(req, res, next) {
    let params = req.body
    var phone =  req.body.phone
    var pwd = req.body.password
    var query = `select * from user where user_phone='${phone}' AND user_password = '${pwd}'`

    connection.query(query,function(err,result){
        // console.log(0)
        let data = result[0]
        if(err) throw err
        else{
            if(result.length == 0){
                res.send({
                    status:1,
                    msg:'手机号或密码错误'
                })
                res.end()
            }else{
                res.send({
                    status:0,
                    msg:'登录成功',
                    data:{
                        phone:data.user_phone,
                        role:data.role,
                        companyName:result[0].companyName,
                        companyId:result[0].companyId,
                        user_name:result[0].user_name
                    }
                })
                res.end()
            }
        }
    })
});

module.exports = loginRouter;
