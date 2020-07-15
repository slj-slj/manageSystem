var mysql = require('mysql');

var connection = mysql.createConnection({      //创建mysql实例
  host:'localhost',
  port:'3306',
  user:'root',
  password:'080422',
  database:'visitmanage'
});
connection.connect();
module.exports = connection