var express = require('express');
var acceptVisitRouter = express.Router();
var connection = require('./mysql')
/* GET home page. */
acceptVisitRouter.post('/', function(req, res, next) {
    let params = req.body
    let companyId = params.companyId
    let time = params.time
    let phone = params.phone
    let query = `update appointment set type='1' where companyId='${companyId}' and visiter_phone='${phone}' and create_time='${time}'`
    
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

module.exports = acceptVisitRouter;
