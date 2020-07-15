var express = require('express');
var selectSelfInfoRouter = express.Router();
var connection = require('./mysql')
/* GET home page. */
selectSelfInfoRouter.post('/', function(req, res, next) {
    let params = req.body
    let companyId = params.companyId
    let user_phone = params.user_phone 
    let query = `select * from user where companyId='${companyId}' and user_phone='${user_phone}'`
    
    connection.query(query,function(err,result){
        if(err) throw err
        else{
            res.send({
                status:0,
                msg:'SUCCESS',
                data:result
            })
            res.end()
        }
    })
});

module.exports = selectSelfInfoRouter;
