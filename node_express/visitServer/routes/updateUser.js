var express = require('express');
var updateUserRouter = express.Router();
var connection = require('./mysql')
/* GET home page. */
updateUserRouter.post('/', function(req, res, next) {
    let params = req.body
    let companyId = params.companyId
    let user_id = params.user_id
    let user_phone = params.user_phone?params.user_phone:''
    let user_email=params.user_email || ''
    let role = params.role || ''
    let query = `select * from user where companyId='${companyId}' and user_id='${user_id}'`
    
    connection.query(query,function(err,result){
        if(err) throw err
        else{
            if(!user_phone){
                user_phone = result[0].user_phone
            }
            if(!user_email){
                user_email = result[0].user_email
            }
            if(!role){
                role = result[0].role
            }
            let query2 = `update user set user_phone='${user_phone}',user_email='${user_email}',role='${role}' where companyId='${companyId}' and user_id='${user_id}'`
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
    })
});

module.exports = updateUserRouter;
