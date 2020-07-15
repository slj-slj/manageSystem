var express = require('express');
var addBlacklistRouter = express.Router();
var connection = require('./mysql')
/* GET home page. */
addBlacklistRouter.post('/', function(req, res, next) {
    let params = req.body
    let companyId =  params.companyId
    let visiter_id = params.visiter_id
    console.log(params)
    let query = `select * from visiter where companyId='${companyId}' and visiter_id=${visiter_id}`

    connection.query(query,function(err,result){
        if(err) throw err
        else{
            let star = result[0].star || ''
            let visitermark = result[0].remark || ''
            let leave_time = result[0].leave_time || ''
            let queryInsert = `insert into blacklist values ('${result[0].visiter_id}','${result[0].visiter_name}','${result[0].visiter_phone}','${result[0].visiter_email}','${result[0].create_time}','${leave_time}','${result[0].visited_name}','${result[0].visited_phone}','${result[0].companyName}','${result[0].companyId}','${params.user_name}','${params.actionTime}','${params.remark}','${star}','${visitermark}')`
            connection.query(queryInsert,function(err2,result2){
                if(err2) throw err2
                else{
                    let queryDelect = `delete from visiter where companyId='${companyId}'and visiter_id='${params.visiter_id}'`
                    connection.query(queryDelect,function(err3,result3){
                        if(err3) throw err3
                        else{
                            res.send({
                                status:0,
                                msg:'SUCCESS'
                            })
                            res.end()
                        }
                    })
                    
                }
            })
        }
    })
});

module.exports = addBlacklistRouter;
