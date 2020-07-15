var express = require('express');
var roleListRouter = express.Router();
var connection = require('./mysql')
/* GET home page. */
roleListRouter.post('/', function(req, res, next) {
    let params = req.body
    var companyId =  params.companyId
    let role = params.role
    var query = `select * from user where companyId='${companyId}' and role='${role}'`

    connection.query(query,function(err,result){
        if(err) throw err
        else{
            res.send({
                status:0,
                msg:'SUCCESS',
                data:{
                    total:result.length,
                    roleList:result
                }
            })
        }
    })
});

module.exports = roleListRouter;
