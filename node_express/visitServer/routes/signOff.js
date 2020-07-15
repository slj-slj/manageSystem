var express = require('express');
var signOffRouter = express.Router();
var connection = require('./mysql')
/* GET home page. */
signOffRouter.post('/', function(req, res, next) {
    let params = req.body
    let companyName = params.companyName
    let visiter_name = params.visiter_name
    let visiter_phone = params.visiter_phone
    let create_time = params.create_time
    let leave_time = params.leave_time
    let remark = params.remark || ''
    let star = params.star || ''
    let query = `update visiter set leave_time='${leave_time}',remark='${remark}',star='${star}' where companyName='${companyName}' and visiter_name='${visiter_name}' and visiter_phone='${visiter_phone}' and create_time='${create_time}'`
    connection.query(query,function(err,result){
        if(err) throw err
        else{
            
            res.send({
                status:0,
                msg:'SUCCESS'
            })
            res.end()
        }
    })
});

module.exports = signOffRouter;
