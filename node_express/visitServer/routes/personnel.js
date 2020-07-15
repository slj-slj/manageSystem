var express = require('express');
var personnelRouter = express.Router();
var connection = require('./mysql')
/* GET home page. */
personnelRouter.post('/', function(req, res, next) {
    let params = req.body
    var companyId =  params.companyId
    var query = `select * from user where companyId='${companyId}'`

    connection.query(query,function(err,result){
        
        if(err) throw err
        else{
          let length = result.length
          res.send({
              status:0,
              msg:'SUCCESS',
              data:{
                  list:result,
                  total:length
              }
          })
          res.end()
        }
    })
});

module.exports = personnelRouter;
