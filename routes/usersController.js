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
      res.render('error')
    })
})

// newUser Route
router.get('/new', (req, res) => {
  res.render('users/newUser')
})

// Create Route


//Show Route
router.get('/:userId', (req, res) => {
  const userId = req.params.userId
  UserModel.findById(userId)
    .then((user) => {
      res.render('users/show', {
        user: user
      })
    })
    .catch((error) => {
      res.render('error')
    })
})

// Edit Route


module.exports = router;
