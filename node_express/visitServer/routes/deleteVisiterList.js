var express = require('express');
var deleteVisiterListRouter = express.Router();
var connection = require('./mysql')
/* GET home page. */
deleteVisiterListRouter.post('/', function(req, res, next) {
    let params = req.body
    let companyId =  params.companyId
    let visiter_id = params.visiter_id
    let query = `delete from visiter where companyId='${companyId}' and visiter_id=${visiter_id}`

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

module.exports = deleteVisiterListRouter;
