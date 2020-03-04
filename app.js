var express = require('express');
var request = require('request');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash')
var index = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//express-session
app.use(require('express-session')({
  secret:'success!!!',
  cookie:{maxAge:60000000000},//session ID的cookie
  resave:false,//save session to session store
  saveUninitialized:false
}))
app.use(flash())

//app.use(passport.initialize())
//app.use(passport.session())
/*
passport.use(new localStrategy(
async function authenticate(username, password,done){
  await connection.execute(`select USERNAME from USERS where USERNAME=`+username).then(function(dbUser){
    console.log("connected success!")
  if(!dbUser){//if username not found
    return done(null,false,{
      message:'Username not found!'
    })
  //}else if(!dbUser.validPassword(password)){//if password is incorrect
  }else if(!bcrypt.compareSync(password,dbUser.PASSWORD)){
  return done(null,false,{
      message:'Incorrect password!'
    })
  }
  return done(null, user)
})


}))
*/
/*
passport.serializeUser(function(user,cb){
  cb(null,user)
})
passport.deserializeUser(function(obj,cb){
  cb(null,obj)
})

app.use(function(req,res,next){
  res.locals.currentUser = req.user
 // if(req.user){
    next()
 // }

})*/
app.use(index);

// catch 404 and forward to error handler

app.use(function(req, res, next) {
 res.locals.error= req.flash('error')
 res.locals.success = req.flash('success')
  var err = new Error('Not Found');
  err.status = 404;
  next(err);

});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).send(err);

});
app.listen('8082', function() {
  console.log('CalTracker Server running on port 8082!');
});

module.exports = app;
