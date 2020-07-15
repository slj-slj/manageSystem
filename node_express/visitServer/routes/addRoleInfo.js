var express = require('express');
var addRoleInfoRouter = express.Router();
var connection = require('./mysql')
/* GET home page. */
addRoleInfoRouter.post('/', function(req, res, next) {
    let params = req.body
    let companyId =  params.companyId
    let role = params.role
    let roleAll = params.roleAll
    let user_phone = params.user_phone
    let query;
    if(roleAll == 1){
        if(role == 0){
            query = `select * from user where companyId='${companyId}' and role='1'`
        }else if(role == 1){
            query = `select * from user where companyId='${companyId}' and role='0'`
        }
    }else if(roleAll == 2){
        if(role == 0){
            query = `select * from user where companyId='${companyId}' and (role='1' or role='2') and user_phone!='${user_phone}'`
        }else if(role == 1){
            query = `select * from user where companyId='${companyId}' and (role='0' or role='2') and user_phone!='${user_phone}'`
        }else if(role ==2){
            query = `select * from user where companyId='${companyId}' and (role='0' or role='1')`
        }
    }
    connection.query(query,function(err,result){
        if(err) throw err
        else{
            res.send({
                status:0,
                data:result
            })
            res.end()
        }
    })
});

module.exports = addRoleInfoRouter;
