var express = require('express');
var changeRoleRouter = express.Router();
var connection = require('./mysql')
/* GET home page. */
changeRoleRouter.post('/', function(req, res, next) {
    let params = req.body
    let companyId = params.companyId
    let phoneArr = JSON.parse(params.userPhoneArr)
    let role = params.role
    let sqlReason = ''
    console.log(params.userPhoneArr)
    for(let i=0;i<phoneArr.length-1;i++){
        sqlReason+= `user_phone='${phoneArr[i]}' or `
    }
    sqlReason+=`user_phone='${phoneArr[phoneArr.length-1]}'`
    let query = `update user set role='${role}' where companyId='${companyId}' and ${sqlReason}`
    console.log(query)
    
    connection.query(query,function(err,result){
        if(err) throw err
        else{
            res.send({
                status:0,
                msg:'SUCCESS'
            })
        }
    })
});

module.exports = changeRoleRouter;
