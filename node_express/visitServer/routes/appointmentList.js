var express = require('express');
var appointmentListRouter = express.Router();
var connection = require('./mysql')
/* GET home page. */
appointmentListRouter.post('/', function(req, res, next) {
    let params = req.body
    let companyId = params.companyId
    let query = `select * from appointment where companyId='${companyId}'`
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

module.exports = appointmentListRouter;
