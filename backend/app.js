var createError = require('http-errors');
var express = require('express');
var path = require('path');
const cors = require('cors');

var api_routes = require('./routes/api');

//db connect
require('./db_init');

var app = express();

//call cors
app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/assets',express.static(process.cwd()+'/public'));


app.use('/api',api_routes);

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
  res.json({
    data: null,
    status: true,
    msg: err.message
  });
})

app.listen(9000);

module.exports = app;
