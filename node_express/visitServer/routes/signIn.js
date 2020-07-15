var express = require('express');
var signInRouter = express.Router();
var connection = require('./mysql')
/* GET home page. */
signInRouter.post('/', function(req, res, next) {
    let params = req.body
    let companyName = params.companyName
    let visiter_name = params.visiter_name
    let visiter_phone = params.visiter_phone
    let create_time = params.time
    let query = `select * from appointment where companyName='${companyName}' and visiter_name='${visiter_name}' and visiter_phone='${visiter_phone}' and type='1' and (create_time>=date_sub('${create_time}',interval 15 minute) and create_time<=date_sub('${create_time}',interval -45 minute))`
    // console.log(query)
    connection.query(query,function(err,result){
        if(err) throw err
        else{
            console.log(result)
            if(result.length == 0){
                res.send({
                    status:1,
                    msg:'抱歉，您可能没有预约成功或者超出预约时间15分钟'
                })
                res.end()
            }else{
                let paramRe = result[0]
                let queryAll = 'select * from visiter'
                connection.query(queryAll,function(err1,result1){
                    if(err1) throw err1
                    else{
                        if(result1.length == 0){
                            let queryInsert = `insert into visiter (visiter_id,visiter_name,visiter_phone,visiter_email,create_time,visited_name,visited_phone,companyName,companyId) values ('1000000001','${paramRe.visiter_name}','${paramRe.visiter_phone}','${paramRe.visiter_email}','${create_time}','${paramRe.visited_name}','${paramRe.visited_phone}','${paramRe.companyName}','${paramRe.companyId}')`
                            connection.query(queryInsert,function(err2,result2){
                                if(err2) throw err2
                                else{
                                    let queryDelete =  `delete from appointment where visiter_id='${paramRe.visiter_id}'`
                                    connection.query(queryDelete,function(err3,result3){
                                        if(err3) throw err3
                                        else{
                                            res.send({
                                                status:0,
                                                msg:'SUCCESS',
                                                data:{
                                                    visiter_name:visiter_name,
                                                    visiter_phone:visiter_phone,
                                                    create_time:create_time
                                                }
                                            })
                                            res.end()
                                        }
                                    })
                                }
                            })
                        }else{
                            let queryInsert = `insert into visiter (visiter_name,visiter_phone,visiter_email,create_time,visited_name,visited_phone,companyName,companyId) values ('${paramRe.visiter_name}','${paramRe.visiter_phone}','${paramRe.visiter_email}','${create_time}','${paramRe.visited_name}','${paramRe.visited_phone}','${paramRe.companyName}','${paramRe.companyId}')`
                            connection.query(queryInsert,function(err2,result2){
                                if(err2) throw err2
                                else{
                                    let queryDelete =  `delete from appointment where visiter_id='${paramRe.visiter_id}'`
                                    connection.query(queryDelete,function(err3,result3){
                                        if(err3) throw err3
                                        else{
                                            res.send({
                                                status:0,
                                                msg:'SUCCESS',
                                                data:{
                                                    visiter_name:visiter_name,
                                                    visiter_phone:visiter_phone,
                                                    create_time:create_time
                                                }
                                            })
                                            res.end()
                                        }
                                    })
                                }
                            })
                        }
                    }
                })
            }
        }
    })
});

module.exports = signInRouter;
