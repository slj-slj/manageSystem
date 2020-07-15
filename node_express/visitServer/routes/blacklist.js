var express = require('express');
var blacklistRouter = express.Router();
var connection = require('./mysql')
/* GET home page. */
blacklistRouter.post('/', function(req, res, next) {
    let params = req.body
    let companyId =  params.companyId
    let visiter_id = params.visiter_id||''
    let visiter_name = params.visiter_name||''
    let actionPerson = params.actionPerson||''
    let query = `select * from blacklist where companyId='${companyId}'`

    if(visiter_id && !visiter_name && !actionPerson){
        query = `select * from blacklist where companyId='${companyId}' and visiter_id='${visiter_id}'`
    }else if(!visiter_id && visiter_name && !actionPerson){
        query = `select * from blacklist where companyId='${companyId}' and visiter_name='${visiter_name}'`
    }else if(!visiter_id && !visiter_name && actionPerson){
        query = `select * from blacklist where companyId='${companyId}' and actionPerson='${actionPerson}'`
    }else if(visiter_id && visiter_name && !actionPerson){
        query = `select * from blacklist where companyId='${companyId}' and visiter_id='${visiter_id}' and visiter_name='${visiter_name}'`
    }else if(visiter_id && !visiter_name && actionPerson){
        query = `select * from blacklist where companyId='${companyId}' and visiter_id='${visiter_id}' and actionPerson='${actionPerson}'`
    }else if(!visiter_id && visiter_name && actionPerson){
        query = `select * from blacklist where companyId='${companyId}' and visiter_name='${visiter_name}' and actionPerson='${actionPerson}'`
    }else if(visiter_id && visiter_name && actionPerson){
        query = `select * from blacklist where companyId='${companyId}' and visiter_id='${visiter_id}' and visiter_name='${visiter_name}' and actionPerson='${actionPerson}'`
    }else{
        query = `select * from blacklist where companyId='${companyId}'`
    }

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

module.exports = blacklistRouter;
