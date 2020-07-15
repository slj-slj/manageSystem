var express = require('express');
var addUserRouter = express.Router();
var connection = require('./mysql')
/* GET home page. */
addUserRouter.post('/', function(req, res, next) {
    let params = req.body
    let companyId =  params.companyId
    let user_phone = params.user_phone
    let phoneQuery = `select * from user where companyId='${companyId}' and user_phone='${params.addUser_phone}'`
    connection.query(phoneQuery,function(errPhone,resultPhone){
        if(errPhone) throw errPhone
        else{
            if(resultPhone.length !== 0){
                res.send({
                    status:1,
                    msg:'该手机号已经存在'
                })
                res.end()
            }else{
                let query = `select * from user where companyId='${companyId}' and user_phone=${user_phone}`
                connection.query(query,function(err,result){
                    if(err) throw err
                    else{
                        let queryInsert = `insert into user (user_name,user_password,user_email,role,user_phone,companyName,companyId) values ('${params.user_name}','${result[0].user_password}','${params.user_email}','${params.role}','${params.addUser_phone}','${result[0].companyName}','${companyId}')`
                        connection.query(queryInsert,function(err2,result2){
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
                })
            }
        }
    })
});

module.exports = addUserRouter;
