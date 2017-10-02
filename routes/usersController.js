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
  res.render('users/new')
})

// Create Route
router.post('/', (req, res) => {
  const newUser = req.body
  UserModel.create(newUser)
    .then(() => {
      res.redirect('/users')
    })
    .catch((error) => {
      res.render('error')
    })
})

// Edit Route
router.get('/:userId/edit', (req, res) => {
  const userId = req.params.userId
  UserModel.findById(userId)
  .then((user) => {
    res.render('users/edit', {
      user: user
    })
  })
  .catch((error) => {
    res.render('error')
  })
})

// Update Route
router.put('/:userId', (req, res) => {
  const userId = req.params.userId
  const updatedId = req.body
  UserModel.findByIdAndUpdate(userId, updatedId, { new: true })
    .then(() => {
      res.redirect(`/users/${userId}`)
    })
    .catch((error) => {
      res.render('error')
    })
})

// Show Route
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

// Delete Route
router.get('/:userId/delete', (req, res) => {
  const userId = req.params.userId
  UserModel.findByIdAndRemove(userId)
    .then(() => {
      res.redirect('/users')
    })
    .catch((error) => {
      res.render('error')
    })
})
module.exports = router;
