require('dotenv').config();

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const methodOverride = require('method-override');

// Database set up
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI, {useMongoClient: true});

const db = mongoose.connection
db.on('error', (error) => {
  console.log(error)
})
db.once('open', () => {
  console.log('Connected to MongoDB!')
})

var app = express();

app.use(methodOverride('_method'))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Registered Controllers
const homeController = require('./routes/homeController.js');
app.use('/', homeController);

const moviesController = require('./routes/moviesController');
app.use('/movies', moviesController);

const usersController = require('./routes/usersController');
app.use('/users', usersController);

const reviewsController = require('./routes/reviewsController')
app.use('/movies/:movieId/reviews', reviewsController)

const wishlistController = require("./routes/wishlistController")
app.use('/users/:userId/wishlists', wishlistController)

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
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
