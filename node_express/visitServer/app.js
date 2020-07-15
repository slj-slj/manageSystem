var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var recordRouter = require('./routes/record');
var personnelRouter = require('./routes/personnel');
var roleRouter = require('./routes/role');
var blacklistRouter = require('./routes/blacklist');
var updateVisiterRouter = require('./routes/updateVisiter');
var addBlacklistRouter = require('./routes/addBlacklist')
var removeBlacklistRouter = require('./routes/removeBlacklist')
var deleteVisiterListRouter = require('./routes/deleteVisiterList')
var updateUserRouter = require('./routes/updateUser')
var deleteUserRouter = require('./routes/deleteUser')
var addUserRouter = require('./routes/addUser')
var roleListRouter = require('./routes/roleList')
var addRoleInfoRouter = require('./routes/addRoleInfo')
var changeRoleRouter = require('./routes/changeRole')
var selectSelfInfoRouter = require('./routes/selectSelfInfo')
var updateSelfInfoRouter = require('./routes/updateSelfInfo')
var dissolveRouter = require('./routes/dissolve')
var reportRouter = require('./routes/report')
var updatePasswordRouter = require('./routes/updatePassword')
var appointmentRouter = require('./routes/appointment')
var appointmentListRouter = require('./routes/appointmentList')
var acceptVisitRouter = require('./routes/acceptVisit')
var refuseVisitRouter = require('./routes/refuseVisit')
var signInRouter = require('./routes/signIn')
var signOffRouter = require('./routes/signOff')
var directvisitRouter = require('./routes/directvisit')

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//设置跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

//设置静态资源目录
app.use('/static/image',express.static('./public/images'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/personnel', personnelRouter);
app.use('/register',registerRouter)
app.use('/login',loginRouter)
app.use('/record',recordRouter)
app.use('/role',roleRouter)
app.use('/blacklist',blacklistRouter)
app.use('/updateVisiter',updateVisiterRouter)
app.use('/updateUser',updateUserRouter)
app.use('/addBlacklist',addBlacklistRouter)
app.use('/removeBlacklist',removeBlacklistRouter)
app.use('/deleteVisiterList',deleteVisiterListRouter)
app.use('/deleteUser',deleteUserRouter)
app.use('/addUser',addUserRouter)
app.use('/roleList',roleListRouter)
app.use('/addRoleInfo',addRoleInfoRouter)
app.use('/changeRole',changeRoleRouter)
app.use('/selectSelfInfo',selectSelfInfoRouter)
app.use('/updateSelfInfo',updateSelfInfoRouter)
app.use('/dissolve',dissolveRouter)
app.use('/report',reportRouter)
app.use('/updatePassword',updatePasswordRouter)
app.use('/appointment',appointmentRouter)
app.use('/appointmentList',appointmentListRouter)
app.use('/acceptVisit',acceptVisitRouter)
app.use('/refuseVisit',refuseVisitRouter)
app.use('/signIn',signInRouter)
app.use('/signOff',signOffRouter)
app.use('/directvisit',directvisitRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
