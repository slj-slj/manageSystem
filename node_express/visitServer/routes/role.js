var express = require('express');
var roleRouter = express.Router();
var connection = require('./mysql')
/* GET home page. */
roleRouter.post('/', function(req, res, next) {
    let params = req.body
    var companyId =  params.companyId
    var query = `select role from user where companyId='${companyId}'`

    connection.query(query,function(err,result){
        
        let primaryCount = 0
        let middleCount = 0
        let seniorCount = 0
        
        if(err) throw err
        else{
            for(let i=0 ;i<result.length;i++){
                if(result[i].role == 0){
                    primaryCount+=1
                }else if(result[i].role ==1){
                    middleCount += 1
                }else if(result[i].role == 2){
                    seniorCount += 1
                }
            }
            res.send({
                status:0,
                msg:'SUCCESS',
                data:{
                    primaryCount:primaryCount,
                    middleCount:middleCount,
                    seniorCount:seniorCount
                }
            })
            res.end()
        }
    })
});

module.exports = roleRouter;
