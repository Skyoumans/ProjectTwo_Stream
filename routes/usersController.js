var express = require('express');
var router = express.Router();

const Schema = require('../db/schema.js');
const UserModel = Schema.UserModel;

// Index Route
router.get('/', (req, res) => {
  UserModel.find({})
    .then((users) => {
      res.render('users/index', {
        users: users
      })
    })
    .catch((error) => {
      console.log(error)
    })
})

// newUser Route
router.get('/new', (req, res) => {
  res.render('users/newUser')
})

//Show Route




// Edit Route
module.exports = router;
