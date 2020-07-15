var express = require('express');
var deleteUserRouter = express.Router();
var connection = require('./mysql')
/* GET home page. */
deleteUserRouter.post('/', function(req, res, next) {
    let params = req.body
    let companyId =  params.companyId
    let user_id = params.user_id
    let query = `delete from user where companyId='${companyId}' and user_id=${user_id}`

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

module.exports = deleteUserRouter;
