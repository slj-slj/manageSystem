var express = require('express');
var updatePasswordRouter = express.Router();
var connection = require('./mysql')
/* GET home page. */
updatePasswordRouter.post('/', function(req, res, next) {
    let params = req.body
    let phone = params.phoneU
    let password = params.passwordU
    let query = `select * from user where user_phone='${phone}'`
    
    connection.query(query,function(err,result){
        if(err) throw err
        else{
            if(result.length == 0){
                res.send({
                    status:99,
                    msg:'该手机号还未注册或不再任何一家公司下！'
                })
                res.end()
            }else{
                let query2 = `update user set user_password='${password}'`
                // console.log(query2)
                connection.query(query2,function(err2,result2){
                    if(err2) throw err2
                    else{
                        res.send({
                            status:0,
                            msg:'SUCCESS'
                        })
                        res.end()
                    }
                })
            }
            
        }
    })
});

module.exports = updatePasswordRouter;
