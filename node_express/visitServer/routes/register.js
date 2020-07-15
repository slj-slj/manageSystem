var express = require('express');
var registerRouter = express.Router();
var connection = require('./mysql')
/* GET home page. */
registerRouter.post('/', function(req, res, next) {
      let params = req.body
      let companyName = params.companyName
      let user_name = params.user_name
      let phone = params.phone
      let password = params.password
      let email = params.email
      let role = params.role
      let query = `select * from user where companyName='${companyName}'`
      connection.query(query,function(err,result){
            if(err) throw err
            else{
                  if(result.length == 0){
                        let query2 = `select * from user where user_phone='${phone}'`
                        connection.query(query2,function(err2,result2){
                              if(err2) throw err2
                              else{
                                    if(result2.length == 0){
                                          let queryAll = 'select * from user'
                                          connection.query(queryAll,function(err1,result1){
                                                if(err1) throw err1
                                                else{
                                                      if(result1.length == 0){
                                                            let user_idfirst = '300000001'
                                                            let companyIdFirst = '400000001'
                                                            let query6 = `insert into user (user_id,user_name,user_password,user_email,role,user_phone,companyName,companyId) values ('${user_idfirst}','${user_name}','${password}','${email}','${role}','${phone}','${companyName}','${companyIdFirst}')`
                                                            connection.query(query6,function(err3,result3){
                                                                  if(err3) throw err3
                                                                  else{
                                                                        // let query4 = `select * from user where companyName='${companyName}' and user_phone='${user_phone}'`
                                                                        res.send({
                                                                              status:0,
                                                                              msg:'SUCCESS',
                                                                              data:{
                                                                                    phone:phone,
                                                                                    role:role,
                                                                                    companyName:companyName,
                                                                                    companyId:companyIdFirst,
                                                                                    user_name:user_name
                                                                              }
                                                                        })
                                                                        res.end()
                                                                  }
                                                                  })
                                                      }else{
                                                            let query5 = `select MAX(companyId) as companyMax from user`
                                                            connection.query(query5,function(err5,result5){
                                                                  if(err5) throw err5
                                                                  else{
                                                                        let companyIdInsert = result5[0].companyMax+1
                                                                        let query3 = `insert into user (user_name,user_password,user_email,role,user_phone,companyName,companyId) values ('${user_name}','${password}','${email}','${role}','${phone}','${companyName}','${companyIdInsert}')`
                                                                        connection.query(query3,function(err3,result3){
                                                                              if(err3) throw err3
                                                                              else{
                                                                                    // let query4 = `select * from user where companyName='${companyName}' and user_phone='${user_phone}'`
                                                                                    res.send({
                                                                                          status:0,
                                                                                          msg:'SUCCESS',
                                                                                          data:{
                                                                                                phone:phone,
                                                                                                role:role,
                                                                                                companyName:companyName,
                                                                                                companyId:companyIdInsert,
                                                                                                user_name:user_name
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
                                    }else{
                                          res.send({
                                                status:99,
                                                msg:'该号码存在在某公司账号中'
                                          })
                                          res.end()
                                    }
                              }
                        })
                  }else{
                        res.send({
                              status:100,
                              msg:'该公司已经注册过了'
                        })
                        res.end()
                  }
            }
      })
});

module.exports = registerRouter;
