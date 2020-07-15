var express = require('express');
var recordRouter = express.Router();
var connection = require('./mysql')
/* GET home page. */
recordRouter.post('/', function(req, res, next) {
    let params = req.body
    let companyId = req.body.companyId
    let visiter_name = params.visiter_name?params.visiter_name:''
    let visiter_phone = params.visiter_phone?params.visiter_phone:''
    let visited_name = params.visited_name?params.visited_name:''
    let visited_phone = params.visited_phone?params.visited_phone:''
    let query = `select * from visiter where companyId='${companyId}'`
    if(visiter_name&&visiter_phone&&visited_name&&visited_phone){
        query = `select * from visiter where companyId='${companyId}' and visiter_name='${visiter_name}' and visiter_phone='${visiter_phone}' and visited_name='${visited_name}' and visited_phone='${visited_phone}'`
    }else if(visiter_name&&visiter_phone&&visited_name&&!visited_phone){
        query = `select * from visiter where companyId='${companyId}' and visiter_name='${visiter_name}' and visiter_phone='${visiter_phone}' and visited_name='${visited_name}'`
    }else if(visiter_name&&visiter_phone&&!visited_name&&visited_phone){
        query = `select * from visiter where companyId='${companyId}' and visiter_name='${visiter_name}' and visiter_phone='${visiter_phone}' and visited_phone='${visited_phone}'`
    }else if(visiter_name&&!visiter_phone&&visited_name&&visited_phone){
        query = `select * from visiter where companyId='${companyId}' and visiter_name='${visiter_name}' and visited_name='${visited_name}' and visited_phone='${visited_phone}'`
    }else if(!visiter_name&&visiter_phone&&visited_name&&visited_phone){
        query = `select * from visiter where companyId='${companyId}' and visiter_phone='${visiter_phone}' and visited_name='${visited_name}' and visited_phone='${visited_phone}'`
    }else if(visiter_name&&visiter_phone&&!visited_name&&!visited_phone){
        query = `select * from visiter where companyId='${companyId}' and visiter_name='${visiter_name}' and visiter_phone='${visiter_phone}'`
    }else if(visiter_name&&!visiter_phone&&visited_name&&!visited_phone){
        query = `select * from visiter where companyId='${companyId}' and visiter_name='${visiter_name}' and visited_name='${visited_name}'`
    }else if(!visiter_name&&visiter_phone&&visited_name&&!visited_phone){
        query = `select * from visiter where companyId='${companyId}' and visiter_phone='${visiter_phone}' and visited_name='${visited_name}'`
    }else if(visiter_name&&!visiter_phone&&!visited_name&&visited_phone){
        query = `select * from visiter where companyId='${companyId}' and visiter_name='${visiter_name}' and visited_phone='${visited_phone}'`
    }else if(!visiter_name&&!visiter_phone&&visited_name&&visited_phone){
        query = `select * from visiter where companyId='${companyId}' and visited_name='${visited_name}' and visited_phone='${visited_phone}'`
    }else if(!visiter_name&&visiter_phone&&!visited_name&&visited_phone){
        query = `select * from visiter where companyId='${companyId}' and visiter_phone='${visiter_phone}' and visited_phone='${visited_phone}'`
    }else if(visiter_name&&!visiter_phone&&!visited_name&&!visited_phone){
        query = `select * from visiter where companyId='${companyId}' and visiter_name='${visiter_name}'`
        console.log(query)
    }else if(!visiter_name&&visiter_phone&&!visited_name&&!visited_phone){
        query = `select * from visiter where companyId='${companyId}' and visiter_phone='${visiter_phone}'`
    }else if(!visiter_name&&!visiter_phone&&visited_name&&!visited_phone){
        query = `select * from visiter where companyId='${companyId}' and visited_name='${visited_name}'`
    }else if(!visiter_name&&!visiter_phone&&!visited_name&&visited_phone){
        query = `select * from visiter where companyId='${companyId}' and visited_phone='${visited_phone}'`
    }else{
        query = `select * from visiter where companyId='${companyId}'`
    }
    connection.query(query,function(err,result){
        if(err) throw err
        else{
            let length = result.length
            console.log(result)
            res.send({
                status:0,
                msg:'success',
                data:{
                    total:length,
                    list:result
                }
            })
        }
    })
});

module.exports = recordRouter;
