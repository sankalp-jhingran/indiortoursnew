var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var jade = require('pug');
var helmet = require('helmet');
var compression = require('compression');
var debug = require('debug')('http');

//Mutler
//var multer  = require('multer');

var models = require('./models/index');
var regusers = require('./routes/regusers');
var contactus = require('./routes/contactus');
var signup = require('./routes/signup');
var auth = require('./routes/auth');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var application = require('./routes/application');
var logout = require('./routes/logout');
var tours = require('./routes/tours');
var locations = require('./routes/location');
var hotels = require('./routes/hotel');
var itinerary = require('./routes/itinerary');
var departuredates = require('./routes/departuredates');
var tourcosts = require('./routes/tourcosts');
var images = require('./routes/image');
var notes = require('./routes/tournotes');
var users = require('./routes/user');
var places = require('./routes/place');

//load passport strategies
require('./config/passport')(passport, models.User);

var app = express();

//Use Helmet for security
app.use(helmet());

//Use Compression for gzip compression, for Production, use nginx gzip compression
app.use(compression());

app.use(cors()) // <--- CORS
console.log('Initializing app.js file====>2');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
console.log('Initializing app.js file====>3');


console.log('Initializing app.js file====>1');
var debug = require('debug')('server:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(process.env.PORT || '3010');
app.set('port', port);

console.log('Initializing app.js file====>2');

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

console.log('Initializing app.js file====>3');

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}



SALT_WORK_FACTOR = 12;

// For Passport
app.use(require('express-session')({ // session secret
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(logger('production'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

app.use('/api/image', images);
app.use('/api/image/all', images);
app.use('/api/image/allImages', images);

//app.use('/*', index); //<-- COMMENT THIS
//app.use('/api/login', login);
app.use('/api/regusers', regusers);
app.use('/api/contactus', contactus);
app.use('/api/signup', signup);
app.use('/api/signin', auth);
app.use('/api/logout', logout);
app.use('/api/isAuthenticated', application);
app.use('/api/tours', tours);
app.use('/api/location', locations);
app.use('/api/location/all', locations);
app.use('/api/location/update', locations);
app.use('/api/hotel', hotels);
app.use('/api/hotel/all', hotels);
app.use('/api/hotel/update', hotels);
app.use('/api/itinerary', itinerary);
app.use('/api/itinerary/all', itinerary);
app.use('/api/itinerary/update', itinerary);
app.use('/api/departuredates', departuredates);
app.use('/api/departuredates/all', departuredates);
app.use('/api/departuredates/update', departuredates);
app.use('/api/tourcosts', tourcosts);
app.use('/api/tourcosts/all', tourcosts);
app.use('/api/tourcosts/update', tourcosts);
app.use('/api/tours/all', tours);
app.use('/api/tours', tours);
app.use('/api/tours/find', tours);
app.use('/api/tours/update', tours);
app.use('/api/tours/tourwithlocations', tours);
app.use('/api/tours/alltourswithlocations', tours);
app.use('/api/tours/tourdetailswithrelatedmodels', tours);
app.use('/api/tours/alltourswithlocationsandhotels', tours);
app.use('/api/tours/searchtourwithlocations', tours);
app.use('/api/tournotes', notes);
app.use('/api/tournotes/all', notes);
app.use('/api/tournotes/update', notes);
app.use('/api/users', users);
app.use('/api/places', places);
app.use('/api/places/all', places);

// In production, we'll actually serve our angular app from express
console.log('env is====> ' + app.get('env'));
if (app.get('env') === 'production') {
  app.use(express.static(path.join(__dirname, '/dist')));

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
}

console.log('Calling index.html1===>');
app.get('/*', function(req, res) {
  console.log('Calling index.html2===>');
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : err; //{};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
