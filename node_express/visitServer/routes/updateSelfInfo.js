var express = require('express');
var selectSelfInfoRouter = express.Router();
var connection = require('./mysql')
/* GET home page. */
selectSelfInfoRouter.post('/', function(req, res, next) {
    let params = req.body
    let companyId = params.companyId
    let user_phone = params.user_phone 
    let user_phonenew = params.user_phonenew || '' 
    let user_email=params.user_email || ''
    let query = `select * from user where companyId='${companyId}' and user_phone='${user_phone}'`
    
    connection.query(query,function(err,result){
        if(err) throw err
        else{
            if(!user_phonenew){
                user_phonenew = result[0].user_phone
            }
            if(!user_email){
                user_email = result[0].user_email
            }
            let query2 = `update user set user_phone='${user_phonenew}',user_email='${user_email}' where companyId='${companyId}' and user_phone='${user_phone}'`
            // console.log(query2)
            connection.query(query2,function(err2,result2){
                if(err2) throw err2
                else{
                    res.send({
                        status:0,
                        msg:'SUCCESS',
                        data:{
                            user_phone:user_phonenew
                        }
                    })
                    res.end()
                }
            })
        }
    })
});

module.exports = selectSelfInfoRouter;