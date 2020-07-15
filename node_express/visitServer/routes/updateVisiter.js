var express = require('express');
var updateVisiterRouter = express.Router();
var connection = require('./mysql')
/* GET home page. */
updateVisiterRouter.post('/', function(req, res, next) {
    let params = req.body
    let companyId = params.companyId
    let visiter_id = params.visiter_id
    let visited_name = params.visited_name?params.visited_name:''
    let visited_phone = params.visited_phone?params.visited_phone:''
    let visiter_email=params.visiter_email || ''
    let create_time=params.create_time || ''
    let leave_time=params.leave_time || ''
    let query = `select * from visiter where companyId='${companyId}' and visiter_id='${visiter_id}'`
    
    connection.query(query,function(err,result){
        if(err) throw err
        else{
            if(!visited_name){
                visited_name = result[0].visited_name
            }
            if(!visited_phone){
                visited_phone = result[0].visited_phone
            }
            if(!visiter_email){
                visiter_email = result[0].visiter_email
            }
            if(!create_time){
                create_time = result[0].create_time
            }
            if(!leave_time){
                leave_time = result[0].leave_time
            }
            let query2 = `update visiter set visited_name='${visited_name}',visited_phone='${visited_phone}',visiter_email='${visiter_email}',create_time='${create_time}',leave_time='${leave_time}' where companyId='${companyId}' and visiter_id='${visiter_id}'`
            
            connection.query(query2,function(err2,result2){
                if(err2) throw err2
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
});

module.exports = updateVisiterRouter;
