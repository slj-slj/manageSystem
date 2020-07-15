var express = require('express');
var appointmentRouter = express.Router();
var connection = require('./mysql')
/* GET home page. */
appointmentRouter.post('/', function(req, res, next) {
    let params = req.body
    let companyName =  params.companyName
    let visiter_name = params.visiter_name
    let visiter_phone = params.visiter_phone
    let visited_name = params.visited_name
    let visited_phone = params.visited_phone
    let create_time = params.create_time
    let visiter_email = params.visiter_email
    let type = params.type
    let query = `select companyId from user where companyName='${companyName}'`
    let queryPhone = `select visiter_phone from blacklist where visiter_phone='${visiter_phone}' and companyName='${companyName}'`
    connection.query(query,function(err,result){
        if(err) throw err
        else{
            if(result.length == 0){
                res.send({
                    status:99,
                    msg:'您预约的公司不存在'
                })
                res.end()
            }else{
                let companyId = result[0].companyId
                // console.log(companyId)
                connection.query(queryPhone,function(err4,result4){
                    if(err4) throw err4
                    else{
                        console.log(result4)
                        if(result4.length !==0){
                            res.send({
                                status:101,
                                msg:'您无法预约访问该公司，抱歉！'
                            })
                            res.end()
                        }else{
                            let query2 = 'select * from appointment'
                            connection.query(query2,function(err2,result2){
                                if(err2) throw err2
                                else{
                                    if(result2.length == 0){
                                        let queryInsert = `insert into appointment values ('${visiter_name}','${visiter_phone}','${visiter_email}','${create_time}','${visited_phone}','${visited_name}','${companyName}','${companyId}','${600000001}','${type}')`
                                        connection.query(queryInsert,function(err3,result3){
                                            if(err3) throw err3
                                            else{
                                                res.send({
                                                    status:0,
                                                    msg:'预约申请已发送，稍后短信通知您结果'
                                                })
                                                res.end()
                                            }
                                        })
                                    }
                                    else{
                                        let queryInsert = `insert into appointment (visiter_name,visiter_phone,visiter_email,create_time,visited_phone,visited_name,companyName,companyId,type) values ('${visiter_name}','${visiter_phone}','${visiter_email}','${create_time}','${visited_phone}','${visited_name}','${companyName}','${companyId}','${type}')`
                                        connection.query(queryInsert,function(err3,result3){
                                            if(err3) throw err3
                                            else{
                                                res.send({
                                                    status:0,
                                                    msg:'预约申请已发送，稍后短信通知您结果'
                                                })
                                                res.end()
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    }
                })
                
            }
        }
    })
});

module.exports = appointmentRouter;
