var express = require('express');
var dissolveRouter = express.Router();
var connection = require('./mysql')
/* GET home page. */
dissolveRouter.post('/', function(req, res, next) {
    let params = req.body
    let companyId =  params.companyId
    let query = `delete from user where companyId='${companyId}'`

    connection.query(query,function(err,result){
        if(err) throw err
        else{
            let query2 = `delete from visiter where companyId='${companyId}'`
            connection.query(query2,function(err2,result2){
                if(err2) throw err2
                else{
                    let query3 = `delete from blacklist where companyId='${companyId}'`
                    connection.query(query3,function(err3,result3){
                        if(err3) throw err3
                        else{
                            let query4 = `delete from appointment where companyId='${companyId}'`
                            connection.query(query4,function(err4,result4){
                                if(err4) throw err4
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
            
        }
    })
});

module.exports = dissolveRouter;
