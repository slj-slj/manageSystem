var express = require('express');
var refuseVisitRouter = express.Router();
var connection = require('./mysql')
/* GET home page. */
refuseVisitRouter.post('/', function(req, res, next) {
    let params = req.body
    let companyId = params.companyId
    let time = params.time
    let phone = params.phone
    let query = `delete from appointment where companyId='${companyId}' and visiter_phone='${phone}' and create_time='${time}'`
    
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

module.exports = refuseVisitRouter;
