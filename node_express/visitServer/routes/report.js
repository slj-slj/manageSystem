var express = require('express');
var reportRouter = express.Router();
var connection = require('./mysql')
/* GET home page. */
reportRouter.post('/', function(req, res, next) {
    let params = req.body
    let companyId = params.companyId
    let year = params.year
    let query = `select month (create_time) as month,count(*) as counts from visiter where companyId='${companyId}' and year ( create_time) = ${year} group by month ( create_time )`
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

module.exports = reportRouter;
